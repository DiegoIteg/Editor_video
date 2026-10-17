// abre lista, clica num botão por texto e tira screenshot + lista campos
const { chromium } = require('playwright');
const [cls, clickText, out] = process.argv.slice(2);
(async()=>{
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  const c = await b.newContext({viewport:{width:1920,height:1080}});
  await c.addInitScript(()=>{try{localStorage.setItem('ga_pin','1')}catch(e){}});
  const p = await c.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto('http://127.0.0.1:8770/_login_local.php?u=1&unit=1');
  await p.goto('http://127.0.0.1:8770/index.php?class='+cls+'&method=onShow'); await p.waitForTimeout(2500);
  if (clickText) { for (const t of clickText.split('>>')) { await p.getByText(t,{exact:false}).first().click(); await p.waitForTimeout(2200);} }
  const info = await p.evaluate(()=>{
    const vis=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0;};
    const lab=[...document.querySelectorAll('label,.tab-pane.active .card-header, .nav-link, .modal-title, legend, .tformseparator')].filter(vis).map(e=>e.innerText.trim().replace(/\s+/g,' ').slice(0,40)).filter(x=>x);
    const fields=[...document.querySelectorAll('input,select,textarea')].filter(vis).map(e=>{const r=e.getBoundingClientRect();return e.name+':'+e.type+'@'+Math.round(r.x)+','+Math.round(r.y);});
    const btns=[...document.querySelectorAll('.modal.show button, .modal.show a.btn, [role=dialog] button, form button, .tbutton, a.btn')].filter(vis).map(e=>(e.innerText||e.title||'').trim().slice(0,30)).filter(x=>x);
    return {lab:[...new Set(lab)].slice(0,80),fields:fields.slice(0,80),btns:[...new Set(btns)].slice(0,40)};
  });
  console.log(JSON.stringify(info)); if(errs.length) console.log('JS',errs.slice(0,3));
  await p.screenshot({path:out||'f.png'});
  await b.close();
})();
