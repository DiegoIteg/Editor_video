// LOGÍSTICA · Vídeo 1 — Painel do dia
const { sleep } = require('./engine');
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const card = (r, t) => r.p.locator('.gp-cartao').filter({ hasText: t }).filter({ visible: true }).last();
const C = '#adianti_content';
const yOf = loc => loc.evaluate(e => { const k = document.querySelector('#adianti_content'); return e.getBoundingClientRect().top - k.getBoundingClientRect().top + k.scrollTop - 90; });

module.exports = {
  name: 'log01_painel_do_dia',
  titulo: 'Painel do dia — Logística', subtitulo: 'Armazéns, frota, equipas e entregas num só ecrã', n: 1, modulo: 'LOGÍSTICA',
  start: async r => { await r.open('LogisticaPainelDia'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje começamos o módulo Logística com o Painel do dia: os armazéns, a frota, as equipas e as entregas.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Logística e escolhes Painel do dia.',
      act: async r => { await r.menuG('LOGÍSTICA', 'Painel do dia'); } },
    { id: 's03', est: 9, say: 'Nos atalhos vais aos armazéns, aos endereços, à frota, às manutenções, às equipas de entrega, às zonas e rotas, e à saída de mercadoria.',
      act: async r => { for (const t of ['Armazéns', 'Endereços', 'Frota', 'Manutenções', 'Equipas de entrega', 'Zonas e rotas', 'Outbound']) { await r.ring(btn(r, t), 5, 8); await r.to(btn(r, t), 300); await r.wait(330); } await r.off(); } },
    { id: 's04', est: 12, say: 'Os cartões mostram a ocupação dos armazéns, as viaturas operacionais, os alertas da frota, as equipas disponíveis e as rotas de hoje.',
      act: async r => { for (const t of ['OCUPAÇÃO DOS ARMAZÉNS', 'VIATURAS OPERACIONAIS', 'ALERTAS DA FROTA', 'EQUIPAS DISPONÍVEIS', 'ROTAS DE HOJE']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 330, .3, .5); await r.wait(1000); } await r.off(); } },
    { id: 's05', est: 11, say: 'Por baixo, a saída de mercadoria, passo a passo: a fila de corte, o picking, o embalamento, o que espera viagem, o que está em viagem e o que já foi entregue hoje.',
      act: async r => { const c = card(r, 'Saída de mercadoria'); await r.ring(c, 6, 10); await r.wait(400); await r.off(); for (const t of ['Fila de corte', 'Picking', 'Embalamento', 'À espera de viagem', 'Em viagem', 'Entregues hoje']) { const k = c.getByText(t, { exact: true }).first(); await r.to(k, 320); await r.wait(650); } } },
    { id: 's06', est: 11, say: 'O cartão precisa de atenção junta tudo o que tem prazo: documentos das viaturas a expirar, manutenções, certificados dos motoristas, e armazéns por organizar.',
      act: async r => { const c = card(r, 'Precisa de atenção'); await r.ring(c, 6, 10); const ls = c.locator('tr, .gp-linha').filter({ visible: true }); const n = Math.min(await ls.count(), 5); for (let i = 0; i < n; i++) { await r.to(ls.nth(i), 320, .3, .5); await r.wait(500); } await r.off(); } },
    { id: 's07', est: 8, say: 'Ao lado, as rotas que saem hoje, e quem está disponível para entregar.',
      act: async r => { for (const t of ['Rotas de hoje', 'Quem está disponível']) { const c = card(r, t); await r.ring(c, 6, 10); await r.to(c, 450, .5, .5); await r.wait(1200); await r.off(); } } },
    { id: 's08', est: 8, say: 'E em baixo, cada armazém com a sua ocupação e os endereços bloqueados.',
      act: async r => { const c = card(r, 'Armazéns'); await r.scrollTo(C, await yOf(c), 900); await r.ring(c, 6, 10); await r.to(c, 500, .5, .5); await r.wait(1400); await r.off(); } },
    { id: 's09', est: 9, say: 'E assim lês o Painel do dia da Logística. No próximo vídeo vamos aos armazéns e endereços. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.scrollTo(C, 0, 900); await r.move(1100, 700, 800); } },
  ],
};
