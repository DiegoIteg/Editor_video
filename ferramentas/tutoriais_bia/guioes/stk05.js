// STOCK · Vídeo 5 — Reservas automáticas (orçamentos)
const { sleep } = require('./engine');
const TS = t => `[title^="${t}"], [data-original-title^="${t}"], [data-bs-original-title^="${t}"]`;
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const card = (r, t) => r.p.locator('.gp-cartao').filter({ hasText: t }).filter({ visible: true }).last();
const linha = (r, t) => r.p.locator('tr.gp-linha').filter({ hasText: t }).filter({ visible: true }).first();
const confirma = async (r, t) => { const b = r.p.locator('.modal.show button, .modal.show a').filter({ hasText: new RegExp('^\\s*' + t + '\\s*$') }).first(); await r.ring(b, 6, 8); await r.click(b, 450); await r.off(); await r.settle(1400); };

module.exports = {
  name: 'stk05_reservas_automaticas',
  titulo: 'Reservas automáticas', subtitulo: 'O stock guardado pelos orçamentos e quando o libertar', n: 5, modulo: 'STOCK',
  start: async r => { await r.open('StockReservasList'); },
  scenes: [
    { id: 's01', est: 10, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos às reservas automáticas: o stock que fica guardado quando fazes um orçamento.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Stock e escolhes Reservas automáticas.',
      act: async r => { await r.menuG('STOCK', 'Reservas automáticas'); } },
    { id: 's03', est: 11, say: 'Os cartões mostram as reservas ativas e as unidades, as que expiram nas próximas vinte e quatro horas, as que estão por libertar, e os artigos com o reservado errado.',
      act: async r => { for (const t of ['RESERVAS ATIVAS', 'EXPIRAM EM 24 H', 'POR LIBERTAR', 'ARTIGOS COM RESERVADO ERRADO']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 350, .3, .5); await r.wait(1100); } await r.off(); } },
    { id: 's04', est: 12, say: 'Em cada orçamento vês o cliente, os artigos reservados, as unidades e até quando a reserva é válida. O prazo é definido nas regras do Business.',
      act: async r => { const l = linha(r, 'N.º 2636'); const b = await r.box(l); await r.ring(l, 4, 8); for (const fx of [.06, .22, .42, .62, .72, .82]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 320); await r.wait(600); } await r.off(); } },
    { id: 's05', est: 10, say: 'Este orçamento expira hoje. Se o cliente já disse que não, clicas em libertar e confirmas. Os artigos voltam a ficar disponíveis.',
      act: async r => { const l = linha(r, 'N.º 2639'); await r.ring(l, 4, 8); await r.wait(700); await r.off(); const x = l.locator(TS('Libertar')).first(); await r.ring(x, 8, 8); await r.click(x, 500); await r.off(); await r.settle(900); await r.wait(600); await confirma(r, 'Libertar'); } },
    { id: 's06', est: 7, say: 'No lápis abres o orçamento, se quiseres ver o detalhe ou falar com o cliente.',
      act: async r => { const o = linha(r, 'N.º 2636').locator(TS('Abrir o orçamento')).first(); await r.ring(o, 8, 8); await r.to(o, 450); await r.wait(1500); await r.off(); } },
    { id: 's07', est: 10, say: 'Em baixo, o reservado por artigo: o físico, o reservado, o que está preso nos orçamentos e o que fica disponível.',
      act: async r => { const c = card(r, 'Reservado por artigo'); await r.ring(c, 6, 10); await r.to(c, 500, .5, .35); await r.wait(1800); await r.off(); } },
    { id: 's08', est: 8, say: 'E se alguma coisa não bater certo, o botão Recalcular reservas acerta tudo a partir dos orçamentos.',
      act: async r => { const b = btn(r, 'Recalcular reservas'); await r.ring(b, 6, 10); await r.to(b, 450); await r.wait(1500); await r.off(); } },
    { id: 's09', est: 9, say: 'E assim acompanhas as reservas automáticas. No próximo vídeo vamos à auditoria de stock. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 700, 800); } },
  ],
};
