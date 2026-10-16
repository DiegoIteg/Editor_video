// STOCK · Vídeo 3 — Movimentos de stock
const { sleep } = require('./engine');
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const row = r => r.p.locator('tr.gp-linha, tbody tr').filter({ visible: true }).first();
const C = '#adianti_content';
const natSel = async (r, name, label) => { const s = r.p.locator(`#adianti_div_content select[name="${name}"]`); await r.ring(s, 5, 8); await r.click(s, 420); await r.p.keyboard.press('Escape'); await r.p.selectOption(`#adianti_div_content select[name="${name}"]`, { label }); await r.wait(500); await r.off(); };

module.exports = {
  name: 'stk03_movimentos',
  titulo: 'Movimentos de stock', subtitulo: 'Todas as entradas e saídas, com origem, documento e quem fez', n: 3, modulo: 'STOCK',
  start: async r => { await r.open('StockMovimentosList'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos aos Movimentos de stock: tudo o que entrou e saiu do armazém, e porquê.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Stock e escolhes Movimentos de stock.',
      act: async r => { await r.menuG('STOCK', 'Movimentos de stock'); } },
    { id: 's03', est: 9, say: 'Os cartões mostram o número de movimentos do período, as entradas e as saídas, com o valor a custo, e os ajustes e inventários.',
      act: async r => { for (const t of ['MOVIMENTOS', 'ENTRADAS', 'SAÍDAS', 'AJUSTES E INVENTÁRIOS']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 350, .3, .5); await r.wait(1000); } await r.off(); } },
    { id: 's04', est: 13, say: 'Cada linha diz a data, o artigo e o armazém, a origem, como uma receção de compra, uma venda ou um consumo numa ordem de serviço, o documento, a quantidade, o saldo depois e quem fez.',
      act: async r => { await r.scrollTo(C, 380, 800); const b = await r.box(row(r)); await r.ring(row(r), 4, 8); for (const fx of [.04, .16, .3, .4, .5, .58, .66, .72, .82]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 300); await r.wait(480); } await r.off(); } },
    { id: 's05', est: 10, say: 'Nos filtros escolhes, por exemplo, a origem consumo em ordem de serviço, e clicas em Filtrar. Vês todo o material gasto nas reparações.',
      act: async r => { await r.scrollTo(C, 0, 800); await natSel(r, 'origem', 'Consumo em OS'); const f = btn(r, 'Filtrar'); await r.ring(f, 6, 10); await r.click(f, 450); await r.off(); await r.settle(1400); await r.scrollTo(C, 380, 800); await r.ring(row(r), 4, 8); await r.wait(1200); await r.off(); } },
    { id: 's06', est: 10, say: 'Ou escolhes um artigo, por exemplo, a base bicapa branco, e vês o histórico completo desse artigo, entrada a entrada e saída a saída.',
      act: async r => { await r.scrollTo(C, 0, 800); await r.click(btn(r, 'Limpar'), 450); await r.settle(1200); await r.pickFast('produto', 'Base bicapa branco (1 L)', 'bicapa branco'); const f = btn(r, 'Filtrar'); await r.ring(f, 6, 10); await r.click(f, 450); await r.off(); await r.settle(1400); } },
    { id: 's07', est: 10, say: 'O saldo depois de cada movimento mostra como o stock foi mudando, e assim descobres logo onde houve uma diferença.',
      act: async r => { const rs = r.p.locator('tr').filter({ hasText: 'Base bicapa branco' }).filter({ visible: true }); const n = await rs.count(); const tb = r.p.locator('table').filter({ visible: true }).last(); await r.ring(tb, 4, 8); await r.wait(400); for (let i = n - 1; i >= 0; i--) { const c = rs.nth(i).locator('td').nth(7); await r.to(c, 450, .5, .5); await r.wait(900); } await r.off(); const nota = r.p.getByText(/Saldo depois =/).first(); if (await nota.count()) { await r.ring(nota, 4, 8); await r.to(nota, 400, .3, .5); await r.wait(1000); await r.off(); } } },
    { id: 's08', est: 6, say: 'E em cima podes exportar tudo para Excel.',
      act: async r => { await r.scrollTo(C, 0, 800); const e = btn(r, 'Exportar'); await r.ring(e, 6, 10); await r.to(e, 400); await r.wait(1000); await r.off(); } },
    { id: 's09', est: 9, say: 'E assim acompanhas os movimentos de stock. No próximo vídeo vamos às reservas de clientes. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 700, 800); } },
  ],
};
