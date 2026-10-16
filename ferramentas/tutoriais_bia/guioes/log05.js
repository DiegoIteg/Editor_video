// LOGÍSTICA · Vídeo 5 — Fila de corte e picking
const { sleep } = require('./engine');
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const card = (r, t) => r.p.locator('.gp-cartao').filter({ has: r.p.locator('.gp-cartao-topo', { hasText: new RegExp('^\\s*' + t) }) }).filter({ visible: true }).first();
const C = '#adianti_content';
const yOf = loc => loc.evaluate(e => { const k = document.querySelector('#adianti_content'); return e.getBoundingClientRect().top - k.getBoundingClientRect().top + k.scrollTop - 90; });
const okModal = async r => { const ok = r.el(/^\s*OK\s*$/, 'button,a'); if (await ok.count()) { await r.click(ok, 400); await r.settle(500); } };

module.exports = {
  name: 'log05_corte_picking',
  titulo: 'Fila de corte e picking', subtitulo: 'Da venda concluída à mercadoria separada no armazém', n: 5, modulo: 'LOGÍSTICA',
  start: async r => { r.c.on('page', p => { setTimeout(() => p.close().catch(() => {}), 300); }); await r.open('LogCorteList'); },
  scenes: [
    { id: 's01', est: 10, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje começamos a saída de mercadoria: a fila de corte e o picking, ou seja, separar os artigos no armazém.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 7, say: 'No menu, abres Logística, Outbound, e escolhes Fila de corte.',
      act: async r => { await r.menuG('LOGÍSTICA', 'Fila de corte', 'Outbound'); } },
    { id: 's03', est: 12, say: 'As vendas concluídas entram aqui sozinhas e esperam pelo corte, a hora a que o armazém fecha um lote. Os cartões mostram o que está na fila, o próximo corte, os bloqueados e a falta de artigo.',
      act: async r => { for (const t of ['NA FILA', 'PRÓXIMO CORTE', 'BLOQUEADOS', 'FALTA DE ARTIGO', 'EM PREPARAÇÃO']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 320, .3, .5); await r.wait(900); } await r.off(); } },
    { id: 's04', est: 10, say: 'Se uma venda tem de sair à parte, escreves o número da venda e clicas em Enviar para a fila. Vês o cliente, a morada, a zona, os artigos e a carga.',
      act: async r => { const i = r.p.locator('#adianti_div_content input[name="venda"]'); await r.click(i, 420); await r.p.keyboard.type('2644', { delay: r.dry ? 5 : 110 }); const e = btn(r, 'Enviar para a fila'); await r.ring(e, 6, 10); await r.click(e, 450); await r.off(); await r.settle(1500); await okModal(r);
        const c = card(r, 'À espera do corte'); await r.ring(c, 6, 10); const l = c.locator('tr').filter({ hasText: '2644' }).first(); const b = await r.box(l); for (const fx of [.05, .15, .3, .45, .55, .62]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 300); await r.wait(380); } await r.off(); } },
    { id: 's05', est: 8, say: 'Clicas em Cortar agora, e o sistema cria uma onda de picking com as vendas da fila.',
      act: async r => { const k = btn(r, 'Cortar agora'); await r.ring(k, 6, 10); await r.click(k, 450); await r.off(); await r.settle(1500); await okModal(r); const c = card(r, 'Últimos cortes'); await r.scrollTo(C, await yOf(c), 800); await r.ring(c.locator('tr').nth(1), 4, 8); await r.wait(1200); await r.off(); } },
    { id: 's06', est: 11, say: 'No picking abres a onda. A lista diz, pela ordem do caminho, o endereço de cada artigo e a quantidade a recolher.',
      act: async r => { await r.scrollTo(C, 0, 700); await r.click(btn(r, 'Ondas de picking'), 450); await r.settle(1300); const o = card(r, 'Ondas'); const a = o.locator('tr').nth(1).getByText('Abrir').first(); await r.ring(a, 6, 8); await r.click(a, 450); await r.off(); await r.settle(1400);
        const rc = card(r, 'Recolha'); await r.ring(rc, 6, 10); const l = rc.locator('tr').nth(1); const b = await r.box(l); for (const fx of [.05, .2, .45, .7]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 320); await r.wait(500); } await r.off(); } },
    { id: 's07', est: 11, say: 'Com o leitor, lês o código de barras de cada artigo que tiras da prateleira, e ele fica marcado como recolhido. Sem leitor, escreves a quantidade na linha.',
      act: async r => { const rc = card(r, 'Recolha'); const i = rc.locator('input').first(); await r.ring(i, 5, 8); await r.click(i, 420); await r.p.keyboard.type('5601000039595', { delay: r.dry ? 5 : 45 }); await r.p.keyboard.press('Enter'); await r.off(); await r.settle(1300);
        const l = card(r, 'Recolha').locator('tr').filter({ hasText: 'Filtro de habitáculo' }).first(); const q = l.locator('input[name="q"]'); await r.ring(q, 5, 8); await r.click(q, 400); await r.p.keyboard.press('Control+A'); await r.p.keyboard.type('3'); await r.click(l.locator('button').first(), 400); await r.off(); await r.settle(1200); } },
    { id: 's08', est: 9, say: 'Recolhes o resto, e no fim clicas em Concluir onda. Os artigos ficam separados, à espera do embalamento.',
      act: async r => { for (const a of ['Lâmpada LED W5W', 'Bateria 60 Ah']) { const l = card(r, 'Recolha').locator('tr').filter({ hasText: a }).first(); await r.click(l.locator('button').first(), 380); await r.settle(900); }
        const c = btn(r, 'Concluir onda'); await r.ring(c, 6, 10); await r.click(c, 450); await r.off(); await r.settle(1500); await okModal(r); } },
    { id: 's09', est: 9, say: 'E assim fazes o corte e o picking. No próximo vídeo vamos ao embalamento, à triagem e ao planeamento das viagens. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 700, 800); } },
  ],
};
