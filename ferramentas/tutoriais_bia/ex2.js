const {Rec,sleep}=require('./engine');
(async()=>{
 const r=new Rec('ex2',{dry:true}); await r.start(); await r.open('CrmPainelDia');
 const p=r.p; const S='#adianti_content';
 const cnt=async()=>p.evaluate(()=>[...document.querySelectorAll('tr')].filter(t=>t.offsetParent!==null&&t.getBoundingClientRect().height>0).length);
 console.log('rows before',await cnt());
 await p.locator('input[type=search]').first().click(); await p.keyboard.type('Filipa',{delay:20}); await sleep(1500);
 console.log('rows after',await cnt());
 await p.evaluate(s=>document.querySelector(s).scrollTop=950,S); await sleep(600);
 await p.screenshot({path:'ex_search2.png'});
 await p.keyboard.press('Enter'); await sleep(2500); console.log(p.url()); await p.screenshot({path:'ex_search3.png'});
 await r.finish();
})();
