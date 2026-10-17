// APP · Vídeo 1 — Instalar a app no telemóvel
const { A, host, side, step, tapA, start, appEval, sleep } = require('./apphelp');
const STEPS = ['Abrir o endereço no telemóvel', 'Tocar em Instalar', 'A app fica no ecrã principal', 'Abrir a app'];
module.exports = {
  name: 'app01_instalar_app', titulo: 'Instalar a app', subtitulo: 'O Go Auto no telemóvel, no ecrã principal, em menos de um minuto', n: 1, modulo: 'APP',
  start: async r => { await start(r, '/app/', 'browser'); await side(r, 'Instalar a app', 'No telemóvel, Android ou iPhone', STEPS, -1); await r.p.evaluate(() => { document.getElementById('url').textContent = ''; }); },
  scenes: [
    { id: 's01', est: 10, say: 'Olá, eu sou a Bia, a tua assistente de formação. A partir de agora, o Go Auto vai contigo no bolso. Neste vídeo, instalas a app no telemóvel.',
      act: async r => { await r.move(1400, 600, 900); } },
    { id: 's02', est: 10, say: 'No telemóvel, abres o navegador, por exemplo o Chrome, e escreves o endereço: goauto ponto iteg for business ponto com, barra app.',
      act: async r => { await step(r, 0); const u = 'goauto.iteg4business.com/app'; for (let i = 1; i <= u.length; i++) { await r.p.evaluate(t => { document.getElementById('url').textContent = t; }, u.slice(0, i)); await sleep(r.dry ? 5 : 95); } await sleep(600); await r.ring('#urlbar', 4, 14); await sleep(1500); await r.off(); } },
    { id: 's03', est: 9, say: 'Aparece o ecrã de entrada do Go Auto, com o aviso: Instalar a app Go Auto. Tocas em Instalar.',
      act: async r => { await appEval(r, () => { const p = document.getElementById('installPop'); if (p) p.hidden = false; }); await sleep(900); await step(r, 1); const b = A(r, '#installYes'); await r.ring(A(r, '#installPop'), 6, 14); await sleep(1600); await r.off(); await tapA(r, b); await sleep(800); } },
    { id: 's04', est: 9, say: 'A app fica no ecrã principal, como qualquer outra, com o ícone do Go Auto, e abre em ecrã inteiro.',
      act: async r => { await host(r, 'mode', 'home'); await sleep(700); await host(r, 'mode', 'home installed'); await step(r, 2); await sleep(900); await r.ring('#gaicon', 6, 14); await r.to('#gaicon', 600); await sleep(1600); await r.off(); } },
    { id: 's05', est: 9, say: 'No iPhone, abres o mesmo endereço no Safari, tocas em Partilhar, e escolhes Adicionar ao ecrã principal.',
      act: async r => { await host(r, 'toast', 'iPhone · Safari: Partilhar ⬆ → Adicionar ao ecrã principal'); await r.ring('#toast', 4, 14); await sleep(3500); await r.off(); await host(r, 'toast', ''); } },
    { id: 's06', est: 7, say: 'Tocas no ícone, e a app abre no ecrã de entrada, pronta a usar.',
      act: async r => { await step(r, 3); await r.click('#gaicon', 500); await sleep(300); await appEval(r, () => { const p = document.getElementById('installPop'); if (p) p.hidden = true; }); await host(r, 'mode', ''); await sleep(800); await r.ring(A(r, '.lg-card'), 6, 18); await sleep(1500); await r.off(); } },
    { id: 's07', est: 9, say: 'E assim instalas a app. No próximo vídeo, crias a tua conta e entras. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1400, 700, 800); } },
  ],
};
