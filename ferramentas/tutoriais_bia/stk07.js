// STOCK · Vídeo 7 — Artigos e localizações
const { sleep } = require('./engine');
const TS = t => `[title^="${t}"], [data-original-title^="${t}"], [data-bs-original-title^="${t}"]`;
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const tab = (r, t) => r.p.locator('#adianti_div_content a.nav-link, #adianti_div_content li a').filter({ hasText: new RegExp('^\\s*' + t + '\\s*$') }).first();
const row = r => r.p.locator('tbody tr').filter({ visible: true }).first();
const C = '#adianti_content';
const typeIn = async (r, loc, txt, d = 60) => { await r.click(loc, 420); await sleep(120); await r.p.keyboard.press('Control+A'); await r.p.keyboard.type(txt, { delay: r.dry ? 5 : d }); await r.p.keyboard.press('Tab'); await sleep(300); };
const L = n => `select[name="endereco_stock_cad_produtos_${n}[]"]`;

module.exports = {
  name: 'stk07_artigos_localizacoes',
  titulo: 'Artigos e localizações', subtitulo: 'Criar um artigo e dizer onde ele mora no armazém', n: 7, modulo: 'STOCK',
  start: async r => { r.c.on('page', p => { setTimeout(() => p.close().catch(() => {}), 300); }); await r.open('CadProdutosList'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos aos artigos: criar um artigo novo e dizer onde ele fica arrumado no armazém.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Stock e escolhes Artigos.',
      act: async r => { await r.menuG('STOCK', 'Artigos'); } },
    { id: 's03', est: 15, say: 'Os cartões mostram os artigos com stock, em rutura, abaixo do mínimo e sem stock. E também os que ainda não têm preço de compra ou código de barras. Cada cartão filtra a lista, e assim encontras logo os artigos com a ficha por completar.',
      act: async r => { for (const t of ['COM STOCK', 'RUTURA OU NEGATIVO', 'ABAIXO DO MÍNIMO', 'SEM STOCK', 'SEM PREÇO DE COMPRA', 'SEM CÓDIGO DE BARRAS', 'TODOS']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 300, .3, .5); await r.wait(700); } await r.off(); } },
    { id: 's04', est: 15, say: 'Para criar um artigo, clicas em Cadastrar. Escreves a descrição, escolhes a unidade de medida, a quantidade por embalagem e a taxa de IVA. O código de barras é gerado sozinho, e serve depois para as etiquetas e para o leitor.',
      act: async r => { await r.click(btn(r, 'Cadastrar'), 500); await r.settle(1400); await typeIn(r, r.p.locator('input[name="produto_descicao"]'), 'Filtro de pólen');
        await r.pickFast('un_medida_id', /^\s*[Uu]nidade\s*$/, 'unid'); await typeIn(r, r.p.locator('input[name="quantidade_unidade"]'), '1'); await r.pickFast('impostos_compras_id', /^\s*23\s*$/, '23');
        const cb = r.p.locator('input[name="cod_barra"]'); await r.ring(cb, 5, 8); await r.to(cb, 400); await r.wait(700); await r.off(); } },
    { id: 's05', est: 11, say: 'Nos separadores completas a ficha: em geral, a família do artigo. Na compra, o fornecedor habitual. E na venda, o preço de venda base, que é usado nos orçamentos.',
      act: async r => { await r.pickFast('familia_produto_id', /^\s*Filtros\s*$/, 'Filtr');
        await r.click(tab(r, 'COMPRA'), 400); await r.wait(300); await r.pickFast('fornecedor_padrao', /Distribuição Oficina Total/, 'Distrib');
        await r.click(tab(r, 'VENDA'), 400); await r.wait(300); await r.ring(r.p.locator('select[name="grupo_vendas_id"] + .select2'), 5, 8); await r.wait(500); await r.off(); await typeIn(r, r.p.locator('input[name="preco_venda"]'), '18,90', 110); } },
    { id: 's06', est: 6, say: 'E clicas em Salvar. O artigo entra na lista.',
      act: async r => { const s = btn(r, 'Salvar'); await r.ring(s, 6, 10); await r.click(s, 500); await r.off(); await r.settle(1600); await r.ring(row(r), 4, 8); await r.wait(900); await r.off(); } },
    { id: 's07', est: 11, say: 'Nos ícones da linha tens os movimentos, a ficha de stock, o detalhe, a localização, as etiquetas com código de barras, o editar e o eliminar.',
      act: async r => { const as = row(r).locator('a'); const n = await as.count(); for (let i = 0; i < Math.min(n, 8); i++) { await r.ring(as.nth(i), 7, 8); await r.to(as.nth(i), 260); await r.wait(500); } await r.off(); } },
    { id: 's08', est: 14, say: 'No ícone da localização dizes onde o artigo mora no armazém: escolhes o armazém, a rua, a prateleira, o nível e a posição. O código da localização forma-se sozinho. Assim, quem vai buscar a peça sabe logo onde está.',
      act: async r => { const l = row(r).locator('a').nth(3); await r.ring(l, 8, 8); await r.click(l, 500); await r.off(); await r.settle(1500);
        for (const [n, v] of [['armazens_id', 'Armazém Central (demo)'], ['armazem_rua_id', 'A'], ['armazem_prateleira_id', 'B'], ['armazem_nivel_id', '2'], ['armazem_posicao_id', '01']]) { const s = r.p.locator(L(n)).first(); if (await s.evaluate(e => !!(e.nextElementSibling && e.nextElementSibling.classList.contains('select2')))) { await r.pickFast(`endereco_stock_cad_produtos_${n}[]`, new RegExp('^\\s*' + v.replace(/[()]/g, '\\$&') + '\\s*$'), v.slice(0, 6)); } else { await r.ring(s, 5, 8); await r.p.selectOption(L(n), { label: v }); await r.wait(400); await r.off(); } } } },
    { id: 's09', est: 6, say: 'Clicas em Salvar, e a localização fica gravada.',
      act: async r => { const c = r.p.locator('input[name="endereco_stock_cad_produtos_codigo_localizacao[]"]').first(); await r.ring(c, 5, 8); await r.wait(600); await r.off(); const s = btn(r, 'Salvar'); await r.ring(s, 6, 10); await r.click(s, 500); await r.off(); await r.settle(1500); } },
    { id: 's10', est: 9, say: 'No menu Localizações vês todos os artigos com a sua morada no armazém, e o código de cada localização.',
      act: async r => { await r.menuG('STOCK', 'Localizações'); const l = row(r); const b = await r.box(l); await r.ring(l, 4, 8); for (const fx of [.12, .45, .7, .92]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 280); await r.wait(300); } await r.off(); } },
    { id: 's11', est: 8, say: 'E nas configurações do Stock defines as famílias, os grupos e os subgrupos de artigos da oficina.',
      act: async r => { await r.menuG('STOCK', 'Família', 'Configurações'); await r.ring(r.p.locator('tbody').filter({ visible: true }).first(), 4, 8); await r.move(800, 420, 500); await r.wait(300); await r.off(); } },
    { id: 's12', est: 9, say: 'E com isto fica completo o módulo Stock. No próximo módulo vamos aos Recursos Humanos. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 700, 800); } },
  ],
};
