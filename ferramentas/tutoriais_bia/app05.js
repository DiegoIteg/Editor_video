// APP · Vídeo 5 — Painel do comercial
const { A, F, host, side, step, typeA, tapA, login, start, scrollTo, scrollApp, sleep } = require('./apphelp');
const STEPS = ['Entrar', 'O meu funil do mês', 'Os meus orçamentos', 'Novo orçamento no telemóvel', 'Fotos, etapa e envio'];
module.exports = {
  name: 'app05_painel_comercial', titulo: 'Painel do comercial', subtitulo: 'Orçamentos feitos no telemóvel, ao lado do cliente', n: 5, modulo: 'APP',
  start: async r => { await start(r, '/app/'); await side(r, 'Painel do comercial', 'Para quem vende e recebe os clientes', STEPS, -1); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vemos o painel do comercial na app: orçamentos feitos ao lado do cliente.',
      act: async r => { await r.move(1400, 600, 900); } },
    { id: 's02', est: 6, say: 'Entras com o teu utilizador e a tua palavra-passe, e tocas em Login. Abre logo o teu painel de vendas, com os teus números do mês.',
      act: async r => { await step(r, 0); await login(r, 'ines.neves'); } },
    { id: 's03', est: 11, say: 'O painel mostra o teu mês: os orçamentos feitos, os aprovados, a taxa de conversão, e o valor em aberto, por decidir.',
      act: async r => { await step(r, 1); const ks = F(r).locator('#co-kpis > *'); const n = await ks.count(); for (let i = 0; i < n; i++) { await r.ring(ks.nth(i), 4, 10); await r.to(ks.nth(i), 280); await sleep(900); } await r.off(); } },
    { id: 's04', est: 8, say: 'Na lista Os meus orçamentos tens tudo, com o cliente, o valor e a etapa de cada um.',
      act: async r => { await step(r, 2); await scrollTo(r, '#co-orcamentos', 150); await sleep(300); await r.ring(A(r, '#co-orcamentos'), 6, 12); await sleep(2200); await r.off(); } },
    { id: 's05', est: 12, say: 'Para um orçamento novo, tocas em Novo orçamento. Escreves o nome do cliente, e a app procura-o na tua lista de clientes. Escolhes o cliente certo, e depois a viatura dele, que fica logo ligada ao orçamento.',
      act: async r => { await step(r, 3); await scrollTo(r, '#co-novo', 260); await tapA(r, '#co-novo'); await sleep(900); await typeA(r, '#no_cli', 'Hugo Barbosa', 90); await sleep(1500); const s = F(r).locator('#no_clisug > *').first(); await tapA(r, s); await sleep(1600); const v = A(r, '#no_viatura'); if (await v.count()) { await r.ring(v, 4, 10); await r.click(v, 350); await r.p.keyboard.press('Escape'); await v.selectOption({ index: 1 }); await sleep(600); await r.off(); } } },
    { id: 's06', est: 12, say: 'Nos itens procuras no catálogo os produtos, os serviços ou as horas. Escolhes, indicas a quantidade, e tocas em Adicionar. O subtotal é calculado logo.',
      act: async r => { await scrollTo(r, '#no_itipo', 200); await r.ring(A(r, '#no_itipo'), 4, 10); await sleep(800); await r.off(); await typeA(r, '#no_iq', 'Filtro de óleo', 80); await sleep(1500); const it = F(r).locator('#no_isug > *').filter({ hasText: /^\s*Filtro de óleo/ }).first(); await tapA(r, it); await sleep(1200); await tapA(r, '#no_iadd'); await sleep(900); await r.ring(A(r, '#no_subline'), 4, 10); await sleep(1300); await r.off(); } },
    { id: 's07', est: 10, say: 'Escreves o diagnóstico, e tocas em Criar orçamento. O orçamento fica logo no Go Auto, como se o tivesses feito no escritório.',
      act: async r => { await scrollTo(r, '#no_desc', 220); await typeA(r, '#no_desc', 'Revisão com troca do filtro de óleo', 55); await scrollTo(r, '#co-criar', 300); await tapA(r, '#co-criar'); await sleep(2600); } },
    { id: 's08', est: 13, say: 'No orçamento podes tirar fotos ao carro, mudar a etapa, por exemplo para aprovado, e enviar o orçamento ao cliente por e-mail, em PDF.',
      act: async r => { await step(r, 4); const d = A(r, '#co-detalhe'); if (!(await d.isVisible().catch(() => false))) { const o = F(r).locator('#co-orcamentos > *').first(); await scrollTo(r, '#co-orcamentos', 150); await tapA(r, o); await sleep(1800); } await scrollTo(r, '#cd-foto-lbl', 260); for (const s of ['#cd-foto-lbl', '#cd-etapa', '#cd-email-btn']) { const e = A(r, s); if (await e.count()) { await r.ring(e, 4, 10); await r.to(e, 350); await sleep(1300); } } await r.off(); } },
    { id: 's09', est: 9, say: 'E assim vendes com a app. Com isto fica completa a série da app Go Auto. Eu sou a Bia, a tua assistente de formação. Até breve!',
      act: async r => { await r.move(1400, 700, 800); } },
  ],
};
