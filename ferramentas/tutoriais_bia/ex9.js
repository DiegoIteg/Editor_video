const {Rec,sleep}=require('./engine');
(async()=>{ const r=new Rec('ex9',{dry:true}); await r.start(); await r.open('PosVendaList'); const p=r.p;
 await p.screenshot({path:'pv_list.png'});
 console.log(await p.evaluate(()=>{const tr=[...document.querySelectorAll('tbody tr')].find(t=>t.offsetParent);return [...tr.querySelectorAll('a,i,span[title]')].map(e=>(e.title||e.getAttribute('data-original-title')||'')+' |'+e.className+' |'+(e.getAttribute('href')||'').slice(0,80)).join('\n')+'\nTH:'+[...document.querySelectorAll('thead th')].filter(t=>t.offsetParent).map(t=>t.innerText.trim()).join('|')+'\nBTN:'+[...document.querySelectorAll('#adianti_div_content a.btn, #adianti_div_content button')].filter(e=>e.getBoundingClientRect().width>0).map(e=>e.innerText.trim()).join('|');}));
 await r.finish(); })();
