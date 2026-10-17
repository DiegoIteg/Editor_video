// FINANCEIRO · Vídeo 4 — Contas a pagar
const { sleep } = require('./engine');
const T = t => `[title="${t}"], [data-original-title="${t}"], [data-bs-original-title="${t}"]`;
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const B = (r, t) => r.p.locator('#adianti_right_panel button, #adianti_right_panel a').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).first();
const row = r => r.p.locator('tbody tr').filter({ visible: true }).first();

module.exports = {
  name: 'fin04_contas_pagar',
  titulo: 'Contas a pagar', subtitulo: 'Fornecedores e despesas pagos a tempo', n: 4, modulo: 'FINANCEIRO',
  start: async r => { await r.open('PagarContaItemList'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos às Contas a pagar: os fornecedores e as despesas da oficina.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Financeiro e escolhes Contas a pagar.',
      act: async r => { await r.menuG('FINANCEIRO', 'Contas a pagar'); } },
    { id: 's03', est: 10, say: 'Os cartões funcionam como nas contas a receber: vencidas, a vencer hoje, nos próximos sete dias, o total em aberto e o que já pagaste este mês.',
      act: async r => { for (const t of ['VENCIDAS', 'VENCEM HOJE', 'PRÓXIMOS 7 DIAS', 'EM ABERTO', 'PAGAS ESTE MÊS']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 350, .3, .5); await r.wait(900); } await r.off(); } },
    { id: 's04', est: 10, say: 'Clicas em Abertas, e nos filtros escolhes um fornecedor, por exemplo, a Agência Digital, e clicas em Buscar. Vês o vencimento e o valor de cada parcela.',
      act: async r => {
        await r.click(btn(r, 'Abertas'), 500); await r.settle(1200); await r.click(btn(r, 'Filtros'), 500); await r.settle(900);
        await r.pickFast('pessoa_id', 'Agência Digital Demo', 'Agência Dig'); await r.wait(300);
        await r.click(r.el('Buscar', 'a,button,span'), 500); await r.settle(1300);
        const b = await r.box(row(r)); await r.ring(row(r), 4, 8); for (const fx of [.3, .63, .72, .92]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 330); await r.wait(380); } await r.off();
      } },
    { id: 's05', est: 10, say: 'Para registar um pagamento, clicas em quitar, escolhes a forma de pagamento, por exemplo, multibanco, confirmas a data e clicas em Gravar.',
      act: async r => {
        const q = row(r).locator(T('Quitar')).first(); await r.ring(q, 8, 8); await r.click(q, 500); await r.off(); await r.settle(1300);
        await r.pickFast('forma_pagamento_id', /^\s*Multibanco\s*$/); await r.wait(300);
        await r.ring(r.p.locator('#adianti_right_panel input[name="data_pagamento"]'), 6, 8); await r.wait(700); await r.off();
        await r.ring(B(r, 'Gravar'), 6, 10); await r.click(B(r, 'Gravar'), 500); await r.off(); await r.settle(1400);
      } },
    { id: 's06', est: 8, say: 'O caixote elimina uma conta lançada por engano. E cada eliminação fica guardada no histórico de exclusões, com quem, quando e porquê.',
      act: async r => { await r.click(btn(r, 'Limpar filtros'), 450); await r.settle(1000); await r.click(btn(r, 'Quitadas'), 450); await r.settle(1100); const e = row(r).locator(T('Eliminar')).first(); await r.ring(e, 8, 8); await r.to(e, 500); await r.wait(1200); await r.off(); } },
    { id: 's07', est: 8, say: 'No histórico de exclusões vês todas as contas apagadas ou reabertas, para que nada desapareça sem rasto.',
      act: async r => { await r.menuG('FINANCEIRO', 'Histórico de exclusões'); await r.ring(r.p.locator('tbody').filter({ visible: true }).first(), 4, 8); await r.move(1000, 330, 900); await r.wait(800); await r.off(); } },
    { id: 's08', est: 9, say: 'E assim geres as contas a pagar. No próximo vídeo vamos às Despesas fixas e variáveis. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 700, 800); } },
  ],
};
