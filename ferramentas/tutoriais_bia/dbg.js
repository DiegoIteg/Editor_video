const {Rec,sleep}=require('./engine');
(async()=>{ const r=new Rec('dbg',{dry:true}); await r.start(); await r.open('CrmPainelDia');
 const T=t=>`[title="${t}"], [data-original-title="${t}"]`;
 await r.p.locator(T('Visualizar')).first().click(); await sleep(2000);
 for (const s of ['text=VIATURA','text=PRODUTOS E SERVIÇOS','text=RESUMO FINANCEIRO']) { const l=r.p.locator(s); const n=await l.count(); const v=[]; for(let i=0;i<n;i++) v.push(await l.nth(i).isVisible()); console.log(s,n,v); }
 const tabs=r.p.locator('.nav-link, a[role=tab], li a',{hasText:'SERVIÇOS'}); console.log('tabs',await tabs.count(), await tabs.first().isVisible().catch(e=>e.message));
 const f=r.p.locator('a,button',{hasText:'Fechar'}); console.log('fechar',await f.count());
 await r.finish(); })();
