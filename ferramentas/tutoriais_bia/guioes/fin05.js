// FINANCEIRO · Vídeo 5 — Despesas fixas e variáveis
const { sleep } = require('./engine');
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const inp = (r, n) => r.p.locator(`[name="${n}"]`).filter({ visible: true }).last();
const typeIn = async (r, n, txt, d = 90) => { await r.click(inp(r, n), 450); await sleep(150); await r.p.keyboard.press('Control+A'); for (const ch of txt) { await r.p.keyboard.type(ch); await sleep(r.dry ? 40 : d); } await r.p.keyboard.press('Tab'); await sleep(250); };
const row = r => r.p.locator('tbody tr').filter({ visible: true }).first();

module.exports = {
  name: 'fin05_despesas',
  titulo: 'Despesas fixas e variáveis', subtitulo: 'Registar as despesas e gerar as contas a pagar', n: 5, modulo: 'FINANCEIRO',
  start: async r => { await r.open('DespesasFixasList'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos às Despesas: as fixas, que se repetem todos os meses, e as variáveis.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 6, say: 'No menu, abres Financeiro, depois Despesas, e escolhes Despesas fixas.',
      act: async r => { await r.menuG('FINANCEIRO', 'Despesas fixas', 'Despesas'); } },
    { id: 's03', est: 10, say: 'Os cartões mostram todas as despesas, as que ainda não têm financeiro gerado, as que têm parcelas em aberto ou vencidas, e as liquidadas.',
      act: async r => { for (const t of ['TODAS', 'SEM FINANCEIRO GERADO', 'COM PARCELAS EM ABERTO', 'COM PARCELAS VENCIDAS', 'LIQUIDADAS']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 350, .3, .5); await r.wait(900); } await r.off(); } },
    { id: 's04', est: 7, say: 'Para lançar uma despesa nova, clicas em Cadastrar. O tipo já vem como pagar, e a classificação como fixa.',
      act: async r => { await r.click(btn(r, 'Cadastrar'), 500); await r.settle(1300); await r.ring([r.p.locator('select[name="conta_tipo_id"] + .select2'), r.p.locator('select[name="conta_classificacao_id"] + .select2')], 6, 8); await r.wait(900); await r.off(); } },
    { id: 's05', est: 10, say: 'Escolhes o grupo, aqui fornecimentos e serviços externos, e o fornecedor. Depois a despesa, por exemplo, o fornecimento de energia.',
      act: async r => { await r.pickFast('conta_grupo_id', 'Fornecimentos e serviços externos', 'Fornecim'); await r.pickFast('pessoa_id', 'Energia Centro', 'Energia'); await r.settle(600); await r.pickFast('cadastro_despesa_id', 'Fornecimento de energia', 'energia'); } },
    { id: 's06', est: 8, say: 'Indicas o valor total, a data de vencimento e o número da fatura do fornecedor, e clicas em Salvar.',
      act: async r => { await typeIn(r, 'valor_total', '21000', 80); await typeIn(r, 'vencimento', '30102026', 70); await typeIn(r, 'fatura', '10458', 70); await r.ring(btn(r, 'Salvar'), 6, 10); await r.click(btn(r, 'Salvar'), 500); await r.off(); await r.settle(1400); } },
    { id: 's07', est: 9, say: 'A despesa entra na lista, ainda sem financeiro. No ícone do dinheiro geras as contas a pagar dessa despesa.',
      act: async r => { await r.ring(row(r), 4, 8); await r.to(row(r), 500, .3); await r.wait(600); await r.off(); const g = row(r).locator('a').nth(3); await r.ring(g, 8, 8); await r.click(g, 500); await r.off(); await r.settle(1400); } },
    { id: 's08', est: 11, say: 'Escolhes a forma de pagamento e o número de parcelas, e clicas em Gerar parcelas. O sistema divide o valor pelas datas de vencimento. Clicas em Salvar.',
      act: async r => {
        await r.pickFast('forma_pagamento', /^\s*Multibanco MB\s*$/); await r.wait(300);
        await r.ring(btn(r, 'Gerar parcelas'), 6, 10); await r.click(btn(r, 'Gerar parcelas'), 500); await r.off(); await r.wait(1200);
        await r.ring(r.p.locator('[name="conta_item_despesas_fixas_valor[]"]').last(), 6, 8); await r.wait(900); await r.off();
        await r.ring(btn(r, 'Salvar'), 6, 10); await r.click(btn(r, 'Salvar'), 500); await r.off(); await r.wait(1000);
        const ok = r.el(/^\s*OK\s*$/, 'button,a'); if (await ok.count()) { await r.click(ok, 400); await r.settle(600); }
      } },
    { id: 's09', est: 8, say: 'A partir daqui, a despesa aparece nas contas a pagar, com o vencimento e o alerta.',
      act: async r => { await r.menuG('FINANCEIRO', 'Despesas fixas', 'Despesas'); const k = btn(r, 'COM PARCELAS EM ABERTO'); await r.ring(k, 5, 12); await r.to(k, 500, .3, .5); await r.wait(900); await r.off(); } },
    { id: 's10', est: 10, say: 'As despesas variáveis funcionam da mesma forma, mas em vez de escolheres a despesa de uma lista, escreves uma descrição livre.',
      act: async r => { await r.menuG('FINANCEIRO', 'Despesas variáveis', 'Despesas'); await r.ring(r.p.locator('thead tr').filter({ visible: true }).first(), 4, 8); await r.move(1300, 280, 900); await r.wait(600); await r.off(); } },
    { id: 's11', est: 8, say: 'E nas configurações defines os tipos de despesa fixa da oficina: a renda, a contabilidade, a água, a energia e os seguros.',
      act: async r => { await r.menuG('FINANCEIRO', 'Despesas', 'Configurações'); await r.ring(r.p.locator('tbody').filter({ visible: true }).first(), 4, 8); await r.move(700, 330, 900); await r.wait(800); await r.off(); } },
    { id: 's12', est: 10, say: 'E com isto fica completo o módulo Financeiro. No próximo módulo vamos às Compras. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 700, 800); } },
  ],
};
