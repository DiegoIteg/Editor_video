// VENDAS · Vídeo 5 — Serviços externos
const { sleep } = require('./engine');
const T = t => `[title="${t}"], [data-original-title="${t}"], [data-bs-original-title="${t}"]`;
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).first();
const kpi = (r, t) => r.p.locator('.gp-kpi', { hasText: t }).filter({ visible: true }).first();
const card = (r, t) => r.p.locator('.gp-cartao, .card').filter({ hasText: t }).filter({ visible: true }).last();
const row = r => r.p.locator('tbody tr').filter({ visible: true }).first();
const C = '#adianti_content';

module.exports = {
  name: 'vnd05_servicos_externos',
  titulo: 'Serviços externos', subtitulo: 'Os trabalhos que a oficina manda fazer fora, sob controlo', n: 5, modulo: 'VENDAS',
  start: async r => { await r.open('TercerizacaoList'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos aos Serviços externos: os trabalhos que a oficina manda fazer a fornecedores, como retificações, estofos ou climatização.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 6, say: 'No menu, abres Vendas, depois Serviços externos, e escolhes Serviços.',
      act: async r => { await r.menuG('VENDAS', 'Serviços', 'Serviços externos'); } },
    { id: 's03', est: 11, say: 'A lista mostra o fornecedor, o orçamento a que pertence, a viatura, a data de início, a entrega prevista e a entrega real, o valor, o estado e o alerta.',
      act: async r => { const b = await r.box(row(r)); await r.ring(row(r), 4, 8); for (const fx of [.2, .3, .42, .55, .62, .68, .74, .8, .9]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 330); await r.wait(420); } await r.off(); } },
    { id: 's04', est: 9, say: 'No topo, cadastras um serviço novo, filtras, atualizas, limpas os filtros, abres os indicadores e alertas, o painel do dia, ou exportas a lista.',
      act: async r => { for (const t of ['Cadastrar', 'Filtros', 'Atualizar', 'Limpar filtros', 'Indicadores e alertas', 'Painel do dia', 'Exportar']) { await r.ring(btn(r, t), 6, 10); await r.to(btn(r, t), 300); await r.wait(420); } await r.off(); } },
    { id: 's05', est: 10, say: 'Em cada linha: a lupa para consultar, o lápis para editar, o caixote para eliminar, o follow-up do serviço e o financeiro, para pagar ao fornecedor.',
      act: async r => { const ic = row(r).locator('i').filter({ visible: true }); for (let i = 0; i < 5; i++) { await r.ring(ic.nth(i), 8, 8); await r.to(ic.nth(i), 330); await r.wait(1050); } await r.off(); } },
    { id: 's06', est: 8, say: 'Para ver tudo de uma vez, abrimos os Indicadores e alertas.',
      act: async r => { await r.ring(btn(r, 'Indicadores e alertas'), 6, 10); await r.click(btn(r, 'Indicadores e alertas'), 600); await r.off(); await r.settle(1500); } },
    { id: 's07', est: 11, say: 'Na primeira linha: os serviços em curso e o seu valor, os que estão em atraso, os que chegam hoje e os que estão em risco de atraso, a três dias ou menos da data prevista.',
      act: async r => { for (const t of ['EM CURSO', 'EM ATRASO', 'ENTREGA HOJE', 'RISCO DE ATRASO']) { const k = kpi(r, t); await r.ring(k, 5, 12); await r.to(k, 380, .3, .6); await r.wait(1300); } await r.off(); } },
    { id: 's08', est: 11, say: 'Na segunda: os trabalhos não conformes, os entregues ainda por faturar, a pontualidade dos fornecedores e o total de serviços com os filtros atuais.',
      act: async r => { for (const t of ['NÃO CONFORMES', 'POR FATURAR', 'PONTUALIDADE DOS FORNECEDORES', 'TOTAL DE SERVIÇOS']) { const k = kpi(r, t); await r.ring(k, 5, 12); await r.to(k, 380, .3, .6); await r.wait(1300); } await r.off(); } },
    { id: 's09', est: 9, say: 'Os gráficos mostram os serviços por estado e quanto trabalho está em curso em cada fornecedor.',
      act: async r => { await r.scrollTo(C, 330, 900); for (const t of ['Serviços por estado', 'Em curso por fornecedor']) { const c = card(r, t); await r.ring(c, 6, 10); await r.to(c, 500, .5, .5); await r.wait(1400); await r.off(); } } },
    { id: 's10', est: 10, say: 'Mais abaixo, a pontualidade de cada fornecedor e o prazo médio de entrega, em dias. É a melhor forma de escolher com quem trabalhar.',
      act: async r => { await r.scrollTo(C, 650, 900); for (const t of ['Pontualidade por fornecedor', 'Prazo médio de entrega']) { const c = card(r, t); await r.ring(c, 6, 10); await r.to(c, 500, .5, .5); await r.wait(1600); await r.off(); } } },
    { id: 's11', est: 9, say: 'E no fim, a lista dos serviços, com o follow-up e os atalhos para consultar ou editar cada um.',
      act: async r => { await r.scrollTo(C, 1000, 1000); const c = card(r, /^\s*Serviços\s/); await r.ring(row(r), 4, 8); await r.to(row(r), 600, .5); await r.wait(1200); await r.off(); } },
    { id: 's12', est: 9, say: 'E assim acompanhas os serviços externos. No próximo vídeo vamos às Configurações de vendas. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.scrollTo(C, 0, 900); await r.move(1100, 700, 800); } },
  ],
};
