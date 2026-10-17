// FINANCEIRO · Vídeo 2 — Análise financeira
const { sleep } = require('./engine');
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const card = (r, t) => r.p.locator('.gp-cartao, .card').filter({ hasText: t }).filter({ visible: true }).last();
const C = '#adianti_content';

module.exports = {
  name: 'fin02_analise_financeira',
  titulo: 'Análise financeira', subtitulo: 'O ano em números: recebido, pago, resultado e dívidas', n: 2, modulo: 'FINANCEIRO',
  start: async r => { await r.open('FinanceiroAnaliseDashboard'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos à Análise financeira: o ano da oficina em números de gestão.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Financeiro e escolhes Análise financeira.',
      act: async r => { await r.menuG('FINANCEIRO', 'Análise financeira'); } },
    { id: 's03', est: 6, say: 'No topo escolhes o ano que queres analisar.',
      act: async r => { for (const t of ['2024', '2025', '2026']) { await r.ring(btn(r, t), 5, 8); await r.to(btn(r, t), 350); await r.wait(500); } await r.off(); } },
    { id: 's04', est: 12, say: 'Os cartões mostram o recebido e o pago no ano, o resultado de caixa, o que tens a receber e a pagar em aberto, com a parte em atraso, e a percentagem de clientes que pagam a tempo.',
      act: async r => { for (const t of ['RECEBIDO NO ANO', 'PAGO NO ANO', 'RESULTADO DE CAIXA', 'A RECEBER EM ABERTO', 'A PAGAR EM ABERTO', 'RECEBIMENTOS A TEMPO']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 330, .3, .5); await r.wait(900); } await r.off(); } },
    { id: 's05', est: 8, say: 'O gráfico de recebido e pago por mês mostra os meses fortes e os meses apertados.',
      act: async r => { const c = card(r, 'Recebido × pago por mês'); await r.ring(c, 6, 10); await r.move(400, 600, 600); await r.move(1300, 560, 2200); await r.off(); } },
    { id: 's06', est: 8, say: 'Ao lado, a dívida dos clientes por antiguidade: quanto mais à direita, mais antiga e mais difícil de cobrar.',
      act: async r => { const c = card(r, 'Dívida de clientes por antiguidade'); await r.ring(c, 6, 10); await r.move(1500, 560, 600); await r.move(1850, 600, 1600); await r.off(); } },
    { id: 's07', est: 9, say: 'Em baixo, para onde vai o dinheiro: os pagamentos por grupo de contas e por origem.',
      act: async r => { await r.scrollTo(C, 360, 800); for (const t of ['Pagamentos por grupo de contas', 'Pagamentos por origem']) { const c = card(r, t); await r.ring(c, 6, 10); await r.to(c, 500, .5, .5); await r.wait(1300); await r.off(); } } },
    { id: 's08', est: 10, say: 'E as listas dos clientes com mais valor em atraso e dos fornecedores com mais valor em aberto, para saberes com quem tens de falar primeiro.',
      act: async r => { await r.scrollTo(C, 1050, 900); for (const t of ['Clientes com mais valor em atraso', 'Fornecedores / credores com mais valor em aberto']) { const c = card(r, t); await r.ring(c, 6, 10); await r.to(c, 500, .5, .4); await r.wait(1400); await r.off(); } } },
    { id: 's09', est: 9, say: 'E assim fazes a análise financeira. No próximo vídeo vamos às Contas a receber. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.scrollTo(C, 0, 900); await r.move(1100, 700, 800); } },
  ],
};
