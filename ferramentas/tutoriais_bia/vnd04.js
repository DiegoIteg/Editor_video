// VENDAS · Vídeo 4 — Gerir orçamentos
const { sleep } = require('./engine');
const T = t => `[title="${t}"], [data-original-title="${t}"], [data-bs-original-title="${t}"]`;
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).first();
const kpi = (r, t) => r.p.locator('.gp-kpi', { hasText: t }).filter({ visible: true }).first();
const ORC = '2646';
const row = r => r.p.locator('tbody tr', { hasText: ORC }).filter({ visible: true }).first();
const ic = (r, t) => row(r).locator(T(t)).first();
const modalBtn = (r, t) => r.p.locator('.modal.show button, .modal.show a').filter({ hasText: new RegExp('^\\s*' + t + '\\s*$') }).filter({ visible: true }).last();
const fechar = async r => { const f = r.p.locator('#adianti_right_panel span, #adianti_right_panel a, #adianti_right_panel button').filter({ hasText: /^\s*(×\s*)?Fechar\s*$/ }).filter({ visible: true }).first(); await r.ring(f, 6, 8); await r.to(f, 500); await sleep(250); await r.off(); await r.p.evaluate(() => Template.closeRightPanel()); await r.move(1150, 480, 450); await r.settle(500); };
const C = '#adianti_content';

module.exports = {
  name: 'vnd04_gerir_orcamentos',
  titulo: 'Gerir orçamentos', subtitulo: 'Alertas, PDF, follow-up, financeiro e reservas', n: 4, modulo: 'VENDAS',
  start: async r => { await r.p.addInitScript(() => { window.open = () => null; }); await r.open('OrcamentoList'); await r.p.evaluate(() => { window.open = () => null; }); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vou ensinar-te a gerir os orçamentos: os alertas, o PDF para o cliente, o follow-up, o financeiro e as reservas.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Vendas e escolhes Orçamentos.',
      act: async r => { await r.menuG('VENDAS', 'Orçamentos'); } },
    { id: 's03', est: 14, say: 'No topo estão os alertas da oficina: entregas atrasadas, entradas atrasadas, carros parados na fila, etapas acima do prazo, prontos sem levantar e entregas de hoje. Na segunda linha, entradas de hoje, financeiro por gerar, negociações paradas, clientes sem resposta, perdidos sem motivo e orçamentos sem datas.',
      act: async r => {
        for (const t of ['ATRASO ENTREGA', 'ENTRADA ATRASADA', 'PARADO NA FILA', 'ETAPA ACIMA DO PRAZO', 'PRONTO SEM LEVANTAR', 'ENTREGA HOJE', 'ENTRADA HOJE', 'GERAR FINANCEIRO', 'NEGOCIAÇÃO PARADA', 'SEM RESPOSTA', 'PERDIDO SEM MOTIVO', 'SEM DATAS']) { const k = kpi(r, t); await r.ring(k, 5, 12); await r.to(k, 280, .3, .6); await r.wait(560); }
        await r.off();
      } },
    { id: 's04', est: 9, say: 'Cada alerta também é um filtro. Clicas, por exemplo, em atraso de entrega, e a lista mostra só esses carros, para tratares primeiro o que é urgente.',
      act: async r => { await r.click(kpi(r, 'ATRASO ENTREGA'), 600); await r.settle(1200); await r.ring(r.p.locator('tbody').filter({ visible: true }).first(), 4, 8); await r.move(900, 620, 900); } },
    { id: 's05', est: 5, say: 'Para voltar à lista completa, clicas em Limpar filtros.',
      act: async r => { await r.off(); await r.click(btn(r, 'Limpar filtros'), 600); await r.settle(1200); } },
    { id: 's06', est: 10, say: 'Na lista vês o cliente, a viatura, as datas, o valor, o setor e a etapa em que está o trabalho. E na última coluna, o alerta de cada orçamento, com a sua cor.',
      act: async r => { const b = await r.box(row(r)); await r.ring(row(r), 4, 8); for (const fx of [.2, .35, .5, .62, .72, .82, .93]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 380); await r.wait(380); } } },
    { id: 's07', est: 12, say: 'Em cada linha tens os atalhos: a lupa para consultar, o PDF para enviar ao cliente, o lápis para editar, o caixote para eliminar, o follow-up, gerar o financeiro e as reservas de peças.',
      act: async r => { await r.off(); for (const t of ['Visualiza ', 'PDF / enviar', 'Editar', 'Eliminar', 'Followup', 'Gerar financeiro', 'Reservas de encomenda']) { const i = ic(r, t); await r.ring(i, 8, 8); await r.to(i, 330); await r.wait(900); } await r.off(); } },
    { id: 's08', est: 9, say: 'Na lupa abres a consulta do orçamento, com o cliente, a viatura, os produtos e serviços e o resumo financeiro, sem risco de alterar nada.',
      act: async r => { await r.click(ic(r, 'Visualiza '), 600); await r.settle(1300); await r.move(1150, 400, 700); await r.wait(600); await r.move(1150, 700, 900); await r.wait(500); await fechar(r); } },
    { id: 's09', est: 10, say: 'No PDF, o sistema gera o documento do orçamento e pergunta se o queres enviar por e-mail ao cliente. Aqui escolhemos Agora não.',
      act: async r => {
        await r.click(ic(r, 'PDF / enviar'), 600); await r.settle(1600); await r.wait(400);
        const n = modalBtn(r, 'Agora não'); await r.ring([modalBtn(r, 'Enviar ao cliente'), n], 6, 8); await r.to(modalBtn(r, 'Enviar ao cliente'), 500); await r.wait(900); await r.off();
        await r.click(n, 500); await r.wait(500); const ok = modalBtn(r, 'OK'); if (await ok.count()) { await r.click(ok, 450); await r.wait(400); }
      } },
    { id: 's10', est: 13, say: 'No follow-up registas cada passo do orçamento: o departamento, o setor, a etapa e as observações. É aqui que o orçamento avança de aberto para agendado, entra na produção, ou fica perdido, sempre com o motivo da perda.',
      act: async r => {
        await r.click(ic(r, 'Followup'), 600); await r.settle(1400);
        const sel = n => r.p.locator(`select[name="${n}"] + .select2`).first();
        await r.ring([sel('follow_up_orcamento_departamento_id'), sel('follow_up_orcamento_etapa_producao_id')], 6, 8); await r.move(1000, 480, 800); await r.wait(1500); await r.off();
        const h = r.p.locator('table').filter({ hasText: 'ETAPA' }).filter({ visible: true }).last(); await r.ring(h, 6, 8); await r.move(900, 670, 800); await r.wait(1200); await r.off();
        const m = r.p.locator('select[name="motivo_perda_id"]').first(); await r.ring(m, 6, 8); await r.to(m, 600); await r.wait(900); await r.off();
      } },
    { id: 's11', est: 6, say: 'Clicas em Voltar para regressar à lista de orçamentos.',
      act: async r => { await r.click(btn(r, 'Voltar'), 600); await r.settle(1300); } },
    { id: 's12', est: 10, say: 'Quando o trabalho termina, geras o financeiro: o valor passa para as contas a receber, com a forma de pagamento e as parcelas. Para fechar sem gravar, clicas em Fechar.',
      act: async r => { await r.click(ic(r, 'Gerar financeiro'), 600); await r.settle(1300); await r.move(1150, 560, 800); await r.wait(1500); await fechar(r); } },
    { id: 's13', est: 10, say: 'E nas reservas de encomenda separas as peças do orçamento para este cliente: as que há em stock ficam logo reservadas, as outras ficam à espera da encomenda.',
      act: async r => { await r.click(ic(r, 'Reservas de encomenda'), 600); await r.settle(1300); await r.move(1150, 460, 800); await r.wait(1600); await fechar(r); } },
    { id: 's14', est: 9, say: 'E assim geres os orçamentos. No próximo vídeo vamos aos Serviços externos. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.off(); await r.move(1100, 700, 800); } },
  ],
};
