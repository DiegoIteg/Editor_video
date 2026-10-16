import json, subprocess, sys
# uso: mk_lote.py <lote> <script1> <script2> ...  -> voice/<lote>.txt + voice/<lote>.json (ordem e nº de cenas)
lote, mods = sys.argv[1], sys.argv[2:]
says, plan = [], []
for m in mods:
    o = subprocess.run(['node', '-e', f"const V=require('/root/work/rec/{m}');console.log(JSON.stringify({{name:V.name,says:V.scenes.map(s=>s.say)}}))"], capture_output=True, text=True).stdout
    v = json.loads(o); says += v['says']; plan.append([v['name'], len(v['says'])])
t = ' <break time="1.6s"/> '.join(says)
open(f'/root/work/rec/voice/{lote}.txt', 'w').write(t); json.dump(plan, open(f'/root/work/rec/voice/{lote}.json', 'w'))
print(lote, len(t), 'chars', sum(n for _, n in plan), 'cenas', plan)
