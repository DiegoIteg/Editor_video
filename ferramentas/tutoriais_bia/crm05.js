// CRM · Vídeo 5 — Pós-venda: pesquisas de satisfação
const { sleep } = require('./engine');
const T = t => `[title="${t}"], [data-original-title="${t}"], [data-bs-original-title="${t}"]`;
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).first();
const kpi = (r, t) => r.p.locator('[title="Clique para filtrar"], [data-original-title="Clique para filtrar"], .gp-kpi, .card', { hasText: t }).filter({ visible: true }).first();
const radio = (r, name, v) => r.p.locator(`input[name="${name}"][value="${v}"]`).locator('xpath=..');
const ORC = '2615';
const rowOf = (r, t) => r.p.locator('tbody tr', { hasText: t }).filter({ visible: true }).first();
const C = '#adianti_content';

module.exports = {
  name: 'crm05_pesquisas_satisfacao',
  titulo: 'Pesquisas de satisfação', subtitulo: 'Ouvir o cliente depois de cada trabalho', n: 5,
  start: async r => { await r.open('PosVendaList'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vou ensinar-te a fazer as Pesquisas de satisfação da pós-venda, para ouvires cada cliente depois do trabalho concluído.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 6, say: 'No menu, abres o CRM, depois a Pós-venda, e escolhes Pesquisas de satisfação.',
      act: async r => {
        const side = t => r.p.locator('#ga-side a').filter({ hasText: new RegExp('^\\s*' + t + '\\s*$') }).first();
        if (!(await side('Pesquisas de satisfação').isVisible().catch(() => false))) { await r.menu('CRM', 'Pós-venda', false); await sleep(600); }
        await r.ring(side('Pesquisas de satisfação'), 4, 8); await r.click(side('Pesquisas de satisfação'), 600); await r.off(); await r.settle(1300);
      } },
    { id: 's03', est: 15, say: 'No topo, os números do controlo de qualidade: as pesquisas por contactar, as que já passaram o prazo de contacto, as respondidas, as que ficaram sem resposta, os detratores, que são os clientes insatisfeitos, e os problemas ainda em aberto.',
      act: async r => {
        for (const t of ['POR CONTACTAR', 'FORA DO PRAZO', 'RESPONDIDAS', 'SEM RESPOSTA', 'DETRATORES', 'PROBLEMAS EM ABERTO']) { const k = kpi(r, t); await r.ring(k, 6, 12); await r.to(k, 500); await r.wait(1250); }
        await r.off();
      } },
    { id: 's04', est: 11, say: 'Em baixo está a lista: uma pesquisa por cada trabalho concluído, com o cliente, a matrícula, o setor, a data de conclusão, o prazo para contactar e o estado.',
      act: async r => {
        await r.scrollTo(C, 300, 900); const row = rowOf(r, ORC); await r.ring(row, 4, 8); const b = await r.box(row);
        for (const fx of [0.03, 0.12, 0.27, 0.36, 0.45, 0.53, 0.6, 0.68]) { await r.move(b.x + b.width * fx + 20, b.y + b.height / 2, 350); await r.wait(420); }
      } },
    { id: 's05', est: 8, say: 'Em cada linha, o olho abre o orçamento do trabalho, e o lápis abre a pesquisa, para registares a resposta do cliente.',
      act: async r => { await r.off(); for (const t of ['Visualizar', 'Editar']) { const i = rowOf(r, ORC).locator(T(t)).first(); await r.ring(i, 8, 8); await r.to(i, 500); await r.wait(1300); } } },
    { id: 's06', est: 9, say: 'Vamos responder a uma. No topo da pesquisa tens o resumo do trabalho, e atalhos para ver o orçamento ou abrir um retrabalho na produção.',
      act: async r => {
        await r.off(); await r.click(rowOf(r, ORC).locator(T('Editar')).first(), 600); await r.settle(1300);
        const head = r.p.locator('div').filter({ has: r.el('ORÇAMENTO', 'div,span,small,b,label') }).filter({ has: r.el(/Ver orçamento/, 'a,button,span') }).last();
        await r.ring(head, 4, 10); await r.move(900, 260, 800); await r.wait(900);
        for (const t of [/Ver orçamento/, /Abrir retrabalho/]) { const b = r.el(t, 'a,button,span'); await r.ring(b, 6, 8); await r.to(b, 500); await r.wait(800); }
      } },
    { id: 's07', est: 9, say: 'No contacto marcas o resultado, respondida, o canal, por exemplo, telefone, e a data do contacto fica preenchida.',
      act: async r => {
        await r.off(); await r.click(radio(r, 'estado', await r.p.evaluate(() => { const i = [...document.querySelectorAll('input[name="estado"]')].find(i => /Respondida/i.test(i.parentElement.innerText)); return i ? i.value : 'R'; })), 600); await r.wait(400);
        const sel = r.p.locator('select[name="canal"]'); await r.click(sel, 600); await sel.selectOption({ label: 'Telefone' }); await r.wait(500);
        await r.ring(r.p.locator('input[name="data_contacto"]'), 6, 8); await r.to('input[name="data_contacto"]', 500);
      } },
    { id: 's08', est: 10, say: 'Depois, a pergunta principal: de zero a dez, qual a probabilidade de recomendar a oficina a um amigo. É o NPS. De nove a dez é promotor, e até seis é detrator.',
      act: async r => { await r.off(); await r.ring(radio(r, 'nps', 0).locator('xpath=..'), 8, 10); await r.move(700, 600, 600); await r.wait(2500); await r.off(); await r.click(radio(r, 'nps', 9), 700); await r.wait(600); } },
    { id: 's09', est: 11, say: 'E as notas de um a cinco por critério: o atendimento, a qualidade do trabalho, o cumprimento do prazo, o preço e a limpeza da viatura.',
      act: async r => {
        for (const [n, v] of [['nota_atendimento', 5], ['nota_qualidade', 5], ['nota_prazo', 4], ['nota_preco', 4], ['nota_limpeza', 5]]) { await r.click(radio(r, n, v), 550); await r.wait(650); }
      } },
    { id: 's10', est: 12, say: 'No bloco de qualidade registas se o cliente reportou algum problema, se é preciso retrabalho e se ficou resolvido, com a descrição e a ação corretiva. E podes guardar o comentário do cliente.',
      act: async r => {
        await r.scrollTo(C, 520, 900);
        const q = r.el(/^\s*Qualidade\s*$/, 'div,span,h4,h5,label,b'); await r.ring(q, 8, 8); await r.to(q, 500); await r.wait(900); await r.off();
        const c = r.vis('textarea[name="comentario"], textarea[name*="coment"]'); await r.click(c, 700);
        for (const ch of 'Muito satisfeito com a rapidez e a simpatia. Voltará para a revisão.') { await r.p.keyboard.type(ch); await r.wait(r.dry ? 0 : 36); }
      } },
    { id: 's11', est: 8, say: 'Clicas em Guardar. O sistema confirma, e a pesquisa passa a respondida.',
      act: async r => {
        const g = r.el('Guardar', 'a,button,span'); await r.ring(g, 6, 10); await r.click(g, 700); await r.off(); await r.settle(1200);
        const ok = r.el(/^\s*OK\s*$/, 'button,a'); if (await ok.count()) { await r.ring(ok, 6, 8); await r.wait(900); await r.off(); await r.click(ok, 500); await r.settle(900); }
      } },
    { id: 's12', est: 8, say: 'De volta à lista, os números do topo já estão atualizados: menos uma por contactar, e mais uma respondida.',
      act: async r => {
        if (!(await kpi(r, 'POR CONTACTAR').isVisible().catch(() => false))) { await r.open('PosVendaList'); }
        await r.scrollTo(C, 0, 600); await r.ring([kpi(r, 'POR CONTACTAR'), kpi(r, 'RESPONDIDAS')], 6, 12); await r.to(kpi(r, 'RESPONDIDAS'), 700);
      } },
    { id: 's13', est: 10, say: 'Cada cartão também filtra a lista. E tens a pesquisa rápida e os filtros, para encontrares um cliente, uma matrícula ou um orçamento.',
      act: async r => {
        await r.off(); await r.click(kpi(r, 'POR CONTACTAR'), 600); await r.settle(1000); await r.move(1000, 700, 600); await r.wait(600);
        await r.ring('input[type=search]', 6, 10); await r.to('input[type=search]', 600); await r.wait(700); await r.ring(btn(r, 'Filtros'), 6, 10); await r.to(btn(r, 'Filtros'), 500); await r.wait(500); await r.off();
      } },
    { id: 's14', est: 6, say: 'E no botão Indicadores de qualidade passas para os números de gestão da pós-venda.',
      act: async r => { const b = btn(r, 'Indicadores de qualidade'); await r.ring(b, 6, 10); await r.to(b, 700); } },
    { id: 's15', est: 9, say: 'E assim fazes as pesquisas de satisfação. No próximo vídeo vemos os Indicadores de qualidade. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.off(); await r.move(1100, 600, 800); } },
  ],
};
