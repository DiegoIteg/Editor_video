const {Rec,sleep}=require('./engine');
(async()=>{ const r=new Rec('sb',{dry:true}); await r.start(); await r.open('EmptyPage');
 const h=await r.p.evaluate(()=>{const e=[...document.querySelectorAll('*')].find(x=>x.childElementCount===0&&x.textContent.trim()==='CRM'&&x.getBoundingClientRect().x<100);let n=e,ch=[];for(let i=0;i<8&&n;i++){ch.push(n.tagName+'#'+n.id+'.'+String(n.className).slice(0,50));n=n.parentElement;}return ch;});
 console.log(h); await r.p.screenshot({path:'empty.png'}); await r.finish(); })();
