import json, os, shutil, sys
# uso: dist_lote.py <lote>  -> reparte voice/<lote>/cenas/sNN.wav por voice/<nome>/cenas + durs.json
lote = sys.argv[1]; plan = json.load(open(f'/root/work/rec/voice/{lote}.json')); src = f'/root/work/rec/voice/{lote}'
d = json.load(open(src + '/durs.json')); k = 1
for name, n in plan:
    dst = f'/root/work/rec/voice/{name}/cenas'; os.makedirs(dst, exist_ok=True); durs = {}
    for i in range(1, n + 1):
        shutil.copy(f'{src}/cenas/s{k:02d}.wav', f'{dst}/s{i:02d}.wav'); durs[f's{i:02d}'] = d[f's{k:02d}']; k += 1
    json.dump(durs, open(f'/root/work/rec/voice/{name}/durs.json', 'w'), indent=1); print(name, n, 'cenas', round(sum(durs.values()), 1), 's')
