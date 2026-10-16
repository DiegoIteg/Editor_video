// RECURSOS HUMANOS · Vídeo 2 — Ausências e férias
const { sleep } = require('./engine');
const TS = t => `[title^="${t}"], [data-original-title^="${t}"], [data-bs-original-title^="${t}"]`;
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const RP = '#adianti_right_panel ';
const B = (r, t) => r.p.locator(RP + 'button, ' + RP + 'a').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).last();
const linha = r => r.p.locator('tr.gp-linha, tbody tr').filter({ visible: true }).first();
const fd = async (r, n, v) => { const l = r.p.locator(RP + `[name="${n}"]`); await r.click(l, 380); await sleep(120); await r.p.keyboard.press('Control+A'); await r.p.keyboard.press('Backspace'); for (const ch of v) { await r.p.keyboard.type(ch); await sleep(105); } await r.p.keyboard.press('Tab'); await sleep(250); };

module.exports = {
  name: 'rh02_ausencias_ferias',
  titulo: 'Ausências e férias', subtitulo: 'Registar, aprovar e acompanhar faltas, baixas e férias', n: 2, modulo: 'RECURSOS HUMANOS',
  start: async r => { await r.open('RhAusenciasList'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos às ausências e férias: quem pediu, quem decidiu, e porquê.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 6, say: 'No menu, abres Recursos Humanos e escolhes Ausências e férias.',
      act: async r => { await r.menuG('RECURSOS HUMANOS', 'Ausências e férias'); } },
    { id: 's03', est: 12, say: 'Os cartões mostram os pedidos por aprovar, quem está ausente hoje, as ausências dos próximos trinta dias, e o total de férias, baixas e acidentes, e faltas do ano.',
      act: async r => { for (const t of ['POR APROVAR', 'AUSENTES HOJE', 'PRÓXIMOS 30 DIAS', 'FÉRIAS', 'BAIXAS E ACIDENTES', 'FALTAS', 'RECUSADOS', 'TODAS']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 300, .3, .5); await r.wait(650); } await r.off(); } },
    { id: 's04', est: 10, say: 'Clicamos nos pedidos por aprovar. Cada linha diz o colaborador, o tipo, o período, os dias úteis e o estado.',
      act: async r => { await r.click(btn(r, 'POR APROVAR'), 450); await r.settle(1200); const b = await r.box(linha(r)); await r.ring(linha(r), 4, 8); for (const fx of [.12, .3, .5, .66, .74]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 330); await r.wait(500); } await r.off(); } },
    { id: 's05', est: 12, say: 'No ícone decidir abres o pedido. Vês o período, as observações e o saldo de férias que a pessoa ainda tem. Escreves um comentário, se quiseres, e clicas em Aprovar.',
      act: async r => { const d = r.p.locator(TS('Decidir')).filter({ visible: true }).first(); await r.ring(d, 8, 8); await r.click(d, 500); await r.off(); await r.settle(1500);
        const sd = r.p.locator(RP + 'div').filter({ hasText: /^Saldo de férias/ }).last(); if (await sd.count()) { await r.ring(sd, 5, 8); await r.to(sd, 500, .5, .5); await r.wait(1200); await r.off(); }
        const m = r.p.locator(RP + 'textarea'); await r.click(m, 400); await r.p.keyboard.type('Aprovado. Boas férias!', { delay: r.dry ? 5 : 45 });
        const a = B(r, 'Aprovar'); await r.ring(a, 6, 10); await r.click(a, 500); await r.off(); await r.settle(1500); } },
    { id: 's06', est: 13, say: 'Para registar uma ausência, clicas em Registar ausência. Escolhes o colaborador, o tipo, por exemplo, consulta médica, e as datas. Se for só meio dia ou umas horas, também dá.',
      act: async r => { const ok = r.el(/^\s*OK\s*$/, 'button,a'); if (await ok.count()) { await r.click(ok, 400); await r.settle(600); }
        await r.click(btn(r, 'Registar ausência'), 500); await r.settle(1400); await r.pickFast('funcionario_id', 'Paulo Ribeiro Santos (demo)', 'Paulo');
        const t = r.p.locator(RP + 'select[name="frequencia_tipo_id"]'); await r.ring(t, 5, 8); await r.click(t, 380); await r.p.keyboard.press('Escape'); await r.p.selectOption(RP + 'select[name="frequencia_tipo_id"]', { label: 'Consulta médica' }); await r.wait(350); await r.off();
        await fd(r, 'data_inicio', '20102026'); await fd(r, 'data_termino', '20102026');
        const mh = r.p.locator(RP + 'label').filter({ hasText: /Só meio dia/ }).first(); await r.ring(mh, 5, 8); await r.click(mh, 400); await r.wait(300); await r.off(); } },
    { id: 's07', est: 10, say: 'Podes anexar o comprovativo, e marcar registar já aprovado, quando a ausência já foi combinada. Clicas em Gravar.',
      act: async r => { const doc = r.p.locator(RP + 'label').filter({ hasText: /Documento/ }).first(); await r.ring(doc, 5, 8); await r.to(doc, 400); await r.wait(500); await r.off();
        const ap = r.p.locator(RP + 'label').filter({ hasText: /Registar já aprovado/ }).first(); await r.ring(ap, 5, 8); await r.click(ap, 400); await r.off();
        const g = B(r, 'Gravar'); await r.ring(g, 6, 10); await r.click(g, 500); await r.off(); await r.settle(1600); } },
    { id: 's08', est: 8, say: 'A ausência entra na lista, já aprovada, e conta no mapa de férias e nos recibos.',
      act: async r => { const ok = r.el(/^\s*OK\s*$/, 'button,a'); if (await ok.count()) { await r.click(ok, 400); await r.settle(600); } await r.click(btn(r, 'TODAS'), 400); await r.settle(1200); const l = r.p.locator('tr.gp-linha, tbody tr').filter({ hasText: 'Paulo Ribeiro' }).filter({ hasText: 'Consulta' }).first(); await r.ring(l, 4, 8); await r.to(l, 500, .3); await r.wait(1500); await r.off(); } },
    { id: 's09', est: 8, say: 'E nos tipos de ausência defines a lista: férias, baixa, consulta, formação, falecimento, e outras.',
      act: async r => { await r.menuG('RECURSOS HUMANOS', 'Tipos de ausência'); await r.ring(r.p.locator('tbody').filter({ visible: true }).first(), 4, 8); await r.move(700, 500, 900); await r.wait(900); await r.off(); } },
    { id: 's10', est: 9, say: 'E assim geres as ausências e férias. No próximo vídeo vamos ao mapa de férias. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 700, 800); } },
  ],
};
