// CRM · Vídeo 4 — Viaturas dos clientes
const { sleep } = require('./engine');
const T = t => `[title="${t}"], [data-original-title="${t}"], [data-bs-original-title="${t}"]`;
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).first();
const MAT = 'BX-27-QL';
const rowOf = (r, t) => r.p.locator('tbody tr', { hasText: t }).first();

module.exports = {
  name: 'crm04_viaturas',
  titulo: 'Viaturas dos clientes', subtitulo: 'Registar e consultar cada viatura que entra na oficina', n: 4,
  start: async r => { await r.open('ViaturaList'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vou ensinar-te a gerir as Viaturas dos clientes, o registo de cada carro que passa pela oficina.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 5, say: 'No menu, abres o CRM e escolhes Viaturas dos clientes.',
      act: async r => { await r.menu('CRM', 'Viaturas dos clientes'); } },
    { id: 's03', est: 10, say: 'A lista mostra a classe, a marca, a matrícula, o modelo, a cor, e o ano e o mês do registo. A matrícula aparece como uma chapa, fácil de reconhecer.',
      act: async r => {
        await r.ring(r.p.locator('thead tr').filter({ visible: true }).first(), 4, 8); await r.move(560, 270, 600); await r.wait(400); await r.move(1800, 270, 1800); await r.off();
        const m = r.p.locator('tbody tr').filter({ visible: true }).first().locator('td').nth(5); await r.ring(m, 6, 8); await r.to(m, 700); await r.wait(900);
      } },
    { id: 's04', est: 9, say: 'No topo, cadastras uma viatura nova, filtras, atualizas, limpas os filtros ou exportas. Em cada linha, o lápis edita e o caixote elimina.',
      act: async r => {
        await r.off();
        for (const t of ['Cadastrar', 'Filtros', 'Atualizar', 'Limpar filtros', 'Exportar']) { await r.ring(btn(r, t), 6, 10); await r.to(btn(r, t), 380); await r.wait(500); }
        const row = r.p.locator('tbody tr').filter({ visible: true }).first();
        for (const t of ['Editar', 'Eliminar']) { const i = row.locator(T(t)).first(); await r.ring(i, 8, 8); await r.to(i, 400); await r.wait(700); }
        await r.off();
      } },
    { id: 's05', est: 10, say: 'Nos filtros encontras rapidamente uma viatura, por exemplo pela marca. Escolhemos Volkswagen e clicamos em Buscar.',
      act: async r => {
        await r.click(btn(r, 'Filtros'), 600); await r.settle(900);
        const sel = await r.p.evaluate(() => { const s = [...document.querySelectorAll('select')].find(s => s.offsetParent && [...s.options].some(o => o.text === 'Volkswagen')); return s ? s.name : null; });
        if (sel) await r.pick(sel, 'Volkswagen', 'Volksw');
        await r.click(r.el('Buscar', 'a,button,span'), 600); await r.settle(1300); await r.ring(r.p.locator('tbody').filter({ visible: true }).first(), 4, 8); await r.move(800, 420, 700);
      } },
    { id: 's06', est: 4, say: 'E limpas os filtros para voltar a ver todas.',
      act: async r => { await r.off(); await r.click(btn(r, 'Limpar filtros'), 600); await r.settle(1200); } },
    { id: 's07', est: 8, say: 'Para registar uma viatura, clicas em Cadastrar. Escolhes a classe, por exemplo, veículos ligeiros, e escreves a matrícula.',
      act: async r => {
        await r.click(btn(r, 'Cadastrar'), 700); await r.settle(1300);
        await r.pick('classe_viatura_id', 'Veiculos Ligeiros'); await r.wait(300); await r.type('input[name="matricula"]', MAT, 130);
      } },
    { id: 's08', est: 10, say: 'Depois a marca, que encontras a escrever as primeiras letras, o modelo e a cor. E, por fim, o mês e o ano do registo da viatura.',
      act: async r => {
        await r.pick('marca_viatura_id', 'Peugeot', 'Peug'); await r.type('input[name="modelo_viatura"]', '308 SW', 90); await r.type('input[name="cor_viatura"]', 'Cinzento', 90);
        await r.type('input[name="mes_viatura"]', '05', 140); await r.type('input[name="ano_viatura"]', '2021', 140);
      } },
    { id: 's09', est: 9, say: 'Clicas em Salvar e o sistema confirma. A viatura fica disponível para ligar aos orçamentos e aos trabalhos do cliente.',
      act: async r => {
        const s = r.el('Salvar', 'a,button,span'); await r.ring(s, 6, 10); await r.click(s, 700); await r.off(); await r.settle(1200);
        const ok = r.el(/^\s*OK\s*$/, 'button,a'); if (await ok.count()) { await r.ring(ok, 6, 8); await r.wait(900); await r.off(); await r.click(ok, 500); await r.settle(900); }
        if (!(await rowOf(r, MAT).isVisible().catch(() => false))) { await r.menu('CRM', 'Viaturas dos clientes', false); }
        await r.ring(rowOf(r, MAT), 4, 8); await r.to(rowOf(r, MAT), 700, .45);
      } },
    { id: 's10', est: 8, say: 'Se precisares de corrigir algum dado, o lápis abre o registo já preenchido.',
      act: async r => { await r.off(); await r.click(rowOf(r, MAT).locator(T('Editar')).first(), 600); await r.settle(1300); await r.ring(r.p.locator('input[name="modelo_viatura"]'), 6, 8); await r.to('input[name="modelo_viatura"]', 600); } },
    { id: 's11', est: 9, say: 'E para eliminar usas o caixote. O sistema pede sempre confirmação antes de apagar.',
      act: async r => {
        await r.off(); const v = r.el(/^\s*(Voltar|Fechar)\s*$/, 'a,button,span'); await r.click(v, 600); await r.settle(1200);
        const del = rowOf(r, MAT).locator(T('Eliminar')).first(); await r.ring(del, 8, 8); await r.click(del, 700); await r.off(); await r.wait(1200);
        const sim = r.el(/^\s*Sim\s*$/, 'button,a,span'); await r.ring(sim, 6, 8); await r.to(sim, 600); await r.wait(900); await r.off(); await r.click(sim, 300); await r.settle(1000);
        const ok = r.el(/^\s*OK\s*$/, 'button,a'); if (await ok.count()) { await r.click(ok, 450); await r.settle(600); }
      } },
    { id: 's12', est: 9, say: 'E assim dominas as Viaturas dos clientes. No próximo vídeo vamos à Pós-venda, às pesquisas de satisfação. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.move(1100, 600, 800); } },
  ],
};
