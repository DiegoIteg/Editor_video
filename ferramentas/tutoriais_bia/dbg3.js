const {Rec,sleep}=require('./engine');
(async()=>{ const r=new Rec('dbg3',{dry:true}); await r.start(); await r.open('TarefasFormView','&id=350&key=350'); const p=r.p;
 const side = t => p.locator('#ga-side a').filter({ hasText: new RegExp('^\\s*' + t + '\\s*$') });
 console.log('count prosp', await side('Prospeção').count(), 'crm', await side('CRM').count());
 for (let i=0;i<await side('Prospeção').count();i++){ const b=await side('Prospeção').nth(i).boundingBox(); console.log(i,b);}
 const b=await side('CRM').first().boundingBox(); console.log('crm',b);
 await side('CRM').first().click(); await sleep(1000); console.log(await side('Prospeção').first().evaluate(e=>{const b=e.getBoundingClientRect();const t=document.elementFromPoint(b.x+b.width/2,b.y+b.height/2);return t.tagName+'.'+t.className+' '+(t.textContent||'').slice(0,30);}));
 for (let i=0;i<await side('Prospeção').count();i++){ const b=await side('Prospeção').nth(i).boundingBox(); console.log('after',i,b);}
 await p.screenshot({path:'dbg3.png'});
 await r.finish(); })();
