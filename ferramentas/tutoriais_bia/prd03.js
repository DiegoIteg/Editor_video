// PRODUÇÃO · Vídeo 3 — Trabalhar uma ordem de serviço
const { sleep } = require('./engine');
const T = t => `[title="${t}"], [data-original-title="${t}"], [data-bs-original-title="${t}"]`;
const OS = '2643';
const row = r => r.p.locator('tbody tr').filter({ hasText: OS }).filter({ hasText: 'Fabia' }).filter({ has: r.p.locator('.fa-file-pdf') }).first();
const ic = (r, t) => row(r).locator(T(t)).first();
const B = (r, t) => r.p.locator('#adianti_right_panel button, #adianti_right_panel a, .modal.show button, .modal.show a').filter({ hasText: new RegExp('^\\s*' + t) }).filter({ visible: true }).first();
const RP = r => r.p.locator('#adianti_right_panel');
const FU = 'Follow-up (incluir / concluir etapas)';
const FIM = 'Concluir produção — avisa o comercial: pronto para entregar e faturar';
const C = '#adianti_content';
const toList = async r => { const g = r.p.locator('tbody').filter({ has: r.p.locator('.fa-file-pdf') }).filter({ visible: true }).first(); const top = await r.p.evaluate(([s]) => { const t = [...document.querySelectorAll('tbody')].find(b => b.querySelector('.fa-file-pdf')); const c = document.querySelector(s); return t.getBoundingClientRect().top + c.scrollTop - 330; }, [C]); await r.scrollTo(C, top, 900); };
const fechar = async r => { const f = r.p.locator('#adianti_right_panel span, #adianti_right_panel a, #adianti_right_panel button').filter({ hasText: /^\s*(×\s*)?Fechar\s*$/ }).filter({ visible: true }).first(); await r.ring(f, 6, 8); await r.to(f, 450); await sleep(200); await r.off(); await r.p.evaluate(() => Template.closeRightPanel()); await r.move(1150, 560, 450); await r.settle(500); };

module.exports = {
  name: 'prd03_trabalhar_os',
  titulo: 'Trabalhar uma ordem de serviço', subtitulo: 'Etapas, pausas, material, técnico e conclusão', n: 3, modulo: 'PRODUÇÃO',
  start: async r => { r.c.on('page', p => { setTimeout(() => p.close().catch(() => {}), 300); }); await r.open('ProducaoList'); },
  scenes: [
    { id: 's01', est: 9, say: 'Olá, eu sou a Bia, a tua assistente de formação, e hoje vamos trabalhar uma ordem de serviço na oficina: as etapas, as pausas, o material gasto, o técnico e a conclusão.',
      act: async r => { await r.move(1100, 560, 900); } },
    { id: 's02', est: 7, say: 'No Controlo de produção, descemos até à lista. Cada linha é um carro que está na oficina.',
      act: async r => { await toList(r); await r.ring(row(r), 4, 8); await r.to(row(r), 700, .5); await r.wait(500); } },
    { id: 's03', est: 9, say: 'Vês a viatura, as datas de início e de fim, o setor, o técnico, a etapa em que está e o alerta.',
      act: async r => { const b = await r.box(row(r)); for (const fx of [.3, .4, .5, .6, .67, .73, .8, .92]) { await r.move(b.x + b.width * fx, b.y + b.height / 2, 300); await r.wait(380); } await r.off(); } },
    { id: 's04', est: 13, say: 'Os atalhos de cada linha: consultar a ordem, o PDF com o código QR, enviá-la por e-mail, o follow-up das etapas, o material gasto, a prioridade, o técnico responsável e, no fim, concluir a produção.',
      act: async r => { for (const t of ['Visualiza ', 'PDF da OS (com QR no rodapé)', 'Enviar OS por e-mail', FU, 'Material gasto', 'Prioridade (liga/desliga)', 'Técnico responsável', FIM]) { const i = ic(r, t); await r.ring(i, 8, 8); await r.to(i, 300); await r.wait(950); } await r.off(); } },
    { id: 's05', est: 10, say: 'Na lupa consultas a ordem completa: o diagnóstico, a viatura, o que foi orçamentado e o histórico das etapas, com os tempos de trabalho e de paragem.',
      act: async r => { await r.click(ic(r, 'Visualiza '), 500); await r.settle(1300); await r.move(1500, 400, 700); await r.wait(700); const p = r.p.locator('#adianti_right_panel .modal-body, #adianti_right_panel form, #adianti_right_panel').first(); await r.p.mouse.wheel(0, 700); await r.wait(600); await r.move(1500, 800, 800); await r.wait(1200); await fechar(r); } },
    { id: 's06', est: 8, say: 'No técnico responsável escolhes quem fica com o carro, por exemplo, o Diogo, e gravas.',
      act: async r => { await toList(r); await r.click(ic(r, 'Técnico responsável'), 500); await r.settle(1100); await r.pickFast('funcionario_id', /^\s*Diogo\s*$/); await r.wait(300); await r.ring(B(r, 'Gravar'), 6, 10); await r.click(B(r, 'Gravar'), 500); await r.off(); await r.settle(1200); } },
    { id: 's07', est: 11, say: 'No follow-up das etapas incluis a etapa que vai começar: o setor, a etapa, aqui reparação, e uma observação técnica. Ao gravar, o relógio da etapa começa a contar.',
      act: async r => {
        await toList(r); await r.click(ic(r, FU), 500); await r.settle(1200);
        await r.pickFast('etapa_id', /^\s*REPARAÇÃO\s*$/); await r.wait(200);
        await r.click(RP(r).locator('textarea[name="obs"]'), 400); for (const ch of 'Reparar guarda-lamas da frente.') { await r.p.keyboard.type(ch); await r.wait(30); }
        await r.ring(B(r, 'Gravar'), 6, 10); await r.click(B(r, 'Gravar'), 500); await r.off(); await r.settle(1300);
      } },
    { id: 's08', est: 9, say: 'A etapa fica em curso, com o técnico e a hora de início. Se o trabalho parar, clicas em Pausar, e o tempo parado fica registado à parte.',
      act: async r => { const e = RP(r).locator('table').filter({ hasText: 'REPARAÇÃO' }).first(); await r.ring(e, 6, 8); await r.to(e, 600, .3, .7); await r.wait(900); await r.off(); await r.ring(B(r, 'Pausar'), 6, 10); await r.click(B(r, 'Pausar'), 500); await r.off(); await r.settle(1000); } },
    { id: 's09', est: 8, say: 'Para continuar, clicas em Retomar. E quando a etapa termina, clicas em Concluir etapa.',
      act: async r => { await r.ring(B(r, 'Retomar'), 6, 10); await r.click(B(r, 'Retomar'), 500); await r.off(); await r.settle(1000); await r.ring(B(r, 'Concluir etapa'), 6, 10); await r.click(B(r, 'Concluir etapa'), 500); await r.off(); await r.settle(1000); await fechar(r); } },
    { id: 's10', est: 15, say: 'No material gasto registas o que foi usado neste carro: escolhes o artigo do stock, por exemplo, a base bicapa branco, indicas a quantidade, e clicas em Registar. O material sai do stock, e assim sabes o custo real de cada trabalho.',
      act: async r => {
        await toList(r); await r.click(ic(r, 'Material gasto'), 500); await r.settle(1200);
        await r.pickFast('produto_id', 'Base bicapa branco', 'Base bic'); await r.wait(300);
        await r.ring(B(r, 'Registar'), 6, 10); await r.click(B(r, 'Registar'), 500); await r.off(); await r.settle(1300);
        const m = RP(r).locator('table, div').filter({ hasText: 'Base bicapa branco' }).last(); await r.ring(m, 6, 8); await r.to(m, 500); await r.wait(600); await r.off(); await fechar(r);
      } },
    { id: 's11', est: 7, say: 'A estrela marca o carro como prioritário, e ele passa a aparecer nos alertas de prioridade.',
      act: async r => { await toList(r); const s = ic(r, 'Prioridade (liga/desliga)'); await r.ring(s, 8, 8); await r.click(s, 500); await r.off(); await r.settle(1300); } },
    { id: 's12', est: 10, say: 'Quando o carro está pronto, clicas na bandeira para concluir a produção. O sistema pede confirmação e avisa o comercial de que pode entregar e faturar.',
      act: async r => { await toList(r); await r.click(ic(r, FIM), 500); await r.wait(900); const s = B(r, 'Sim'); await r.ring(s, 6, 8); await r.to(s, 500); await r.wait(900); await r.off(); await r.click(s, 400); await r.settle(1500); } },
    { id: 's13', est: 6, say: 'A ordem passa a concluída, e sai do trabalho em curso.',
      act: async r => { await toList(r); await r.ring(row(r), 4, 8); await r.to(row(r), 600, .9); } },
    { id: 's14', est: 9, say: 'E assim trabalhas uma ordem de serviço. No próximo vídeo vamos pedir um serviço externo. Eu sou a Bia, a tua assistente de formação. Até já!',
      act: async r => { await r.off(); await r.move(1100, 700, 800); } },
  ],
};
