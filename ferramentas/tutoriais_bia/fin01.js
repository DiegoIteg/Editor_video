// FINANCEIRO · Vídeo 1 — Painel do dia
const { sleep } = require('./engine');
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const card = (r, t) => r.p.locator('.gp-cartao, .card').filter({ hasText: t }).filter({ visible: true }).last();
const C = '#adianti_content';

module.exports = {
  name: 'fin01_painel_do_dia',
  titulo: 'Painel do dia — Financeiro', subtitulo: 'O dinheiro da oficina: o que entra, o que sai e o que está atrasado', n: 1, modulo: 'FINANCEIRO',
  start: async r => { await r.open('FinanceiroPainelDia'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje começamos o módulo Financeiro com o Painel do dia: o que tens a receber, a pagar e o que está atrasado.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Financeiro e escolhes Painel do dia.',
      act: async r => { await r.menuG('FINANCEIRO', 'Painel do dia'); } },
    { id: 's03', est: 8, say: 'Nos atalhos vais às contas a receber, às contas a pagar, à análise financeira e ao histórico de exclusões.',
      act: async r => { for (const t of ['Contas a receber', 'Contas a pagar', 'Análise financeira', 'Histórico de exclusões']) { await r.ring(btn(r, t), 6, 10); await r.to(btn(r, t), 350); await r.wait(650); } await r.off(); } },
    { id: 's04', est: 12, say: 'Os cartões comparam receber e pagar, lado a lado: o que está vencido, o que vence hoje e o que vence nos próximos sete dias.',
      act: async r => { for (const t of ['A RECEBER VENCIDO', 'A PAGAR VENCIDO', 'RECEBER HOJE', 'PAGAR HOJE', 'RECEBER EM 7 DIAS', 'PAGAR EM 7 DIAS']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 330, .3, .5); await r.wait(800); } await r.off(); } },
    { id: 's05', est: 9, say: 'O saldo previsto diz-te se, nos próximos sete dias, entra mais do que sai. E o liquidado hoje mostra o que já foi recebido e pago.',
      act: async r => { for (const t of ['SALDO PREVISTO 7 DIAS', 'LIQUIDADO HOJE']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 450, .3, .5); await r.wait(1500); } await r.off(); } },
    { id: 's06', est: 9, say: 'O fluxo de caixa previsto mostra, dia a dia, os recebimentos a verde e os pagamentos a vermelho. Podes ver sete, quinze ou trinta dias.',
      act: async r => { await r.scrollTo(C, 330, 800); const c = card(r, 'Fluxo de caixa previsto'); await r.ring(c, 6, 10); await r.move(500, 560, 700); await r.move(900, 560, 1500); await r.off(); for (const t of ['7 dias', '15 dias', '30 dias']) { await r.ring(btn(r, t), 5, 8); await r.to(btn(r, t), 300); await r.wait(400); } await r.off(); } },
    { id: 's07', est: 7, say: 'Ao lado, o saldo acumulado previsto, para saberes se a tesouraria aguenta a semana.',
      act: async r => { const c = card(r, 'Saldo acumulado previsto'); await r.ring(c, 6, 10); await r.move(1200, 560, 600); await r.move(1800, 600, 1500); await r.off(); } },
    { id: 's08', est: 10, say: 'Mais abaixo, os trabalhos que ainda não têm financeiro gerado, e as contas vencidas, com o cliente ou o fornecedor, o documento e o valor.',
      act: async r => { await r.scrollTo(C, 700, 900); for (const t of ['Por gerar financeiro', 'Vencidas']) { const c = card(r, t); await r.ring(c, 6, 10); await r.to(c, 500, .5, .4); await r.wait(1300); await r.off(); } } },
    { id: 's09', est: 9, say: 'E, por fim, as contas que vencem hoje, as dos próximos sete dias e as que foram liquidadas hoje.',
      act: async r => { await r.scrollTo(C, 1150, 900); for (const t of ['Vencem hoje', 'Próximos 7 dias']) { const c = card(r, t); await r.ring(c, 6, 10); await r.to(c, 500, .5, .4); await r.wait(1000); await r.off(); } } },
    { id: 's10', est: 9, say: 'E assim lês o Painel do dia do Financeiro. No próximo vídeo vamos à Análise financeira. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.scrollTo(C, 0, 900); await r.move(1100, 700, 800); } },
  ],
};
