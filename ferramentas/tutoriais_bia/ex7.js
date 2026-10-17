const {Rec,sleep}=require('./engine');
(async()=>{ const r=new Rec('ex7',{dry:true}); await r.start(); await r.open('CadastroDeClientesForm'); const p=r.p;
 const o=await p.evaluate(()=>{const g=n=>{const s=document.querySelector(`select[name="${n}"]`);return s?[...s.options].slice(0,12).map(o=>o.value+'='+o.text).join('|')+' (n='+s.options.length+')':'-';};
  return ['morada_pessoa_tipo_morada_id[]','morada_pessoa_conselho_id[]','morada_pessoa_distrito_id[]','morada_pessoa_pais_id[]','contatos_pessoa_tipo_contato_id[]','tabela_preco_id'].map(n=>n+': '+g(n));});
 console.log(o.join('\n'));
 console.log(await p.evaluate(()=>{const s=document.querySelector('select[name="morada_pessoa_conselho_id[]"]');return [...s.options].filter(o=>/Jo.o da Madeira|Lisboa|Porto|Aveiro/.test(o.text)).map(o=>o.value+'='+o.text).join('|');}));
 await r.finish(); })();
