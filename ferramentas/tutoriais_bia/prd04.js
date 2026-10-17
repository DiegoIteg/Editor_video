// PRODUÇÃO · Vídeo 4 — Pedir um serviço externo
const { sleep } = require('./engine');
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const inp = (r, n) => r.p.locator(`[name="${n}"]`).filter({ visible: true }).last();
const typeIn = async (r, n, txt, d = 70) => { await r.click(inp(r, n), 450); await sleep(150); await r.p.keyboard.press('Control+A'); for (const ch of txt) { await r.p.keyboard.type(ch); await sleep(r.dry ? 40 : d); } await r.p.keyboard.press('Tab'); await sleep(250); };
const C = '#adianti_content';
const FU = 'follow_up_tercerizacao_tercerizacao_';
const IT = 'tercerizacao_item_tercerizacao_';

module.exports = {
  name: 'prd04_servico_externo',
  titulo: 'Pedir um serviço externo', subtitulo: 'Quando parte do trabalho é feita por um fornecedor', n: 4, modulo: 'PRODUÇÃO',
  start: async r => { await r.open('TercerizacaoForm'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos pedir um serviço externo: quando uma parte do trabalho é feita por um fornecedor, fora da oficina.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 6, say: 'No menu, abres Produção, depois Serviços externos, e escolhes Pedir serviço externo.',
      act: async r => { await r.menuG('PRODUÇÃO', 'Pedir serviço externo', 'Serviços externos'); } },
    { id: 's03', est: 10, say: 'Começas pelo número do orçamento interno, para o serviço ficar ligado ao trabalho do cliente. Depois a matrícula, e a marca, o modelo e a cor aparecem sozinhos.',
      act: async r => { await typeIn(r, 'orcamento_interno', '2643', 120); await r.pick('viatura_id', 'OJ-08-VN', 'OJ-08'); await r.settle(800); await r.ring([inp(r, 'marca'), inp(r, 'cor')], 6, 8); await r.to(inp(r, 'modelo'), 500); await r.wait(500); await r.off(); } },
    { id: 's04', est: 9, say: 'No fornecedor escreves as primeiras letras e escolhes. Os contactos preenchem-se, e indicas o número do orçamento do fornecedor.',
      act: async r => { await r.pick('pessoa_id', 'Climatização Auto', 'Climat'); await r.settle(800); await r.ring([inp(r, 'movel'), inp(r, 'email')], 6, 8); await r.wait(700); await r.off(); await typeIn(r, 'n_orcamento_fornecedor', 'CA-2026-118', 80); } },
    { id: 's05', est: 7, say: 'No detalhe do serviço marcas a data de início e a data prevista de entrega.',
      act: async r => { await r.scrollTo(C, 420, 800); await typeIn(r, 'data_inicio', '17102026', 110); await typeIn(r, 'data_entrega_prevista', '20102026', 110); } },
    { id: 's06', est: 10, say: 'Depois descreves o serviço, o valor unitário e a quantidade. O total da linha calcula-se sozinho, e com o botão de mais juntas outros serviços.',
      act: async r => {
        await typeIn(r, IT + 'servico[]', 'Recarga e teste do ar condicionado', 45); await typeIn(r, IT + 'valor_unitario[]', '6500', 120); await typeIn(r, IT + 'quantidade[]', '1', 120);
        await r.ring(inp(r, IT + 'valor_total[]'), 6, 8); await r.to(inp(r, IT + 'valor_total[]'), 500); await r.wait(600); await r.off();
        const plus = r.p.locator('#adianti_div_content .fa-plus').filter({ visible: true }).first(); await r.ring(plus, 8, 8); await r.to(plus, 400); await r.wait(400); await r.off();
      } },
    { id: 's07', est: 7, say: 'Indicas o IVA, e o sistema mostra o subtotal, o valor do IVA e o total a pagar ao fornecedor.',
      act: async r => { await r.scrollTo(C, 700, 700); await typeIn(r, 'iva', '23', 150); await r.wait(400); await r.ring([inp(r, 'sub_total'), inp(r, 'valor_tt_servico')], 6, 8); await r.to(inp(r, 'valor_tt_servico'), 500); await r.wait(500); await r.off(); } },
    { id: 's08', est: 12, say: 'No follow-up registas o estado do serviço: aguardando recolha, em produção, entregue, conforme ou não conforme, com uma observação. Clicas em Adicionar. Assim sabes sempre onde está o trabalho.',
      act: async r => {
        await r.scrollTo(C, 1100, 800);
        const st = r.p.locator(`select[name="${FU}status_follow_tercerizacao_id"]`); await r.ring(st, 6, 8); await r.click(st, 450); await r.p.keyboard.press('Escape'); await st.selectOption({ label: 'Aguardando recolha' }); await r.wait(500); await r.off();
        await r.click(inp(r, FU + 'observacoes'), 400); for (const ch of 'Fornecedor recolhe amanhã de manhã.') { await r.p.keyboard.type(ch); await r.wait(32); }
        await r.ring(btn(r, 'Adicionar'), 6, 10); await r.click(btn(r, 'Adicionar'), 500); await r.off(); await r.wait(900);
      } },
    { id: 's09', est: 8, say: 'No fim, clicas em Gravar. O pedido aparece na lista dos serviços externos, e entra nos indicadores e alertas.',
      act: async r => { await r.ring(btn(r, 'Gravar'), 6, 10); await r.click(btn(r, 'Gravar'), 500); await r.off(); await r.settle(1500); await r.scrollTo(C, 0, 800); const row = r.p.locator('tbody tr', { hasText: 'Climatização Auto' }).filter({ visible: true }).first(); await r.ring(row, 4, 8); await r.to(row, 600, .3); } },
    { id: 's10', est: 10, say: 'E com isto fica completo o módulo de Produção. No próximo módulo vamos ao Financeiro: contas a pagar, contas a receber e despesas. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.off(); await r.move(1100, 700, 800); } },
  ],
};
