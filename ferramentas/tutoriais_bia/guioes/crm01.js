// CRM · Vídeo 1 — Painel do dia
const { sleep } = require('./engine');
const C = '#adianti_content';
const T = t => `[title="${t}"], [data-original-title="${t}"], [data-bs-original-title="${t}"]`;
const card = (r, t) => r.p.locator(T('Clique para filtrar'), { hasText: t }).first();
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t) }).first();
const side = (r, t) => r.p.locator('#ga-side a').filter({ hasText: new RegExp('^\\s*' + t + '\\s*$') }).first();

module.exports = {
  name: 'crm01_painel_do_dia',
  titulo: 'Painel do dia', subtitulo: 'O posto de comando do CRM, todos os dias', n: 1,
  start: async r => { await r.open('CrmPainelDia'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vou ensinar-te a usar o Painel do dia do CRM, o ecrã onde começa o dia de trabalho de quem gere a oficina.',
      act: async r => { await r.move(1100, 560, 900); await r.wait(5000); } },
    { id: 's02', est: 10, say: 'Para lá chegar, abres o CRM no menu à esquerda. Aparecem os submódulos: o Painel do dia, a Prospeção, os Clientes, as Viaturas dos clientes e a Pós-venda. Clicamos em Painel do dia.',
      act: async r => {
        await r.click(side(r, 'CRM'), 900); await r.wait(900);
        const items = ['Painel do dia', 'Prospeção', 'Clientes', 'Viaturas dos clientes', 'Pós-venda'];
        const boxes = []; for (const t of items) boxes.push(await r.box(side(r, t)));
        const x0 = Math.min(...boxes.map(b => b.x)) - 14, y0 = boxes[0].y - 8, y1 = boxes[boxes.length - 1].y + boxes[boxes.length - 1].height + 8;
        await r.ringXY(x0, y0, 252 - x0, y1 - y0);
        for (const t of items) { await r.to(side(r, t), 450); await r.wait(650); }
        await r.wait(400); await r.off();
        await r.click(side(r, 'Painel do dia'), 500); await r.settle(1800);
      } },
    { id: 's03', est: 6, say: 'No topo tens o nome do painel e a data de hoje. À direita, a pesquisa rápida.',
      act: async r => {
        await r.ring(r.p.locator('h1, h2, h3, .page-title, div').filter({ hasText: /^Painel do dia$/ }).last(), 10);
        await r.wait(1800); await r.ring('input[type=search]', 8); await r.to('input[type=search]', 700);
      } },
    { id: 's04', est: 8, say: 'Escreves, por exemplo, o nome de um cliente, e as listas do painel ficam logo filtradas, só com os trabalhos dele.',
      act: async r => {
        await r.off(); await r.type('input[type=search]', 'Filipa', 110); await r.wait(900);
        await r.scrollTo(C, 940, 1600); await r.wait(500);
        await r.ring(r.p.locator('.card, .panel, div').filter({ has: r.p.locator('text="Entregas em atraso"') }).filter({ has: r.p.locator('table') }).last(), 6);
      } },
    { id: 's05', est: 6, say: 'Se carregares em Enter, a pesquisa vai a todos os registos da oficina, e não só aos de hoje.',
      act: async r => { await r.off(); await r.scrollTo(C, 0, 900); await r.click('input[type=search]', 400); await r.wait(200); await r.p.keyboard.press('Enter'); await r.settle(900); await r.move(1100, 560, 600); } },
    { id: 's06', est: 12, say: 'Por baixo, a barra de atalhos: criar um novo orçamento ou um novo cliente, abrir a prospeção ou a lista de orçamentos, atualizar os números e limpar os filtros, para voltar ao painel completo.',
      act: async r => {
        await r.scrollTo(C, 0, 800);
        const names = ['Novo orçamento', 'Novo cliente', 'Prospecção', 'Orçamentos', 'Atualizar', 'Limpar filtros'];
        for (const t of names) { await r.ring(btn(r, t), 6, 10); await r.to(btn(r, t), 380); await r.wait(620); }
        await r.off(); await r.click(btn(r, 'Limpar filtros'), 250); await r.settle(900);
      } },
    { id: 's07', est: 9, say: 'Os cartões mostram, num relance, o que precisa da tua atenção hoje. Os que têm alertas aparecem destacados, e os que estão a zero ficam mais suaves.',
      act: async r => {
        const a = await r.box(card(r, 'ENTREGAS EM ATRASO')), b = await r.box(card(r, 'VALOR EM CURSO'));
        await r.ringXY(a.x - 8, a.y - 8, b.x + b.width - a.x + 16, b.y + b.height - a.y + 16, 16);
        await r.move(a.x + 300, a.y + 200, 900); await r.move(b.x + 100, b.y + 40, 1600); await r.wait(1500);
        await r.ring([card(r, 'PRONTOS E AINDA'), card(r, 'ENTRADAS EM ATRASO')], 6);
      } },
    { id: 's08', est: 15, say: 'Por exemplo, as entregas em atraso, trabalhos que já passaram a data combinada com o cliente. Os concluídos sem financeiro, trabalhos prontos que ainda não foram faturados. E o valor em curso na oficina, tudo o que está neste momento em trabalhos abertos.',
      act: async r => {
        await r.off(); await r.ring(card(r, 'ENTREGAS EM ATRASO'), 6); await r.to(card(r, 'ENTREGAS EM ATRASO'), 700); await r.wait(3800);
        await r.ring(card(r, 'CONCLUÍDOS SEM FINANCEIRO'), 6); await r.to(card(r, 'CONCLUÍDOS SEM FINANCEIRO'), 900); await r.wait(4200);
        await r.ring(card(r, 'VALOR EM CURSO'), 6); await r.to(card(r, 'VALOR EM CURSO'), 800);
      } },
    { id: 's09', est: 7, say: 'Cada cartão é um atalho. Ao clicar em Entregas em atraso, o painel desce diretamente até à lista desses trabalhos.',
      act: async r => { await r.off(); await r.click(card(r, 'ENTREGAS EM ATRASO'), 900); await r.settle(1500); await r.move(1000, 700, 700); } },
    { id: 's10', est: 9, say: 'Em cada linha tens o número do orçamento, o cliente, a matrícula, o setor, a etapa em que está, a data prometida e o valor.',
      act: async r => {
        const row = r.p.locator('tr', { has: r.p.locator(T('Visualizar')) }).first();
        await r.ring(row, 4, 8); const b = await r.box(row);
        for (const fx of [0.02, 0.1, 0.3, 0.45, 0.58, 0.7, 0.86]) { await r.move(b.x + b.width * fx + 20, b.y + b.height / 2, 380); await r.wait(420); }
      } },
    { id: 's11', est: 15, say: 'O olho abre a consulta do orçamento, sem sair do painel: a viatura, os produtos, os serviços e as horas, e o resumo financeiro. Daqui podes editar, ver o follow-up ou todos os orçamentos do cliente.',
      act: async r => {
        await r.off(); await r.click(r.p.locator(T('Visualizar')).first(), 700); await r.settle(1600);
        const pane = 'div:has(> div > div:text("Consulta Orçamentos"))';
        await r.ring(r.el(/VIATURA\s*$/), 10); await r.wait(1300);
        await r.ring(r.el('PRODUTOS E SERVIÇOS'), 10); await r.wait(700);
        for (const t of ['SERVIÇOS', 'HORAS']) { await r.click(r.el(t, 'a,li,span'), 400); await r.wait(500); }
        await r.ring(r.el(/RESUMO FINANCEIRO\s*$/), 10); await r.wait(1100);
        for (const t of ['Editar', 'Follow-up', 'Orçamentos do cliente']) { await r.ring(r.el(t), 7, 10); await r.to(r.el(t), 350); await r.wait(450); }
      } },
    { id: 's12', est: 8, say: 'Fechas e voltas ao painel. E, no fundo de cada lista, Ver todos abre a lista completa de orçamentos, já filtrada.',
      act: async r => {
        await r.off(); await r.click(r.el('Fechar'), 500); await r.settle(900);
        const v = r.vis(r.p.locator('a,button', { hasText: /Ver todos/ })); await r.ring(v, 6, 10); await r.to(v, 800);
      } },
    { id: 's13', est: 16, say: 'Mais acima, os gráficos: os trabalhos em produção por setor; onde estão as viaturas dentro da oficina; os orçamentos ativos por etapa, do aberto ao concluído; e as entregas previstas para os próximos sete dias.',
      act: async r => {
        await r.off(); await r.scrollTo(C, 330, 900); await r.wait(200);
        for (const t of ['Trabalhos em produção por setor', 'Oficina: onde estão as viaturas', 'Orçamentos ativos por etapa', 'Entregas previstas']) {
          const c = r.p.locator('.card, .panel, div').filter({ has: r.p.locator(`text=${t}`) }).filter({ has: r.p.locator('svg, canvas') }).last();
          await r.ring(c, 6); await r.to(c, 600); await r.wait(1900);
        }
      } },
    { id: 's14', est: 9, say: 'Para afinar a análise, abres os Filtros. Podes filtrar por número de orçamento, cliente, matrícula, datas, setor ou etapa.',
      act: async r => {
        await r.off(); await r.scrollTo(C, 0, 700); await r.click(btn(r, 'Filtros'), 600); await r.settle(700);
        const f = ['Nº do orçamento', 'Cliente:', 'Matrícula', 'Data do orçamento — de', 'Setor', 'Etapa / estado'];
        for (const t of f) { const l = r.el(new RegExp('^\\s*' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), 'label,span,div,b'); await r.ring(l, 6, 8); await r.to(l, 300); await r.wait(260); }
      } },
    { id: 's15', est: 11, say: 'Escolhemos, por exemplo, o setor Chapa e Pintura e clicamos em Buscar. O painel inteiro passa a mostrar só esse setor, e o botão Filtros mostra quantos filtros estão ativos.',
      act: async r => {
        await r.off(); await r.pick(await r.p.evaluate(() => { const s = [...document.querySelectorAll('select')].find(s => [...s.options].some(o => o.text === 'Chapa e Pintura')); return s ? s.name : 'setor'; }), 'Chapa e Pintura');
        await r.wait(500); await r.click(r.el('Buscar'), 600); await r.settle(1800);
        await r.ring(btn(r, 'Filtros'), 8, 10); await r.to(btn(r, 'Filtros'), 700);
      } },
    { id: 's16', est: 5, say: 'Para voltar a ver tudo, basta clicar em Limpar filtros.',
      act: async r => { await r.off(); await r.click(btn(r, 'Limpar filtros'), 600); await r.settle(900); await r.move(1100, 600, 500); } },
    { id: 's17', est: 9, say: 'E assim dominas o Painel do dia. No próximo vídeo vamos à Prospeção, o funil de oportunidades do CRM. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.wait(3000); } },
  ],
};
