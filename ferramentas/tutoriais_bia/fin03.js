// FINANCEIRO · Vídeo 3 — Contas a receber
const { sleep } = require('./engine');
const T = t => `[title="${t}"], [data-original-title="${t}"], [data-bs-original-title="${t}"]`;
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const B = (r, t) => r.p.locator('#adianti_right_panel button, #adianti_right_panel a').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).first();
const row = r => r.p.locator('tbody tr').filter({ visible: true }).first();
const C = '#adianti_content';

module.exports = {
  name: 'fin03_contas_receber',
  titulo: 'Contas a receber', subtitulo: 'Acompanhar e registar os pagamentos dos clientes', n: 3, modulo: 'FINANCEIRO',
  start: async r => { r.c.on('page', p => { setTimeout(() => p.close().catch(() => {}), 300); }); await r.open('ReceberContaItemList'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos às Contas a receber: acompanhar o que os clientes te devem e registar os pagamentos.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Financeiro e escolhes Contas a receber.',
      act: async r => { await r.menuG('FINANCEIRO', 'Contas a receber'); } },
    { id: 's03', est: 10, say: 'Os cartões mostram as contas vencidas, as que vencem hoje, as dos próximos sete dias, o total em aberto e o que já recebeste este mês.',
      act: async r => { for (const t of ['VENCIDAS', 'VENCEM HOJE', 'PRÓXIMOS 7 DIAS', 'EM ABERTO', 'RECEBIDAS ESTE MÊS']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 350, .3, .5); await r.wait(900); } await r.off(); } },
    { id: 's04', est: 9, say: 'Por baixo, os botões rápidos: atrasadas, abertas, quitadas e as que vencem hoje. E os filtros e o exportar.',
      act: async r => { for (const t of ['Atrasadas', 'Abertas', 'Quitadas', 'Vence Hoje', 'Filtros', 'Exportar']) { await r.ring(btn(r, t), 5, 8); await r.to(btn(r, t), 300); await r.wait(500); } await r.off(); } },
    { id: 's05', est: 9, say: 'Clicamos em Abertas. A lista mostra o cliente, a parcela, o vencimento, o valor e o alerta de cada conta.',
      act: async r => { await r.click(btn(r, 'Abertas'), 500); await r.settle(1300); const b = await r.box(row(r)); await r.ring(row(r), 4, 8); for (const fx of [.3, .55, .63, .72, .8, .92]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 330); await r.wait(400); } await r.off(); } },
    { id: 's06', est: 8, say: 'Quando o cliente paga, clicas no calendário para quitar a conta.',
      act: async r => { const q = row(r).locator(T('Quitar')).first(); await r.ring(q, 8, 8); await r.click(q, 500); await r.off(); await r.settle(1300); } },
    { id: 's07', est: 10, say: 'Escolhes a forma de pagamento, por exemplo, MB WAY, confirmas o valor e a data do pagamento, e clicas em Gravar.',
      act: async r => { await r.pickFast('forma_pagamento_id', /^\s*MB WAY\s*$/); await r.wait(300); const v = r.p.locator('#adianti_right_panel input[name="valor"]'); await r.ring([v, r.p.locator('#adianti_right_panel input[name="data_pagamento"]')], 6, 8); await r.to(v, 500); await r.wait(900); await r.off(); await r.ring(B(r, 'Gravar'), 6, 10); await r.click(B(r, 'Gravar'), 500); await r.off(); await r.settle(1400); } },
    { id: 's08', est: 9, say: 'A conta sai das abertas. Nas quitadas, cada pagamento tem o recibo em PDF e o botão para o enviar por e-mail ao cliente.',
      act: async r => { await r.click(btn(r, 'Quitadas'), 500); await r.settle(1300); for (const t of ['Recibo (PDF)', 'Enviar recibo por e-mail']) { const i = row(r).locator(T(t)).first(); await r.ring(i, 8, 8); await r.to(i, 450); await r.wait(1100); } await r.off(); } },
    { id: 's09', est: 9, say: 'E assim geres as contas a receber. No próximo vídeo vamos às Contas a pagar. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 700, 800); } },
  ],
};
