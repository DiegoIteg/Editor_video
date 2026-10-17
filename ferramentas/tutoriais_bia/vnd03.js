// VENDAS · Vídeo 3 — Lançar um orçamento
const { sleep } = require('./engine');
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).first();
const inp = (r, n) => r.p.locator(`[name="${n}"]`).filter({ visible: true }).last();
const tab = (r, t) => r.p.locator('#adianti_div_content a').filter({ hasText: new RegExp('^\\s*' + t + '\\s*$') }).filter({ visible: true }).first();
const C = '#adianti_content';
const typeDate = async (r, n, digits) => { const f = inp(r, n); await r.click(f, 500); await sleep(250); await r.p.keyboard.press('Control+A'); await r.p.keyboard.press('Backspace'); for (const ch of digits) { await r.p.keyboard.type(ch); await sleep(90); } await r.p.keyboard.press('Escape'); await sleep(200); };

module.exports = {
  name: 'vnd03_lancar_orcamento',
  titulo: 'Lançar um orçamento', subtitulo: 'Do pedido do cliente ao orçamento guardado, passo a passo', n: 3, modulo: 'VENDAS',
  start: async r => { await r.open('OrcamentoList'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos lançar um orçamento do início ao fim: cliente, viatura, peças, mão de obra e agendamento.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 6, say: 'No menu, abres Vendas e escolhes Orçamentos. Depois clicas em Novo Orçamento.',
      act: async r => { await r.menuG('VENDAS', 'Orçamentos'); await r.ring(btn(r, 'Novo Orçamento'), 6, 10); await r.click(btn(r, 'Novo Orçamento'), 500); await r.off(); await r.settle(1200); } },
    { id: 's03', est: 9, say: 'O número e a data preenchem-se sozinhos, e o orçamentista é quem está ligado. Na origem do cliente indicas como chegou até nós, por exemplo, cliente antigo.',
      act: async r => {
        await r.ring([inp(r, 'id'), inp(r, 'data_orcamento')], 6, 8); await r.move(560, 245, 700); await r.wait(500); await r.off();
        const o = r.p.locator('select[name="origem_cliente_id"]'); await r.ring(o, 6, 8); await r.click(o, 500); await r.p.keyboard.press('Escape'); await o.selectOption({ label: 'Cliente antigo' }); await r.wait(500); await r.off();
      } },
    { id: 's04', est: 9, say: 'No cliente, escreves as primeiras letras do nome e escolhes. O telefone e o e-mail aparecem logo, a partir da ficha do cliente.',
      act: async r => { await r.pick('pessoa_id', 'Ana Teixeira Carvalho', 'Ana Teix'); await r.settle(900); await r.ring([inp(r, 'movel'), inp(r, 'email')], 6, 8); await r.to(inp(r, 'email'), 600); } },
    { id: 's05', est: 8, say: 'No diagnóstico escreves o que o cliente relata. E podes juntar até cinco fotografias da viatura.',
      act: async r => {
        await r.off(); await r.click(inp(r, 'diagnostico_cliente'), 500);
        for (const ch of 'Revisão anual e barulho nos travões da frente.') { await r.p.keyboard.type(ch); await r.wait(32); }
        const lb = r.el(/^\s*Fotos da viatura/, 'label,span,div,b'); const lbb = await r.box(lb); await r.ringXY(310, lbb.y - 8, 1572, 76, 10); await r.move(520, lbb.y + 45, 500);
      } },
    { id: 's06', est: 9, say: 'Na viatura, escreves a matrícula e escolhes. A marca, o modelo, a cor e o ano preenchem-se automaticamente.',
      act: async r => { await r.off(); await r.scrollTo(C, 330, 800); await r.pick('viatura_id', '45-IA-11', '45-IA'); await r.settle(800); await r.ring([inp(r, 'marca'), inp(r, 'mes')], 6, 8); await r.to(inp(r, 'modelo'), 600); } },
    { id: 's07', est: 10, say: 'Agora os produtos e serviços, em três separadores. Nos produtos escolhes a peça, aqui pastilhas de travão. O preço, o IVA e o total aparecem logo.',
      act: async r => {
        await r.off(); await r.scrollTo(C, 620, 800); await r.ring(tab(r, 'PRODUTOS'), 6, 8); await r.wait(500); await r.off();
        await r.pick('produtos_item_orcamento_cad_produtos_id[]', 'Pastilhas', 'Pastilh'); await r.settle(800);
        await r.ring([inp(r, 'produtos_item_orcamento_preco_venda[]'), inp(r, 'produtos_item_orcamento_valor_total[]')], 6, 8); await r.to(inp(r, 'produtos_item_orcamento_valor_total[]'), 600);
      } },
    { id: 's08', est: 7, say: 'Indicas a quantidade. E com o botão de mais acrescentas outra linha, se precisares de mais peças.',
      act: async r => {
        await r.off(); await r.click(inp(r, 'produtos_item_orcamento_quantidade[]'), 500); await r.p.keyboard.press('Control+A'); for (const ch of '100') { await r.p.keyboard.type(ch); await sleep(110); } await r.p.keyboard.press('Tab'); await r.wait(500);
        const plus = r.p.locator('.tab-pane.active .fa-plus').filter({ visible: true }).first(); await r.ring(plus, 8, 8); await r.to(plus, 500);
      } },
    { id: 's09', est: 9, say: 'Nos serviços escolhes o setor que faz o trabalho, a mecânica, e o serviço: substituição de pastilhas.',
      act: async r => {
        await r.off(); await r.click(tab(r, 'SERVIÇOS'), 500); await r.wait(500);
        await r.pickFast('servico_item_orcamento_departamento_empresa_id[]', /^\s*Mecânica\s*$/); await r.wait(150);
        await r.pickFast('servico_item_orcamento_cad_servicos_id[]', 'Substituição de pastilhas', 'pastilh'); await r.wait(500);
        await r.ring(inp(r, 'servico_item_orcamento_valor_total[]'), 6, 8); await r.to(inp(r, 'servico_item_orcamento_valor_total[]'), 500);
      } },
    { id: 's10', est: 9, say: 'Na hora técnica escolhes o setor e o número de horas, por exemplo, uma hora e meia. O valor da hora vem da tabela da oficina.',
      act: async r => {
        await r.off(); await r.click(tab(r, 'HORA TÉCNICA'), 500); await r.wait(500);
        await r.pickFast('hora_item_orcamento_departamento_empresa_id[]', /^\s*Mecânica\s*$/); await r.wait(500);
        await r.click(inp(r, 'hora_item_orcamento_quatidade_hora[]'), 500); await r.p.keyboard.press('Control+A'); for (const ch of '150') { await r.p.keyboard.type(ch); await sleep(120); } await r.p.keyboard.press('Tab'); await r.wait(500);
        await r.ring([inp(r, 'hora_item_orcamento_valor[]'), inp(r, 'hora_item_orcamento_total_hora[]')], 6, 8); await r.to(inp(r, 'hora_item_orcamento_total_hora[]'), 500);
      } },
    { id: 's11', est: 9, say: 'O resumo financeiro soma tudo sozinho: o total das peças, dos serviços e das horas, o subtotal, o IVA e o valor final do orçamento.',
      act: async r => {
        await r.off(); await r.scrollTo(C, 1000, 900);
        await r.ring([inp(r, 'tt_produtos'), inp(r, 'tt_horas')], 6, 8); await r.to(inp(r, 'tt_servicos'), 600); await r.wait(900); await r.off();
        await r.ring([inp(r, 'sub_tt_orc'), inp(r, 'tt_geral_orc')], 6, 8); await r.to(inp(r, 'tt_geral_orc'), 600);
      } },
    { id: 's12', est: 8, say: 'No agendamento marcas a data de início e a data prevista para terminar. É assim que o trabalho entra no planeamento da oficina.',
      act: async r => { await r.off(); await typeDate(r, 'data_inicio', '201020260900'); await typeDate(r, 'data_termino_previsto', '201020261700'); await r.move(1000, 760, 500); } },
    { id: 's13', est: 7, say: 'No fim, clicas em Salvar. O sistema confirma que o orçamento ficou registado.',
      act: async r => { const s = btn(r, 'Salvar'); await r.ring(s, 6, 10); await r.click(s, 600); await r.off(); await r.settle(1500); await r.wait(900); } },
    { id: 's14', est: 7, say: 'De volta à lista, o orçamento novo já aparece no topo, em aberto, pronto a enviar ao cliente.',
      act: async r => {
        await r.scrollTo(C, 0, 900); const row = r.p.locator('tbody tr', { hasText: 'Ana Teixeira Carvalho' }).filter({ visible: true }).first();
        await r.ring(row, 4, 8); await r.to(row, 700, .35);
      } },
    { id: 's15', est: 9, say: 'E assim lanças um orçamento. No próximo vídeo vamos gerir os orçamentos: os alertas, o PDF, o follow-up e o financeiro. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.off(); await r.move(1100, 700, 800); } },
  ],
};
