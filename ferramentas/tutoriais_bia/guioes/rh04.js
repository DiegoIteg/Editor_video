// RECURSOS HUMANOS · Vídeo 4 — Adiantamentos
const { sleep } = require('./engine');
const TS = t => `[title^="${t}"], [data-original-title^="${t}"], [data-bs-original-title^="${t}"]`;
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const RP = '#adianti_right_panel ';
const B = (r, t) => r.p.locator(RP + 'button, ' + RP + 'a').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).last();
const linha = (r, t) => r.p.locator('tr').filter({ hasText: t }).filter({ visible: true }).first();
const f = async (r, n, v, d = 60) => { const l = r.p.locator(RP + `[name="${n}"]`); await r.click(l, 380); await sleep(100); await r.p.keyboard.press('Control+A'); await r.p.keyboard.type(v, { delay: r.dry ? 5 : d }); await r.p.keyboard.press('Tab'); await sleep(200); };

module.exports = {
  name: 'rh04_adiantamentos',
  titulo: 'Adiantamentos', subtitulo: 'Pedidos dos colaboradores, aprovação, pagamento e desconto no recibo', n: 4, modulo: 'RECURSOS HUMANOS',
  start: async r => { await r.open('RhAdiantamentosList'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos aos adiantamentos: o pedido, a aprovação, o pagamento e o desconto no recibo.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Recursos Humanos e escolhes Adiantamentos.',
      act: async r => { await r.menuG('RECURSOS HUMANOS', 'Adiantamentos'); } },
    { id: 's03', est: 11, say: 'Os cartões seguem o caminho de cada adiantamento: por aprovar, aprovados por pagar, com pagamento gerado, pagos, já descontados no recibo, e recusados.',
      act: async r => { for (const t of ['POR APROVAR', 'APROVADOS POR PAGAR', 'PAGAMENTO GERADO', 'PAGOS', 'DESCONTADOS', 'RECUSADOS']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 320, .3, .5); await r.wait(850); } await r.off(); } },
    { id: 's04', est: 12, say: 'Este pedido está por aprovar. No ícone decidir vês o valor pedido, o motivo e o limite do mês, que é uma percentagem do último recibo. Podes aprovar um valor menor. Clicas em Aprovar.',
      act: async r => { const d = r.p.locator(TS('Decidir')).filter({ visible: true }).first(); await r.ring(d, 8, 8); await r.click(d, 500); await r.off(); await r.settle(1500);
        const lim = r.p.locator(RP + 'div').filter({ hasText: /^LIMITE DO MÊS/i }).last(); if (await lim.count()) { await r.ring(lim, 5, 8); await r.to(lim, 450, .5, .5); await r.wait(1200); await r.off(); }
        const a = B(r, 'Aprovar'); await r.ring(a, 6, 10); await r.click(a, 500); await r.off(); await r.settle(1500); } },
    { id: 's05', est: 9, say: 'O adiantamento fica aprovado, por pagar. No ícone do Financeiro geras o pagamento, que vai para as contas a pagar.',
      act: async r => { const l = linha(r, 'Fábio Gomes'); await r.ring(l, 4, 8); await r.wait(700); await r.off(); const g = l.locator(TS('Gerar o pagamento')).first(); await r.ring(g, 8, 8); await r.click(g, 500); await r.off(); await r.settle(1200);
        const c = r.p.locator('.modal.show button').filter({ hasText: /^\s*(Sim|Gerar|Confirmar|OK)/ }).first(); if (await c.count()) { await r.ring(c, 6, 8); await r.click(c, 450); await r.off(); await r.settle(1300); } } },
    { id: 's06', est: 9, say: 'E no fim do mês, o valor é descontado automaticamente no recibo do colaborador.',
      act: async r => { const ok = r.el(/^\s*OK\s*$/, 'button,a'); if (await ok.count()) { await r.click(ok, 400); await r.settle(600); } const d = r.p.locator('tr').filter({ hasText: 'Descontado no recibo' }).filter({ visible: true }).first(); await r.ring(d, 4, 8); await r.to(d, 500, .85); await r.wait(1500); await r.off(); } },
    { id: 's07', est: 12, say: 'Para registar um adiantamento pedido ao balcão, clicas em Registar adiantamento. Escolhes o colaborador, o valor, a data e o motivo, e clicas em Gravar.',
      act: async r => { await r.click(btn(r, 'Registar adiantamento'), 500); await r.settle(1400); await r.pickFast('funcionario_id', 'Paulo Ribeiro Santos (demo)', 'Paulo'); await f(r, 'valor', '15000', 90); await f(r, 'motivo', 'Reparação do carro particular', 40);
        const g = B(r, 'Gravar'); await r.ring(g, 6, 10); await r.click(g, 500); await r.off(); await r.settle(1600); } },
    { id: 's08', est: 8, say: 'O pedido entra na lista, por aprovar, e segue o mesmo caminho.',
      act: async r => { const ok = r.el(/^\s*OK\s*$/, 'button,a'); if (await ok.count()) { await r.click(ok, 400); await r.settle(600); } const l = linha(r, 'Paulo Ribeiro'); await r.ring(l, 4, 8); await r.to(l, 500, .3); await r.wait(1500); await r.off(); } },
    { id: 's09', est: 9, say: 'E assim geres os adiantamentos. No próximo vídeo vamos aos utilizadores e aos perfis de acesso. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 700, 800); } },
  ],
};
