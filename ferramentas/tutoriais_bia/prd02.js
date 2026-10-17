// PRODUÇÃO · Vídeo 2 — Controlo de produção (o quadro da oficina)
const { sleep } = require('./engine');
const BASE = process.env.GA_BASE || 'http://127.0.0.1:8770';
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const kpi = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content div').filter({ has: r.p.locator(`text=/^\\s*${t}\\s*$/i`) }).filter({ visible: true }).last();
const box = (r, t) => r.p.locator('.gp-cartao, .card, .panel').filter({ hasText: t }).filter({ visible: true }).last();
const C = '#adianti_content';

module.exports = {
  name: 'prd02_controlo_producao',
  titulo: 'Controlo de produção', subtitulo: 'O quadro da oficina: o que está a acontecer agora', n: 2, modulo: 'PRODUÇÃO',
  start: async r => { await r.p.addInitScript(() => { window.open = () => null; }); await r.open('ProducaoList'); await r.p.evaluate(() => { window.open = () => null; }); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos ao Controlo de produção, o quadro onde vês tudo o que está a acontecer na oficina.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Produção e escolhes Controlo de produção.',
      act: async r => { await r.menuG('PRODUÇÃO', 'Controlo de produção'); } },
    { id: 's03', est: 8, say: 'No topo escolhes o período: hoje, esta semana, este mês, este ano, o mês anterior, ou um intervalo de datas à tua escolha.',
      act: async r => { for (const t of ['Hoje', 'Esta semana', 'Este mês', 'Este ano', 'Mês anterior']) { await r.ring(btn(r, t), 5, 8); await r.to(btn(r, t), 300); await r.wait(500); } await r.off(); const d = r.p.locator('#adianti_div_content input').filter({ visible: true }).first(); await r.ring(d, 5, 8); await r.to(d, 400); await r.wait(400); await r.off(); } },
    { id: 's04', est: 8, say: 'Na segunda linha tens o ecrã da oficina, os serviços terceirizados, os filtros, e os botões para atualizar e exportar.',
      act: async r => { for (const t of ['Ecrã da oficina', 'Serviços terceirizados', 'Filtros', 'Limpar filtros', 'Atualizar', 'Exportar']) { await r.ring(btn(r, t), 5, 8); await r.to(btn(r, t), 300); await r.wait(420); } await r.off(); } },
    { id: 's05', est: 10, say: 'Os cartões de agora na oficina contam os carros que estão cá dentro, os que estão a ser trabalhados, em pausa, à espera da próxima etapa e à espera de peças.',
      act: async r => { for (const t of ['CARROS NA OFICINA', 'A TRABALHAR', 'EM PAUSA', 'À ESPERA DE ETAPA', 'AGUARDA PEÇAS']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 380, .3, .5); await r.wait(900); } await r.off(); } },
    { id: 's06', est: 10, say: 'Na linha de baixo, os alertas: atrasadas, em risco de atraso, as prioritárias, os retrabalhos e os carros sem técnico atribuído.',
      act: async r => { for (const t of ['ATRASADAS', 'RISCO DE ATRASO', 'PRIORIDADE', 'RETRABALHO', 'SEM TÉCNICO ATRIBUÍDO']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 380, .3, .5); await r.wait(900); } await r.off(); } },
    { id: 's07', est: 10, say: 'Cada cartão também filtra a lista. Clicas, por exemplo, em atrasadas, e lá em baixo ficam só esses carros. Depois limpas o filtro.',
      act: async r => {
        await r.click(btn(r, 'ATRASADAS'), 600); await r.settle(1400);
        const g = r.p.locator('tbody').filter({ has: r.p.locator('.fa-file-pdf') }).filter({ visible: true }).first(); await g.scrollIntoViewIfNeeded(); await r.wait(500);
        await r.ring(g, 4, 8); await r.move(1000, 600, 900); await r.wait(1200); await r.off();
        await r.scrollTo(C, 0, 700); await r.click(btn(r, 'Limpar filtros'), 500); await r.settle(1300);
      } },
    { id: 's08', est: 12, say: 'A eficiência de hoje mostra as horas produtivas e as horas paradas, a percentagem de eficiência, o retrabalho, as ordens concluídas, as horas vendidas contra as reais e o material gasto.',
      act: async r => { for (const t of ['HORAS PRODUTIVAS', 'HORAS PARADAS', 'EFICIÊNCIA', 'OS CONCLUÍDAS', 'HORAS VENDIDAS VS REAIS', 'MATERIAL GASTO']) { const k = r.p.locator('.gp-kpi, a, div').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).last(); await r.ring(k, 5, 12); await r.to(k, 350, .3, .5); await r.wait(850); } await r.off(); } },
    { id: 's09', est: 12, say: 'No acompanhamento vês os carros que precisam de atenção, com o motivo, quem está a trabalhar agora e há quanto tempo, e as entregas de hoje e de amanhã.',
      act: async r => {
        await r.scrollTo(C, 520, 900);
        for (const t of ['Precisa de atenção', 'A trabalhar agora']) { const c = box(r, t); await r.ring(c, 6, 10); await r.to(c, 500, .5, .35); await r.wait(1500); await r.off(); }
        await r.scrollTo(C, 900, 800); const e = box(r, 'Entregas hoje e amanhã'); await r.ring(e, 6, 10); await r.to(e, 500, .5, .5); await r.wait(1000); await r.off();
      } },
    { id: 's10', est: 10, say: 'E o ecrã da oficina abre este quadro em grande, para pores numa televisão: toda a equipa vê o que está a trabalhar, à espera e atrasado.',
      act: async r => {
        await r.scrollTo(C, 0, 700); await r.ring(btn(r, 'Ecrã da oficina'), 6, 10); await r.click(btn(r, 'Ecrã da oficina'), 500); await r.off();
        await r.p.goto(BASE + '/engine.php?class=ProducaoList&method=onEcra&static=1'); await r.wait(400); await r.move(960, 560, 900); await r.wait(2500);
      } },
    { id: 's11', est: 9, say: 'E assim acompanhas a oficina no Controlo de produção. No próximo vídeo vamos trabalhar uma ordem de serviço, etapa a etapa. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.p.goto(BASE + '/index.php?class=ProducaoList&method=onShow'); await r.settle(800); await r.move(1100, 700, 800); } },
  ],
};
