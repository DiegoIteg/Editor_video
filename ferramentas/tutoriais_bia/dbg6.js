const {Rec,sleep}=require('./engine');
(async()=>{ const r=new Rec('dbg6',{dry:true}); await r.start(); await r.open('CadastroDeClientesList'); const p=r.p;
 await r.click(p.locator('tbody tr').first().locator('i').first(),300); await sleep(1500);
 for (const t of ['Morada','CONTATOS']) { const tb=r.el(new RegExp('^\\s*'+t+'\\s*$','i'),'a,li,span'); console.log(t, await tb.count()); if (await tb.count()) { await r.click(tb,300); await sleep(600);} }
 const f=await r.hit('Fechar','a,button,span'); console.log('hit', await f.evaluate(e=>{const b=e.getBoundingClientRect();return e.outerHTML.slice(0,80)+' '+b.x+','+b.y;}));
 const all=p.locator('a,button,span').filter({hasText:/^\s*Fechar\s*$/}).filter({visible:true}); console.log('n fechar',await all.count());
 for(let i=0;i<await all.count();i++) console.log(i, await all.nth(i).evaluate(e=>{const b=e.getBoundingClientRect();const t=document.elementFromPoint(b.x+b.width/2,b.y+b.height/2);return b.x+','+b.y+' hit='+(t&&t.outerHTML.slice(0,60));}));
 await r.finish(); })();
