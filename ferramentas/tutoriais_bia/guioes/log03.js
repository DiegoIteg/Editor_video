// LOGÍSTICA · Vídeo 3 — Frota
const { sleep } = require('./engine');
const TS = t => `[title^="${t}"], [data-original-title^="${t}"], [data-bs-original-title^="${t}"]`;
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const card = (r, t) => r.p.locator('.gp-cartao').filter({ hasText: t }).filter({ visible: true }).first();
const RP = '#adianti_right_panel ';
const B = (r, t) => r.p.locator(RP + 'button, ' + RP + 'a').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).last();
const linha = (r, t) => r.p.locator('tr').filter({ hasText: t }).filter({ visible: true }).first();
const C = '#adianti_content';
const yOf = loc => loc.evaluate(e => { const k = document.querySelector('#adianti_content'); return e.getBoundingClientRect().top - k.getBoundingClientRect().top + k.scrollTop - 90; });

module.exports = {
  name: 'log03_frota',
  titulo: 'Frota', subtitulo: 'Viaturas, documentos, quilómetros e manutenções', n: 3, modulo: 'LOGÍSTICA',
  start: async r => { await r.open('FrotaList'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos à frota: as viaturas da empresa, os documentos, os quilómetros e as manutenções.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 6, say: 'No menu, abres Logística, Frota, e escolhes Viaturas.',
      act: async r => { await r.menuG('LOGÍSTICA', 'Viaturas', 'Frota'); } },
    { id: 's03', est: 11, say: 'Os cartões mostram as viaturas ativas, as que estão na oficina ou paradas, os documentos expirados, as manutenções a vencer e o custo da frota no ano.',
      act: async r => { for (const t of ['VIATURAS', 'NA OFICINA', 'DOCUMENTOS', 'MANUTENÇÕES', 'CUSTO DO ANO']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 330, .3, .5); await r.wait(1000); } await r.off(); } },
    { id: 's04', est: 11, say: 'Na lista vês cada viatura, os quilómetros, os documentos com o alerta de validade, a próxima manutenção e o custo.',
      act: async r => { const l = linha(r, '72-UV-15'); const b = await r.box(l); await r.ring(l, 4, 8); for (const fx of [.08, .25, .32, .45, .65, .85]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 330); await r.wait(550); } await r.off(); } },
    { id: 's05', est: 12, say: 'Na ficha da viatura tens tudo: os quilómetros e a média por dia, os documentos em vigor, as manutenções programadas, as intervenções feitas e o custo.',
      act: async r => { const f = linha(r, '72-UV-15').locator(TS('Ficha e histórico')).first(); await r.ring(f, 8, 8); await r.click(f, 500); await r.off(); await r.settle(1500);
        for (const t of ['QUILÓMETROS', 'DOCUMENTOS', 'MANUTENÇÃO', 'CUSTO DO ANO', 'CAPACIDADE']) { const k = btn(r, t); if (await k.count()) { await r.ring(k, 5, 12); await r.to(k, 300, .3, .5); await r.wait(650); } } await r.off();
        await r.scrollTo(C, 330, 900); await r.move(800, 500, 700); await r.wait(600); await r.move(1500, 500, 700); await r.wait(600); } },
    { id: 's06', est: 11, say: 'Para atualizar os quilómetros, clicas em Registar quilómetros, escreves a leitura do conta-quilómetros e clicas em Gravar.',
      act: async r => { await r.scrollTo(C, 0, 800); const k = btn(r, 'Registar quilómetros'); await r.ring(k, 6, 10); await r.click(k, 500); await r.off(); await r.settle(1400);
        const km = r.p.locator(RP + 'input[name="km"]'); await r.click(km, 420); await sleep(120); for (const ch of '158620') { await r.p.keyboard.type(ch); await sleep(r.dry ? 40 : 110); } await r.p.keyboard.press('Tab'); await r.wait(300);
        const g = B(r, 'Gravar'); await r.ring(g, 6, 10); await r.click(g, 500); await r.off(); await r.settle(1500); } },
    { id: 's07', est: 11, say: 'Nas manutenções vês as programadas a vencer, por data ou por quilómetros, as agendadas e em curso, e as concluídas nos últimos noventa dias.',
      act: async r => { const ok = r.el(/^\s*OK\s*$/, 'button,a'); if (await ok.count()) { await r.click(ok, 400); await r.settle(600); } await r.menuG('LOGÍSTICA', 'Manutenções', 'Frota');
        for (const t of ['Manutenções programadas a vencer', 'Agendadas e em curso', 'Concluídas nos últimos 90 dias']) { const c = card(r, t); await r.ring(c, 6, 10); await r.to(c, 450, .5, .4); await r.wait(900); await r.off(); } } },
    { id: 's08', est: 9, say: 'No calendário de uma manutenção a vencer, agendas a ida à oficina. E nas tabelas da frota defines os tipos de documento e de intervenção.',
      act: async r => { const a = r.p.locator(TS('Agendar esta manutenção')).filter({ visible: true }).first(); await r.ring(a, 8, 8); await r.to(a, 450); await r.wait(1100); await r.off(); await r.menuG('LOGÍSTICA', 'Tabelas da frota', 'Frota'); await r.move(900, 450, 900); await r.wait(900); } },
    { id: 's09', est: 9, say: 'E assim geres a frota. No próximo vídeo vamos às equipas de entrega, e às zonas e rotas. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 700, 800); } },
  ],
};
