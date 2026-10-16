// LOGÍSTICA · Vídeo 4 — Equipas de entrega, zonas e rotas
const { sleep } = require('./engine');
const TS = t => `[title^="${t}"], [data-original-title^="${t}"], [data-bs-original-title^="${t}"]`;
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const card = (r, t) => r.p.locator('.gp-cartao').filter({ has: r.p.locator('.gp-cartao-topo', { hasText: new RegExp('^\\s*' + t) }) }).filter({ visible: true }).first();
const C = '#adianti_content';
const yOf = loc => loc.evaluate(e => { const k = document.querySelector('#adianti_content'); return e.getBoundingClientRect().top - k.getBoundingClientRect().top + k.scrollTop - 90; });

module.exports = {
  name: 'log04_equipas_zonas_rotas',
  titulo: 'Equipas, zonas e rotas', subtitulo: 'Quem entrega, para onde e por que caminho', n: 4, modulo: 'LOGÍSTICA',
  start: async r => { await r.open('LogParceiroList'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos às equipas de entrega, e às zonas e rotas: quem entrega, para onde, e por que caminho.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Logística e escolhes Equipas de entrega.',
      act: async r => { await r.menuG('LOGÍSTICA', 'Equipas de entrega'); } },
    { id: 's03', est: 11, say: 'Os cartões mostram as transportadoras, os motoristas, os estafetas, quem está disponível hoje, e os documentos a expirar, como a carta ou o certificado de motorista.',
      act: async r => { for (const t of ['TRANSPORTADORAS', 'MOTORISTAS', 'ESTAFETAS', 'DISPONÍVEIS HOJE', 'DOCUMENTOS']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 330, .3, .5); await r.wait(1000); } await r.off(); } },
    { id: 's04', est: 12, say: 'Cada equipa tem o tipo, a disponibilidade, o contacto, a viatura habitual e os documentos. Nos ícones marcas a pessoa como em serviço ou ausente, e o painel do dia atualiza-se.',
      act: async r => { const l = r.p.locator('tr').filter({ hasText: 'Vasco Pereira' }).first(); const b = await r.box(l); await r.ring(l, 4, 8); for (const fx of [.08, .22, .32, .45, .62]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 330); await r.wait(500); } await r.off(); for (const t of ['Marcar como em serviço', 'Marcar como ausente', 'Editar']) { const i = l.locator(TS(t)).first(); await r.ring(i, 8, 8); await r.to(i, 350); await r.wait(650); } await r.off(); } },
    { id: 's05', est: 6, say: 'Agora, no menu, vamos a Zonas e rotas.',
      act: async r => { await r.menuG('LOGÍSTICA', 'Zonas e rotas'); } },
    { id: 's06', est: 10, say: 'Os cartões mostram as zonas de entrega, as rotas regulares, a rota que sai hoje, e as zonas que ainda não têm rota.',
      act: async r => { for (const t of ['ZONAS', 'ROTAS', 'SAEM HOJE', 'ZONAS SEM ROTA']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 330, .3, .5); await r.wait(1100); } await r.off(); } },
    { id: 's07', est: 10, say: 'Em que zona fica um cliente? Escreves o código postal, clicas em Ver zona, e ficas logo a saber a zona, o prazo, o custo e a rota.',
      act: async r => { const c = card(r, 'Em que zona fica'); const i = c.locator('input').first(); await r.click(i, 420); await r.p.keyboard.type('3500-123', { delay: r.dry ? 5 : 90 }); const v = c.locator('button, a').filter({ hasText: /Ver zona/ }).first(); await r.ring(v, 6, 8); await r.click(v, 450); await r.off(); await r.settle(1400); const c2 = card(r, 'Em que zona fica'); await r.ring(c2, 6, 10); await r.to(c2, 500, .5, .7); await r.wait(1500); await r.off(); } },
    { id: 's08', est: 11, say: 'Nas zonas de entrega defines os códigos postais e as localidades de cada zona, o prazo, o custo e a rota. E nas rotas, os dias, a hora de saída, o armazém e a viatura.',
      act: async r => { for (const t of ['Zonas de entrega', 'Rotas']) { const c = card(r, t); await r.scrollTo(C, await yOf(c), 900); await r.ring(c, 6, 10); const l = c.locator('tr.gp-linha, tbody tr').filter({ visible: true }).first(); const b = await r.box(l); for (const fx of [.08, .3, .55, .7, .8]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 300); await r.wait(380); } await r.off(); } } },
    { id: 's09', est: 9, say: 'E assim organizas as entregas. No próximo vídeo vamos à saída de mercadoria: o corte e o picking. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.scrollTo(C, 0, 900); await r.move(1100, 700, 800); } },
  ],
};
