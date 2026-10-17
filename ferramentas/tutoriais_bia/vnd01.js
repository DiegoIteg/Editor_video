// VENDAS · Vídeo 1 — Painel do dia
const { sleep } = require('./engine');
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).first();
const kpi = (r, t) => r.p.locator('.gp-kpi', { hasText: t }).filter({ visible: true }).first();
const card = (r, t) => r.p.locator('.gp-cartao, .card, .panel').filter({ hasText: t }).filter({ has: r.p.locator('svg, canvas') }).filter({ visible: true }).last();

module.exports = {
  name: 'vnd01_painel_do_dia',
  titulo: 'Painel do dia — Vendas', subtitulo: 'O resumo comercial da oficina num só ecrã', n: 1, modulo: 'VENDAS',
  start: async r => { await r.open('VendasPainelDia'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje começamos o módulo de Vendas com o Painel do dia, o resumo comercial da oficina num só ecrã.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 6, say: 'No menu, abres Vendas e escolhes Painel do dia.',
      act: async r => { await r.menuG('VENDAS', 'Painel do dia'); } },
    { id: 's03', est: 5, say: 'No topo tens a data de hoje, para saberes sempre a que dia se referem os números.',
      act: async r => { const t = r.el(/^\s*Painel do dia — Vendas\s*$/, 'h1,h2,h3,h4,div,span'); const d = t.locator('xpath=following-sibling::*[1]'); await r.ring([t, d], 6, 8); await r.to(d, 600, .4, .5); } },
    { id: 's04', est: 9, say: 'Logo abaixo, os atalhos: criar um novo orçamento, abrir a lista de orçamentos, o funil comercial e a consolidação.',
      act: async r => { await r.off(); for (const t of ['Novo orçamento', 'Orçamentos', 'Funil comercial', 'Consolidação']) { await r.ring(btn(r, t), 6, 10); await r.to(btn(r, t), 380); await r.wait(700); } await r.off(); } },
    { id: 's05', est: 8, say: 'O primeiro cartão mostra o valor dos orçamentos em aberto, os que ainda estão em negociação ou agendados.',
      act: async r => { const k = kpi(r, 'ORÇAMENTOS EM ABERTO'); await r.ring(k, 6, 12); await r.to(k, 600, .3, .55); await r.wait(1500); } },
    { id: 's06', est: 8, say: 'O valor em curso é o trabalho que está na oficina, em produção ou concluído, mas ainda sem financeiro gerado.',
      act: async r => { await r.off(); const k = kpi(r, 'VALOR EM CURSO'); await r.ring(k, 6, 12); await r.to(k, 600, .3, .55); await r.wait(1500); } },
    { id: 's07', est: 8, say: 'Depois, quantos orçamentos estão ativos e em quantas etapas do funil se distribuem, e as entregas marcadas para hoje.',
      act: async r => { await r.off(); for (const t of ['ORÇAMENTOS ATIVOS', 'ENTREGAS HOJE']) { const k = kpi(r, t); await r.ring(k, 6, 12); await r.to(k, 500, .3, .55); await r.wait(1600); } } },
    { id: 's08', est: 9, say: 'O primeiro gráfico mostra os orçamentos ativos por etapa, do aberto ao concluído. Vês logo onde se acumula o trabalho.',
      act: async r => { await r.off(); const c = card(r, 'Orçamentos ativos por etapa'); await r.ring(c, 6); await r.move(470, 440, 700); await r.move(470, 625, 2200); } },
    { id: 's09', est: 9, say: 'Ao centro, onde estão os trabalhos: em produção, na fila de espera, à espera de peças ou prontos para o cliente levantar.',
      act: async r => { await r.off(); const c = card(r, 'Onde estão os trabalhos'); await r.ring(c, 6); await r.move(980, 445, 700); await r.move(980, 615, 2200); } },
    { id: 's10', est: 8, say: 'E à direita, as entregas previstas para os próximos sete dias, para planeares a semana com a equipa.',
      act: async r => { await r.off(); const c = card(r, 'Entregas previstas'); await r.ring(c, 6); await r.move(1460, 560, 700); await r.move(1830, 520, 2200); } },
    { id: 's11', est: 9, say: 'E assim lês o Painel do dia de Vendas. No próximo vídeo vamos ao Funil comercial. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.off(); await r.move(1100, 760, 800); } },
  ],
};
