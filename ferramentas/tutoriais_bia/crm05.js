// CRM · Vídeo 5 — Pós-venda: indicadores de qualidade
const { sleep } = require('./engine');
const T = t => `[title="${t}"], [data-original-title="${t}"], [data-bs-original-title="${t}"]`;
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).first();
const kpi = (r, t) => r.p.locator('.gp-kpi', { hasText: t }).filter({ visible: true }).first();
const cardOf = (r, t) => r.p.locator('.card, .panel, div').filter({ has: r.p.locator(`text=${t}`) }).filter({ has: r.p.locator('svg, canvas') }).last();
const C = '#adianti_content';

module.exports = {
  name: 'crm05_indicadores_qualidade',
  titulo: 'Indicadores de qualidade', subtitulo: 'A satisfação dos clientes em números de gestão', n: 5,
  start: async r => { await r.open('PosVendaDashboard'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vou ensinar-te a ler os Indicadores de qualidade, onde as respostas dos clientes se transformam em números de gestão.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 6, say: 'No menu, abres o CRM, a Pós-venda, e escolhes Indicadores de qualidade.',
      act: async r => { await r.menu2('CRM', 'Pós-venda', 'Indicadores de qualidade'); } },
    { id: 's03', est: 7, say: 'No topo vês o período em análise, aqui os trabalhos concluídos este mês, e os filtros que estão ativos.',
      act: async r => {
        const sub = r.el(/^\s*Trabalhos concluídos de/, 'div,span,small,p'); await r.ring(sub, 6, 8); await r.to(sub, 600); await r.wait(1500);
        const f = r.el(/^\s*Filtros ativos/, 'div,span,small'); await r.ring(f, 6, 8); await r.to(f, 500);
      } },
    { id: 's04', est: 15, say: 'Os cartões são os indicadores principais: o NPS, a nota de recomendação, a satisfação média de um a cinco, a taxa de resposta, os problemas de qualidade, os detratores e os clientes a acompanhar.',
      act: async r => {
        await r.off();
        for (const t of ['NPS', 'SATISFAÇÃO MÉDIA', 'TAXA DE RESPOSTA', 'PROBLEMAS DE QUALIDADE', 'DETRATORES', 'CLIENTES A ACOMPANHAR']) { const k = kpi(r, t); await r.ring(k, 6, 12); await r.to(k, 400); await r.wait(950); }
        await r.off();
      } },
    { id: 's05', est: 9, say: 'A distribuição das respostas mostra quantos clientes são promotores, neutros ou detratores. Quanto mais verde, melhor.',
      act: async r => { const c = cardOf(r, 'Distribuição das respostas'); await r.ring(c, 6); await r.to(c, 700, .4, .55); await r.wait(2500); } },
    { id: 's06', est: 9, say: 'A nota média por critério diz-te onde a oficina é forte e onde tem de melhorar: atendimento, qualidade, prazo, preço e limpeza.',
      act: async r => { await r.off(); const c = cardOf(r, 'Nota média por critério'); await r.ring(c, 6); await r.to(c, 700, .5, .55); await r.wait(2500); } },
    { id: 's07', est: 7, say: 'E o NPS por setor compara as equipas entre si.',
      act: async r => { await r.off(); const c = cardOf(r, 'NPS por setor'); await r.ring(c, 6); await r.to(c, 700, .5, .55); await r.wait(1500); } },
    { id: 's08', est: 8, say: 'A evolução mostra o NPS mês a mês, nos últimos seis meses, para veres se a satisfação está a subir ou a descer.',
      act: async r => { await r.off(); await r.scrollTo(C, 280, 900); const c = cardOf(r, 'Evolução do NPS'); await r.ring(c, 6); await r.move(450, 560, 500); await r.move(1500, 540, 1900); } },
    { id: 's09', est: 13, say: 'Em baixo, a lista das respostas do período, com a nota de cada cliente, o estado da pesquisa, o problema ou o comentário e a ação corretiva. Assim nenhum caso fica por fechar.',
      act: async r => {
        await r.off(); await r.scrollTo(C, 1250, 1300);
        const row = r.p.locator('tbody tr', { hasText: 'Viatura entregue pouco limpa' }).filter({ visible: true }).first();
        if (await row.count()) { await row.scrollIntoViewIfNeeded(); await r.wait(300); await r.ring(row, 4, 8); const b = await r.box(row); for (const fx of [0.05, 0.3, 0.45, 0.5, 0.62, 0.8]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 380); await r.wait(500); } }
      } },
    { id: 's10', est: 8, say: 'Em cada linha, o olho abre o orçamento e o lápis abre a pesquisa, para atualizares o seguimento do caso.',
      act: async r => {
        await r.off(); const row = r.p.locator('tbody tr', { hasText: 'Viatura entregue pouco limpa' }).filter({ visible: true }).first();
        const eye = row.locator('a, i').filter({ has: r.p.locator('.fa-eye') }).first().or(row.locator('.fa-eye').first());
        for (const sel of ['.fa-eye', '.fa-edit']) { const i = row.locator(sel).first(); await r.ring(i, 9, 8); await r.to(i, 500); await r.wait(1200); }
        await r.off();
      } },
    { id: 's11', est: 9, say: 'Nos Filtros mudas o período, o setor ou o estado, e todos os indicadores se recalculam. O botão Pesquisas leva-te de volta à lista de pesquisas.',
      act: async r => {
        await r.scrollTo(C, 0, 1000); await r.click(btn(r, 'Filtros'), 600); await r.settle(900); await r.move(1500, 300, 600); await r.wait(1000);
        await r.click(await r.hit('Fechar', 'a,button,span'), 500); await r.settle(600);
        await r.ring(btn(r, 'Pesquisas'), 6, 10); await r.to(btn(r, 'Pesquisas'), 600);
      } },
    { id: 's12', est: 11, say: 'E com isto fica completo o módulo de CRM, do primeiro contacto até à qualidade da pós-venda. Eu sou a Bia, a tua assistente de formação. Obrigada, e até à próxima!',
      act: async r => { await r.off(); await r.move(1100, 600, 800); } },
  ],
};
