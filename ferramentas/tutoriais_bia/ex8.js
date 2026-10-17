const {Rec,sleep}=require('./engine');
(async()=>{ const r=new Rec('ex8',{dry:true}); await r.start(); await r.open('ViaturaList'); const p=r.p;
 await p.screenshot({path:'v_list.png'});
 console.log(await p.evaluate(()=>{const tr=document.querySelector('tbody tr');return [...tr.querySelectorAll('a,i')].map(e=>(e.title||e.getAttribute('data-original-title')||'')+' |'+e.className).join(' ; ')+'\nTH:'+[...document.querySelectorAll('thead th')].map(t=>t.innerText.trim()).join('|')+'\nBTN:'+[...document.querySelectorAll('#adianti_div_content a.btn, #adianti_div_content button')].filter(e=>e.getBoundingClientRect().width>0).map(e=>e.innerText.trim()).join('|');}));
 await r.el(/^\s*Cadastrar/,'a,button,span').click(); await sleep(1800); await p.screenshot({path:'v_form.png'});
 console.log(await p.evaluate(()=>[...document.querySelectorAll('input,select,textarea')].filter(e=>e.getBoundingClientRect().width>0).map(e=>e.name+':'+e.type+(e.tagName=='SELECT'?'('+[...e.options].slice(0,6).map(o=>o.text).join('/')+' n='+e.options.length+')':'')).join('\n')));
 await r.finish(); })();
