// APP · Vídeo 2 — Criar conta e entrar
const { A, host, side, step, typeA, tapA, start, appEval, scrollTo, scrollApp, PW, sleep } = require('./apphelp');
const STEPS = ['Criar conta nova', 'Dados da oficina e do responsável', 'NIF e palavra-passe', 'Criar conta e entrar', 'Acesso dos colegas'];
module.exports = {
  name: 'app02_criar_conta', titulo: 'Criar conta e entrar', subtitulo: 'A tua oficina no Go Auto, criada a partir do telemóvel', n: 2, modulo: 'APP',
  start: async r => { require('child_process').execSync('python3 /root/work/rec/limpa_signup.py /root/work/demo/work.db ' + (process.env.GA_DB || '/root/work/demo/rec.db')); await start(r, '/app/'); await side(r, 'Criar conta e entrar', 'Para quem ainda não usa o Go Auto', STEPS, -1); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje crias a conta da tua oficina no Go Auto, a partir da app, e entras.',
      act: async r => { await r.move(1400, 600, 900); } },
    { id: 's02', est: 7, say: 'No ecrã de entrada, se ainda não tens conta, tocas em Criar conta nova.',
      act: async r => { await step(r, 0); await tapA(r, '#toSignup'); await sleep(900); } },
    { id: 's03', est: 11, say: 'Escreves o nome da oficina, e o teu nome. Depois, o e-mail, que vai ser o teu utilizador para entrar no Go Auto, e ainda o telefone de contacto.',
      act: async r => { await step(r, 1); await typeA(r, '#s_emp', 'Auto Reparadora Sol, Lda.', 60); await typeA(r, '#s_nome', 'Marta Sousa', 70); await typeA(r, '#s_email', 'marta.sousa@exemplo.pt', 45); await typeA(r, '#s_tel', '912000222', 70); } },
    { id: 's04', est: 10, say: 'No tipo escolhes NIF, e escreves o número de contribuinte da oficina. Depois crias a tua palavra-passe, e escreves outra vez, para confirmar.',
      act: async r => { await step(r, 2); await r.ring(A(r, '#s_tipo'), 5, 10); await sleep(700); await r.off(); await typeA(r, '#s_doc', '509999875', 75); await typeA(r, '#s_pw', PW(), 55); await typeA(r, '#s_pw2', PW(), 55); } },
    { id: 's05', est: 7, say: 'Por fim, lês e aceitas os termos de utilização, e tocas em Criar conta e entrar. Leva só alguns segundos.',
      act: async r => { await step(r, 3); await tapA(r, '#s_termo'); await sleep(400); await tapA(r, '#createBtn'); await sleep(3000); } },
    { id: 's06', est: 11, say: 'A conta fica criada, e a app abre logo, já com o nome da tua oficina. Como és o responsável, tens acesso a todos os painéis.',
      act: async r => { await r.ring(A(r, '#ctx'), 4, 10); await sleep(1500); await r.off(); await r.ring(A(r, '#roles'), 4, 10); await sleep(1800); await r.off(); } },
    { id: 's07', est: 13, say: 'Para os colegas, crias o acesso no Go Auto, em Recursos Humanos, Utilizadores do sistema. Eles entram aqui, com o utilizador e a palavra-passe, e cada um vê só o seu painel.',
      act: async r => { await step(r, 4); await tapA(r, '#avatar'); await sleep(900); await tapA(r, '#um-sair'); await sleep(1200); for (const s of ['#u', '#p']) { await r.ring(A(r, s), 5, 10); await sleep(900); } await r.off(); await r.ring(A(r, '#enter'), 5, 10); await sleep(1000); await r.off(); } },
    { id: 's08', est: 9, say: 'E assim crias a conta e entras na app. No próximo vídeo, vemos o painel do gestor. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1400, 700, 800); } },
  ],
};
