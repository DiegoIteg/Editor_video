// STOCK · Vídeo 1 — Painel do dia
const { sleep } = require('./engine');
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const card = (r, t) => r.p.locator('.gp-cartao').filter({ hasText: t }).filter({ visible: true }).last();
const C = '#adianti_content';
const yOf = loc => loc.evaluate(e => { const k = document.querySelector('#adianti_content'); return e.getBoundingClientRect().top - k.getBoundingClientRect().top + k.scrollTop - 90; });
const show = async (r, t, ms = 1300, fy = .4) => { const c = card(r, t); await r.scrollTo(C, await yOf(c), 850); await r.ring(c, 6, 10); await r.to(c, 500, .5, fy); await r.wait(ms); await r.off(); };

module.exports = {
  name: 'stk01_painel_do_dia',
  titulo: 'Painel do dia — Stock', subtitulo: 'O valor do armazém, as faltas, as reservas e os movimentos', n: 1, modulo: 'STOCK',
  start: async r => { await r.open('StockPainelDia'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje começamos o módulo Stock com o Painel do dia: o que tens no armazém, o que falta e o que está reservado.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Stock e escolhes Painel do dia.',
      act: async r => { await r.menuG('STOCK', 'Painel do dia'); } },
    { id: 's03', est: 9, say: 'Nos atalhos vais à consulta de stock, aos movimentos, às reservas, aos inventários, à auditoria e aos produtos.',
      act: async r => { for (const t of ['Consulta de stock', 'Movimentos', 'Reservas de clientes', 'Reservas automáticas', 'Inventários', 'Auditoria', 'Produtos']) { await r.ring(btn(r, t), 5, 8); await r.to(btn(r, t), 300); await r.wait(330); } await r.off(); } },
    { id: 's04', est: 12, say: 'Os cartões mostram o valor do stock a custo, as ruturas, os artigos abaixo do mínimo, o stock negativo, que nunca devia existir, e as reservas de clientes e automáticas.',
      act: async r => { for (const t of ['VALOR EM STOCK', 'RUTURAS', 'ABAIXO DO MÍNIMO', 'STOCK NEGATIVO', 'RESERVAS DE CLIENTES', 'RESERVAS AUTOMÁTICAS']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 320, .3, .5); await r.wait(850); } await r.off(); } },
    { id: 's05', est: 9, say: 'E ainda os artigos parados, que são dinheiro empatado, os inventários em curso e os ajustes deste mês.',
      act: async r => { for (const t of ['ARTIGOS PARADOS', 'INVENTÁRIOS EM CURSO', 'AJUSTES ESTE MÊS']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 350, .3, .5); await r.wait(1000); } await r.off(); } },
    { id: 's06', est: 9, say: 'Em baixo, as reservas de clientes em curso: quem está à espera, de que artigo, e se já chegou e está pronto a separar.',
      act: async r => { await show(r, 'Reservas de clientes em curso', 1600); } },
    { id: 's07', est: 10, say: 'A seguir, a reposição: os artigos em rutura ou abaixo do mínimo, o que já está em encomenda, e o atalho para criar as cotações nas Compras.',
      act: async r => { await show(r, 'Reposição: ruturas', 1200); const b = btn(r, 'Criar cotações'); await r.scrollTo(C, 0, 800); await r.ring(b, 6, 10); await r.to(b, 400); await r.wait(900); await r.off(); } },
    { id: 's08', est: 9, say: 'Os gráficos mostram as entradas e saídas dos últimos trinta dias, e o valor em stock por família.',
      act: async r => { const c = card(r, 'Entradas e saídas'); await r.scrollTo(C, await yOf(c), 700); await r.ring(c, 6, 10); await r.move(500, 600, 500); await r.move(1000, 600, 900); await r.off(); const d = card(r, 'Valor em stock por família'); await r.ring(d, 6, 10); await r.to(d, 450, .5, .5); await r.wait(700); await r.off(); } },
    { id: 's09', est: 10, say: 'Mais abaixo, as reservas automáticas dos orçamentos, os inventários em curso, e os artigos parados, sem saídas há mais de seis meses.',
      act: async r => { await show(r, 'Reservas automáticas (orçamentos)', 900); await show(r, 'Artigos parados', 1200); } },
    { id: 's10', est: 7, say: 'E no fim, todos os movimentos de hoje, as entradas e as saídas.',
      act: async r => { await show(r, 'Movimentos de hoje', 1600, .3); } },
    { id: 's11', est: 9, say: 'E assim lês o Painel do dia do Stock. No próximo vídeo vamos à consulta de stock. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.scrollTo(C, 0, 1000); await r.move(1100, 700, 800); } },
  ],
};
