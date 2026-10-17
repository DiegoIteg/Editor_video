const {Rec,sleep}=require('./engine');
(async()=>{ const r=new Rec('dbg4',{dry:false}); await r.start(); await r.open('TarefasFormView','&id=350&key=350'); 
 await r.menu('CRM','Prospeção'); console.log(r.p.url()); await r.p.screenshot({path:'dbg4.png'});
 await r.b.close(); })();
