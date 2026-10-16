// RECURSOS HUMANOS · Vídeo 1 — Colaboradores
const { sleep } = require('./engine');
const TS = t => `[title^="${t}"], [data-original-title^="${t}"], [data-bs-original-title^="${t}"]`;
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const RP = '#adianti_right_panel ';
const B = (r, t) => r.p.locator(RP + 'button, ' + RP + 'a').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).last();
const row = r => r.p.locator('tbody tr').filter({ visible: true }).first();
const f = async (r, n, v, d = 55) => { const l = r.p.locator(RP + `[name="${n}"]`); await r.click(l, 380); await sleep(100); await r.p.keyboard.press('Control+A'); await r.p.keyboard.type(v, { delay: r.dry ? 5 : d }); await r.p.keyboard.press('Tab'); await sleep(200); };
const fd = async (r, n, v) => { const l = r.p.locator(RP + `[name="${n}"]`); await r.click(l, 380); await sleep(120); await r.p.keyboard.press('Control+A'); await r.p.keyboard.press('Backspace'); for (const ch of v) { await r.p.keyboard.type(ch); await sleep(105); } await r.p.keyboard.press('Tab'); await sleep(250); };
const natSel = async (r, n, label) => { const s = r.p.locator(RP + `select[name="${n}"]`); await r.ring(s, 5, 8); await r.click(s, 380); await r.p.keyboard.press('Escape'); await r.p.selectOption(RP + `select[name="${n}"]`, typeof label === 'number' ? { index: label } : { label }); await r.wait(350); await r.off(); };

module.exports = {
  name: 'rh01_colaboradores',
  titulo: 'Colaboradores', subtitulo: 'A ficha de cada pessoa da equipa e como registar uma nova', n: 1, modulo: 'RECURSOS HUMANOS',
  start: async r => { await r.open('FuncionarioList'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje começamos o módulo Recursos Humanos com os colaboradores: a ficha de cada pessoa da equipa.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Recursos Humanos e escolhes Colaboradores.',
      act: async r => { await r.menuG('RECURSOS HUMANOS', 'Colaboradores'); } },
    { id: 's03', est: 12, say: 'Os cartões mostram quem tem acesso ao sistema, os contratos que terminam nos próximos sessenta dias, os já terminados, quem não tem contrato registado, e quem faz anos este mês.',
      act: async r => { for (const t of ['COM ACESSO AO SISTEMA', 'SEM ACESSO AO SISTEMA', 'CONTRATO TERMINA EM 60 DIAS', 'CONTRATO TERMINADO', 'SEM CONTRATO REGISTADO', 'FAZEM ANOS ESTE MÊS', 'TODOS']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 300, .3, .5); await r.wait(750); } await r.off(); } },
    { id: 's04', est: 8, say: 'Na lista vês a função e o departamento, o contrato e se a pessoa já tem acesso ao sistema.',
      act: async r => { const b = await r.box(row(r)); await r.ring(row(r), 4, 8); for (const fx of [.15, .38, .62, .8, .93]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 330); await r.wait(500); } await r.off(); } },
    { id: 's05', est: 13, say: 'No primeiro ícone abres a ficha do colaborador: os dados pessoais, o contrato, a remuneração, as férias e ausências, os adiantamentos, os recibos, as horas extra e os documentos.',
      act: async r => { const i = row(r).locator(TS('Ficha do colaborador')).first(); await r.ring(i, 8, 8); await r.click(i, 500); await r.off(); await r.settle(1600);
        for (const t of ['Resumo', 'Contrato', 'Remuneração', 'Férias e ausências', 'Adiantamentos', 'Recibos', 'Horas extra', 'Documentos']) { const k = r.p.locator('#adianti_div_content').getByText(t, { exact: true }).first(); if (await k.count()) { await r.to(k, 280); await r.wait(380); } } await r.move(900, 700, 700); } },
    { id: 's06', est: 9, say: 'Em cima tens os atalhos para registar uma ausência ou férias, um adiantamento, as moradas e contactos, e criar o acesso ao sistema.',
      act: async r => { for (const t of ['Editar', 'Ausência / férias', 'Adiantamento', 'Moradas e contactos', 'Criar acesso']) { const b = btn(r, t); await r.ring(b, 5, 8); await r.to(b, 300); await r.wait(450); } await r.off(); } },
    { id: 's07', est: 13, say: 'Para registar um colaborador novo, voltas à lista e clicas em Novo colaborador. Preenches os dados pessoais: o nome, o apelido, a data de nascimento, o e-mail, o telemóvel e o NIF.',
      act: async r => { await r.click(btn(r, 'Colaboradores'), 450); await r.settle(1300); await r.click(btn(r, 'Novo colaborador'), 500); await r.settle(1400);
        await f(r, 'nome', 'Tiago'); await f(r, 'apelido', 'Marques Rodrigues (demo)'); await fd(r, 'data_nascimento', '14031992'); await f(r, 'email', 'tiago.rodrigues@exemplo.pt', 35); await f(r, 'movel', '912000111', 50); await f(r, 'nif', '258417633', 50); } },
    { id: 's08', est: 12, say: 'Em Função e contrato escolhes o setor, escreves a função, o tipo de contrato e a data de início. E clicas em Gravar.',
      act: async r => { const t = r.p.locator(RP + 'a, ' + RP + 'li').filter({ hasText: /^\s*Função e contrato\s*$/ }).first(); await r.ring(t, 5, 8); await r.click(t, 400); await r.off(); await r.wait(500);
        await natSel(r, 'setor_id', 'Produção'); await f(r, 'funcao', 'Mecânico'); await natSel(r, 'tipo_contrato_id', 'Sem Termo (Efetivo)'); await fd(r, 'data_inicio', '02112026');
        const g = B(r, 'Gravar'); await r.ring(g, 6, 10); await r.click(g, 500); await r.off(); await r.settle(1800); } },
    { id: 's09', est: 8, say: 'A ficha do colaborador fica criada e, a partir daqui, junta tudo o que lhe diz respeito.',
      act: async r => { const ok = r.el(/^\s*OK\s*$/, 'button,a'); if (await ok.count()) { await r.click(ok, 400); await r.settle(600); } if (/RhColaboradorFicha/.test(r.p.url())) { await r.move(1000, 400, 900); await r.wait(1500); } else { const l = r.p.locator('tbody tr').filter({ hasText: 'Tiago' }).first(); await r.ring(l, 4, 8); await r.to(l, 500, .3); await r.wait(1500); await r.off(); } } },
    { id: 's10', est: 9, say: 'E assim geres os colaboradores. No próximo vídeo vamos às ausências e férias. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 700, 800); } },
  ],
};
