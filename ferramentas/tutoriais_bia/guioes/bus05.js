// BUSINESS · Vídeo 5 — Pessoas: painel RH, recibos do mês e incentivos
const { menuPath, C, btn, kpi, card, goTo, top, kpis, show, RP, fechaRP, okModal, sleep } = require('./bushelp');
const prev = r => r.p.locator('#adianti_div_content a:has(.fa-chevron-left), #adianti_div_content a:has(.fa-angle-left), #adianti_div_content button:has(.fa-chevron-left)').filter({ visible: true }).first();
const typeIn = async (r, loc, txt, d = 95) => { await r.click(loc, 420); await sleep(120); await r.p.keyboard.press('Control+A'); for (const ch of txt) { await r.p.keyboard.type(ch); await sleep(r.dry ? 40 : d); } await r.p.keyboard.press('Tab'); await sleep(250); };
const selN = async (r, name, val) => { const s = RP(r).locator(`select[name="${name}"]`); await r.ring(s, 5, 8); await r.click(s, 400); await r.p.keyboard.press('Escape'); await s.selectOption(val); await r.wait(450); await r.off(); };
module.exports = {
  name: 'bus05_pessoas_direcao',
  titulo: 'Pessoas: painel, recibos e incentivos', subtitulo: 'A equipa vista pela direção: alertas, recibos do mês e prémios', n: 5, modulo: 'BUSINESS',
  start: async r => { await r.open('BusinessPainelDirecao'); await r.settle(800); },
  scenes: [
    { id: 's01', est: 10, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos às pessoas, vistas pela direção: o painel de RH, os recibos do mês e os incentivos.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 6, say: 'No menu, abres Business, Análises, e escolhes RH.',
      act: async r => { await r.menuG('BUSINESS', 'RH', 'Análises'); await r.settle(900); } },
    { id: 's03', est: 14, say: 'Os cartões mostram os colaboradores com contrato, quem está ausente hoje, os pedidos por decidir, os alertas, as ausências dos próximos dias, os adiantamentos por pagar, os aniversários, e os recibos do último mês.',
      act: async r => { await kpis(r, ['Colaboradores com contrato', 'Ausentes hoje', 'Pedidos por decidir', 'Alertas', 'Próximos 30 dias', 'Adiantamentos por pagar', 'Aniversários', 'Recibos'], 950); } },
    { id: 's04', est: 12, say: 'Os alertas avisam do que tem prazo: contratos terminados sem decisão, documentos a expirar, como a ficha de aptidão, e férias ainda por marcar.',
      act: async r => { const c = card(r, 'Alertas'); await goTo(r, c); await r.ring(c, 6, 10); await r.wait(500); await r.off(); const ls = c.locator('tr'); for (const i of [1, 3, 6, 9, 10, 12]) { const b = await r.box(ls.nth(i)); await r.move(b.x + b.width * .12, b.y + b.height / 2, 380); await r.wait(650); } } },
    { id: 's05', est: 9, say: 'Em pedidos por decidir, aprovas as férias, as faltas e os adiantamentos, sem sair do painel.',
      act: async r => { const c = card(r, 'Pedidos por decidir'); await goTo(r, c); await r.ring(c, 6, 10); await r.wait(700); await r.off(); const a = c.locator('tr').nth(1).locator('a').last(); await r.ring(a, 5, 8); await r.to(a, 400); await r.wait(1400); await r.off(); } },
    { id: 's06', est: 9, say: 'E ainda quem está ausente hoje, as ausências dos próximos trinta dias, e os aniversários do mês.',
      act: async r => { await show(r, 'Ausentes hoje', 1000, .5); await show(r, 'Ausências nos próximos', 1000, .5); await show(r, 'Aniversários', 900, .5); } },
    { id: 's07', est: 13, say: 'Nos atalhos vais aos recibos do mês. Todos os meses importas os recibos que a contabilidade te envia, em PDF, Excel ou CSV. Clicas em Importar recibos, escolhes o mês e os ficheiros, e clicas em Ler ficheiros.',
      act: async r => { await top(r, 500); { const x = btn(r, 'Recibos do mês'); await r.ring(x, 5, 8); await r.click(x, 450); await r.off(); } await r.settle(900); const b = btn(r, 'Importar recibos'); await r.ring(b, 6, 10); await r.click(b, 450); await r.off(); await r.settle(1500); for (const sel of ['input[type=text], input[name*=mes]', 'input[type=file], .tfile, .dropzone, [class*=file]']) { const f = RP(r).locator(sel).filter({ visible: true }).first(); if (await f.count()) { await r.ring(f, 5, 8); await r.to(f, 400, .3, .5); await r.wait(1000); await r.off(); } } const l = RP(r).locator('a, button').filter({ hasText: /Ler ficheiros/ }).first(); if (await l.count()) { await r.ring(l, 5, 8); await r.to(l, 400); await r.wait(1000); await r.off(); } await fechaRP(r); } },
    { id: 's08', est: 11, say: 'No mês anterior, os recibos já foram importados. Os cartões mostram os recibos recebidos, os que estão diferentes do esperado, o líquido a pagar, e o custo total da empresa.',
      act: async r => { const p = prev(r); await r.ring(p, 5, 8); await r.click(p, 400); await r.off(); await r.settle(1500); await kpis(r, ['Recibos recebidos', 'A verificar', 'Líquido a pagar', 'Custo total'], 1100); } },
    { id: 's09', est: 13, say: 'Em cada colaborador, à esquerda, o que se espera: a base do contrato, os plus e incentivos, e os adiantamentos a descontar. À direita, o que veio no recibo, e a conferência.',
      act: async r => { const l = r.p.locator('#adianti_div_content tbody tr, #adianti_div_content tr').filter({ hasText: /Hugo Martins Barbosa/ }).first(); await goTo(r, l); await r.ring(l, 3, 6); const b = await r.box(l); for (const fx of [.05, .2, .28, .36, .55, .65, .75, .9]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 380); await r.wait(600); } await r.off(); } },
    { id: 's10', est: 11, say: 'Nos atalhos, em incentivos, a direção define prémios por peça produzida, por peça vendida ou por serviço vendido. Os cartões mostram o total do mês, e o que vai no recibo.',
      act: async r => { await top(r, 500); { const x = btn(r, 'Incentivos'); await r.ring(x, 5, 8); await r.click(x, 450); await r.off(); } await r.settle(900); await kpis(r, ['Total do mês', 'Na folha', 'Estado do mês'], 1300); } },
    { id: 's11', est: 11, say: 'Cada linha mostra o colaborador, o modelo, a quantidade, o valor por unidade e o total, calculado a partir das ordens de serviço.',
      act: async r => { const l = r.p.locator('#adianti_div_content tr').filter({ hasText: /Hugo Martins Barbosa/ }).first(); await r.ring(l, 3, 6); const b = await r.box(l); for (const fx of [.05, .17, .3, .36, .45, .55, .72]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 380); await r.wait(650); } await r.off(); } },
    { id: 's12', est: 13, say: 'Para criar um modelo, clicas em Novo modelo. Dás um nome, escolhes a base de cálculo, por exemplo, peça vendida, o valor por unidade, e a quem se aplica: aqui, por função.',
      act: async r => { const n = btn(r, 'Novo modelo'); await r.ring(n, 6, 10); await r.click(n, 450); await r.off(); await r.settle(1500); await typeIn(r, RP(r).locator('input[name="nome"]'), 'Comissão por peça vendida'); await selN(r, 'base', 'VENDA_PECA'); await typeIn(r, RP(r).locator('input[name="valor_unidade"]'), '0,50'); await selN(r, 'aplica_tipo', 'FUNCAO'); await typeIn(r, RP(r).locator('input[name="aplica_funcao"]'), 'Consultora comercial', 80); } },
    { id: 's13', est: 12, say: 'Escolhes se entra na folha, e vai no recibo, e clicas em Gravar. No fim do mês, clicas em Fechar o mês, e os valores ficam fechados para os recibos.',
      act: async r => { const nf = RP(r).locator('input[name="na_folha"]').first(); await r.ring(nf.locator('xpath=ancestor::div[1]'), 5, 8); await r.to(nf, 400); await r.wait(900); await r.off(); const g = RP(r).locator('button, a').filter({ hasText: /^\s*Gravar/ }).first(); await r.ring(g, 6, 10); await r.click(g, 450); await r.off(); await r.settle(1800); await okModal(r); await fechaRP(r); const f = btn(r, 'Fechar o mês'); if (await f.count()) { await r.ring(f, 6, 10); await r.to(f, 400); await r.wait(1300); await r.off(); } } },
    { id: 's14', est: 9, say: 'E assim acompanhas as pessoas como direção. No próximo vídeo vamos ao custo e à produção de cada colaborador. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 700, 800); } },
  ],
};
