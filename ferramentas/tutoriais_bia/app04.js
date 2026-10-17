// APP · Vídeo 4 — Painel do técnico
const { A, F, host, side, step, typeA, tapA, login, start, scrollTo, scrollApp, sleep } = require('./apphelp');
const STEPS = ['Entrar', 'A minha produção', 'As minhas ordens', 'Concluir uma etapa', 'Pedir férias ou ausência'];
module.exports = {
  name: 'app04_painel_tecnico', titulo: 'Painel do técnico', subtitulo: 'As ordens de serviço, as etapas e os pedidos de férias no telemóvel', n: 4, modulo: 'APP',
  start: async r => { await start(r, '/app/'); await side(r, 'Painel do técnico', 'Para quem trabalha na oficina', STEPS, -1); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vemos o painel do técnico na app: o trabalho da oficina, no telemóvel.',
      act: async r => { await r.move(1400, 600, 900); } },
    { id: 's02', est: 7, say: 'Entras com o teu utilizador e a tua palavra-passe, e tocas em Login. Abre logo o teu painel, com as tuas ordens e a tua produção.',
      act: async r => { await step(r, 0); await login(r, 'bruno.rocha'); } },
    { id: 's03', est: 11, say: 'No bloco A minha produção vês as ordens do mês, as horas de produção, as etapas concluídas e o retrabalho. E o gráfico do teu desempenho, mês a mês.',
      act: async r => { await step(r, 1); const ks = F(r).locator('#op-kpis > *'); const n = await ks.count(); for (let i = 0; i < n; i++) { await r.ring(ks.nth(i), 4, 10); await r.to(ks.nth(i), 280); await sleep(800); } await r.off(); await scrollTo(r, '#op-bars', 160); await r.ring(A(r, '#op-bars'), 6, 12); await sleep(1800); await r.off(); } },
    { id: 's04', est: 9, say: 'Em Minhas ordens tens os carros atribuídos a ti, com a etapa em que está cada um. Tocas numa ordem para agir.',
      act: async r => { await step(r, 2); await scrollTo(r, '#op-ordens', 150); await sleep(300); await r.ring(A(r, '#op-ordens'), 6, 12); await sleep(2000); await r.off(); const o = F(r).locator('#op-ordens > *').first(); await tapA(r, o); await sleep(1800); } },
    { id: 's05', est: 13, say: 'Vês o estado da ordem, e podes pausar a etapa, ou concluí-la. Escreves um comentário, por exemplo, que o carro está pronto para a etapa seguinte, e tocas em Concluir etapa.',
      act: async r => { await step(r, 3); await r.ring(A(r, '.sheet-card'), 6, 14); await sleep(1500); await r.off(); const fb = A(r, '#op-cobs'); await r.click(fb, 400); for (const ch of 'Montagem feita, pronto para a higienização') { await r.p.keyboard.type(ch); await sleep(r.dry ? 10 : 55); } await sleep(300); await tapA(r, '#op-concluir'); await sleep(2200); } },
    { id: 's06', est: 13, say: 'Para pedir férias ou comunicar uma ausência, tocas em Pedir férias. Escolhes o tipo, por exemplo, consulta médica, e as datas. Se quiseres, escreves o motivo e anexas a justificação. Tocas em Enviar pedido, e o pedido chega ao teu responsável.',
      act: async r => { await step(r, 4); const x = A(r, '#sheet-x'); if (await x.isVisible().catch(() => false)) { await r.click(x, 300); await sleep(500); } await scrollTo(r, '#op-rh-novo', 220); await tapA(r, '#op-rh-novo'); await sleep(900); const t = A(r, '#op-rh-tipo'); await r.ring(t, 4, 10); await r.click(t, 350); await r.p.keyboard.press('Escape'); await t.selectOption({ label: 'Consulta médica' }); await sleep(500); await r.off(); for (const [id, v] of [['#op-rh-ini', '2026-11-05'], ['#op-rh-fim', '2026-11-05']]) { const d = A(r, id); await r.ring(d, 4, 10); await d.fill(v); await sleep(700); await r.off(); } await typeA(r, '#op-rh-obs', 'Consulta no centro de saúde', 60); await tapA(r, '#op-rh-enviar'); await sleep(2000); } },
    { id: 's07', est: 8, say: 'Em Os meus pedidos vês o pedido novo, por aprovar, e depois a resposta, assim que for decidido.',
      act: async r => { await scrollTo(r, '#op-rh-lista', 180); await sleep(300); const l = F(r).locator('#op-rh-lista > *').first(); await r.ring(l, 4, 10); await sleep(2200); await r.off(); } },
    { id: 's08', est: 9, say: 'E assim trabalhas na oficina com a app. No próximo vídeo vemos o painel do comercial. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1400, 700, 800); } },
  ],
};
