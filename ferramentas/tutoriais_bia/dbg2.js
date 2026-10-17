const {Rec,sleep}=require('./engine');
(async()=>{ const r=new Rec('dbg2',{dry:true}); await r.start(); await r.open('GestaoLeadsView'); const p=r.p;
 console.log(await p.evaluate(()=>{const s=document.querySelector('.kanban-stage'); return s.outerHTML.slice(0,900);}));
 await r.finish(); })();
