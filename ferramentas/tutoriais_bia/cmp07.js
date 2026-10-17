// COMPRAS · Vídeo 7 — Fornecedores e transportadores (gravado depois do pack v37: ecrãs em PT-PT e grupos com o nome certo)
const { sleep } = require('./engine');
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).first();
const C = '#adianti_content';
const NOME = 'Óleos & Filtros do Vale (demo), Lda.';
const rowOf = (r, t) => r.p.locator('#adianti_div_content tbody tr', { hasText: t }).first();
const tab = (r, t) => r.p.locator('#adianti_div_content a.nav-link, #adianti_div_content [role=tab]').filter({ hasText: new RegExp('^\\s*' + t + '\\s*$') }).first();

module.exports = {
  name: 'cmp07_fornecedores_transportadores',
  titulo: 'Fornecedores e transportadores', subtitulo: 'A ficha de quem te vende e de quem te transporta a mercadoria', n: 7, modulo: 'COMPRAS',
  start: async r => { await r.open('CadastroDeFornecedoresList'); },
  scenes: [
    { id: 's01', est: 10, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos aos fornecedores e aos transportadores: a ficha de quem te vende as peças e de quem te leva a mercadoria.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Compras e escolhes Fornecedores.',
      act: async r => { await r.menuG('COMPRAS', 'Fornecedores'); await r.settle(800); } },
    { id: 's03', est: 10, say: 'Na lista vês todos os fornecedores. Nos filtros procuras pelo nome, e em exportar tiras a lista para Excel ou PDF.',
      act: async r => { const l = r.p.locator('#adianti_div_content tbody tr').filter({ visible: true }).first(); await r.ring(l, 4, 8); await r.wait(1200); await r.off(); for (const t of ['Filtros', 'Exportar']) { const b = btn(r, t); await r.ring(b, 6, 10); await r.to(b, 380); await r.wait(900); } await r.off(); } },
    { id: 's04', est: 13, say: 'Para registar um fornecedor novo, clicas em Novo fornecedor. O grupo já vem como fornecedor. Escolhes o tipo de entidade, escreves o nome, e o prazo médio de entrega, em dias, que as compras usam para planear.',
      act: async r => { await r.click(btn(r, 'Novo fornecedor'), 650); await r.settle(1500); const g = r.p.locator('select[name="grupo_pessoa_id"] + .select2').first(); await r.ring(g, 5, 8); await r.wait(900); await r.off();
        await r.pickFast('tipo_pessoa_id', 'Jurídica'); await r.type('input[name="nome"]', NOME, 55); await r.type('input[name="prazo_medio_forn"]', '3', 120); } },
    { id: 's05', est: 9, say: 'Na identificação escolhes o tipo de documento, o NIF, e escreves o número de contribuinte.',
      act: async r => { await r.pickFast('id_fiscal_pessoa_tipo_id_fiscal_id[]', 'NIF - Número de Identificação Fiscal', 'NIF'); await r.type('input[name="id_fiscal_pessoa_id_fiscal[]"]', '509900216', 110); } },
    { id: 's06', est: 16, say: 'Na morada escolhes o tipo, aqui comercial, e escreves a rua e o número da porta. Depois o concelho, o distrito e o país, que encontras a escrever as primeiras letras, e por fim o código postal. Se o fornecedor tiver outro armazém, juntas mais uma morada com o botão de mais.',
      act: async r => { await r.click(tab(r, 'MORADA'), 500); await r.wait(300);
        await r.pickFast('morada_pessoa_tipo_morada_id[]', 'Comercial', 'Com');
        await r.type('input[name="morada_pessoa_morada[]"]', 'Rua da Indústria', 25); await r.type('input[name="morada_pessoa_numero[]"]', '40', 50);
        await r.pickFast('morada_pessoa_conselho_id[]', 'Viseu', 'Vise'); await r.pickFast('morada_pessoa_distrito_id[]', 'Viseu', 'Vise'); await r.pickFast('morada_pessoa_pais_id[]', 'Portugal', 'Port');
        await r.type('input[name="morada_pessoa_cep[]"]', '3500-123', 35); const plus = r.p.locator('.tab-pane.active i.fa-plus, .tab-pane.active .fa-plus').filter({ visible: true }).first(); if (await plus.count()) { await r.ring(plus, 8, 8); await r.to(plus, 300); await r.wait(500); await r.off(); } } },
    { id: 's07', est: 11, say: 'Nos contactos escreves o telemóvel e o e-mail. É para este e-mail que saem as cotações e as encomendas, por isso confirma-o bem.',
      act: async r => { await r.click(tab(r, 'CONTACTOS'), 500); await r.wait(300);
        await r.pickFast('contatos_pessoa_tipo_contato_id[]', 'Comercial', 'Com');
        await r.type('input[name="contatos_pessoa_movel[]"]', '913 400 120', 55); await r.type('input[name="contatos_pessoa_email[]"]', 'encomendas@oleosfiltrosvale.exemplo.pt', 30); } },
    { id: 's08', est: 9, say: 'Nos dados bancários guardas o banco e o IBAN, para os pagamentos, e nos links o site do fornecedor.',
      act: async r => { for (const t of ['DADOS BANCÁRIOS', 'LINKS']) { await r.click(tab(r, t), 550); await r.wait(1400); } await r.click(tab(r, 'IDENTIFICAÇÃO'), 500); } },
    { id: 's09', est: 7, say: 'Clicas em Gravar, e o fornecedor fica pronto a usar nas cotações e nas encomendas.',
      act: async r => { const g = r.p.locator('#adianti_div_content button, #adianti_div_content a').filter({ hasText: /^\s*Gravar\s*$/ }).first(); await r.scrollTo(C, await g.evaluate(e => { const k = document.querySelector('#adianti_content'); return e.getBoundingClientRect().top - k.getBoundingClientRect().top + k.scrollTop - 500; }), 700); await r.ring(g, 6, 10); await r.click(g, 450); await r.off(); await r.settle(1800); const l = rowOf(r, 'Óleos & Filtros'); await r.ring(l, 4, 8); await r.wait(1000); await r.off(); } },
    { id: 's10', est: 9, say: 'Os transportadores têm a sua lista própria. No mesmo menu, escolhes Transportadores.',
      act: async r => { await r.menuG('COMPRAS', 'Transportadores'); await r.settle(900); const l = rowOf(r, 'Transportes Rápidos'); await r.ring(l, 4, 8); await r.wait(900); await r.off(); } },
    { id: 's11', est: 12, say: 'A ficha do transportador é parecida, e tem mais um separador, a frota: as viaturas com que ele faz as entregas, com a matrícula, a marca e o modelo.',
      act: async r => { const l = rowOf(r, 'Transportes Rápidos'); const e0 = l.locator('i[class*="fa-edit"], i[class*="fa-pen"]').filter({ visible: true }).first(); const e = (await e0.count()) ? e0 : l.locator('a').filter({ visible: true }).nth(1); await r.click(e, 500); await r.settle(1600); await r.click(tab(r, 'FROTA'), 550); await r.wait(600); const pane = r.p.locator('#adianti_div_content .tab-pane.active').filter({ visible: true }).last(); await r.ring(pane, 6, 10); await r.wait(1600); await r.off(); } },
    { id: 's12', est: 9, say: 'E com isto ficas a saber gerir os fornecedores e os transportadores. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.scrollTo(C, 0, 800); await r.move(1100, 650, 800); } },
  ],
};
