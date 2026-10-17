// COMPRAS · Vídeo 5 — Receções: conta a pagar e devoluções
const { sleep } = require('./engine');
const T = t => `[title="${t}"], [data-original-title="${t}"], [data-bs-original-title="${t}"]`;
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const B = (r, t) => r.p.locator('#adianti_right_panel button, #adianti_right_panel a').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).first();
const RP = '#adianti_right_panel ';
const row = r => r.p.locator('tbody tr').filter({ visible: true }).first();

module.exports = {
  name: 'cmp05_rececoes_devolucoes',
  titulo: 'Receções e devoluções', subtitulo: 'Gerar a conta a pagar e devolver ao fornecedor', n: 5, modulo: 'COMPRAS',
  start: async r => { r.c.on('page', p => { setTimeout(() => p.close().catch(() => {}), 300); }); await r.open('RecepcaoMercadoriaList'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos às receções: gerar a conta a pagar ao fornecedor e fazer uma devolução.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 7, say: 'No menu, abres Compras, Painel de compras, e clicas no histórico de receções.',
      act: async r => { await r.menuG('COMPRAS', 'Painel de compras'); const h = btn(r, 'Histórico de receções'); await r.ring(h, 6, 10); await r.click(h, 500); await r.off(); await r.settle(1300); } },
    { id: 's03', est: 10, say: 'Os cartões mostram as receções deste mês, as que ainda não têm conta a pagar, as que já têm, e todas. Clicamos nas que não têm conta a pagar.',
      act: async r => { for (const t of ['RECEBIDAS ESTE MÊS', 'SEM CONTA A PAGAR', 'COM CONTA A PAGAR', 'TODAS']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 330, .3, .5); await r.wait(700); } await r.off(); const k = btn(r, 'SEM CONTA A PAGAR'); await r.click(k, 450); await r.settle(1300); } },
    { id: 's04', est: 9, say: 'Em cada receção tens a lupa para ver o detalhe, as etiquetas dos produtos para colar nas caixas, o editar e o eliminar.',
      act: async r => { await r.ring(row(r), 4, 8); await r.wait(500); await r.off(); for (const t of ['Visualiza', 'Etiqueta de produtos', 'Editar', 'Eliminar']) { const i = row(r).locator(T(t)).first(); await r.ring(i, 8, 8); await r.to(i, 350); await r.wait(650); } await r.off(); } },
    { id: 's05', est: 7, say: 'No cifrão geras a conta a pagar desta fatura do fornecedor.',
      act: async r => { const g = row(r).locator(T('Gerar Financeiro')).first(); await r.ring(g, 8, 8); await r.click(g, 500); await r.off(); await r.settle(1500); await r.ring([r.p.locator(RP + 'input[name="fatura"]'), r.p.locator(RP + 'input[name="valor_total"]')], 5, 8); await r.wait(900); await r.off(); } },
    { id: 's06', est: 13, say: 'Escolhes o grupo, compras de mercadoria, a classificação, variável, a forma de pagamento e a data do primeiro vencimento. Clicas em Gerar parcelas, e depois em Gravar.',
      act: async r => { await r.pickFast('conta_grupo', 'Compras de mercadoria', 'Compras'); await r.pickFast('conta_classificacao', /^\s*Variável\s*$/, 'Vari'); await r.pickFast('forma_pagamento', /Transfer/i, 'Transf');
        const d = r.p.locator(RP + 'input[name="primeiro_vencimento"]'); await r.click(d, 420); await sleep(150); await r.p.keyboard.press('Control+A'); await r.p.keyboard.press('Backspace'); for (const ch of '15112026') { await r.p.keyboard.type(ch); await sleep(r.dry ? 40 : 100); } await r.p.keyboard.press('Tab'); await r.wait(400);
        await r.ring(B(r, 'Gerar parcelas'), 6, 10); await r.click(B(r, 'Gerar parcelas'), 450); await r.off(); await r.wait(1100);
        await r.ring(r.p.locator(RP + 'input[name="conta_item_compra_item_valor[]"]').first(), 5, 8); await r.wait(700); await r.off();
        await r.ring(B(r, 'Gravar'), 6, 10); await r.click(B(r, 'Gravar'), 450); await r.off(); await r.wait(1200);
        const ok = r.el(/^\s*OK\s*$/, 'button,a'); if (await ok.count()) { await r.click(ok, 400); await r.settle(600); }
        const f = r.p.locator(RP).locator('a, button').filter({ hasText: /Fechar/ }).first(); if (await f.count() && await f.isVisible()) { await r.click(f, 400); await r.settle(800); } } },
    { id: 's07', est: 8, say: 'A conta fica nas contas a pagar do Financeiro, com o vencimento e o alerta.',
      act: async r => { await r.click(btn(r, 'TODAS'), 450); await r.settle(1200); await r.ring(row(r), 4, 8); await r.to(row(r), 500, .5); await r.wait(1200); await r.off(); } },
    { id: 's08', est: 10, say: 'E se alguma peça chegou com defeito, clicas em devolver ao fornecedor. Vês o que foi recebido, o que já foi devolvido e o que tens em stock.',
      act: async r => { const d = row(r).locator(T('Devolver ao fornecedor')).first(); await r.ring(d, 8, 8); await r.click(d, 500); await r.off(); await r.settle(1500); const t = r.p.locator(RP + 'table').first(); await r.ring(t, 5, 8); await r.to(t, 500, .5, .5); await r.wait(1200); await r.off(); } },
    { id: 's09', est: 12, say: 'Indicas a quantidade a devolver, o motivo, por exemplo, peças danificadas, e o que o fornecedor faz: repõe as peças, ou emite uma nota de crédito. Clicas em Registar devolução.',
      act: async r => { const q = r.p.locator(RP + 'input[name^="qtd_"]').last(); await r.click(q, 420); for (const ch of '100') { await r.p.keyboard.type(ch); await sleep(r.dry ? 40 : 110); } await r.p.keyboard.press('Tab'); await r.wait(300);
        const m = r.p.locator(RP + 'label').filter({ hasText: /^\s*Peças danificadas\s*$/ }).first(); await r.ring(m, 5, 8); await r.click(m, 400); await r.off();
        const c = r.p.locator(RP + 'label').filter({ hasText: /Nota de crédito/ }).first(); await r.ring(c, 5, 8); await r.click(c, 400); await r.off(); await r.wait(300);
        const o = r.p.locator(RP + 'textarea').first(); await r.click(o, 400); await r.p.keyboard.type('Caixa da bateria chegou partida.', { delay: r.dry ? 5 : 35 });
        const g = B(r, 'Registar devolução'); await r.ring(g, 6, 10); await r.click(g, 500); await r.off(); await r.settle(1800); } },
    { id: 's10', est: 12, say: 'O stock é acertado e a devolução entra na lista das devoluções a fornecedores. Os cartões mostram as peças por repor, os créditos por regularizar e o que devolveste este mês.',
      act: async r => { if (!/DevolucaoFornecedorList/.test(r.p.url())) { await r.open('DevolucaoFornecedorList'); await r.settle(1000); }
        for (const t of ['Por repor pelo fornecedor', 'Crédito por regularizar', 'Devolvido este mês']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 330, .3, .5); await r.wait(900); } await r.off();
        const l = r.p.locator('tr.gp-linha').filter({ visible: true }).first(); await r.ring(l, 4, 8); const b = await r.box(l); for (const fx of [.05, .42, .62, .75, .82]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 330); await r.wait(380); } await r.off(); } },
    { id: 's11', est: 11, say: 'Na linha tens a nota de devolução em PDF e o envelope, que abre o e-mail com a nota para o fornecedor. Clicas em Enviar, e a devolução fica marcada como enviada.',
      act: async r => { const l = r.p.locator('tr.gp-linha').filter({ visible: true }).first(); const pdf = l.locator(T('Ver PDF da nota de devolução')).first(); await r.ring(pdf, 8, 8); await r.to(pdf, 400); await r.wait(600);
        const e = l.locator(T('Enviar a nota de devolução ao fornecedor')).first(); await r.ring(e, 8, 8); await r.click(e, 500); await r.off(); await r.settle(1500);
        const a = r.p.locator(RP + 'input[name="assunto"]'); await r.ring(a, 5, 8); await r.to(a, 400); await r.wait(700); await r.off();
        await r.ring(B(r, 'Enviar'), 6, 10); await r.click(B(r, 'Enviar'), 500); await r.off(); await r.settle(1600); const ok = r.el(/^\s*OK\s*$/, 'button,a'); if (await ok.count()) { await r.click(ok, 400); await r.settle(600); }
        const l2 = r.p.locator('tr.gp-linha').filter({ visible: true }).first().locator('td').nth(-2); await r.ring(l2, 5, 8); await r.to(l2, 400, .5, .5); await r.wait(900); await r.off(); } },
    { id: 's12', est: 9, say: 'E assim fechas o ciclo da receção. No próximo vídeo vamos à avaliação de fornecedores. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 700, 800); } },
  ],
};
