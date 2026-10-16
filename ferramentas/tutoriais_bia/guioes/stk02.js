// STOCK · Vídeo 2 — Consulta de stock
const { sleep } = require('./engine');
const TS = t => `[title^="${t}"], [data-original-title^="${t}"], [data-bs-original-title^="${t}"]`;
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const RP = '#adianti_right_panel ';
const B = (r, t) => r.p.locator(RP + 'button, ' + RP + 'a').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).first();
const row = r => r.p.locator('tr').filter({ hasText: 'AdBlue' }).filter({ has: r.p.locator('a[title], a[data-original-title], a[data-bs-original-title]') }).filter({ visible: true }).first();
const fechar = async r => { const f = r.p.locator(RP + 'span, ' + RP + 'a, ' + RP + 'button').filter({ hasText: /^\s*(×\s*)?Fechar\s*$/ }).filter({ visible: true }).first(); await r.ring(f, 6, 8); await r.to(f, 500); await sleep(250); await r.off(); await r.p.evaluate(() => Template.closeRightPanel()); await r.move(1150, 480, 450); await r.settle(500); };
const typeQ = async (r, loc, txt) => { await r.click(loc, 420); await sleep(120); await r.p.keyboard.press('Control+A'); for (const ch of txt) { await r.p.keyboard.type(ch); await sleep(r.dry ? 40 : 110); } await r.p.keyboard.press('Tab'); await sleep(300); };

module.exports = {
  name: 'stk02_consulta_de_stock',
  titulo: 'Consulta de stock', subtitulo: 'Quanto tens, onde está, e como acertar, transferir e definir mínimos', n: 2, modulo: 'STOCK',
  start: async r => { await r.open('StockSaldosList'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos à Consulta de stock: quanto tens de cada artigo, em que armazém, e quanto vale.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Stock e escolhes Consulta de stock.',
      act: async r => { await r.menuG('STOCK', 'Consulta de stock'); } },
    { id: 's03', est: 12, say: 'Os cartões mostram as linhas de stock e o valor total, as ruturas, o que está abaixo do mínimo, os artigos com reservas, em encomenda ou parados. Cada cartão filtra a lista.',
      act: async r => { for (const t of ['LINHAS DE STOCK', 'RUTURAS', 'ABAIXO DO MÍNIMO', 'STOCK NEGATIVO', 'COM RESERVAS', 'EM ENCOMENDA', 'PARADOS', 'SEM MÍNIMO DEFINIDO']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 300, .3, .5); await r.wait(650); } await r.off(); } },
    { id: 's04', est: 12, say: 'Na lista, cada linha é um artigo num armazém: o stock físico, o reservado, o disponível, o mínimo e a segurança, o que vem a caminho, o custo médio e o valor.',
      act: async r => { const b = await r.box(row(r)); await r.ring(row(r), 4, 8); for (const fx of [.08, .22, .3, .36, .42, .5, .57, .64, .7]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 300); await r.wait(420); } await r.off(); } },
    { id: 's05', est: 12, say: 'Na lupa abres a ficha do artigo: o stock em todos os armazéns, as encomendas a caminho, as reservas de clientes, e quanto podes prometer a um cliente.',
      act: async r => { const l = row(r).locator(TS('Ficha do artigo')).first(); await r.ring(l, 8, 8); await r.click(l, 500); await r.off(); await r.settle(1500); await r.move(1500, 230, 700); await r.wait(900); await r.move(1500, 420, 900); await r.wait(900); await r.move(1500, 600, 800); await r.wait(700); await fechar(r); } },
    { id: 's06', est: 12, say: 'Se uma embalagem se partiu, clicas em ajustar stock. Escolhes dar saída, a quantidade, o motivo, por exemplo, quebra, e clicas em Gravar ajuste. Fica tudo registado na auditoria.',
      act: async r => { const a = row(r).locator(TS('Ajustar stock')).first(); await r.ring(a, 8, 8); await r.click(a, 500); await r.off(); await r.settle(1400);
        const sd = r.p.locator(RP + 'label').filter({ hasText: /Dar saída/ }).first(); await r.ring(sd, 5, 8); await r.click(sd, 400); await r.off();
        await typeQ(r, r.p.locator(RP + 'input[name="quantidade"]'), '100');
        const m = r.p.locator(RP + 'label').filter({ hasText: /Quebra/ }).first(); await r.ring(m, 5, 8); await r.click(m, 400); await r.off();
        const o = r.p.locator(RP + 'textarea'); await r.click(o, 400); await r.p.keyboard.type('Embalagem partida no armazém.', { delay: r.dry ? 5 : 35 });
        const g = B(r, 'Gravar ajuste'); await r.ring(g, 6, 10); await r.click(g, 500); await r.off(); await r.settle(1500); } },
    { id: 's07', est: 11, say: 'Para passar mercadoria de um armazém para outro, clicas em transferir, escolhes o armazém de destino e a quantidade, e clicas em Transferir.',
      act: async r => { const t = row(r).locator(TS('Transferir')).first(); await r.ring(t, 8, 8); await r.click(t, 500); await r.off(); await r.settle(1400);
        const sel = r.p.locator(RP + 'select[name="para"]'); await r.ring(sel, 5, 8); await r.click(sel, 400); await r.p.keyboard.press('Escape'); await r.p.selectOption(RP + 'select[name="para"]', { label: 'Loja / Balcão (demo)' }); await r.wait(500); await r.off();
        await typeQ(r, r.p.locator(RP + 'input[name="quantidade"]'), '200');
        const g = B(r, 'Transferir'); await r.ring(g, 6, 10); await r.click(g, 500); await r.off(); await r.settle(1500); } },
    { id: 's08', est: 8, say: 'O stock sai de um armazém e entra no outro, e as duas linhas ficam atualizadas.',
      act: async r => { const ls = r.p.locator('tr').filter({ hasText: 'AdBlue' }).filter({ visible: true }); await r.ring([ls.nth(0), ls.nth(1)], 4, 8); await r.move(820, 640, 800); await r.wait(1600); await r.off(); } },
    { id: 's09', est: 12, say: 'E no último ícone defines o stock mínimo e de segurança. O sistema sugere valores pelo consumo dos últimos noventa dias e pelo prazo do fornecedor. Clicas em Usar a sugestão.',
      act: async r => { const m = row(r).locator(TS('Mínimo e segurança')).first(); await r.ring(m, 8, 8); await r.click(m, 500); await r.off(); await r.settle(1400);
        const h = r.p.locator(RP + 'div').filter({ hasText: /Sugestão/ }).last(); await r.ring(h, 5, 8); await r.to(h, 500, .5, .7); await r.wait(1500); await r.off();
        const u = r.p.locator(RP).getByText('Usar a sugestão').first(); await r.ring(u, 6, 8); await r.click(u, 500); await r.off(); await r.settle(1400); } },
    { id: 's10', est: 9, say: 'Quando o disponível fica abaixo do mínimo mais a segurança, o artigo aparece nas sugestões de compra.',
      act: async r => { const c = row(r).locator('td').nth(6); await r.ring(c, 5, 8); await r.to(c, 500, .5, .5); await r.wait(1500); await r.off(); } },
    { id: 's11', est: 9, say: 'E assim consultas e acertas o stock. No próximo vídeo vamos aos movimentos de stock. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 700, 800); } },
  ],
};
