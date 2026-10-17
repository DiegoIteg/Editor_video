const {Rec,sleep}=require('./engine');
(async()=>{ const r=new Rec('ex10',{dry:true}); await r.start(); await r.open('PosVendaList'); const p=r.p;
 const T=t=>`[title="${t}"], [data-original-title="${t}"]`;
 await p.locator('tbody tr').filter({visible:true}).first().locator(T('Editar')).first().click(); await sleep(2000);
 await p.screenshot({path:'pv_form.png',fullPage:false});
 console.log(await p.evaluate(()=>[...document.querySelectorAll('input,select,textarea')].filter(e=>e.getBoundingClientRect().width>0).map(e=>e.name+':'+e.type+(e.tagName=='SELECT'?'('+[...e.options].map(o=>o.text).join('/')+')':'')+'@'+Math.round(e.getBoundingClientRect().y)).join('\n')));
 const h=await p.evaluate(()=>document.querySelector('#adianti_content')?document.querySelector('#adianti_content').scrollHeight:0); console.log('h',h);
 await p.evaluate(()=>{document.querySelector('#adianti_content').scrollTop=800}); await sleep(500); await p.screenshot({path:'pv_form2.png'});
 await r.finish(); })();
