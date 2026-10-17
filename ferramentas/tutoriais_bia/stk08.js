// STOCK · Vídeo 8 — Inventários (gravado depois da correção do pack v37: Gravar/Fechar enviam o n.º do inventário)
const { sleep } = require('./engine');
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t, 'i') }).filter({ visible: true }).first();
const card = (r, t) => r.p.locator('.gp-cartao').filter({ hasText: t }).filter({ visible: true }).last();
const kpi = (r, t) => r.p.locator('.gp-kpi').filter({ has: r.p.locator('.gp-kpi-rotulo', { hasText: new RegExp('^\\s*' + t, 'i') }) }).filter({ visible: true }).first();
const RP = '#adianti_right_panel ';
const C = '#adianti_content';
const linha = (r, t) => r.p.locator('tr.gp-linha').filter({ hasText: t }).filter({ visible: true }).first();
const natSel = async (r, name, label) => { const s = r.p.locator(RP + `select[name="${name}"]`); await r.ring(s, 5, 8); await r.click(s, 420); await r.p.keyboard.press('Escape'); await r.p.selectOption(RP + `select[name="${name}"]`, { label }); await r.wait(600); await r.off(); };
const typeIn = async (r, loc, txt, d = 110) => { await r.click(loc, 420); await sleep(120); await r.p.keyboard.press('Control+A'); for (const ch of txt) { await r.p.keyboard.type(ch); await sleep(r.dry ? 30 : d); } await sleep(250); };
const confirma = async (r, t) => { const b = r.p.locator('.modal.show button, .modal.show a').filter({ hasText: new RegExp('^\\s*' + t + '\\s*$') }).first(); await r.ring(b, 6, 8); await r.click(b, 450); await r.off(); await r.settle(1600); };

module.exports = {
  name: 'stk08_inventarios',
  titulo: 'Inventários', subtitulo: 'Contar o armazém, ver as diferenças e acertar o stock', n: 8, modulo: 'STOCK',
  start: async r => { await r.open('StockInventarioList'); },
  scenes: [
    { id: 's01', est: 10, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos aos inventários: contar o que está no armazém, ver as diferenças e acertar o stock.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres Stock e escolhes Inventários.',
      act: async r => { await r.menuG('STOCK', 'Inventários'); await r.settle(800); } },
    { id: 's03', est: 11, say: 'Os cartões mostram os inventários em contagem, os fechados e os cancelados, e o valor dos ajustes do ano, a custo: as sobras menos as faltas.',
      act: async r => { for (const t of ['EM CONTAGEM', 'FECHADOS', 'CANCELADOS', 'AJUSTES DE INVENTÁRIO']) { const k = kpi(r, t); await r.ring(k, 5, 12); await r.to(k, 320, .4, .5); await r.wait(900); } await r.off(); } },
    { id: 's04', est: 11, say: 'Na lista vês cada inventário: o armazém, o âmbito, se é total ou de uma família, quantos artigos já foram contados, quantos têm diferença, e o ajuste feito.',
      act: async r => { const l = linha(r, 'N.º 6'); const b = await r.box(l); await r.ring(l, 4, 8); for (const fx of [.05, .2, .33, .45, .58, .7, .85]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 300); await r.wait(550); } await r.off(); } },
    { id: 's05', est: 13, say: 'Para começar, clicas em Novo inventário. Escolhes o armazém e, se quiseres contar só uma parte, a família de artigos. Aqui, a travagem. Podes contar só os artigos com stock.',
      act: async r => { const n = btn(r, 'Novo inventário'); await r.ring(n, 6, 10); await r.click(n, 450); await r.off(); await r.settle(1300);
        await natSel(r, 'armazem', 'Armazém Central (demo)'); await natSel(r, 'familia', 'Travagem'); } },
    { id: 's06', est: 12, say: 'Na contagem cega, quem conta não vê o stock do sistema, e não se deixa influenciar. Para este exemplo desligamos, para veres as diferenças. Clicas em Criar inventário.',
      act: async r => { const c = r.p.locator(RP + 'input[name="cega[]"]').first(); const lb = r.p.locator(RP + 'label').filter({ hasText: /Contagem cega/ }).first(); await r.ring(lb, 5, 8); await r.wait(900); await r.click(lb, 420); await r.wait(500); await r.off();
        const g = r.p.locator(RP + 'button, ' + RP + 'a').filter({ hasText: /Criar inventário/ }).first(); await r.ring(g, 6, 10); await r.click(g, 450); await r.off(); await r.settle(1800); } },
    { id: 's07', est: 11, say: 'O inventário abre com os artigos a contar, por localização. No topo, quantos faltam contar, e em cima a folha de contagem em PDF, para quem prefere papel.',
      act: async r => { for (const t of ['ARTIGOS', 'POR CONTAR', 'CONTADOS']) { const k = kpi(r, t); await r.ring(k, 5, 12); await r.to(k, 320, .4, .5); await r.wait(700); } await r.off(); const f = btn(r, 'Folha de contagem'); await r.ring(f, 6, 10); await r.to(f, 400); await r.wait(1200); await r.off(); } },
    { id: 's08', est: 12, say: 'Com o leitor de código de barras, lês a etiqueta do artigo e indicas a quantidade. Aqui, treze pares de discos. Ao premir Enter, fica contado.',
      act: async r => { const q = r.p.locator('input[name="qtd"]').first(); await typeIn(r, q, '13'); const cod = r.p.locator('input[name="codigo"]').first(); await r.ring(cod, 5, 8); await typeIn(r, cod, '5601000087109', 70); await r.off(); await r.p.keyboard.press('Enter'); await r.settle(1800); } },
    { id: 's09', est: 9, say: 'Também podes escrever a contagem diretamente na grelha: nas pastilhas traseiras, vinte e três, e nas dianteiras, vinte e oito.',
      act: async r => { const t = linha(r, 'jogo traseiro').locator('input').first(); await typeIn(r, t, '23'); const d = linha(r, 'jogo dianteiro').locator('input').first(); await typeIn(r, d, '28'); await r.p.keyboard.press('Tab'); await r.wait(400); } },
    { id: 's10', est: 12, say: 'Clicas em Gravar contagens, e a diferença aparece logo: falta um jogo de pastilhas dianteiras, com o valor a custo. Podes parar e continuar mais tarde, o que já está contado fica guardado.',
      act: async r => { const g = r.p.locator('#tbutton_gravar'); await r.ring(g, 6, 10); await r.click(g, 450); await r.off(); await r.settle(1800); const l = linha(r, 'jogo dianteiro'); await r.ring(l, 4, 8); await r.wait(1200); await r.off(); } },
    { id: 's11', est: 13, say: 'Quando acabas, clicas em Fechar e ajustar o stock. O sistema resume o que vai mudar: os artigos contados, as sobras e as faltas. Confirmas, e o stock fica igual ao que contaste.',
      act: async r => { const f = r.p.locator('#tbutton_fechar'); await r.ring(f, 6, 10); await r.click(f, 450); await r.off(); await r.settle(1300); const m = r.p.locator('.modal.show .modal-content').first(); await r.ring(m, 6, 10); await r.wait(2200); await r.off(); await confirma(r, 'Fechar e ajustar'); } },
    { id: 's12', est: 11, say: 'O inventário fica fechado, com a diferença e o valor a custo. O ajuste fica nos movimentos e na auditoria de stock, e o relatório de diferenças sai em PDF.',
      act: async r => { const l = linha(r, 'jogo dianteiro'); await r.ring(l, 4, 8); await r.wait(1500); await r.off(); const p = btn(r, 'Relatório de diferenças'); await r.ring(p, 6, 10); await r.to(p, 400); await r.wait(1500); await r.off(); } },
    { id: 's13', est: 9, say: 'E assim fazes um inventário, total ou por família, sem parar a operação. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.scrollTo(C, 0, 800); await r.move(1100, 650, 800); } },
  ],
};
