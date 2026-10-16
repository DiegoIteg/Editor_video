// RECURSOS HUMANOS · Vídeo 5 — Utilizadores e perfis de acesso
const { sleep } = require('./engine');
const TS = t => `[title^="${t}"], [data-original-title^="${t}"], [data-bs-original-title^="${t}"]`;
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const RP = '#adianti_right_panel ';
const B = (r, t) => r.p.locator(RP + 'button, ' + RP + 'a').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).last();
const fechar = async r => { const f = r.p.locator(RP + 'span, ' + RP + 'a, ' + RP + 'button').filter({ hasText: /^\s*(×\s*)?Fechar\s*$/ }).filter({ visible: true }).first(); await r.ring(f, 6, 8); await r.to(f, 450); await sleep(250); await r.off(); await r.p.evaluate(() => Template.closeRightPanel()); await r.move(1150, 480, 450); await r.settle(500); };
const f = async (r, n, v, d = 50) => { const l = r.p.locator(RP + `[name="${n}"]`); await r.click(l, 380); await sleep(100); await r.p.keyboard.press('Control+A'); await r.p.keyboard.type(v, { delay: r.dry ? 5 : d }); await r.p.keyboard.press('Tab'); await sleep(200); };

module.exports = {
  name: 'rh05_utilizadores_perfis',
  titulo: 'Utilizadores e perfis de acesso', subtitulo: 'Quem entra no Go Auto e o que cada um pode ver e fazer', n: 5, modulo: 'RECURSOS HUMANOS',
  start: async r => { require('child_process').execSync('python3 /root/work/rec/tools/limpa_perfil.py'); await r.open('SystemUsersList'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos aos utilizadores e perfis de acesso: quem entra no Go Auto, e o que cada pessoa pode ver e fazer.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 7, say: 'No menu, abres Recursos Humanos, Utilizadores e acessos, e escolhes Utilizadores do sistema.',
      act: async r => { await r.menuG('RECURSOS HUMANOS', 'Utilizadores do sistema', 'Utilizadores e acessos'); } },
    { id: 's04', est: 11, say: 'Os cartões mostram os utilizadores ativos e bloqueados, quem está sem perfil e por isso não vê nenhum ecrã, quem está sem filial e não consegue entrar, e a direção.',
      act: async r => { for (const t of ['ATIVOS', 'BLOQUEADOS', 'SEM PERFIL', 'SEM FILIAL', 'DIREÇÃO']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 320, .3, .5); await r.wait(900); } await r.off(); } },
    { id: 's05', est: 13, say: 'Em Novo utilizador ligas o acesso a um colaborador: o nome, o e-mail, o login, a página inicial, as filiais onde pode entrar, e os perfis de acesso que definem o que pode fazer.',
      act: async r => { await r.click(btn(r, 'Novo utilizador'), 500); await r.settle(1500);
        for (const n of ['funcionario_id', 'name', 'email', 'login', 'frontpage_id']) { const el = n.endsWith('_id') ? r.p.locator(`select[name="${n}"] + .select2`).first() : r.p.locator(`#adianti_div_content input[name="${n}"]`).first(); await r.ring(el, 5, 8); await r.to(el, 350); await r.wait(450); } await r.off();
        for (const t of ['Empresas / filiais', 'Perfis de acesso']) { const k = r.p.locator('#adianti_div_content').getByText(t, { exact: true }).first(); if (await k.count()) { await r.ring(k, 5, 8); await r.click(k, 400); await r.wait(700); await r.off(); } } } },
    { id: 's06', est: 7, say: 'Agora, no mesmo menu, vamos aos Perfis de acesso.',
      act: async r => { await r.menuG('RECURSOS HUMANOS', 'Perfis de acesso', 'Utilizadores e acessos'); } },
    { id: 's07', est: 11, say: 'Os perfis padrão, com cadeado, vêm prontos: direção, supervisor, e um administrador para cada módulo. Não se alteram, mas podes cloná-los para criar os teus.',
      act: async r => { for (const t of ['PERFIS PADRÃO', 'PERFIS DA EMPRESA', 'ATRIBUÍDOS A UTILIZADORES']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 320, .3, .5); await r.wait(700); } await r.off(); const l = r.p.locator('tr').filter({ hasText: 'Direção' }).first(); await r.ring(l, 4, 8); await r.to(l, 450, .3); await r.wait(900); await r.off(); } },
    { id: 's08', est: 11, say: 'No olho vês o que um perfil permite: cada ecrã ligado pode ser aberto, e em cada um, as ações, como gravar ou gerar financeiro.',
      act: async r => { const l = r.p.locator('tr').filter({ hasText: 'Compras ADM' }).first(); const v = l.locator(TS('Ver o que este perfil')).first(); await r.ring(v, 8, 8); await r.click(v, 500); await r.off(); await r.settle(1500); await r.move(1500, 420, 800); await r.wait(900); await r.move(1500, 650, 1000); await r.wait(800); await fechar(r); } },
    { id: 's09', est: 13, say: 'Para criar um perfil teu, clicas em clonar. Dás um nome, por exemplo, compras consulta, uma descrição, e desligas o que este perfil não deve fazer. Clicas em Criar perfil.',
      act: async r => { const l = r.p.locator('tr').filter({ hasText: 'Compras ADM' }).first(); const c = l.locator(TS('Clonar')).first(); await r.ring(c, 8, 8); await r.click(c, 500); await r.off(); await r.settle(1500);
        await f(r, 'nome', 'Compras consulta'); await f(r, 'descricao', 'Vê as compras, mas não grava nem gera financeiro.', 30);
        for (const sel of ['input[name="a[622][]"]', 'input[name="a[625][]"]', 'input[name="a[94][]"][value="financeiro"]']) { const cb = r.p.locator(RP + sel).first(); if (await cb.count()) { const lb = cb.locator('xpath=ancestor::label[1]'); const tgt = (await lb.count()) ? lb : cb; await r.ring(tgt, 5, 8); await r.click(tgt, 380); await r.off(); await r.wait(250); } }
        const g = B(r, 'Criar perfil'); await g.evaluate(e => e.scrollIntoView({ behavior: 'smooth', block: 'center' })); await r.wait(700); await r.ring(g, 6, 10); await r.click(g, 500); await r.off(); await r.settle(1700); } },
    { id: 's10', est: 9, say: 'O novo perfil fica nos perfis da empresa, pronto a atribuir a um utilizador.',
      act: async r => { const ok = r.el(/^\s*OK\s*$/, 'button,a'); if (await ok.count()) { await r.click(ok, 400); await r.settle(600); } if (!/PerfilSystemGroupList/.test(r.p.url())) { await r.open('PerfilSystemGroupList'); await r.settle(1000); } const k = btn(r, 'PERFIS DA EMPRESA'); await r.ring(k, 5, 12); await r.to(k, 400, .3, .5); await r.wait(700); await r.off(); const l = r.p.locator('tr').filter({ hasText: 'Compras consulta' }).first(); await r.scrollTo('#adianti_content', 99999, 900); await r.ring(l, 4, 8); await r.to(l, 500, .3); await r.wait(1500); await r.off(); } },
    { id: 's11', est: 9, say: 'E com isto fica completo o módulo Recursos Humanos. No próximo módulo vamos à Logística. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 700, 800); } },
  ],
};
