const { chromium } = require('playwright');
(async()=>{
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  const c = await b.newContext({viewport:{width:1920,height:1080}});
  await c.addInitScript(()=>{try{localStorage.setItem('ga_pin','1')}catch(e){}});
  const p = await c.newPage();
  await p.goto('http://127.0.0.1:8770/_login_local.php?u=1&unit=1');
  await p.goto('http://127.0.0.1:8770/index.php?class=CadastroDeClientesForm&method=onShow'); await p.waitForTimeout(2500);
  const h = await p.evaluate(()=>{const s=document.querySelector('[name=tipo_pessoa_id]'); return s.outerHTML.slice(0,400)+'\nNEXT:'+(s.nextElementSibling?s.nextElementSibling.outerHTML.slice(0,300):'')+'\nOPTS:'+[...s.options].map(o=>o.value+'='+o.text).join('|')+'\nG:'+[...document.querySelector('[name=grupo_pessoa_id]').options].map(o=>o.value+'='+o.text).join('|')+'\nT:'+[...document.querySelector('[name=tabela_preco_id]').options].map(o=>o.value+'='+o.text).join('|');});
  console.log(h);
  await b.close();
})();
