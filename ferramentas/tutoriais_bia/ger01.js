// APRESENTAÇÃO GERAL — infografia animada (sem Logística)
const go = (r, s) => r.p.evaluate(x => window.go(x), s);
const hideCur = async r => { const f = () => { const st = document.createElement('style'); st.textContent = '#__cur,.__ring,[id^="__r"]{display:none!important}'; (document.head || document.documentElement).appendChild(st); }; await r.p.addInitScript(f); await r.p.evaluate(f); };
module.exports = {
  name: 'ger01_visao_geral',
  titulo: 'O Go Auto em 3 minutos', subtitulo: 'Para quem é, os módulos e o fluxo de trabalho de ponta a ponta', n: 1, modulo: 'APRESENTAÇÃO',
  start: async r => { await r.p.goto(process.env.GA_BASE.replace(/\/$/, '') + '/infografia/index.html'); await r.p.waitForTimeout(800); await hideCur(r); await r.p.mouse.move(-50, -50); await go(r, 'intro'); await r.p.waitForTimeout(1500); },
  scenes: [
    { id: 's01', est: 10, say: 'Olá, eu sou a Bia, a tua assistente de formação. Em poucos minutos, mostro-te o que é o Go Auto, para quem é, e como o trabalho flui de ponta a ponta.', act: async r => { await go(r, 'intro'); } },
    { id: 's02', est: 11, say: 'O Go Auto é a plataforma de gestão para o mercado automóvel: oficinas de mecânica, chapa e pintura, pneus, vidros, eletricidade, lavagem e outros serviços. Para uma oficina, ou para várias filiais.', act: async r => { await go(r, 'quem'); } },
    { id: 's03', est: 11, say: 'Junta num só sítio o que costuma andar espalhado por cadernos, folhas de Excel, papéis e programas diferentes: os clientes, os orçamentos, a oficina, as peças, o dinheiro e a equipa.', act: async r => { await go(r, 'um'); } },
    { id: 's04', est: 10, say: 'Está organizado em oito módulos: CRM, Vendas, Produção, Compras, Stock, Financeiro, Recursos Humanos e Business. Vamos ver como trabalham juntos.', act: async r => { await go(r, 'mods'); } },
    { id: 's05', est: 10, say: 'Tudo começa no cliente. No CRM registas o cliente e a viatura, e acompanhas cada contacto e cada oportunidade.', act: async r => { await go(r, 'fluxo'); await r.p.waitForTimeout(500); await go(r, 'n1'); } },
    { id: 's06', est: 10, say: 'Nas Vendas fazes o orçamento, com peças, serviços e horas técnicas, e envias ao cliente. Quando ele aprova, o trabalho segue para a oficina.', act: async r => { await go(r, 'n2'); } },
    { id: 's07', est: 11, say: 'Na Produção, o orçamento aprovado torna-se uma ordem de serviço. Os técnicos registam as etapas, o tempo e o material gasto, e vês em que fase está cada carro.', act: async r => { await go(r, 'n3'); } },
    { id: 's08', est: 11, say: 'Se falta uma peça, as Compras pedem cotações, encomendam e recebem a mercadoria, e o Stock reserva-a para o carro certo.', act: async r => { await go(r, 'n4'); } },
    { id: 's09', est: 11, say: 'Com o carro pronto, o Financeiro trata da conta a receber, regista o pagamento e envia o recibo. E paga a tempo os fornecedores e as despesas.', act: async r => { await go(r, 'n5'); } },
    { id: 's10', est: 9, say: 'Depois da entrega, o pós-venda contacta o cliente e faz a pesquisa de satisfação, para que ele volte.', act: async r => { await go(r, 'n6'); } },
    { id: 's11', est: 10, say: 'Em paralelo, os Recursos Humanos acompanham a equipa: as férias, as ausências, os adiantamentos, e o que cada pessoa produz.', act: async r => { await go(r, 'rh'); } },
    { id: 's12', est: 11, say: 'E no topo, o Business junta tudo no Painel da Direção: o mês, o plano anual, o fluxo de caixa e os resultados, para decidires com números.', act: async r => { await go(r, 'biz'); } },
    { id: 's13', est: 9, say: 'Cliente, orçamento, oficina, peças, pagamento e pós-venda: um só fluxo, sem papel, e sem passar dados de um programa para outro.', act: async r => { await go(r, 'ciclo'); } },
    { id: 's14', est: 11, say: 'E tens tudo também no telemóvel, com a app Go Auto. Em cada módulo há vídeos de formação para aprenderes passo a passo. Eu sou a Bia, a tua assistente de formação. Até já!', act: async r => { await go(r, 'fim'); } },
  ],
};
