const {Rec}=require('./engine'); const fs=require('fs');
(async()=>{
  const [mod, mode]=process.argv.slice(2); const V=require('./'+mod);
  let voice=null; const vf='/root/work/rec/voice/'+V.name+'/durs.json'; if(fs.existsSync(vf)) voice=JSON.parse(fs.readFileSync(vf));
  fs.copyFileSync('/root/work/demo/rec_pristine.db', process.env.GA_DB || '/root/work/demo/rec.db');
  const r=new Rec(V.name,{dry:mode==='dry',voice}); await r.start(); await V.start(r); await r.rec();
  for(const s of V.scenes){ try{ await r.scene(s.id,s.est,()=>s.act(r)); }catch(e){ r.log.push('ERRO '+s.id+': '+e.message.split('\n')[0]); if(mode==='dry'){ await r.p.screenshot({path:r.dir+'/err_'+s.id+'.png'}); } else throw e; } }
  await r.finish();
})();
