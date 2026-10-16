// COMPRAS · Vídeo 2 — Cotações
const { sleep } = require('./engine');
const T = t => `[title="${t}"], [data-original-title="${t}"], [data-bs-original-title="${t}"]`;
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const B = (r, t) => r.p.locator('#adianti_right_panel button, #adianti_right_panel a').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).first();
const row = r => r.p.locator('tbody tr').filter({ visible: true }).first();
const Q = r => r.p.locator('input[name="lista_compra_item_lista_compras_quantidade[]"]');

module.exports = {
  name: 'cmp02_cotacoes',
  titulo: 'Cotações', subtitulo: 'Pedir preços ao fornecedor com a sugestão de compra', n: 2, modulo: 'COMPRAS',
  start: async r => { r.c.on('page', p => { setTimeout(() => p.close().catch(() => {}), 300); }); await r.open('ListaComprasList'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos às Cotações: pedir preços ao fornecedor, com a sugestão de compra feita pelo sistema.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Compras e escolhes Cotações.',
      act: async r => { await r.menuG('COMPRAS', 'Cotações'); } },
    { id: 's03', est: 9, say: 'Os cartões mostram as cotações por enviar, as enviadas que ainda não deram encomenda, as convertidas em encomenda e todas.',
      act: async r => { for (const t of ['POR ENVIAR', 'ENVIADAS, SEM ENCOMENDA', 'CONVERTIDAS EM ENCOMENDA', 'TODAS']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 350, .3, .5); await r.wait(1000); } await r.off(); } },
    { id: 's04', est: 5, say: 'Para pedir uma cotação nova, clicas em Cadastrar.',
      act: async r => { await r.ring(btn(r, 'Cadastrar'), 6, 10); await r.click(btn(r, 'Cadastrar'), 500); await r.off(); await r.settle(1300); } },
    { id: 's05', est: 10, say: 'Escolhes o fornecedor, por exemplo, a Tintas e Vernizes Centro. O sistema traz logo os produtos desse fornecedor e o prazo médio de entrega.',
      act: async r => { await r.pickFast('pessoa_id', 'Tintas & Vernizes Centro (demo), Lda.', 'Tintas'); await r.settle(1200); await r.ring(r.p.locator('input[name="praso_entrega"]'), 6, 8); await r.wait(700); await r.off(); } },
    { id: 's06', est: 12, say: 'Para cada produto vês o saldo atual, o stock mínimo e o de segurança. A sugestão de compra diz-te quanto falta, e a quantidade a encomendar já vem preenchida.',
      act: async r => { const s = r.p.locator('input[name="lista_compra_item_lista_compras_sugestao_compra[]"]'); for (const n of ['saldo_atual', 'stock_minimo', 'stock_seguranca', 'sugestao_compra', 'quantidade']) { const c = r.p.locator(`input[name="lista_compra_item_lista_compras_${n}[]"]`).nth(5); await r.ring(c, 5, 8); await r.to(c, 350); await r.wait(650); } await r.off(); } },
    { id: 's07', est: 8, say: 'Podes ajustar. Aqui pedimos também seis latas da base bicapa branco. E clicas em Salvar.',
      act: async r => { const q = Q(r).nth(1); await r.click(q, 450); await sleep(150); await r.p.keyboard.press('Control+A'); await r.p.keyboard.type('6'); await r.p.keyboard.press('Tab'); await r.wait(500);
        const sv = btn(r, 'Salvar'); await r.ring(sv, 6, 10); await r.click(sv, 500); await r.off(); await r.settle(1500); } },
    { id: 's08', est: 9, say: 'A cotação entra na lista como rascunho. Na lupa vês o detalhe, no PDF imprimes o pedido, e enquanto for rascunho ainda podes editar ou eliminar.',
      act: async r => { await r.ring(row(r).locator('td').last(), 5, 8); await r.wait(600); await r.off(); for (const t of ['PDF', 'Editar', 'Eliminar']) { const i = row(r).locator(T(t)).first(); await r.ring(i, 8, 8); await r.to(i, 350); await r.wait(500); } const l = row(r).locator('a').first(); await r.ring(l, 8, 8); await r.to(l, 350); await r.wait(500); await r.off(); } },
    { id: 's09', est: 11, say: 'No envelope envias o pedido ao fornecedor. O e-mail já vem preenchido com o endereço, o assunto, a mensagem e o pedido em PDF em anexo. Clicas em Enviar.',
      act: async r => { const e = row(r).locator(T('Enviar pedido de cotação por e-mail')).first(); await r.ring(e, 8, 8); await r.click(e, 500); await r.off(); await r.settle(1500);
        for (const n of ['input[name="para"]', 'input[name="assunto"]', 'textarea']) { const f = r.p.locator('#adianti_right_panel ' + n).first(); if (await f.count()) { await r.ring(f, 5, 8); await r.to(f, 350); await r.wait(600); } } await r.off();
        await r.ring(B(r, 'Enviar'), 6, 10); await r.click(B(r, 'Enviar'), 500); await r.off(); await r.settle(1600); } },
    { id: 's10', est: 9, say: 'A cotação passa a enviada ao fornecedor, com quem a enviou e quando. Quando o fornecedor responder, convertes a cotação em encomenda.',
      act: async r => { const ok = r.el(/^\s*OK\s*$/, 'button,a'); if (await ok.count()) { await r.click(ok, 400); await r.settle(600); } await r.ring(row(r).locator('td').last(), 5, 8); await r.to(row(r).locator('td').last(), 500, .5, .5); await r.wait(1200); await r.off(); const g = row(r).locator(T('Gerar / abrir encomenda')).first(); await r.ring(g, 8, 8); await r.to(g, 450); await r.wait(1200); await r.off(); } },
    { id: 's11', est: 9, say: 'E assim pedes uma cotação. No próximo vídeo vamos às Encomendas. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 700, 800); } },
  ],
};
