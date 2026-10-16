// BUSINESS · Vídeo 3 — Plano anual e real vs objetivo
const { C, btn, kpi, card, goTo, top, kpis, show } = require('./bushelp');
const row = (c, t) => c.locator('tr').filter({ hasText: t }).first();
const sweepRow = async (r, l, fxs, w = 450) => { const b = await r.box(l); for (const fx of fxs) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 380); await r.wait(w); } };
module.exports = {
  name: 'bus03_plano_anual',
  titulo: 'Plano anual e real vs objetivo', subtitulo: 'Objetivos de faturação, orçamento de despesas e como vai o ano', n: 3, modulo: 'BUSINESS',
  start: async r => { await r.open('BusinessPainelDirecao'); await r.settle(800); },
  scenes: [
    { id: 's01', est: 10, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos ao planeamento: o plano anual, com os objetivos e o orçamento, e o real contra o objetivo.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 6, say: 'No menu, abres Business, Planeamento, e escolhes Plano anual.',
      act: async r => { await r.menuG('BUSINESS', 'Plano anual', 'Planeamento'); await r.settle(900); } },
    { id: 's03', est: 13, say: 'O plano de cada ano tem o objetivo de faturação, comparado com os últimos doze meses, o orçamento de despesas, o resultado planeado, com a margem, e a média por mês.',
      act: async r => { await kpis(r, ['Objetivo de faturação', 'Orçamento de despesas', 'Resultado planeado', 'Média por mês'], 1700); } },
    { id: 's04', est: 11, say: 'O gráfico mostra o plano mês a mês: o objetivo de faturação, o orçamento de despesas, o resultado planeado, e o que faturaste no ano passado.',
      act: async r => { const c = card(r, 'O plano mês a mês'); await goTo(r, c); await r.ring(c, 6, 10); const b = await r.box(c); await r.move(b.x + b.width * .1, b.y + b.height * .55, 600); await r.move(b.x + b.width * .9, b.y + b.height * .55, 3500); await r.off(); } },
    { id: 's05', est: 13, say: 'Na tabela, os objetivos de faturação por linha de receita e setor, mês a mês. A coluna base é o que faturaste nos últimos doze meses, e serve de ponto de partida.',
      act: async r => { const c = card(r, 'Objetivos e orçamento'); await goTo(r, c); await r.ring(c, 6, 10); await r.wait(500); await r.off(); const l = row(c, 'Produtos'); await r.ring(l, 3, 6); await sweepRow(r, l, [.05, .2, .4, .6, .8], 380); await r.off(); const t = row(c, 'Total da faturação'); await r.ring(t, 3, 6); await r.wait(900); await r.off(); const bs = await r.box(l); await r.move(bs.x + bs.width * .97, bs.y + bs.height / 2, 500); await r.wait(1200); } },
    { id: 's06', est: 10, say: 'Por baixo, o orçamento de despesas por grupo, o total das despesas, e o resultado planeado de cada mês.',
      act: async r => { const c = card(r, 'Objetivos e orçamento'); const l = row(c, 'Pessoal'); await goTo(r, l); await r.ring(l, 3, 6); await sweepRow(r, l, [.05, .3, .6], 400); await r.off(); for (const t of ['Total das despesas', 'Resultado planeado']) { const x = row(c, t); await r.ring(x, 3, 6); await r.wait(1000); await r.off(); } } },
    { id: 's07', est: 13, say: 'Este plano está aprovado. Para mudar valores, clicas em Reabrir, e o plano volta a rascunho. Aqui indicas também o saldo bancário em um de janeiro, para o fluxo de caixa.',
      act: async r => { const re = btn(r, 'Reabrir'); await goTo(r, re); await r.ring(re, 6, 10); await r.to(re, 400); await r.wait(1800); await r.off(); const s = r.p.locator('#adianti_div_content').getByText('Saldo bancário em 1 de janeiro').first(); await r.ring(s.locator('xpath=..'), 5, 8); await r.to(s, 400); await r.wait(1500); await r.off(); } },
    { id: 's08', est: 10, say: 'E em três anos à frente vês o plano deste ano, e uma projeção indicativa para os dois anos seguintes.',
      act: async r => { await show(r, 'Três anos à frente', 2500, .5); } },
    { id: 's09', est: 6, say: 'Agora, no mesmo menu, vamos ao Real vs objetivo.',
      act: async r => { await top(r, 600); await r.menuG('BUSINESS', 'Real vs objetivo', 'Planeamento'); await r.settle(900); } },
    { id: 's10', est: 13, say: 'Os cartões mostram o faturado até hoje, a percentagem do objetivo atingida, a comparação com o ano anterior, a projeção para o fim do ano, e o faturado menos as despesas.',
      act: async r => { await kpis(r, ['Faturado até', 'Atingimento', 'Vs ano anterior', 'Projeção', 'Faturado −'], 1350); } },
    { id: 's11', est: 11, say: 'O gráfico compara, mês a mês, o faturado com o objetivo. As barras claras são a projeção dos meses que faltam, ao ritmo atual.',
      act: async r => { const c = card(r, 'Faturado vs objetivo'); await goTo(r, c); await r.ring(c, 6, 10); const b = await r.box(c); await r.move(b.x + b.width * .1, b.y + b.height * .5, 600); await r.move(b.x + b.width * .7, b.y + b.height * .5, 2200); await r.move(b.x + b.width * .9, b.y + b.height * .4, 900); await r.wait(1200); await r.off(); } },
    { id: 's12', est: 13, say: 'Em cada linha de receita e setor vês o objetivo, o faturado, o desvio e o atingimento: verde a partir de cem por cento, amarelo de noventa a noventa e nove, e vermelho abaixo.',
      act: async r => { const c = card(r, 'Por linha de receita e setor'); await goTo(r, c); await r.ring(c, 6, 10); await r.wait(600); await r.off(); const l = c.locator('tr').nth(1); await r.ring(l, 3, 6); await sweepRow(r, l, [.05, .3, .4, .5, .62], 600); await r.off(); const ls = c.locator('tr'); for (let i = 2; i < 6; i++) { const b = await r.box(ls.nth(i)); await r.move(b.x + b.width * .62, b.y + b.height / 2, 350); await r.wait(500); } } },
    { id: 's13', est: 10, say: 'E as despesas contra o orçamento, grupo a grupo, para veres onde estás a gastar mais do que planeaste.',
      act: async r => { await show(r, 'Despesas vs orçamento', 1200, .5); const c = card(r, 'Despesas vs orçamento'); const ls = c.locator('tr'); const n = await ls.count(); for (let i = 1; i < n; i += 2) { const b = await r.box(ls.nth(i)); await r.move(b.x + b.width * .8, b.y + b.height / 2, 300); await r.wait(380); } } },
    { id: 's14', est: 9, say: 'E assim planeias o ano e acompanhas o objetivo. No próximo vídeo vamos ao fluxo de caixa e aos resultados. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await top(r, 900); await r.move(1100, 700, 800); } },
  ],
};
