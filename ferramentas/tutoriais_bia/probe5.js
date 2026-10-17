const { chromium } = require('playwright');
(async()=>{
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  const c = await b.newContext({viewport:{width:1920,height:1080}});
  await c.addInitScript(()=>{try{localStorage.setItem('ga_pin','1')}catch(e){}});
  const p = await c.newPage(); p.on('pageerror',e=>console.log('JSERR',e.message));
  await p.goto('http://127.0.0.1:8770/_login_local.php?u=1&unit=1');
  await p.goto('http://127.0.0.1:8770/index.php?class=CrmPainelDia&method=onShow'); await p.waitForTimeout(2500);
  // scroll container
  const sc = await p.evaluate(()=>{const els=[...document.querySelectorAll('*')].filter(e=>e.scrollHeight>e.clientHeight+50&&['auto','scroll'].includes(getComputedStyle(e).overflowY));return els.map(e=>e.tagName+'#'+e.id+'.'+e.className.toString().slice(0,40)+' sh='+e.scrollHeight);});
  console.log(sc);
  await p.getByText('Filtros',{exact:false}).first().click(); await p.waitForTimeout(1500);
  await p.screenshot({path:'pd_filtros.png'});
  await p.keyboard.press('Escape'); await p.waitForTimeout(800);
  await p.goto('http://127.0.0.1:8770/index.php?class=CrmPainelDia&method=onShow'); await p.waitForTimeout(2000);
  await p.getByText('ENTREGAS EM ATRASO').first().click(); await p.waitForTimeout(2000);
  await p.screenshot({path:'pd_card.png'});
  await p.evaluate(()=>{const e=document.querySelector('#adianti_div_content')||document.scrollingElement; window.scrollTo(0,0);});
  await b.close();
})();
