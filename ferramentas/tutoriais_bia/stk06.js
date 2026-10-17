// STOCK · Vídeo 6 — Auditoria de stock
const { sleep } = require('./engine');
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const card = (r, t) => r.p.locator('.gp-cartao').filter({ hasText: t }).filter({ visible: true }).last();
const C = '#adianti_content';
const yOf = loc => loc.evaluate(e => { const k = document.querySelector('#adianti_content'); return e.getBoundingClientRect().top - k.getBoundingClientRect().top + k.scrollTop - 90; });

module.exports = {
  name: 'stk06_auditoria',
  titulo: 'Auditoria de stock', subtitulo: 'Anomalias, ajustes por utilizador e o registo de quem fez o quê', n: 6, modulo: 'STOCK',
  start: async r => { await r.open('StockAuditoriaDashboard'); },
  scenes: [
    { id: 's01', est: 10, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos à auditoria de stock: o sítio onde confirmas que os números batem certo e vês quem mexeu em quê.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Stock e escolhes Auditoria de stock.',
      act: async r => { await r.menuG('STOCK', 'Auditoria de stock'); } },
    { id: 's03', est: 6, say: 'No topo escolhes o período: trinta dias, noventa dias ou o último ano.',
      act: async r => { for (const t of ['Últimos 30 dias', 'Últimos 90 dias', 'Último ano']) { await r.ring(btn(r, t), 5, 8); await r.to(btn(r, t), 300); await r.wait(500); } await r.off(); } },
    { id: 's04', est: 13, say: 'Os oito cartões são verificações automáticas: stock negativo, reservado maior do que o físico, contas que não batem, reservas expiradas por libertar, ou vendas anuladas por decidir. A verde, está tudo certo.',
      act: async r => { for (const t of ['STOCK NEGATIVO', 'RESERVADO MAIOR QUE O FÍSICO', 'DISPONÍVEL', 'SALDO SEM ARMAZÉM', 'LINHAS DE SALDO DUPLICADAS', 'RESERVADO DIFERENTE DOS ORÇAMENTOS', 'RESERVAS EXPIRADAS POR LIBERTAR', 'VENDAS ANULADAS POR DECIDIR']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 280, .3, .5); await r.wait(650); } await r.off(); } },
    { id: 's05', est: 11, say: 'Os ajustes por utilizador mostram quem fez ajustes manuais e por inventário, e o valor das perdas e dos ganhos, a custo.',
      act: async r => { const c = card(r, 'Ajustes por utilizador'); await r.scrollTo(C, await yOf(c), 850); await r.ring(c, 6, 10); const l = c.locator('tbody tr, tr.gp-linha').first(); const b = await r.box(l); for (const fx of [.08, .3, .45, .6, .72, .84, .95]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 300); await r.wait(450); } await r.off(); } },
    { id: 's06', est: 8, say: 'Ao lado, os artigos com ajustes repetidos, que costumam esconder um problema no armazém.',
      act: async r => { const c = card(r, 'Artigos com ajustes repetidos'); await r.ring(c, 6, 10); await r.to(c, 500, .5, .5); await r.wait(1600); await r.off(); } },
    { id: 's07', est: 11, say: 'E o registo de auditoria guarda tudo: a data, quem fez, a ação, o artigo, o armazém e a descrição. Nada se mexe no stock sem ficar aqui.',
      act: async r => { const c = card(r, 'Registo de auditoria'); await r.scrollTo(C, await yOf(c), 900); await r.ring(c, 6, 10); await r.wait(400); await r.off(); const l = c.locator('tbody tr, tr.gp-linha').first(); const b = await r.box(l); await r.ring(l, 4, 8); for (const fx of [.05, .17, .3, .45, .62, .85]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 300); await r.wait(500); } await r.off(); } },
    { id: 's08', est: 9, say: 'E assim fazes a auditoria do stock. No próximo vídeo vamos aos artigos e às localizações. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.scrollTo(C, 0, 900); await r.move(1100, 700, 800); } },
  ],
};
