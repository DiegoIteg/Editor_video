// COMPRAS · Vídeo 6 — Avaliação de fornecedores e análise de compras
const { sleep } = require('./engine');
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const card = (r, t) => r.p.locator('.gp-cartao, .card').filter({ hasText: t }).filter({ visible: true }).last();
const C = '#adianti_content';
const yOf = (loc) => loc.evaluate(e => { const k = document.querySelector('#adianti_content'); return e.getBoundingClientRect().top - k.getBoundingClientRect().top + k.scrollTop - 90; });

module.exports = {
  name: 'cmp06_avaliacao_analise',
  titulo: 'Avaliação de fornecedores', subtitulo: 'Quem entrega a tempo, completo e conforme — e quanto compras', n: 6, modulo: 'COMPRAS',
  start: async r => { await r.open('FornecedoresQualidadeDashboard'); },
  scenes: [
    { id: 's01', est: 10, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos à avaliação de fornecedores e à análise de compras: quem te serve bem, e quanto compras a cada um.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Compras e escolhes Avaliação de fornecedores.',
      act: async r => { await r.menuG('COMPRAS', 'Avaliação de fornecedores'); } },
    { id: 's03', est: 6, say: 'No topo escolhes o período: três, seis ou doze meses, ou este ano.',
      act: async r => { for (const t of ['Últimos 3 meses', 'Últimos 6 meses', 'Últimos 12 meses', 'Este ano']) { await r.ring(btn(r, t), 5, 8); await r.to(btn(r, t), 300); await r.wait(400); } await r.off(); } },
    { id: 's04', est: 12, say: 'Os cartões mostram as entregas recebidas, a percentagem a tempo, as peças que ficaram em falta, as entregas conformes, e os fornecedores de classe C, os que precisam de atenção.',
      act: async r => { for (const t of ['ENTREGAS RECEBIDAS', 'ENTREGAS A TEMPO', 'PEÇAS EM FALTA', 'ENTREGAS CONFORMES', 'FORNECEDORES CLASSE C']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 330, .3, .5); await r.wait(900); } await r.off(); } },
    { id: 's05', est: 13, say: 'No desempenho por fornecedor, cada um tem uma classe, A, B ou C, e um índice de zero a cem, que junta a pontualidade, as entregas completas, a conformidade e a nota que lhe deste.',
      act: async r => { const c = card(r, 'Desempenho por fornecedor'); await r.scrollTo(C, await yOf(c), 800); await r.ring(c, 6, 10); await r.wait(500); await r.off();
        const l = c.locator('tbody tr').first(); await r.ring(l, 4, 8); const b = await r.box(l); for (const fx of [.08, .2, .24, .43, .5, .65, .9]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 330); await r.wait(420); } await r.off(); } },
    { id: 's06', est: 10, say: 'Os de classe C aparecem a vermelho: muitos atrasos ou entregas com problemas. É com esses que tens de falar, ou procurar alternativa.',
      act: async r => { const c = card(r, 'Desempenho por fornecedor'); const l = c.locator('tbody tr').filter({ hasText: 'Baterias Luso' }).first(); await r.ring(l, 4, 8); await r.to(l, 500, .3); await r.wait(1500); await r.off(); } },
    { id: 's07', est: 10, say: 'Em baixo, todas as entregas do período: o prazo, o que faltou, a conformidade, a nota e as observações de quem recebeu.',
      act: async r => { const c = card(r, 'Entregas do período'); await r.scrollTo(C, await yOf(c), 900); await r.ring(c, 6, 10); await r.wait(400); await r.off(); const l = c.locator('tbody tr').first(); await r.ring(l, 4, 8); const b = await r.box(l); for (const fx of [.05, .2, .4, .53, .6, .7, .86]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 330); await r.wait(380); } await r.off(); } },
    { id: 's08', est: 8, say: 'Agora, nos atalhos, vamos à análise de compras.',
      act: async r => { await r.scrollTo(C, 0, 900); const a = btn(r, 'Análise de compras'); await r.ring(a, 6, 10); await r.click(a, 500); await r.off(); await r.settle(1500); } },
    { id: 's09', est: 11, say: 'Escolhes o ano, e os cartões mostram o valor comprado, o número de receções, as encomendas feitas e a percentagem de entregas a tempo.',
      act: async r => { for (const t of ['2024', '2025', '2026']) { await r.ring(btn(r, t), 5, 8); await r.to(btn(r, t), 300); await r.wait(380); } await r.off(); for (const t of ['COMPRADO NO ANO', 'RECEÇÕES', 'ENCOMENDAS FEITAS', 'ENTREGAS A TEMPO']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 330, .3, .5); await r.wait(800); } await r.off(); } },
    { id: 's10', est: 9, say: 'O gráfico mostra as compras de cada mês, e o círculo, os fornecedores a quem compras mais.',
      act: async r => { const c = card(r, 'Compras por mês'); await r.ring(c, 6, 10); await r.move(380, 620, 600); await r.move(1150, 600, 2000); await r.off(); const d = card(r, 'Maiores fornecedores'); await r.ring(d, 6, 10); await r.to(d, 600, .4, .55); await r.wait(1400); await r.off(); } },
    { id: 's11', est: 8, say: 'E a lista dos produtos mais comprados, em valor, para negociares melhores preços.',
      act: async r => { const c = card(r, 'Produtos mais comprados'); await r.scrollTo(C, await yOf(c), 900); await r.ring(c, 6, 10); await r.to(c, 500, .5, .35); await r.wait(1500); await r.off(); } },
    { id: 's12', est: 9, say: 'E com isto fica completo o módulo Compras. No próximo módulo vamos ao Stock. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.scrollTo(C, 0, 900); await r.move(1100, 700, 800); } },
  ],
};
