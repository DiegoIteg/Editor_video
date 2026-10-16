// LOGÍSTICA · Vídeo 6 — Embalamento, triagem e planeamento das viagens
const { sleep } = require('./engine');
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const card = (r, t) => r.p.locator('.gp-cartao').filter({ has: r.p.locator('.gp-cartao-topo', { hasText: new RegExp('^\\s*' + t) }) }).filter({ visible: true }).first();
const C = '#adianti_content';
const yOf = loc => loc.evaluate(e => { const k = document.querySelector('#adianti_content'); return e.getBoundingClientRect().top - k.getBoundingClientRect().top + k.scrollTop - 90; });
const semMapa = async r => { const f = () => { const add = () => { if (document.getElementById('sem_mapa')) return; const st = document.createElement('style'); st.id = 'sem_mapa'; st.textContent = '.gp-secao:has(.fa-map-marked-alt), .gp-cartao:has(.fa-map-marked-alt){display:none !important}'; (document.head || document.documentElement).appendChild(st); }; if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', add); else add(); }; await r.p.addInitScript(f); await r.p.evaluate(f); };
const okModal = async r => { const ok = r.el(/^\s*OK\s*$/, 'button,a'); if (await ok.count()) { await r.click(ok, 400); await r.settle(500); } };

module.exports = {
  name: 'log06_embalamento_triagem',
  titulo: 'Embalamento, triagem e viagens', subtitulo: 'Conferir, encaixotar, separar por zona e planear as viagens', n: 6, modulo: 'LOGÍSTICA',
  start: async r => {
    r.c.on('page', p => { setTimeout(() => p.close().catch(() => {}), 300); }); await semMapa(r);
    // preparação (fora da gravação): a venda 2644 passa pelo corte e pelo picking
    const P = r.p; await r.open('LogCorteList'); await sleep(800);
    await P.locator('input[name="venda"]').fill('2644'); await P.locator('#adianti_div_content button').filter({ hasText: /Enviar para a fila/ }).first().click(); await sleep(1500);
    await P.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: /^\s*Cortar agora/ }).first().click(); await sleep(1500);
    await r.open('LogPickingList'); await sleep(800);
    await P.locator('.gp-cartao').filter({ hasText: 'Ondas' }).locator('tr').nth(1).getByText('Abrir').first().click(); await sleep(1500);
    for (let i = 0; i < 4; i++) { const rc = P.locator('.gp-cartao').filter({ hasText: 'Recolha' }).first(); const b = rc.locator('tr').filter({ hasText: 'por recolher' }).first().locator('button').first(); if (!(await b.count())) break; await b.click(); await sleep(1200); }
    await P.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: /^\s*Concluir onda/ }).first().click(); await sleep(1500);
    await r.open('LogEmbalamentoList'); await sleep(800);
  },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje continuamos a saída de mercadoria: o embalamento, a triagem por zona e o planeamento das viagens.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 6, say: 'No menu, abres Logística, Outbound, e escolhes Embalamento.',
      act: async r => { await r.menuG('LOGÍSTICA', 'Embalamento', 'Outbound'); } },
    { id: 's03', est: 9, say: 'Os cartões mostram os pedidos separados para embalar, e os já embalados à espera de viagem. Na lista, cada pedido tem o cliente, a zona e os artigos.',
      act: async r => { for (const t of ['PARA EMBALAR', 'EMBALADOS']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 350, .3, .5); await r.wait(900); } await r.off(); const c = card(r, 'Pedidos separados para embalar'); await r.ring(c, 6, 10); await r.to(c, 500, .5, .5); await r.wait(1200); await r.off(); } },
    { id: 's04', est: 10, say: 'Lês ou escreves o número da venda e clicas em Abrir. O pedido vai para a mesa, com o cliente, a zona e a doca de saída.',
      act: async r => { const c = card(r, 'Abrir pedido'); const i = c.locator('input').first(); await r.click(i, 420); await r.p.keyboard.type('2644', { delay: r.dry ? 5 : 110 }); const a = c.locator('button, a').filter({ hasText: /Abrir/ }).first(); await r.ring(a, 6, 8); await r.click(a, 450); await r.off(); await r.settle(1500); const m = card(r, 'Pedido na mesa'); await r.ring(m, 6, 10); await r.to(m, 450, .3, .3); await r.wait(900); await r.off(); } },
    { id: 's05', est: 10, say: 'Confere cada artigo antes de o pôr na caixa, com o leitor. Se não tiveres leitor, clicas em Conferir tudo.',
      act: async r => { const m = card(r, 'Pedido na mesa'); const i = m.locator('input').filter({ visible: true }).first(); await r.ring(i, 5, 8); await r.to(i, 400); await r.wait(600); await r.off(); const t = btn(r, 'Conferir tudo'); await r.ring(t, 6, 10); await r.click(t, 450); await r.off(); await r.settle(1400); } },
    { id: 's06', est: 11, say: 'Depois indicas as caixas: o tipo, quantas, e o peso, se tiveres balança. Clicas em Adicionar volume, e cada volume ganha o seu código.',
      act: async r => { const s = r.p.locator('select[name="caixa"]'); await r.ring(s, 5, 8); await r.click(s, 400); await r.p.keyboard.press('Escape'); await r.p.selectOption('select[name="caixa"]', { index: 1 }); await r.wait(400); await r.off(); const a = btn(r, 'Adicionar volume'); await r.ring(a, 6, 10); await r.click(a, 450); await r.off(); await r.settle(1400);
        r.vol = ((await r.p.locator('#adianti_div_content').innerText()).match(/V\d{6}-1/) || ['V000044-1'])[0]; const v = r.p.locator('tr').filter({ hasText: r.vol }).first(); await r.ring(v, 4, 8); await r.to(v, 400, .2); await r.wait(900); await r.off(); } },
    { id: 's07', est: 8, say: 'Clicas em Fechar e imprimir etiquetas, e colas a etiqueta em cada caixa.',
      act: async r => { const f = btn(r, 'Fechar e imprimir etiquetas'); await r.ring(f, 6, 10); await r.click(f, 450); await r.off(); await r.settle(1800); } },
    { id: 's08', est: 11, say: 'Na triagem por zona, lês a etiqueta de cada volume, e o sistema diz-te em que doca o pôr. Em baixo vês cada zona e quantos volumes já foram triados.',
      act: async r => { await r.menuG('LOGÍSTICA', 'Triagem por zona', 'Outbound'); const i = r.p.locator('#adianti_div_content input').filter({ visible: true }).nth(1); await r.click(i, 420); await r.p.keyboard.type(r.vol || 'V000044-1', { delay: r.dry ? 5 : 80 }); await r.p.keyboard.press('Enter'); await r.settle(1500);
        const c = card(r, 'Ler etiqueta'); await r.ring(c, 6, 10); await r.to(c, 500, .5, .6); await r.wait(1200); await r.off(); const z = card(r, 'Por zona'); await r.ring(z, 6, 10); await r.to(z, 450, .3, .4); await r.wait(1000); await r.off(); } },
    { id: 's09', est: 12, say: 'Em Cargas e viagens, clicas em Planear viagens. O sistema junta os pedidos por rota, enche cada viatura até oitenta e cinco por cento, e calcula a ordem de entrega pelas moradas.',
      act: async r => { await r.menuG('LOGÍSTICA', 'Cargas e viagens', 'Outbound'); await r.wait(400); await r.scrollTo(C, 0, 600); const p = btn(r, 'Planear viagens'); await r.ring(p, 6, 10); await r.click(p, 450); await r.off(); await r.settle(3200); await okModal(r); await r.scrollTo(C, 0, 600); for (const k of ['VIAGENS DO DIA', 'OCUPAÇÃO MÉDIA', 'KM PREVISTOS']) { const b = btn(r, k); await r.ring(b, 5, 12); await r.to(b, 300, .3, .5); await r.wait(600); } await r.off(); const t = r.p.getByText(/^O planeamento junta/).first(); if (await t.count()) { await r.ring(t, 4, 8); await r.to(t, 450, .3, .5); await r.wait(1200); await r.off(); } } },
    { id: 's10', est: 9, say: 'E assim embalas e planeias as viagens. No próximo vídeo vamos carregar as viagens e segui-las na torre de controlo. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 700, 800); } },
  ],
};
