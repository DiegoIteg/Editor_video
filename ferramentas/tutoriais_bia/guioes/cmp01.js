// COMPRAS · Vídeo 1 — Painel de compras
const { sleep } = require('./engine');
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const card = (r, t) => r.p.locator('.gp-cartao, .card').filter({ hasText: t }).filter({ visible: true }).last();
const C = '#adianti_content';

module.exports = {
  name: 'cmp01_painel_de_compras',
  titulo: 'Painel de compras', subtitulo: 'O que encomendar, o que está a caminho e o que chegou', n: 1, modulo: 'COMPRAS',
  start: async r => { await r.open('ComprasPainelDia'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje começamos o módulo Compras com o Painel de compras: o que tens de encomendar, o que está a caminho e o que já chegou.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Compras e escolhes Painel de compras.',
      act: async r => { await r.menuG('COMPRAS', 'Painel de compras'); } },
    { id: 's03', est: 10, say: 'Nos atalhos crias uma cotação ou uma encomenda, e vais às devoluções, à avaliação de fornecedores, à análise e aos históricos.',
      act: async r => { for (const t of ['Nova cotação', 'Nova encomenda', 'Devoluções a fornecedores', 'Avaliação de fornecedores', 'Análise de compras', 'Histórico de encomendas', 'Histórico de receções']) { await r.ring(btn(r, t), 5, 8); await r.to(btn(r, t), 300); await r.wait(380); } await r.off(); } },
    { id: 's04', est: 11, say: 'A primeira linha de cartões mostra os produtos a encomendar, com o valor estimado, as cotações por enviar, as que ainda não têm resposta e as encomendas por enviar.',
      act: async r => { for (const t of ['PRODUTOS A ENCOMENDAR', 'COTAÇÕES POR ENVIAR', 'COTAÇÕES SEM ENCOMENDA', 'ENCOMENDAS POR ENVIAR']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 350, .3, .5); await r.wait(1100); } await r.off(); } },
    { id: 's05', est: 11, say: 'A segunda mostra o que está a caminho, as entregas atrasadas, as entregas que ainda tens de avaliar e as receções sem conta a pagar.',
      act: async r => { for (const t of ['A AGUARDAR ENTREGA', 'ENTREGAS ATRASADAS', 'ENTREGAS POR AVALIAR', 'RECEÇÕES SEM CONTA A PAGAR']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 350, .3, .5); await r.wait(1100); } await r.off(); } },
    { id: 's06', est: 11, say: 'Em baixo, o que encomendar, agrupado por fornecedor. O sistema soma os produtos abaixo do mínimo de cada um, e no botão mais crias logo a cotação.',
      act: async r => { await r.scrollTo(C, 300, 800); const c = card(r, 'O que encomendar'); await r.ring(c, 6, 10); await r.to(c, 500, .4, .45); await r.wait(900); await r.off(); const p = c.locator('tr.gp-linha').first().locator('a, button').last(); await r.ring(p, 8, 8); await r.to(p, 450); await r.wait(1000); await r.off(); } },
    { id: 's07', est: 10, say: 'Ao lado, os produtos abaixo do mínimo e da segurança: o que tens disponível, o que já está em encomenda e a sugestão de compra.',
      act: async r => { const c = card(r, 'Produtos abaixo do mínimo'); await r.ring(c, 6, 10); const b = await r.box(c.locator('tr.gp-linha').first()); for (const fx of [.15, .45, .62, .8, .95]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 330); await r.wait(420); } await r.off(); } },
    { id: 's08', est: 11, say: 'Mais abaixo, as encomendas e receções: quando foi enviada, a entrega prevista, o alerta de atraso, o que já foi recebido e a avaliação do fornecedor.',
      act: async r => { await r.scrollTo(C, 760, 900); const c = card(r, 'Encomendas e receções'); await r.ring(c, 6, 10); await r.wait(400); await r.off(); const b = await r.box(c.locator('tr.gp-linha').first()); await r.ring(c.locator('tr.gp-linha').first(), 4, 8); for (const fx of [.05, .38, .48, .58, .7, .82, .88]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 330); await r.wait(380); } await r.off(); } },
    { id: 's09', est: 8, say: 'E no fim, as receções que ainda não têm conta a pagar, para que nenhuma fatura de fornecedor fique esquecida.',
      act: async r => { await r.scrollTo(C, 99999, 1000); const c = card(r, 'Receções sem conta a pagar'); await r.ring(c, 6, 10); await r.to(c, 500, .5, .5); await r.wait(1400); await r.off(); } },
    { id: 's10', est: 9, say: 'E assim lês o Painel de compras. No próximo vídeo vamos criar uma cotação. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.scrollTo(C, 0, 900); await r.move(1100, 700, 800); } },
  ],
};
