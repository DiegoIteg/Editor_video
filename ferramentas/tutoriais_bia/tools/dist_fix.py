import json, shutil, sys
# uso: dist_fix.py <lote>  -> voice/<lote>_plan.json = [[video_curto, cena], ...]; substitui só essas cenas
lote = sys.argv[1]; R = '/root/work/rec/voice'
plan = json.load(open(f'{R}/{lote}_plan.json')); src = json.load(open(f'{R}/{lote}/durs.json'))
import glob, os
for k, (vid, sc) in enumerate(plan, 1):
    name = [d for d in os.listdir(R) if d.startswith(vid + '_') and os.path.isdir(f'{R}/{d}/cenas')][0]
    shutil.copy(f'{R}/{lote}/cenas/s{k:02d}.wav', f'{R}/{name}/cenas/{sc}.wav')
    d = json.load(open(f'{R}/{name}/durs.json')); old = d.get(sc); d[sc] = src[f's{k:02d}']
    json.dump(d, open(f'{R}/{name}/durs.json', 'w'), indent=1); print(name, sc, old, '->', round(d[sc], 2))
