// STOCK · Vídeo 4 — Reservas de clientes
const { sleep } = require('./engine');
const TS = t => `[title^="${t}"], [data-original-title^="${t}"], [data-bs-original-title^="${t}"]`;
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const RP = '#adianti_right_panel ';
const B = (r, t) => r.p.locator(RP + 'button, ' + RP + 'a').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).last();
const linha = (r, t) => r.p.locator('tr.gp-linha').filter({ hasText: t }).filter({ visible: true }).first();
const typeIn = async (r, loc, txt, d = 100) => { await r.click(loc, 420); await sleep(120); await r.p.keyboard.press('Control+A'); for (const ch of txt) { await r.p.keyboard.type(ch); await sleep(r.dry ? 40 : d); } await r.p.keyboard.press('Tab'); await sleep(300); };
const confirma = async (r, t) => { const b = r.p.locator('.modal.show button, .modal.show a').filter({ hasText: new RegExp('^\\s*' + t + '\\s*$') }).first(); await r.ring(b, 6, 8); await r.click(b, 450); await r.off(); await r.settle(1400); };

module.exports = {
  name: 'stk04_reservas_clientes',
  titulo: 'Reservas de clientes', subtitulo: 'Prometer, separar e entregar peças ao cliente', n: 4, modulo: 'STOCK',
  start: async r => { r.c.on('page', p => { setTimeout(() => p.close().catch(() => {}), 300); }); await r.open('StockReservaClienteList'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos às reservas de clientes: prometer uma peça, separá-la quando chega, e entregá-la.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Stock e escolhes Reservas de clientes.',
      act: async r => { await r.menuG('STOCK', 'Reservas de clientes'); } },
    { id: 's03', est: 12, say: 'Os cartões mostram as reservas à espera de mercadoria, as que já chegaram e estão prontas a separar, as separadas por entregar, as que passaram o prazo prometido, e os sinais recebidos.',
      act: async r => { for (const t of ['À ESPERA DE MERCADORIA', 'CHEGOU — PRONTA A SEPARAR', 'SEPARADAS — POR ENTREGAR', 'PRAZO PROMETIDO ULTRAPASSADO', 'SINAIS EM RESERVAS ATIVAS', 'ENTREGUES ESTE MÊS']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 320, .3, .5); await r.wait(800); } await r.off(); } },
    { id: 's04', est: 11, say: 'Cada reserva diz o cliente, o artigo e a quantidade, o armazém, quando chega a mercadoria, a data prometida ao cliente, o sinal e o estado.',
      act: async r => { const l = linha(r, 'N.º 2'); const b = await r.box(l); await r.ring(l, 4, 8); for (const fx of [.03, .1, .25, .4, .48, .6, .7, .76, .84]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 300); await r.wait(420); } await r.off(); } },
    { id: 's05', est: 9, say: 'Esta reserva já chegou. Clicas em separar, e o stock fica guardado para este cliente, ninguém o pode vender.',
      act: async r => { const s = linha(r, 'N.º 2').locator(TS('Separar')).first(); await r.ring(s, 8, 8); await r.click(s, 500); await r.off(); await r.settle(1500); const e = linha(r, 'N.º 2').locator('td').nth(8); await r.ring(e, 5, 8); await r.to(e, 400, .5, .5); await r.wait(900); await r.off(); } },
    { id: 's06', est: 10, say: 'Quando o cliente vem buscar a peça, clicas em entregar e confirmas. A mercadoria sai do stock e a reserva fica finalizada.',
      act: async r => { const e = linha(r, 'N.º 2').locator(TS('Entregar')).first(); await r.ring(e, 8, 8); await r.click(e, 500); await r.off(); await r.settle(900); await r.wait(700); await confirma(r, 'Entregar'); } },
    { id: 's07', est: 9, say: 'Em cada reserva tens ainda o comprovativo em PDF, para dar ao cliente, e o cancelar, se o cliente desistir.',
      act: async r => { const l = linha(r, 'N.º 3'); for (const t of ['Comprovativo de reserva', 'Cancelar a reserva']) { const i = l.locator(TS(t)).first(); await r.ring(i, 8, 8); await r.to(i, 400); await r.wait(1100); } await r.off(); } },
    { id: 's08', est: 11, say: 'Para criar uma reserva nova, vais à consulta de stock, procuras o artigo, por exemplo, o kit embraiagem, e abres a ficha na lupa.',
      act: async r => { await r.menuG('STOCK', 'Consulta de stock'); const q = r.p.locator('#adianti_div_content input[type="text"], #adianti_div_content input[type="search"]').filter({ visible: true }).first(); await typeIn(r, q, 'embraiagem', 90); await r.wait(600);
        const l = r.p.locator('tr').filter({ hasText: 'Kit embraiagem' }).filter({ visible: true }).first(); const f = l.locator(TS('Ficha do artigo')).first(); await r.ring(f, 8, 8); await r.click(f, 500); await r.off(); await r.settle(1500); } },
    { id: 's09', est: 10, say: 'A ficha mostra quanto podes prometer: o disponível, mais o que vem a caminho, menos o que outros clientes já esperam. Clicas em Reservar para cliente.',
      act: async r => { const p = r.p.locator(RP + 'div').filter({ hasText: /^PODE PROMETER/i }).last(); await r.ring(p, 6, 8); await r.to(p, 500, .5, .5); await r.wait(1500); await r.off(); const b = r.p.locator(RP + 'a, ' + RP + 'button').filter({ hasText: /Reservar para cliente/ }).first(); await r.ring(b, 6, 10); await r.click(b, 500); await r.off(); await r.settle(1400); } },
    { id: 's10', est: 13, say: 'Indicas a quantidade, o cliente, o sinal que ele deixou e a forma de pagamento, e a data prometida. Clicas em Reservar.',
      act: async r => { await typeIn(r, r.p.locator(RP + 'input[name="quantidade"]'), '1'); await r.pickFast('pessoa', /Ana Teixeira/, 'Ana Teix'); await typeIn(r, r.p.locator(RP + 'input[name="sinal_valor"]'), '20');
        const sf = r.p.locator(RP + 'select[name="sinal_forma"]'); await r.click(sf, 400); await r.p.keyboard.press('Escape'); await r.p.selectOption(RP + 'select[name="sinal_forma"]', { label: 'MB WAY' }); await r.wait(400); await r.off();
        await typeIn(r, r.p.locator(RP + 'input[name="data_limite"]'), '23102026', 95);
        const g = B(r, 'Reservar'); await r.ring(g, 6, 10); await r.to(g, 400); } },
    { id: 's11', est: 9, say: 'A reserva entra na lista, com o sinal e a data prometida. Como havia stock, fica logo separada, e quando o cliente vier, entregas como vimos.',
      act: async r => { { const g = B(r, 'Reservar'); await r.click(g, 300); await r.off(); await r.settle(1800); } if (!/StockReservaClienteList/.test(r.p.url())) { await r.open('StockReservaClienteList'); await r.settle(1000); } const l = linha(r, 'Ana Teixeira'); await r.ring(l, 4, 8); await r.to(l, 500, .3, .5); await r.wait(1700); await r.off(); } },
    { id: 's12', est: 9, say: 'E assim geres as reservas de clientes. No próximo vídeo vamos às reservas automáticas dos orçamentos. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 700, 800); } },
  ],
};
