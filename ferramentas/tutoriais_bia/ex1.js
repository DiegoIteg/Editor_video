const {Rec,sleep}=require('./engine');
(async()=>{
 const r=new Rec('ex1',{dry:true}); await r.start(); await r.open('CrmPainelDia');
 const p=r.p;
 await p.locator('#adianti_div_content a,#adianti_div_content button').filter({hasText:/^\s*Filtros/}).first().click(); await sleep(1800);
 await p.screenshot({path:'ex_filtros.png'});
 const t=await p.evaluate(()=>[...document.querySelectorAll('.modal.show, .offcanvas.show, [class*=drawer], [class*=filtro]')].filter(e=>e.getBoundingClientRect().width>0).map(e=>e.className+' :: '+e.innerText.replace(/\s+/g,' ').slice(0,400)));
 console.log(t);
 await r.open('CrmPainelDia');
 await p.locator('input[type=search]').first().click(); await p.keyboard.type('Pintura',{delay:20}); await sleep(1500);
 await p.screenshot({path:'ex_search.png'});
 await r.open('CrmPainelDia');
 await p.locator('[title=Visualizar]').first().click(); await sleep(2500);
 await p.screenshot({path:'ex_vis.png'}); console.log(p.url());
 await r.finish();
})();
