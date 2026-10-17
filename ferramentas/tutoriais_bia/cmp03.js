// COMPRAS · Vídeo 3 — Encomendas
const { sleep } = require('./engine');
const T = t => `[title="${t}"], [data-original-title="${t}"], [data-bs-original-title="${t}"]`;
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const B = (r, t) => r.p.locator('#adianti_right_panel button, #adianti_right_panel a').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).first();
const row = r => r.p.locator('tbody tr').filter({ visible: true }).first();
const P = n => `input[name="ordem_compras_item_oredm_compras_cotacao_${n}[]"]`;

module.exports = {
  name: 'cmp03_encomendas',
  titulo: 'Encomendas', subtitulo: 'Da cotação à nota de encomenda enviada ao fornecedor', n: 3, modulo: 'COMPRAS',
  start: async r => { r.c.on('page', p => { setTimeout(() => p.close().catch(() => {}), 300); }); await r.open('ListaComprasList'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos às Encomendas: transformar a resposta do fornecedor numa encomenda.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 9, say: 'No menu, abres Compras e escolhes Cotações. Clicas no cartão das enviadas sem encomenda, para veres as que já têm resposta.',
      act: async r => { await r.menuG('COMPRAS', 'Cotações'); const k = btn(r, 'ENVIADAS, SEM ENCOMENDA'); await r.ring(k, 5, 12); await r.click(k, 500); await r.off(); await r.settle(1300); } },
    { id: 's03', est: 6, say: 'Nesta cotação, clicas em gerar encomenda.',
      act: async r => { await r.ring(row(r), 4, 8); await r.wait(500); await r.off(); const g = row(r).locator(T('Gerar / abrir encomenda')).first(); await r.ring(g, 8, 8); await r.click(g, 500); await r.off(); await r.settle(1600); } },
    { id: 's04', est: 12, say: 'A encomenda nasce da cotação, com o fornecedor e os produtos. Revês o preço unitário que o fornecedor te deu e a quantidade a encomendar, e o valor total atualiza-se.',
      act: async r => { await r.ring(r.p.locator('input[name="pessoa_id"] , select[name="pessoa_id"] + .select2').first(), 6, 8); await r.wait(600); await r.off();
        for (const n of ['quantidade_cotacao', 'preco_unit', 'quantidade_encomenda', 'total']) { const f = r.p.locator(P(n)).first(); await r.ring(f, 5, 8); await r.to(f, 350); await r.wait(700); } await r.off();
        const v = r.p.locator('input[name="valor_total"]'); await r.ring(v, 6, 8); await r.to(v, 400); await r.wait(900); await r.off(); } },
    { id: 's05', est: 8, say: 'Indicas a data de entrega prevista que o fornecedor te deu, e clicas em Gravar.',
      act: async r => { const d = r.p.locator('input[name="entrega_prevista"]'); await r.click(d, 450); await sleep(150); await r.p.keyboard.press('Control+A'); await r.p.keyboard.press('Backspace'); for (const ch of '21102026') { await r.p.keyboard.type(ch); await sleep(r.dry ? 40 : 100); } await r.p.keyboard.press('Tab'); await r.wait(500);
        await r.scrollTo('#adianti_content', 99999, 700); const sv = btn(r, 'Gravar'); await r.ring(sv, 6, 10); await r.click(sv, 500); await r.off(); await r.settle(1600); } },
    { id: 's06', est: 11, say: 'Aqui estás na lista de encomendas. Os cartões mostram as encomendas por enviar, as que estão a aguardar entrega, as atrasadas, as receções parciais e as recebidas.',
      act: async r => { for (const t of ['POR ENVIAR', 'A AGUARDAR ENTREGA', 'ENTREGA ATRASADA', 'RECEÇÃO PARCIAL', 'RECEBIDAS']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 330, .3, .5); await r.wait(850); } await r.off(); } },
    { id: 's07', est: 9, say: 'A nova encomenda está por enviar. No envelope abres o e-mail com a nota de encomenda em PDF, e clicas em Enviar.',
      act: async r => { await r.ring(row(r).locator('td').last(), 5, 8); await r.wait(600); await r.off(); const e = row(r).locator(T('Enviar nota de encomenda por e-mail')).first(); await r.ring(e, 8, 8); await r.click(e, 500); await r.off(); await r.settle(1500);
        const a = r.p.locator('#adianti_right_panel input[name="assunto"]'); await r.ring(a, 5, 8); await r.to(a, 400); await r.wait(700); await r.off();
        await r.ring(B(r, 'Enviar'), 6, 10); await r.click(B(r, 'Enviar'), 500); await r.off(); await r.settle(1600); } },
    { id: 's08', est: 9, say: 'A encomenda passa a aguardar entrega, com a data de envio. E se a entrega passar do prazo, o alerta fica a vermelho.',
      act: async r => { const ok = r.el(/^\s*OK\s*$/, 'button,a'); if (await ok.count()) { await r.click(ok, 400); await r.settle(600); } const c = row(r).locator('td').last(); await r.ring(c, 5, 8); await r.to(c, 500, .5, .5); await r.wait(1200); await r.off(); } },
    { id: 's09', est: 10, say: 'Nos ícones da linha tens ainda o follow-up, para registares o contacto com o fornecedor, o receber mercadoria, e o cancelar encomenda, se o fornecedor não puder entregar.',
      act: async r => { for (const t of ['Follow-up', 'Receber mercadoria', 'Cancelar encomenda']) { const i = row(r).locator(T(t)).first(); await r.ring(i, 8, 8); await r.to(i, 400); await r.wait(1100); } await r.off(); } },
    { id: 's10', est: 9, say: 'E assim fazes uma encomenda. No próximo vídeo vamos receber a mercadoria. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 700, 800); } },
  ],
};
