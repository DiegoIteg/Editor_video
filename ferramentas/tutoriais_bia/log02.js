// LOGÍSTICA · Vídeo 2 — Armazéns e endereços
const { sleep } = require('./engine');
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const card = (r, t) => r.p.locator('.gp-cartao').filter({ hasText: t }).filter({ visible: true }).first();
const C = '#adianti_content';
const yOf = loc => loc.evaluate(e => { const k = document.querySelector('#adianti_content'); return e.getBoundingClientRect().top - k.getBoundingClientRect().top + k.scrollTop - 90; });

module.exports = {
  name: 'log02_armazens_enderecos',
  titulo: 'Armazéns e endereços', subtitulo: 'Onde fica cada coisa: armazéns, docas, ruas e prateleiras', n: 2, modulo: 'LOGÍSTICA',
  start: async r => { await r.open('ArmazensList'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos aos armazéns e endereços: onde fica cada coisa, até à prateleira.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 7, say: 'No menu, abres Logística, Armazéns, e escolhes Armazéns e docas.',
      act: async r => { await r.menuG('LOGÍSTICA', 'Armazéns e docas', 'Armazéns'); } },
    { id: 's03', est: 11, say: 'Os cartões mostram os armazéns, os endereços e quantos estão ocupados, os bloqueados, os armazéns ainda sem estrutura, e as docas.',
      act: async r => { for (const t of ['ARMAZÉNS', 'ENDEREÇOS', 'BLOQUEADOS', 'SEM ESTRUTURA', 'DOCAS']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 330, .3, .5); await r.wait(1000); } await r.off(); } },
    { id: 's04', est: 13, say: 'Cada armazém tem o seu cartão: o código, o responsável, a morada e a área, os endereços livres e ocupados, e a ocupação. Nos botões acrescentas endereços, vês os endereços e crias docas.',
      act: async r => { const c = card(r, 'Armazém Central'); await r.ring(c, 6, 10); await r.move(500, 380, 600); await r.move(900, 430, 1500); await r.off(); for (const t of ['Acrescentar endereços', 'Ver endereços', 'Nova doca', 'Editar']) { const b = c.getByText(t, { exact: false }).first(); await r.ring(b, 5, 8); await r.to(b, 320); await r.wait(500); } await r.off(); } },
    { id: 's05', est: 10, say: 'Os armazéns ainda sem códigos aparecem com um aviso, e o botão gerar estrutura cria as ruas, as prateleiras, os níveis e as posições.',
      act: async r => { const c = card(r, 'Geral'); await r.ring(c, 6, 10); await r.wait(500); const g = c.getByText('Gerar estrutura').first(); await r.ring(g, 6, 8); await r.to(g, 450); await r.wait(1400); await r.off(); } },
    { id: 's06', est: 8, say: 'Em baixo, as docas de receção e de expedição de cada armazém.',
      act: async r => { const c = card(r, 'Docas de receção e expedição'); await r.scrollTo(C, await yOf(c), 900); await r.ring(c, 6, 10); await r.to(c, 500, .5, .5); await r.wait(1300); await r.off(); } },
    { id: 's07', est: 11, say: 'Nos endereços vês cada posição do armazém: o código, a rua, a prateleira, o nível e a posição, o volume, os artigos que lá estão e o estado.',
      act: async r => { await r.scrollTo(C, 0, 700); await r.menuG('LOGÍSTICA', 'Endereços', 'Armazéns'); const l = r.p.locator('tbody tr, tr.gp-linha').filter({ visible: true }).first(); const b = await r.box(l); await r.ring(l, 4, 8); for (const fx of [.05, .15, .25, .3, .35, .45, .6, .85]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 300); await r.wait(420); } await r.off(); } },
    { id: 's08', est: 9, say: 'Os cartões dizem quantos estão livres, ocupados e bloqueados. E nos botões imprimes etiquetas, ou bloqueias um endereço que não pode receber.',
      act: async r => { for (const t of ['LIVRES', 'OCUPADOS', 'BLOQUEADOS']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 320, .3, .5); await r.wait(700); } await r.off(); for (const t of ['Etiquetas', 'Bloquear', 'Desbloquear']) { const b = btn(r, t); if (await b.count()) { await r.ring(b, 5, 8); await r.to(b, 300); await r.wait(450); } } await r.off(); } },
    { id: 's09', est: 9, say: 'E assim organizas os armazéns. No próximo vídeo vamos à frota. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 700, 800); } },
  ],
};
