const { chromium } = require('playwright');
(async()=>{
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  const c = await b.newContext({viewport:{width:1920,height:1080}});
  const p = await c.newPage();
  await p.goto('http://127.0.0.1:8770/_login_local.php?u=1&unit=1');
  await p.goto('http://127.0.0.1:8770/index.php?class=CrmPainelDia&method=onShow'); await p.waitForTimeout(2500);
  const info = await p.evaluate(()=>{
    const out=[]; document.querySelectorAll('[class*=pin],[id*=pin],[onclick*=pin],[title*=ixar]').forEach(e=>out.push(e.tagName+' #'+e.id+' .'+e.className+' t='+(e.title||'')));
    return {bodyc:document.body.className, out:out.slice(0,15), ls:Object.keys(localStorage), cookies:document.cookie};
  });
  console.log(JSON.stringify(info,null,1));
  await p.mouse.move(30,300); await p.waitForTimeout(800);
  await p.screenshot({path:'hover.png'});
  await b.close();
})();
