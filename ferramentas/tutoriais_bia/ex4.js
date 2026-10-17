const {Rec,sleep}=require('./engine');
(async()=>{ const r=new Rec('ex4',{dry:true}); await r.start(); await r.open('GestaoLeadsView'); const p=r.p;
 // ver
 await p.locator('[title="Ver"],[data-original-title="Ver"]').first().click(); await sleep(2000); await p.screenshot({path:'l2.png'});
 await r.open('GestaoLeadsView');
 // menu da etapa
 const mv=p.locator('text=more_vert, text=⋮').first();
 const heads=await p.evaluate(()=>[...document.querySelectorAll('*')].filter(e=>e.childElementCount===0&&/^(more_vert|⋮)$/.test(e.textContent.trim())).map(e=>{const r=e.getBoundingClientRect();return e.tagName+'.'+e.className+'@'+Math.round(r.x)+','+Math.round(r.y)}));
 console.log(heads);
 await p.mouse.click(345,244); await sleep(1200); await p.screenshot({path:'l3.png'});
 await p.keyboard.press('Escape'); await r.open('GestaoLeadsView');
 // estrutura kanban
 console.log(await p.evaluate(()=>{const it=[...document.querySelectorAll('[draggable=true], .kanban-item, .ui-sortable-handle')].slice(0,3).map(e=>e.className+' drag='+e.draggable);return it;}));
 console.log(await p.evaluate(()=>[...document.scripts].map(s=>s.src).filter(s=>/sortable|kanban|drag/i.test(s))));
 await r.finish(); })();
