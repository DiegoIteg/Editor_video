const {Rec,sleep}=require('./engine');
(async()=>{ const r=new Rec('dbg5',{dry:true}); await r.start(); await r.open('CadastroDeClientesList'); const p=r.p;
 await p.locator('tbody tr').first().locator('i').first().click(); await sleep(1500);
 const f=await r.hit('Fechar','a,button,span'); console.log('hit', await f.evaluate(e=>e.outerHTML.slice(0,200)));
 await r.click(f,300); await sleep(1200);
 const T=t=>`[title="${t}"], [data-original-title="${t}"]`;
 const ed=p.locator('tbody tr').first().locator(T('Editar')); console.log('editar count',await ed.count(), await ed.first().isVisible());
 await p.screenshot({path:'dbg5.png'});
 await r.finish(); })();
