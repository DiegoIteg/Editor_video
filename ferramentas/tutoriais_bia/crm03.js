// CRM · Vídeo 3 — Cadastro de clientes
const { sleep } = require('./engine');
const T = t => `[title="${t}"], [data-original-title="${t}"], [data-bs-original-title="${t}"]`;
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).first();
const NOME = 'Auto Peças Fonseca, Lda.';
const rowOf = (r, t) => r.p.locator('tbody tr', { hasText: t }).first();

module.exports = {
  name: 'crm03_clientes',
  titulo: 'Cadastro de clientes', subtitulo: 'Registar, consultar e gerir os clientes da oficina', n: 3,
  start: async r => { await r.open('CadastroDeClientesList'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vou ensinar-te a trabalhar com o Cadastro de clientes, o coração do CRM, onde fica guardada toda a informação de cada cliente.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'Para lá chegar, abres o CRM no menu e escolhes Clientes.',
      act: async r => { await r.menu('CRM', 'Clientes'); } },
    { id: 's03', est: 9, say: 'Esta é a lista de clientes, com o número, o nome, o tipo, se é particular ou empresa, e o grupo. Os clientes mais recentes aparecem primeiro, e em baixo mudas de página.',
      act: async r => {
        await r.ring(r.p.locator('thead tr').filter({ visible: true }).first(), 4, 8); await r.move(560, 270, 600); await r.wait(500); await r.move(1550, 270, 1500); await r.wait(500);
        await r.off(); await r.scrollTo('#adianti_content', 400, 900); const pg = r.vis('.pagination'); await r.ring(pg, 8, 10); await r.to(pg, 600); await r.wait(600); await r.off(); await r.scrollTo('#adianti_content', 0, 800);
      } },
    { id: 's04', est: 11, say: 'No topo tens a barra de ações: cadastrar um cliente novo, abrir os filtros, atualizar a lista, limpar os filtros, saltar para a prospeção ou para os orçamentos, e exportar.',
      act: async r => {
        for (const t of ['Cadastrar', 'Filtros', 'Atualizar', 'Limpar filtros', 'Prospecção', 'Orçamentos', 'Exportar']) { await r.ring(btn(r, t), 6, 10); await r.to(btn(r, t), 380); await r.wait(650); }
        await r.off();
      } },
    { id: 's05', est: 13, say: 'Em cada linha tens os atalhos para esse cliente: a lupa para ver a ficha, o lápis para editar, criar logo um orçamento novo, ver todos os orçamentos dele, o histórico de pós-venda e, no fim, eliminar.',
      act: async r => {
        const row = r.p.locator('tbody tr').filter({ visible: true }).first();
        const ic = row.locator('i').filter({ visible: true });
        for (let i = 0; i < 6; i++) { await r.ring(ic.nth(i), 8, 8); await r.to(ic.nth(i), 380); await r.wait(1250); }
        await r.off();
      } },
    { id: 's06', est: 10, say: 'Nos filtros procuras por número, tipo, grupo ou nome. Escrevemos, por exemplo, Oliveira, e clicamos em Buscar. A lista mostra só os clientes com esse nome.',
      act: async r => {
        await r.click(btn(r, 'Filtros'), 600); await r.settle(800);
        await r.type(r.vis('.offcanvas input[name="nome"], input[name="nome"]'), 'Oliveira', 120); await r.wait(300);
        await r.click(r.el('Buscar', 'a,button,span'), 600); await r.settle(1300);
        await r.ring(r.p.locator('tbody').filter({ visible: true }).first(), 4, 8); await r.move(700, 420, 700);
      } },
    { id: 's07', est: 6, say: 'O número no botão Filtros mostra que há um filtro ativo. Para voltar à lista completa, clicas em Limpar filtros.',
      act: async r => { await r.off(); await r.ring(btn(r, 'Filtros'), 6, 10); await r.to(btn(r, 'Filtros'), 600); await r.wait(1600); await r.off(); await r.click(btn(r, 'Limpar filtros'), 600); await r.settle(1200); } },
    { id: 's08', est: 8, say: 'Em Exportar levas a lista para fora do sistema, em CSV, Excel, PDF ou XML, para enviar ou trabalhar à parte.',
      act: async r => {
        await r.click(btn(r, 'Exportar'), 600); await r.wait(700);
        const items = r.p.locator('.dropdown-menu.show a').filter({ visible: true });
        for (const t of ['CSV', 'XLS', 'PDF', 'XML']) { const it = items.filter({ hasText: t }).first(); await r.ring(it, 4, 6); await r.to(it, 380); await r.wait(700); }
        await r.off(); await r.p.keyboard.press('Escape'); await r.move(1100, 160, 500); await r.p.mouse.click(1100, 160); await r.wait(300);
      } },
    { id: 's09', est: 11, say: 'Vamos registar um cliente novo. Clicas em Cadastrar. Nos dados gerais escolhes o tipo: física, para particulares, ou jurídica, para empresas. E o grupo, que aqui é Clientes.',
      act: async r => {
        await r.click(btn(r, 'Cadastrar'), 700); await r.settle(1400);
        await r.pick('tipo_pessoa_id', 'Jurídica'); await r.wait(400); await r.pick('grupo_pessoa_id', 'Clientes'); await r.wait(300);
      } },
    { id: 's10', est: 9, say: 'Na identificação escreves o nome da empresa e o número de contribuinte. O NIF é opcional, mas convém tê-lo para a faturação.',
      act: async r => { await r.type('input[name="nome"]', NOME, 70); await r.wait(300); await r.type('input[name="nif"]', '517248638', 110); } },
    { id: 's11', est: 14, say: 'Na morada indicas o tipo, a rua e o número, o concelho, o distrito, o país e o código postal. Podes juntar mais do que uma morada com o botão de mais.',
      act: async r => {
        await r.pick('morada_pessoa_tipo_morada_id[]', 'Comercial');
        await r.type('input[name="morada_pessoa_morada[]"]', 'Rua do Comércio', 70); await r.type('input[name="morada_pessoa_numero[]"]', '125', 110);
        await r.pick('morada_pessoa_conselho_id[]', 'São João da Madeira', 'São João');
        await r.pick('morada_pessoa_distrito_id[]', 'Aveiro', 'Aveir'); await r.pick('morada_pessoa_pais_id[]', 'Portugal', 'Portu');
        await r.type('input[name="morada_pessoa_cep[]"]', '3700-123', 100);
        const plus = r.p.locator('.tab-pane.active i.fa-plus, .tab-pane.active .fa-plus').filter({ visible: true }).first(); await r.ring(plus, 8, 8); await r.to(plus, 500);
      } },
    { id: 's12', est: 11, say: 'No separador dos contactos, o tipo de contacto, o telefone fixo ou o telemóvel e o e-mail. É para aqui que o sistema envia os orçamentos e os avisos ao cliente.',
      act: async r => {
        await r.off(); await r.click(r.el('CONTATOS', 'a,li,span'), 600); await r.wait(600);
        await r.pick('contatos_pessoa_tipo_contato_id[]', 'Comercial');
        await r.type('input[name="contatos_pessoa_movel[]"]', '913 452 781', 90);
        await r.type('input[name="contatos_pessoa_email[]"]', 'geral@autopecasfonseca.exemplo.pt', 55);
      } },
    { id: 's13', est: 8, say: 'Nos Links guardas o site e as redes sociais da empresa, e na Identificação outros documentos fiscais, se precisares.',
      act: async r => { for (const t of ['LINKS', 'IDENTIFICAÇÃO']) { await r.click(r.el(t, 'a,li,span'), 600); await r.wait(1500); } await r.click(r.el('MORADA', 'a,li,span'), 500); } },
    { id: 's14', est: 7, say: 'No fim, clicas em Salvar. O sistema confirma que o registo ficou guardado.',
      act: async r => {
        const s = r.el('Salvar', 'a,button,span'); await r.ring(s, 6, 10); await r.click(s, 700); await r.off(); await r.settle(1200);
        const ok = r.el(/^\s*OK\s*$/, 'button,a'); if (await ok.count()) { await r.ring(ok, 6, 8); await r.wait(900); await r.off(); await r.click(ok, 500); await r.settle(900); }
      } },
    { id: 's15', est: 7, say: 'De volta à lista, o novo cliente já aparece no topo, pronto a receber orçamentos.',
      act: async r => {
        if (!(await rowOf(r, 'Fonseca').isVisible().catch(() => false))) { await r.menu('CRM', 'Clientes', false); }
        await r.ring(rowOf(r, 'Fonseca'), 4, 8); await r.to(rowOf(r, 'Fonseca'), 700, .4);
      } },
    { id: 's16', est: 8, say: 'Na lupa abres a ficha completa, com os dados, as moradas e os contactos.',
      act: async r => { await r.off(); await r.click(rowOf(r, 'Fonseca').locator('i').first(), 600); await r.settle(1300); for (const t of ['Morada', 'CONTATOS']) { const tb = r.el(new RegExp('^\\s*' + t + '\\s*$', 'i'), 'a,li,span'); if (await tb.count()) { await r.click(tb, 500); await r.wait(900); } } } },
    { id: 's17', est: 8, say: 'E no lápis, o mesmo formulário abre já preenchido, para corrigires ou acrescentares o que for preciso.',
      act: async r => {
        await sleep(600); await r.click(await r.hit('Fechar', 'a,button,span'), 500); await r.settle(700); await r.click(rowOf(r, 'Fonseca').locator(T('Editar')).first(), 600); await r.settle(1400);
        await r.ring(r.p.locator('input[name="nome"]'), 6, 8); await r.to('input[name="nome"]', 600);
      } },
    { id: 's18', est: 10, say: 'Para eliminar um cliente, usas o caixote. O sistema pede sempre confirmação antes de apagar, para não perderes dados por engano.',
      act: async r => {
        await r.off(); await r.click(r.el('Voltar', 'a,button,span'), 600); await r.settle(1300);
        const del = rowOf(r, 'Fonseca').locator(T('Eliminar')).first(); await r.ring(del, 8, 8); await r.click(del, 700); await r.off(); await r.wait(1200);
        const sim = r.el(/^\s*Sim\s*$/, 'button,a,span'); await r.ring(sim, 6, 8); await r.to(sim, 600); await r.wait(900); await r.off(); await r.click(sim, 300); await r.settle(1400);
      } },
    { id: 's19', est: 9, say: 'E assim dominas o Cadastro de clientes. No próximo vídeo vamos às Viaturas dos clientes. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 600, 800); } },
  ],
};
