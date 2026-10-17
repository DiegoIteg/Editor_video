// PRODUÇÃO · Vídeo 1 — Painel do dia
const { sleep } = require('./engine');
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).first();
const kpi = (r, t) => r.p.locator('.gp-kpi', { hasText: t }).filter({ visible: true }).first();
const card = (r, t) => r.p.locator('.gp-cartao, .card, .panel').filter({ hasText: t }).filter({ has: r.p.locator('svg, canvas') }).filter({ visible: true }).last();

module.exports = {
  name: 'prd01_painel_do_dia',
  titulo: 'Painel do dia — Produção', subtitulo: 'A oficina de hoje num só ecrã', n: 1, modulo: 'PRODUÇÃO',
  start: async r => { await r.open('ProducaoPainelDia'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje começamos o módulo de Produção com o Painel do dia: tudo o que está a acontecer na oficina, num só ecrã.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Produção e escolhes Painel do dia.',
      act: async r => { await r.menuG('PRODUÇÃO', 'Painel do dia'); } },
    { id: 's03', est: 8, say: 'Nos atalhos vais direto ao controlo de produção, pedes um serviço externo ou vês os serviços que estão fora.',
      act: async r => { for (const t of ['Controlo de produção', 'Pedir serviço externo', 'Serviços externos']) { await r.ring(btn(r, t), 6, 10); await r.to(btn(r, t), 380); await r.wait(800); } await r.off(); } },
    { id: 's04', est: 10, say: 'Os cartões dizem-te quantos carros estão em produção agora, quantas entregas tens hoje, quantos estão prontos à espera do cliente e o valor do trabalho em curso.',
      act: async r => { for (const t of ['EM PRODUÇÃO AGORA', 'ENTREGAS HOJE', 'PRONTOS PARA LEVANTAR', 'VALOR EM CURSO']) { const k = kpi(r, t); await r.ring(k, 6, 12); await r.to(k, 450, .3, .55); await r.wait(1250); } await r.off(); } },
    { id: 's05', est: 8, say: 'O primeiro gráfico reparte os trabalhos em produção por setor: chapa e pintura, mecânica e os outros.',
      act: async r => { const c = card(r, 'Trabalhos em produção por setor'); await r.ring(c, 6); await r.move(260, 560, 700); await r.move(500, 520, 1800); } },
    { id: 's06', est: 8, say: 'Ao lado, onde estão as viaturas: em produção, na fila de espera, à espera de peças ou prontas a levantar.',
      act: async r => { await r.off(); const c = card(r, 'Onde estão as viaturas'); await r.ring(c, 6); await r.move(700, 440, 700); await r.move(700, 620, 1800); } },
    { id: 's07', est: 8, say: 'Depois, os orçamentos ativos por etapa, e as entregas previstas para os próximos sete dias.',
      act: async r => { await r.off(); for (const t of ['Orçamentos ativos por etapa', 'Entregas previstas']) { const c = card(r, t); await r.ring(c, 6); await r.to(c, 600, .5, .5); await r.wait(1300); await r.off(); } } },
    { id: 's08', est: 9, say: 'E assim lês o Painel do dia da Produção. No próximo vídeo vamos ao Controlo de produção. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 760, 800); } },
  ],
};
