const {Rec,sleep}=require('./engine');
(async()=>{ const r=new Rec('ex6',{dry:true}); await r.start(); await r.open('CadastroDeClientesList'); const p=r.p;
 console.log(await p.evaluate(()=>{const tr=document.querySelector('tbody tr');return [...tr.querySelectorAll('a,i,span[title],button')].map(e=>(e.title||e.getAttribute('data-original-title')||'')+' |'+e.className+' |'+(e.getAttribute('href')||'').slice(0,90)).filter(s=>!s.startsWith(' |'));}));
 await r.el(/^\s*Exportar/,'a,button,span').click(); await sleep(800); console.log(await p.evaluate(()=>[...document.querySelectorAll('.dropdown-menu.show a, .dropdown-menu.show li')].map(e=>e.innerText.trim())));
 await p.keyboard.press('Escape'); await r.open('CadastroDeClientesList');
 await r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({hasText:/^\s*Filtros/}).first().click(); await sleep(1500); await p.screenshot({path:'c_filtros.png'});
 await r.open('CadastroDeClientesForm');
 for (const t of ['CONTATOS','LINKS','IDENTIFICAÇÃO']) { await r.el(t,'a,li,span').click(); await sleep(700); await p.screenshot({path:'c_tab_'+t+'.png'}); console.log(t, await p.evaluate(()=>[...document.querySelectorAll('.tab-pane.active input,.tab-pane.active select, .tab-pane.active label, .tab-pane.active th')].filter(e=>e.getBoundingClientRect().width>0).map(e=>e.name||e.innerText.trim()).join(' | ')));}
 await r.finish(); })();
