// APP · Vídeo 3 — Painel do gestor
const { A, F, host, side, step, typeA, tapA, login, start, scrollTo, scrollApp, sleep } = require('./apphelp');
const STEPS = ['Entrar', 'Os painéis da tua conta', 'O mês em números', 'Faturação e setores', 'O que espera decisão'];
module.exports = {
  name: 'app03_painel_gestor', titulo: 'Painel do gestor', subtitulo: 'A empresa inteira no telemóvel: o mês, a oficina e o que espera decisão', n: 3, modulo: 'APP',
  start: async r => { await start(r, '/app/'); await side(r, 'Painel do gestor', 'Para a direção e os responsáveis', STEPS, -1); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vemos o painel do gestor na app: a empresa inteira no telemóvel.',
      act: async r => { await r.move(1400, 600, 900); } },
    { id: 's02', est: 8, say: 'Entras com o teu utilizador e a tua palavra-passe, os mesmos do Go Auto no computador, e tocas em Login. A app abre logo, já com os teus dados.',
      act: async r => { await step(r, 0); await login(r, 'ricardo.matos'); } },
    { id: 's03', est: 10, say: 'Em cima vês a empresa e a filial. Por baixo, os painéis a que a tua conta tem acesso: o gestor, o comercial e o da oficina.',
      act: async r => { await step(r, 1); await r.ring(A(r, '#ctx'), 4, 10); await sleep(1400); await r.off(); await r.ring(A(r, '#roles'), 4, 10); await sleep(2200); await r.off(); } },
    { id: 's04', est: 12, say: 'A visão global mostra o mês: a faturação, comparada com o mês anterior, a eficiência da oficina, as entregas e o que tens a receber. As cores dizem logo o que está bem e o que precisa de atenção.',
      act: async r => { await step(r, 2); const ks = F(r).locator('#g-kpis > *'); const n = await ks.count(); for (let i = 0; i < n; i++) { await r.ring(ks.nth(i), 4, 10); await r.to(ks.nth(i), 300); await sleep(900); } await r.off(); } },
    { id: 's05', est: 10, say: 'O gráfico mostra a faturação dos últimos seis meses. E por setor, vês quantos carros estão em produção em cada um.',
      act: async r => { await step(r, 3); await scrollTo(r, '#bars', 140); await sleep(400); await r.ring(A(r, '#bars'), 6, 12); await sleep(2200); await r.off(); await scrollTo(r, '#setores', 160); await sleep(300); await r.ring(A(r, '#setores'), 6, 12); await sleep(2000); await r.off(); } },
    { id: 's06', est: 10, say: 'E em baixo, as ações a precisar de decisão: pedidos de férias por aprovar, contas em atraso, e tudo o que espera por ti.',
      act: async r => { await step(r, 4); await scrollTo(r, '#g-acoes', 200); await sleep(300); await r.ring(A(r, '#g-acoes'), 6, 12); await sleep(2500); await r.off(); } },
    { id: 's07', est: 9, say: 'Na barra de baixo vais ao resumo, ao financeiro e às restantes áreas. Tudo atualizado, em tempo real.',
      act: async r => { await scrollApp(r, 0, 600); await r.ring(A(r, '.tabbar'), 4, 12); await sleep(2500); await r.off(); } },
    { id: 's08', est: 9, say: 'E assim acompanhas a empresa no telemóvel. No próximo vídeo vemos o painel do técnico. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1400, 700, 800); } },
  ],
};
