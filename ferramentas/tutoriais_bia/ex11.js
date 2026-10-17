const {Rec,sleep}=require('./engine');
(async()=>{ const r=new Rec('ex11',{dry:true}); await r.start(); await r.open('PosVendaDashboard'); const p=r.p;
 await p.screenshot({path:'ind1.png'});
 const h=await p.evaluate(()=>document.querySelector('#adianti_content').scrollHeight); console.log('h',h);
 console.log(await p.evaluate(()=>[...document.querySelectorAll('h1,h2,h3,h4,h5,.card-title,.gp-kpi, [class*=title]')].filter(e=>e.offsetParent).map(e=>e.innerText.replace(/\s+/g,' ').slice(0,60)).filter(x=>x).slice(0,40).join('\n')));
 console.log('BTN:'+await p.evaluate(()=>[...document.querySelectorAll('#adianti_div_content a.btn, #adianti_div_content button')].filter(e=>e.getBoundingClientRect().width>0).map(e=>e.innerText.trim()).join('|')));
 await p.evaluate(()=>{document.querySelector('#adianti_content').scrollTop=900}); await sleep(800); await p.screenshot({path:'ind2.png'});
 await p.evaluate(()=>{document.querySelector('#adianti_content').scrollTop=1800}); await sleep(800); await p.screenshot({path:'ind3.png'});
 await r.finish(); })();
