const { chromium } = require('playwright');
const [cls, extra] = process.argv.slice(2);
(async()=>{
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  const c = await b.newContext({viewport:{width:1920,height:1080}});
  await c.addInitScript(()=>{try{localStorage.setItem('ga_pin','1')}catch(e){}});
  const p = await c.newPage();
  await p.goto('http://127.0.0.1:8770/_login_local.php?u=1&unit=1');
  await p.goto('http://127.0.0.1:8770/index.php?class='+cls+(extra||'')); await p.waitForTimeout(2500);
  const info = await p.evaluate(()=>{
    const vis=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0;};
    const btn=[...document.querySelectorAll('#adianti_div_content a,#adianti_div_content button,#adianti_div_content input[type=button]')].filter(vis).map(e=>{const r=e.getBoundingClientRect();return (e.innerText||e.value||e.title||e.getAttribute('aria-label')||'').trim().replace(/\s+/g,' ').slice(0,40)+' @'+Math.round(r.x)+','+Math.round(r.y)+' t='+(e.title||'');}).filter(s=>!s.startsWith(' @'));
    const fields=[...document.querySelectorAll('#adianti_div_content input,#adianti_div_content select,#adianti_div_content textarea')].filter(vis).map(e=>e.name+':'+e.type);
    const h=document.body.scrollHeight;
    return {btn:btn.slice(0,80),fields:fields.slice(0,60),h};
  });
  console.log(JSON.stringify(info,null,0));
  await p.screenshot({path:'p_'+cls+'.png',fullPage:true});
  await b.close();
})();
