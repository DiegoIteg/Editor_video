// CRM · Vídeo 2 — Prospeção (funil de oportunidades)
const { sleep } = require('./engine');
const T = t => `[title="${t}"], [data-original-title="${t}"], [data-bs-original-title="${t}"]`;
const side = (r, t) => r.p.locator('#ga-side a').filter({ hasText: new RegExp('^\\s*' + t + '\\s*$') }).first();
const stage = (r, t) => r.p.locator('.kanban-stage').filter({ has: r.p.locator('.kanban-title', { hasText: t }) }).first();
const cardOf = (r, t) => r.p.locator('.kanban-item', { hasText: t }).first();
const BOARD = '#adianti_content';
const TITULO = 'Revisão dos 60.000 km e travões — Ana Teixeira Carvalho';

module.exports = {
  name: 'crm02_prospecao',
  titulo: 'Prospeção', subtitulo: 'O funil de oportunidades, do contacto ao negócio', n: 2,
  start: async r => { await r.open('GestaoLeadsView'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vou ensinar-te a usar a Prospeção, o quadro onde acompanhas cada oportunidade de negócio, desde o primeiro contacto até ao negócio ganho ou perdido.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'Para lá chegar, abres o CRM no menu e escolhes Prospeção.',
      act: async r => { await r.menu('CRM', 'Prospeção'); } },
    { id: 's03', est: 12, say: 'O quadro está organizado por etapas: novo contacto, contactado, orçamento enviado, negociação, ganho e perdido. Cada coluna é uma etapa, e cada cartão é uma oportunidade.',
      act: async r => {
        const names = ['Novo contacto', 'Contactado', 'Orçamento enviado', 'Negociação', 'Ganho'];
        for (const n of names) { const h = r.p.locator('.kanban-title').filter({ hasText: n }).first(); await r.ring(h, 8, 10); await r.to(h, 450); await r.wait(650); }
        await r.off(); await r.scrollX(BOARD, 600, 1000); const h = r.p.locator('.kanban-title').filter({ hasText: 'Perdido' }).first(); await r.ring(h, 8, 10); await r.to(h, 400); await r.wait(900);
        await r.off(); await r.scrollX(BOARD, -600, 900);
      } },
    { id: 's04', est: 13, say: 'Em cada cartão vês o título da oportunidade, o cliente, o orçamento ligado e o seu valor, e a data do próximo contacto. Quando esse contacto já passou, a data aparece a vermelho, para não deixares nenhum cliente esquecido.',
      act: async r => {
        const c = r.p.locator('.kanban-item', { hasText: 'Contacto em atraso' }).first(); await r.ring(c, 4, 10); await r.to(c, 700, .5, .2); await r.wait(2600);
        const late = c.locator('text=/Contacto em atraso/'); await r.ring(late, 5, 6); await r.to(late, 600); await r.wait(2000);
      } },
    { id: 's05', est: 11, say: 'Por baixo de cada cartão tens quatro ações: a lupa para ver os detalhes, o lápis para editar, o caixote para apagar, e o documento, que abre um orçamento a partir desta oportunidade.',
      act: async r => {
        const c = r.p.locator('.kanban-item', { hasText: 'Contacto em atraso' }).first();
        const ic = c.locator('a, i, span').filter({ has: r.p.locator('i') }).or(c.locator('i.fas, i.far, i.fa'));
        const icons = c.locator('i.fas, i.far, i.fa').filter({ visible: true });
        const n = await icons.count(); const last = Math.min(n, 6);
        for (let i = Math.max(0, last - 4); i < last; i++) { await r.ring(icons.nth(i), 9, 8); await r.to(icons.nth(i), 450); await r.wait(1500); }
        await r.off();
      } },
    { id: 's06', est: 9, say: 'Para avançar uma oportunidade, basta arrastares o cartão para a etapa seguinte. Aqui, o cliente já recebeu o orçamento, por isso passa para Orçamento enviado.',
      act: async r => {
        const c = cardOf(r, 'Pedido de orçamento por telefone — Filipe'); const b = await r.box(c); const col = await r.box(stage(r, 'Orçamento enviado'));
        await r.ring(c, 4, 10); await r.move(b.x + 80, b.y + 22, 700); await r.wait(500); await r.off();
        await r.p.mouse.down(); await r.wait(250);
        await r.move(col.x + 120, col.y + 110, 1600); await r.wait(500); await r.p.mouse.up(); await r.settle(1200);
        await r.ring(cardOf(r, 'Pedido de orçamento por telefone — Filipe'), 4, 10);
      } },
    { id: 's07', est: 7, say: 'Para registar uma nova oportunidade, clicas em Nova tarefa, no fundo da etapa.',
      act: async r => { await r.off(); const n = stage(r, 'Contactado').locator('a, span, div', { hasText: /^\s*\+?\s*Nova tarefa\s*$/ }).last(); await r.ring(n, 6, 8); await r.click(n, 800); await r.off(); await r.settle(1300); } },
    { id: 's08', est: 12, say: 'Escreves um título que diga logo o que o cliente quer, por exemplo, revisão dos sessenta mil quilómetros e travões, e escolhes o cliente na lista. Basta começares a escrever o nome.',
      act: async r => {
        await r.type('input[name="titulo"]', TITULO, 55);
        const s2 = r.p.locator('select[name="pessoa_id"] + .select2 .select2-selection').first(); await r.click(s2, 600); await r.wait(400);
        for (const ch of 'Ana Teix') { await r.p.keyboard.type(ch); await r.wait(110); }
        await r.wait(1400); const opt = r.p.locator('.select2-container--open .select2-results__option', { hasText: 'Ana Teixeira Carvalho' }).first();
        await r.to(opt, 500); await r.wait(300); await opt.click(); await r.wait(500);
      } },
    { id: 's09', est: 10, say: 'Podes ligar a oportunidade a um orçamento que já exista. E no texto escreves a nota do contacto: o que o cliente pediu e qual é o próximo passo.',
      act: async r => {
        await r.ring(r.el(/^\s*Orçamento\s*$/, 'label,span,div'), 6, 8); await r.to(r.p.locator('select[name="orcamento_id"] + .select2 .select2-selection').first(), 600); await r.wait(1200); await r.off();
        const ed = r.vis('.note-editable'); await r.click(ed, 600); await r.wait(200);
        for (const ch of 'Cliente pediu orçamento para a revisão e para as pastilhas da frente. Ligar na segunda-feira de manhã.') { await r.p.keyboard.type(ch); await r.wait(r.dry ? 0 : 38); }
      } },
    { id: 's10', est: 8, say: 'Clicas em Salvar. O sistema confirma, e a nova oportunidade aparece no quadro, pronta a ser acompanhada.',
      act: async r => {
        await r.ring(r.el('Salvar', 'a,button,span'), 6, 10); await r.click(r.el('Salvar', 'a,button,span'), 600); await r.off(); await r.settle(1000);
        const ok = r.el(/^\s*OK\s*$/, 'button,a'); await r.ring(ok, 6, 8); await r.wait(900); await r.off(); await r.click(ok, 500); await r.settle(900);
        const c = cardOf(r, 'Revisão dos 60.000 km'); await c.scrollIntoViewIfNeeded().catch(() => {}); await r.wait(300); await r.ring(c, 4, 10); await r.to(c, 700, .5, .25);
      } },
    { id: 's11', est: 10, say: 'Na lupa abres a ficha da oportunidade, com o título, o cliente, a nota e as datas de criação e de atualização.',
      act: async r => {
        await r.off(); const c = cardOf(r, 'Revisão dos 60.000 km'); await r.click(c.locator(T('Ver')).first(), 600); await r.settle(1400);
        for (const t of [/^\s*Titulo:|^\s*Título:/, /^\s*Pessoa id:/, /^\s*Texto:/, /^\s*Data de criação:/]) { const l = r.el(t, 'label,span,div,b'); if (await l.count()) { await r.ring(l, 8, 8); await r.to(l, 450); await r.wait(900); } }
      } },
    { id: 's12', est: 6, say: 'Para voltar ao quadro, abres de novo a Prospeção no menu do CRM.',
      act: async r => { await r.off(); await r.menu('CRM', 'Prospeção'); } },
    { id: 's13', est: 11, say: 'Os três pontos de cada etapa abrem o menu da lista: criar uma nova lista, editar o nome ou apagar. Assim, o quadro fica à imagem do teu processo comercial.',
      act: async r => {
        const m = r.p.locator('i.material-icons').nth(1); await r.ring(m, 8, 8); await r.click(m, 700); await r.off(); await r.wait(600);
        const items = r.p.locator('.dropdown-menu.show a, .dropdown-menu.show li').filter({ visible: true });
        for (const t of ['Nova Lista', 'Editar Lista', 'Deletar']) { const it = items.filter({ hasText: t }).first(); await r.ring(it, 4, 6); await r.to(it, 450); await r.wait(900); }
        await r.off(); await r.p.keyboard.press('Escape'); await r.move(1500, 160, 500); await r.p.mouse.click(1500, 160); await r.wait(300);
      } },
    { id: 's14', est: 10, say: 'E para apagar uma oportunidade, clicas no caixote. O sistema pede sempre confirmação, e só depois do sim é que remove.',
      act: async r => {
        const c = cardOf(r, 'Revisão dos 60.000 km'); await c.scrollIntoViewIfNeeded().catch(() => {});
        const del = c.locator('i[class*="fa-trash"]').first(); await r.ring(del, 9, 8); await r.click(del, 700); await r.off(); await r.wait(1200);
        const sim = r.el(/^\s*Sim\s*$/, 'button,a,span'); await r.ring(sim, 6, 8); await r.to(sim, 600); await r.wait(900); await r.off(); await r.click(sim, 300); await r.settle(1500);
      } },
    { id: 's15', est: 9, say: 'No topo tens os atalhos: criar um novo cliente ou um novo orçamento, abrir o cadastro de clientes ou voltar ao painel do dia.',
      act: async r => {
        for (const t of ['Novo cliente', 'Novo orçamento', 'Cadastro de clientes', 'Painel do dia']) { const b = r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: t }).filter({ visible: true }).first(); await r.ring(b, 6, 10); await r.to(b, 450); await r.wait(900); }
        await r.off();
      } },
    { id: 's16', est: 9, say: 'E assim dominas a Prospeção. No próximo vídeo vamos ao Cadastro de clientes. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 600, 800); } },
  ],
};
