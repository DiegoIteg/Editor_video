// VENDAS · Vídeo 6 — Configurações (tabelas de preços, serviços, hora técnica)
const { sleep } = require('./engine');
const T = t => `[title="${t}"], [data-original-title="${t}"], [data-bs-original-title="${t}"]`;
const B = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button, #adianti_right_panel a, #adianti_right_panel button').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).first();
const inp = (r, n) => r.p.locator(`[name="${n}"]`).filter({ visible: true }).last();
const tab = (r, t) => r.p.locator('#adianti_div_content a').filter({ hasText: new RegExp('^\\s*' + t + '\\s*$') }).filter({ visible: true }).first();
const s2 = (r, n) => r.p.locator(`select[name="${n}"] + .select2`).filter({ visible: true }).first();
const typeIn = async (r, n, txt, d = 70) => { await r.click(inp(r, n), 500); await sleep(150); for (const ch of txt) { await r.p.keyboard.type(ch); await sleep(r.dry ? 5 : d); } };
const fechar = async r => { const f = r.p.locator('#adianti_right_panel span, #adianti_right_panel a, #adianti_right_panel button').filter({ hasText: /^\s*(×\s*)?Fechar\s*$/ }).filter({ visible: true }).first(); await r.ring(f, 6, 8); await r.to(f, 500); await sleep(250); await r.off(); await r.p.evaluate(() => Template.closeRightPanel()); await r.move(1150, 480, 450); await r.settle(500); };

module.exports = {
  name: 'vnd06_configuracoes',
  titulo: 'Configurações de vendas', subtitulo: 'Tabelas de preços, serviços e hora técnica', n: 6, modulo: 'VENDAS',
  start: async r => { await r.open('TabelaPrecoList'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje fechamos o módulo de Vendas com as configurações: as tabelas de preços, os serviços e a hora técnica.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 6, say: 'No menu, abres Vendas, depois Configurações, e escolhes Tabelas de preços.',
      act: async r => { await r.menuG('VENDAS', 'Tabelas de preços', 'Configurações'); } },
    { id: 's03', est: 8, say: 'As tabelas de preços dão condições especiais a um grupo de clientes, como as frotas ou as seguradoras. Clicas em Novo.',
      act: async r => { await r.ring(B(r, 'Novo'), 6, 10); await r.click(B(r, 'Novo'), 600); await r.off(); await r.settle(1300); } },
    { id: 's04', est: 5, say: 'Escreves o nome da tabela, por exemplo, Frotas e empresas.',
      act: async r => { await typeIn(r, 'nome_tabela', 'Frotas e empresas 2027', 65); } },
    { id: 's05', est: 13, say: 'Depois as regras, em três separadores: produtos, serviços e horas técnicas. Podes limitar a regra a uma família, grupo ou subgrupo de artigos, e indicas a percentagem de desconto. Aqui, dez por cento em todos os produtos. Clicas em Adicionar.',
      act: async r => {
        await r.ring([tab(r, 'PRODUTOS'), tab(r, 'HORAS TÉCNICAS')], 6, 8); await r.wait(900); await r.off();
        await r.ring([s2(r, 'tabela_preco_regras_tabela_preco_familia_produto_id'), s2(r, 'tabela_preco_regras_tabela_preco_sub_grupo_id')], 6, 8); await r.move(900, 300, 800); await r.wait(900); await r.off();
        await typeIn(r, 'tabela_preco_regras_tabela_preco_perc_desconto', '1000', 150); await r.wait(300);
        await r.ring(B(r, 'Adicionar'), 6, 10); await r.click(B(r, 'Adicionar'), 500); await r.off(); await r.wait(900);
      } },
    { id: 's06', est: 9, say: 'Clicas em Gravar. Depois, na ficha de cada cliente, escolhes a tabela de preços que se lhe aplica, e os orçamentos já saem com o desconto.',
      act: async r => { await r.ring(B(r, 'Gravar'), 6, 10); await r.click(B(r, 'Gravar'), 600); await r.off(); await r.settle(1300); const row = r.p.locator('tbody tr', { hasText: 'Frotas e empresas' }).filter({ visible: true }).first(); if (await row.count()) { await r.ring(row, 4, 8); await r.to(row, 600, .3); } } },
    { id: 's07', est: 8, say: 'Nos Serviços tens a lista de trabalhos que a oficina vende, com o setor que os faz e o preço.',
      act: async r => { await r.off(); await r.menuG('VENDAS', 'Serviços', 'Configurações'); await r.ring(r.p.locator('thead tr').filter({ visible: true }).first(), 4, 8); await r.move(1500, 270, 700); await r.off(); } },
    { id: 's08', est: 12, say: 'Para criar um serviço novo, clicas em Novo, escolhes o setor, o preço de venda, o IVA e escreves a descrição. Por exemplo, substituição das escovas do limpa-vidros. E clicas em Gravar.',
      act: async r => {
        await r.click(B(r, 'Novo'), 600); await r.settle(1200);
        await r.pickFast('setor_empresa_id', /^\s*Mecânica\s*$/); await r.wait(100);
        await typeIn(r, 'preco_venda', '12', 150); await r.wait(200);
        await r.pickFast('impostos_vendas_id', /^\s*23\s*$/); await r.wait(100);
        await typeIn(r, 'servico_descricao', 'Substituição das escovas do limpa-vidros', 30); await r.wait(300);
        await r.ring(B(r, 'Gravar'), 6, 10); await r.click(B(r, 'Gravar'), 500); await r.off(); await r.settle(1300);
      } },
    { id: 's09', est: 6, say: 'O serviço novo fica logo disponível para usar nos orçamentos.',
      act: async r => { const ok = r.el(/^\s*OK\s*$/, 'button,a'); if (await ok.count()) { await r.click(ok, 400); await r.settle(600); } const row = r.p.locator('tbody tr', { hasText: 'limpa-vidros' }).filter({ visible: true }).first(); await r.ring(row, 4, 8); await r.to(row, 600, .35); } },
    { id: 's10', est: 9, say: 'Na Hora técnica defines o preço de cada hora de trabalho, por setor, e o IVA. É este valor que entra nos orçamentos.',
      act: async r => { await r.off(); await r.menuG('VENDAS', 'Hora técnica', 'Configurações'); await r.ring(r.p.locator('tbody').filter({ visible: true }).first(), 4, 8); await r.move(1200, 400, 600); await r.off(); } },
    { id: 's11', est: 8, say: 'Para mudar um preço, clicas no lápis, corriges o valor e guardas. Aqui só vemos, e fechamos.',
      act: async r => { const row = r.p.locator('tbody tr', { hasText: 'Mecânica' }).filter({ visible: true }).first(); const e = row.locator(T('Editar')).first(); await r.ring(e, 8, 8); await r.click(e, 500); await r.off(); await r.settle(1200); await r.ring(inp(r, 'pv_hora'), 6, 8); await r.to(inp(r, 'pv_hora'), 500); await r.wait(1300); await r.off(); await fechar(r); } },
    { id: 's12', est: 10, say: 'E com isto fica completo o módulo de Vendas. No próximo módulo vamos à Produção, onde o orçamento se transforma em trabalho na oficina. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.off(); await r.move(1100, 700, 800); } },
  ],
};
