// RECURSOS HUMANOS · Vídeo 3 — Mapa de férias
const { sleep } = require('./engine');
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const RP = '#adianti_right_panel ';
const B = (r, t) => r.p.locator(RP + 'button, ' + RP + 'a').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).last();
const card = (r, t) => r.p.locator('.gp-cartao').filter({ hasText: t }).filter({ visible: true }).last();
const C = '#adianti_content';
const fd = async (r, n, v) => { const l = r.p.locator(RP + `[name="${n}"]`); await r.click(l, 380); await sleep(120); await r.p.keyboard.press('Control+A'); await r.p.keyboard.press('Backspace'); for (const ch of v) { await r.p.keyboard.type(ch); await sleep(105); } await r.p.keyboard.press('Tab'); await sleep(250); };
const yOf = loc => loc.evaluate(e => { const k = document.querySelector('#adianti_content'); return e.getBoundingClientRect().top - k.getBoundingClientRect().top + k.scrollTop - 90; });

module.exports = {
  name: 'rh03_mapa_ferias',
  titulo: 'Mapa de férias', subtitulo: 'As férias da equipa no ano, dia a dia, e os saldos de cada pessoa', n: 3, modulo: 'RECURSOS HUMANOS',
  start: async r => { r.c.on('page', p => { setTimeout(() => p.close().catch(() => {}), 300); }); await r.open('RhMapaFerias'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos ao mapa de férias: as férias de toda a equipa no ano, e os saldos de cada pessoa.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Recursos Humanos e escolhes Mapa de férias.',
      act: async r => { await r.menuG('RECURSOS HUMANOS', 'Mapa de férias'); } },
    { id: 's03', est: 12, say: 'Os cartões mostram quantos colaboradores tens, quem ainda não marcou férias, os pedidos por aprovar, e os dias que ainda faltam marcar. E por baixo, a equipa por setor.',
      act: async r => { for (const t of ['COLABORADORES', 'SEM FÉRIAS MARCADAS', 'COM PEDIDOS POR APROVAR', 'DIAS AINDA POR MARCAR', 'SETOR PRODUÇÃO', 'SETOR ADMINISTRATIVOS']) { const k = btn(r, t); await r.ring(k, 5, 12); await r.to(k, 320, .3, .5); await r.wait(850); } await r.off(); } },
    { id: 's04', est: 13, say: 'No mapa, cada linha é um colaborador: o direito a férias do ano, os dias aprovados, os pedidos e os que faltam marcar. Nos meses vês cada dia, com as cores da legenda.',
      act: async r => { const c = card(r, 'Mapa de férias'); await r.scrollTo(C, await yOf(c), 850); const l = c.locator('tbody tr, tr.gp-linha').first(); const b = await r.box(l); await r.ring(l, 4, 8); for (const fx of [.08, .2, .25, .3, .35]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 320); await r.wait(500); } await r.move(b.x + b.width * .45, b.y + b.height / 2, 400); await r.move(b.x + b.width * .97, b.y + b.height / 2, 2000); await r.off(); } },
    { id: 's05', est: 7, say: 'Assim vês logo se há demasiadas pessoas de férias ao mesmo tempo.',
      act: async r => { const c = card(r, 'Mapa de férias'); await r.ring(c, 6, 10); await r.move(1500, 600, 600); await r.move(1500, 900, 1500); await r.off(); } },
    { id: 's06', est: 13, say: 'Para marcar férias, clicas em Pedir ou registar férias. Escolhes o colaborador, o tipo férias e o período. Se já combinaste com a pessoa, marcas registar já aprovado. E clicas em Gravar.',
      act: async r => { await r.scrollTo(C, 0, 800); await r.click(btn(r, 'Pedir/registar férias'), 500); await r.settle(1400); await r.pickFast('funcionario_id', 'Edgar Oliveira Antunes (demo)', 'Edgar');
        const t = r.p.locator(RP + 'select[name="frequencia_tipo_id"]'); await r.ring(t, 5, 8); await r.click(t, 380); await r.p.keyboard.press('Escape'); await r.p.selectOption(RP + 'select[name="frequencia_tipo_id"]', { label: 'Férias' }); await r.wait(350); await r.off();
        await fd(r, 'data_inicio', '16112026'); await fd(r, 'data_termino', '20112026');
        const ap = r.p.locator(RP + 'label').filter({ hasText: /Registar já aprovado/ }).first(); await r.ring(ap, 5, 8); await r.click(ap, 400); await r.off();
        const g = B(r, 'Gravar'); await r.ring(g, 6, 10); await r.click(g, 500); await r.off(); await r.settle(1600); } },
    { id: 's07', est: 8, say: 'As férias ficam registadas. Voltas ao mapa, e lá estão elas, com o saldo da pessoa atualizado.',
      act: async r => { const ok = r.el(/^\s*OK\s*$/, 'button,a'); if (await ok.count()) { await r.click(ok, 400); await r.settle(600); } if (!/RhMapaFerias/.test(r.p.url())) { const m = btn(r, 'Mapa de férias'); await r.ring(m, 5, 8); await r.click(m, 450); await r.off(); await r.settle(1400); } const c = card(r, 'Mapa de férias'); const l = c.locator('tr').filter({ hasText: 'Edgar Oliveira' }).first(); await r.scrollTo(C, await yOf(l) - 80, 900); await r.ring(l, 4, 8); await r.wait(500); await r.off(); await r.scrollX(C, 1200, 1300); await r.wait(300); const b = await r.box(l); await r.ring(l, 4, 8); await r.move(b.x + b.width * .5, b.y + b.height / 2, 500); await r.move(1700, b.y + b.height / 2, 1500); await r.wait(600); await r.off(); } },
    { id: 's08', est: 9, say: 'Em cima, mudas de ano, imprimes o mapa em PDF para afixar na oficina, e nos feriados e períodos defines os feriados da tua zona.',
      act: async r => { await r.scrollTo(C, 0, 800); for (const t of ['2025', '2027', 'PDF para afixar', 'Feriados e períodos']) { const b = btn(r, t); await r.ring(b, 5, 8); await r.to(b, 320); await r.wait(650); } await r.off(); } },
    { id: 's09', est: 9, say: 'E assim geres o mapa de férias. No próximo vídeo vamos aos adiantamentos. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 700, 800); } },
  ],
};
