// VENDAS · Vídeo 7 — Consolidação de orçamentos (gravado depois do pack v37: PT-PT, grupo de vendas da filial, cliente nas contas a receber)
const { sleep } = require('./engine');
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).first();
const C = '#adianti_content';
const rowOf = (r, t) => r.p.locator('#adianti_div_content tbody tr', { hasText: t }).filter({ visible: true }).first();
const modalBtn = (r, t) => r.p.locator('.modal.show button, .modal.show a').filter({ hasText: new RegExp('^\\s*' + t + '\\s*$') }).first();
const yOf = loc => loc.evaluate(e => { const k = document.querySelector('#adianti_content'); return e.getBoundingClientRect().top - k.getBoundingClientRect().top + k.scrollTop - 120; });

module.exports = {
  name: 'vnd07_consolidacao',
  titulo: 'Consolidação de orçamentos', subtitulo: 'Vários trabalhos de um parceiro de frota numa só conta', n: 7, modulo: 'VENDAS',
  start: async r => { await r.open('OrcamentoConsolidadoList'); },
  scenes: [
    { id: 's01', est: 11, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos à consolidação: juntar vários orçamentos de um parceiro de frota, como uma rent-a-car, numa só conta ao fim do mês.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Vendas e escolhes Consolidação.',
      act: async r => { await r.menuG('VENDAS', 'Consolidação'); await r.settle(800); } },
    { id: 's03', est: 6, say: 'Para juntar os trabalhos do mês, clicas em Nova consolidação.',
      act: async r => { const b = btn(r, 'Nova consolidação'); await r.ring(b, 6, 10); await r.click(b, 500); await r.off(); await r.settle(1600); } },
    { id: 's04', est: 11, say: 'Aparecem os orçamentos dos parceiros que ainda não foram faturados. Escreves o nome do parceiro, aqui a Frota Lusa, e ficam só os trabalhos dela.',
      act: async r => { const s = r.p.locator('#adianti_div_content input[placeholder]').filter({ visible: true }).first(); await r.ring(s, 5, 8); await r.click(s, 450); for (const ch of 'Frota Lusa') { await r.p.keyboard.type(ch); await sleep(r.dry ? 20 : 95); } await r.off(); await r.wait(900); } },
    { id: 's05', est: 11, say: 'Marcas os orçamentos a incluir. Cada linha mostra a matrícula, a marca e o modelo, as datas do trabalho e o total. Clicas em Calcular total.',
      act: async r => { const rows = r.p.locator('#adianti_div_content tr').filter({ hasText: 'Frota Lusa' }).filter({ visible: true }); const n = Math.min(4, await rows.count()); for (let i = 0; i < n; i++) { const c = rows.nth(i).locator('input[type=checkbox]').first(); await r.click(c, 380); await r.wait(250); }
        const t = btn(r, 'Calcular total'); await r.ring(t, 6, 10); await r.click(t, 450); await r.off(); await r.settle(1200); const v = r.p.locator('input[name="valor_total"]'); await r.ring(v, 5, 8); await r.wait(900); await r.off(); } },
    { id: 's06', est: 9, say: 'Clicas em Gravar. A consolidação fica com um código, e estes orçamentos já não podem ser faturados à parte.',
      act: async r => { const g = btn(r, 'Gravar'); await r.ring(g, 6, 10); await r.click(g, 450); await r.off(); await r.settle(1500); const m = r.p.locator('.modal.show .modal-content').first(); if (await m.count()) { await r.ring(m, 6, 10); await r.wait(1500); await r.off(); const ok = modalBtn(r, 'OK'); if (await ok.count()) { await r.click(ok, 400); await r.settle(800); } } } },
    { id: 's07', est: 12, say: 'Na lista de consolidações vês o código, o parceiro, a data e o valor. Em cada linha consultas o detalhe, tiras o PDF para enviar ao parceiro, ou envias logo por e-mail.',
      act: async r => { await r.open('OrcamentoConsolidadoList'); const l = rowOf(r, 'Frota Lusa'); await r.ring(l, 4, 8); await r.wait(1500); await r.off(); const icons = l.locator('a, i').filter({ visible: true }); for (let i = 0; i < Math.min(3, await icons.count()); i++) { await r.to(icons.nth(i), 350); await r.wait(700); } } },
    { id: 's08', est: 14, say: 'Para faturar, clicas no cifrão. A conta já vem como a receber, no grupo das vendas, com o parceiro e o valor. Escolhes a forma de pagamento, em quantas parcelas, e o primeiro vencimento, e clicas em Gerar parcelas.',
      act: async r => { const l = rowOf(r, 'Frota Lusa'); const d = l.locator('i[class*="dollar"]').first(); await r.ring(d, 6, 8); await r.click(d, 450); await r.off(); await r.settle(1800);
        for (const n of ['conta_tipo', 'conta_grupo']) { const s = r.p.locator(`select[name="${n}"]`).first(); if (await s.count()) { await r.ring(s, 5, 8); await r.wait(600); await r.off(); } }
        const fp = r.p.locator('select[name="forma_pagamento"]'); await r.click(fp, 400); await r.p.keyboard.press('Escape'); await r.p.selectOption('select[name="forma_pagamento"]', { label: 'Transferência bancária' }); await r.wait(400);
        const pc = r.p.locator('input[name="parcela"]'); await r.click(pc, 400); await r.p.keyboard.press('Control+A'); await r.p.keyboard.type('2'); await r.wait(300);
        const pv = r.p.locator('input[name="primeiro_vencimento"]'); await r.click(pv, 400); await r.p.keyboard.press('Control+A'); for (const ch of '31/10/2026') { await r.p.keyboard.type(ch); await sleep(r.dry ? 10 : 80); } await r.p.keyboard.press('Escape'); await r.wait(300);
        const gp = btn(r, 'Gerar parcelas'); await r.ring(gp, 6, 10); await r.click(gp, 450); await r.off(); await r.settle(1500); } },
    { id: 's09', est: 10, say: 'As parcelas aparecem por baixo, com o valor e a data de cada uma. Clicas em Gravar, e as contas passam para as contas a receber do Financeiro.',
      act: async r => { const fl = r.p.locator('input[name="conta_item_orcamento_consolidado_valor[]"]').filter({ visible: true }).first(); await r.scrollTo(C, await yOf(fl), 700); await r.ring(fl.locator('xpath=ancestor::table[1]'), 6, 10); await r.wait(1500); await r.off();
        const g = btn(r, 'Gravar'); await r.ring(g, 6, 10); await r.click(g, 450); await r.off(); await r.settle(1500); } },
    { id: 's10', est: 9, say: 'O sistema pergunta se queres emitir já a fatura desta venda. Podes fazê-lo agora, ou mais tarde, no Financeiro.',
      act: async r => { const m = r.p.locator('.modal.show .modal-content').first(); if (await m.count()) { await r.ring(m, 6, 10); await r.wait(2200); await r.off(); const n = modalBtn(r, 'Agora não'); if (await n.count()) { await r.click(n, 450); await r.settle(1400); } } } },
    { id: 's11', est: 9, say: 'E assim fechas o mês de um parceiro de frota numa só conta. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.scrollTo(C, 0, 800); await r.move(1100, 650, 800); } },
  ],
};
