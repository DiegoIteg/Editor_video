import json, sys
# uso: check_split.py <lote> -> rácio caracteres/segundo por cena (detecta cortes errados)
lote = sys.argv[1]; t = open(f'/root/work/rec/voice/{lote}.txt').read().split(' <break time="1.6s"/> ')
d = json.load(open(f'/root/work/rec/voice/{lote}/durs.json')); bad = 0
for i, s in enumerate(t):
    r = len(s) / d[f's{i+1:02d}']
    flag = '  <-- ?' if r < 11 or r > 19 else ''
    if flag: bad += 1
    print(f's{i+1:02d} {len(s):4d}c {d[f"s{i+1:02d}"]:5.1f}s {r:5.1f}{flag}')
print('suspeitas', bad)
