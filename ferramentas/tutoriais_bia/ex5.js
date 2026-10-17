const {Rec,sleep}=require('./engine');
(async()=>{ const r=new Rec('ex5',{dry:true}); await r.start(); await r.open('GestaoLeadsView'); const p=r.p;
 const mv=p.locator('i.material-icons').nth(1); await mv.click(); await sleep(1200);
 console.log(await p.evaluate(()=>[...document.querySelectorAll('.dropdown-menu.show a, .dropdown-menu.show li, [class*=menu] a')].filter(e=>e.getBoundingClientRect().width>0).map(e=>e.innerText.trim()).filter(x=>x)));
 await p.screenshot({path:'l4.png'}); await r.open('GestaoLeadsView');
 // drag
 const card=p.locator('.kanban-item',{hasText:'Filipe Nunes Silva'}).first(); const b=await card.boundingBox(); console.log('card',b);
 const col=p.locator('.kanban-stage').nth(2); const cb=await col.boundingBox(); console.log('col',cb);
 await p.mouse.move(b.x+60,b.y+20); await p.mouse.down(); for(let i=1;i<=30;i++){await p.mouse.move(b.x+60+(cb.x+80-b.x-60)*i/30, b.y+20+(cb.y+120-b.y-20)*i/30); await sleep(20);} await sleep(300); await p.mouse.up(); await sleep(2000);
 await p.screenshot({path:'l5.png'});
 await r.open('GestaoLeadsView'); await p.screenshot({path:'l6.png'});
 await r.finish(); })();
