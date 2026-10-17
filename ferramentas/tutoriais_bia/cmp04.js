// COMPRAS · Vídeo 4 — Receber mercadoria
const { sleep } = require('./engine');
const T = t => `[title="${t}"], [data-original-title="${t}"], [data-bs-original-title="${t}"]`;
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const B = (r, t) => r.p.locator('#adianti_right_panel button, #adianti_right_panel a').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).first();
const row = r => r.p.locator('tbody tr').filter({ visible: true }).first();
const M = n => `input[name="mov_stock_recepcao_mercadoria_${n}[]"]`;
const typeIn = async (r, loc, txt, d = 95) => { await r.click(loc, 420); await sleep(150); await r.p.keyboard.press('Control+A'); await r.p.keyboard.press('Backspace'); for (const ch of txt) { await r.p.keyboard.type(ch); await sleep(r.dry ? 40 : d); } await r.p.keyboard.press('Tab'); await sleep(450); };
const C = '#adianti_content';

module.exports = {
  name: 'cmp04_receber_mercadoria',
  titulo: 'Receber mercadoria', subtitulo: 'Conferir a entrega, dar entrada no stock e avaliar o fornecedor', n: 4, modulo: 'COMPRAS',
  start: async r => { r.c.on('page', p => { setTimeout(() => p.close().catch(() => {}), 300); }); await r.open('ListaComprasList'); },
  scenes: [
    { id: 's01', est: 10, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos receber mercadoria: conferir a entrega, dar entrada no stock e avaliar o fornecedor.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 9, say: 'No menu, abres Compras e escolhes Cotações. Clicas em Encomendas, e no cartão das que estão a aguardar entrega.',
      act: async r => { await r.menuG('COMPRAS', 'Cotações'); await r.click(btn(r, 'Encomendas'), 500); await r.settle(1300); const k = btn(r, 'A AGUARDAR ENTREGA'); await r.ring(k, 5, 12); await r.click(k, 500); await r.off(); await r.settle(1300); } },
    { id: 's03', est: 7, say: 'Quando a mercadoria chega, clicas em receber mercadoria, na linha da encomenda.',
      act: async r => { await r.ring(row(r), 4, 8); await r.wait(500); await r.off(); r.encId = (await row(r).innerText()).match(/\b(\d{3,})\b/)[1]; const g = row(r).locator(T('Receber mercadoria')).first(); await r.ring(g, 8, 8); await r.click(g, 500); await r.off(); await r.settle(1600); } },
    { id: 's04', est: 11, say: 'O sistema traz o fornecedor e os produtos da encomenda. Escolhes o armazém onde a mercadoria entra, e indicas o número e a data da fatura do fornecedor.',
      act: async r => { await r.pickFast('armazem', 'Armazém Central (demo)', 'Central'); await typeIn(r, r.p.locator('input[name="fatura_numero"]'), '9011'); await typeIn(r, r.p.locator('input[name="data_emissao"]'), '16102026'); } },
    { id: 's05', est: 13, say: 'Linha a linha, confirmas a quantidade que chegou mesmo, que pode ser menos do que a encomendada, e o preço da fatura. E o sistema calcula os totais de cada linha.',
      act: async r => { const n = await r.p.locator(M('quantidade_fisica')).count();
        for (let i = 0; i < Math.min(n, 3); i++) { const q = r.p.locator(M('quantidade_fisica')).nth(i); await r.ring(q, 5, 8); await r.to(q, 300); await r.wait(300); await r.off(); const v = await r.p.locator(M('valor_unitario')).nth(i).inputValue(); await typeIn(r, r.p.locator(M('recepcao_mercadoria_pv')).nth(i), v, 80); }
        for (let i = 3; i < n; i++) { const v = await r.p.locator(M('valor_unitario')).nth(i).inputValue(); await r.p.locator(M('recepcao_mercadoria_pv')).nth(i).fill(v); await r.p.locator(M('recepcao_mercadoria_pv')).nth(i).press('Tab'); await sleep(400); } } },
    { id: 's06', est: 8, say: 'No resumo financeiro vês o valor das mercadorias, do imposto, dos descontos e o total da compra.',
      act: async r => { await r.scrollTo(C, 520, 800); const f = r.p.locator('input[name="valor_tota_compra"]'); await r.ring([r.p.locator('input[name="valor_total_produtos"]'), r.p.locator('input[name="valor_total_iva"]'), r.p.locator('input[name="tt_desc_financeiro"]'), f], 5, 8); await r.to(f, 500); await r.wait(1200); await r.off(); } },
    { id: 's07', est: 10, say: 'No follow-up da receção marcas se a entrega está conforme, escreves uma nota, clicas em Adicionar, e no fim em Salvar.',
      act: async r => { await r.scrollTo(C, 99999, 800); await r.pickFast('followup_logistica_recepcao_mercadoria_status_logistica_id', /^\s*Conforme\s*$/, 'Conf');
        const o = r.p.locator('[name="followup_logistica_recepcao_mercadoria_observacoes"]'); await r.click(o, 400); await r.p.keyboard.type('Embalagens em bom estado e quantidades certas.', { delay: r.dry ? 5 : 35 });
        const a = btn(r, 'Adicionar'); await r.ring(a, 6, 10); await r.click(a, 450); await r.off(); await r.wait(900);
        await r.scrollTo(C, 99999, 500); const sv = btn(r, 'Salvar'); await r.ring(sv, 6, 10); await r.click(sv, 500); await r.off(); await r.settle(1800); } },
    { id: 's08', est: 12, say: 'A mercadoria entra no stock, e o sistema pede-te logo para avaliares a entrega: o estado das peças, a documentação e uma nota de um a cinco.',
      act: async r => { const ok = r.el(/^\s*OK\s*$/, 'button,a'); if (await ok.count()) { await r.click(ok, 400); await r.settle(600); }
        const h = r.p.locator('#adianti_right_panel').locator('div').filter({ hasText: /encomenda n\.º/ }).last(); await r.ring(h, 5, 8); await r.wait(900); await r.off();
        const c = r.p.locator('#adianti_right_panel label').filter({ hasText: /^\s*Conformes\s*$/ }).first(); await r.ring(c, 5, 8); await r.to(c, 350); await r.wait(500);
        const d = r.p.locator('#adianti_right_panel label').filter({ hasText: /Fatura e guia corretas/ }).first(); await r.ring(d, 5, 8); await r.to(d, 350); await r.wait(500); await r.off();
        const n4 = r.p.locator('#adianti_right_panel label').filter({ hasText: /^\s*4\s*$/ }).first(); await r.ring(n4, 6, 8); await r.click(n4, 450); await r.off(); await r.wait(400); } },
    { id: 's09', est: 8, say: 'Escreves uma observação, se quiseres, e clicas em Gravar avaliação.',
      act: async r => { const o = r.p.locator('#adianti_right_panel textarea'); await r.click(o, 400); await r.p.keyboard.type('Chegou dentro do prazo.', { delay: r.dry ? 5 : 40 }); const g = B(r, 'Gravar avaliação'); await r.ring(g, 6, 10); await r.click(g, 500); await r.off(); await r.settle(1500); } },
    { id: 's10', est: 9, say: 'No painel de compras, a encomenda aparece agora como recebida, com a data da receção e a avaliação que deste ao fornecedor.',
      act: async r => { if (!/ComprasPainelDia/.test(r.p.url())) { await r.open('ComprasPainelDia'); await r.settle(1000); } const c = r.p.locator('.gp-cartao').filter({ hasText: 'Encomendas e receções' }).first(); const y = await c.evaluate((e) => { const k = document.querySelector('#adianti_content'); return e.getBoundingClientRect().top - k.getBoundingClientRect().top + k.scrollTop - 90; }); await r.scrollTo(C, y, 900);
        const l = c.locator('tr.gp-linha').filter({ hasText: 'N.º ' + r.encId }).first(); await r.ring(l, 4, 8); const b = await r.box(l); for (const fx of [.05, .58, .7, .85]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 380); await r.wait(500); } await r.off(); } },
    { id: 's11', est: 9, say: 'E assim recebes a mercadoria. No próximo vídeo vamos às receções: a conta a pagar e as devoluções. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 700, 800); } },
  ],
};
