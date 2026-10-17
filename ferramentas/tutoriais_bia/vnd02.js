// VENDAS · Vídeo 2 — Funil comercial
const { sleep } = require('./engine');
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).first();
const kpi = (r, t) => r.p.locator('.gp-kpi', { hasText: t }).filter({ visible: true }).first();
const card = (r, t) => r.p.locator('.gp-cartao, .card, .panel').filter({ hasText: t }).filter({ has: r.p.locator('svg, canvas') }).filter({ visible: true }).last();
const C = '#adianti_content';

module.exports = {
  name: 'vnd02_funil_comercial',
  titulo: 'Funil comercial', subtitulo: 'De cada orçamento até à fatura: onde se ganha e onde se perde', n: 2, modulo: 'VENDAS',
  start: async r => { await r.open('FunilComercialDashboard'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vou ensinar-te a ler o Funil comercial: o caminho de cada orçamento, desde o pedido do cliente até à fatura.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 6, say: 'No menu, abres Vendas e escolhes Funil comercial.',
      act: async r => { await r.menuG('VENDAS', 'Funil comercial'); } },
    { id: 's03', est: 6, say: 'Por defeito, o funil mostra os últimos noventa dias. O período muda-se nos filtros.',
      act: async r => { const t = r.el(/^\s*Funil comercial\s*$/, 'h1,h2,h3,h4,div,span'); const d = t.locator('xpath=following-sibling::*[1]'); await r.ring([t, d], 6, 8); await r.to(d, 600, .5, .5); } },
    { id: 's04', est: 9, say: 'Nos atalhos abres a lista de orçamentos, a prospeção ou o painel do dia, e atualizas ou limpas os filtros.',
      act: async r => { await r.off(); for (const t of ['Orçamentos', 'Prospecção', 'Painel do dia', 'Atualizar', 'Limpar filtros']) { await r.ring(btn(r, t), 6, 10); await r.to(btn(r, t), 330); await r.wait(420); } await r.off(); } },
    { id: 's05', est: 11, say: 'Os primeiros cartões contam os orçamentos do período, quantos foram aprovados, quantos se perderam e quantos ainda estão em aberto. Por baixo de cada número está o valor.',
      act: async r => { for (const t of ['ORÇAMENTOS', 'APROVADOS', 'PERDIDOS', 'EM ABERTO']) { const k = kpi(r, t === 'ORÇAMENTOS' ? /^\s*orçamentos/i : t); await r.ring(k, 6, 12); await r.to(k, 450, .3, .6); await r.wait(1350); } await r.off(); } },
    { id: 's06', est: 8, say: 'A taxa de conversão diz-te, de cada dez orçamentos decididos, quantos o cliente aprovou.',
      act: async r => { const k = kpi(r, 'TAXA DE CONVERSÃO'); await r.ring(k, 6, 12); await r.to(k, 600, .3, .55); await r.wait(1500); } },
    { id: 's07', est: 8, say: 'E os perdidos sem motivo são um alerta: regista sempre o motivo da perda no follow-up do orçamento.',
      act: async r => { await r.off(); const k = kpi(r, 'PERDIDOS SEM MOTIVO'); await r.ring(k, 6, 12); await r.to(k, 600, .3, .55); await r.wait(1500); } },
    { id: 's08', est: 11, say: 'O gráfico do funil mostra as fases: orçamentos feitos, aprovados ou agendados, os que entraram na oficina, os concluídos e os faturados. Cada degrau a menos é trabalho que ficou pelo caminho.',
      act: async r => { await r.off(); const c = card(r, 'Funil'); await r.ring(c, 6); for (const y of [451, 496, 541, 586, 631]) { await r.move(700, y, 450); await r.wait(900); } } },
    { id: 's09', est: 8, say: 'Os motivos de perda mostram porque é que os clientes não avançam, para saberes o que tens de corrigir.',
      act: async r => { await r.off(); const c = card(r, 'Motivos de perda'); await r.ring(c, 6); await r.move(1500, 470, 700); await r.move(1650, 545, 1600); } },
    { id: 's10', est: 9, say: 'A origem dos clientes compara, para cada canal, os orçamentos pedidos com os aprovados. Assim sabes onde vale a pena investir.',
      act: async r => { await r.off(); const c = card(r, 'Origem dos clientes'); await r.ring(c, 6); await r.move(400, 900, 700); await r.move(1040, 880, 2600); } },
    { id: 's11', est: 9, say: 'E os tempos médios da oficina, em horas úteis, mostram quanto tempo cada carro passa em produção, na fila, à espera de peças ou à espera de ser levantado.',
      act: async r => { await r.off(); const c = card(r, 'Tempos médios'); await r.ring(c, 6); for (const y of [782, 820, 857, 969]) { await r.move(1500, y, 450); await r.wait(700); } } },
    { id: 's12', est: 10, say: 'Nos filtros escolhes o período, um cliente ou um setor. Por exemplo, pedimos só os orçamentos desde o início do mês e clicamos em Buscar. Todos os números se recalculam.',
      act: async r => {
        await r.off(); await r.click(btn(r, 'Filtros'), 600); await r.settle(900);
        const f = r.vis('input[name="orcamento_de"]'); await r.click(f, 600); await sleep(250); await r.p.keyboard.press('Control+A'); await r.p.keyboard.press('Backspace'); await r.wait(200);
        for (const ch of '01102026') { await r.p.keyboard.type(ch); await sleep(100); } await r.p.keyboard.press('Escape'); await r.wait(300);
        await r.click(r.el('Buscar', 'a,button,span'), 600); await r.settle(1300); await r.move(1000, 300, 700);
      } },
    { id: 's13', est: 6, say: 'O número nos Filtros mostra que há um filtro ativo. Para voltar ao funil completo, clicas em Limpar filtros.',
      act: async r => { await r.ring(btn(r, 'Filtros'), 6, 10); await r.to(btn(r, 'Filtros'), 600); await r.wait(1200); await r.off(); await r.click(btn(r, 'Limpar filtros'), 600); await r.settle(1200); } },
    { id: 's14', est: 9, say: 'E assim lês o Funil comercial. No próximo vídeo vamos lançar um orçamento, do início ao fim. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.off(); await r.move(1100, 700, 800); } },
  ],
};
