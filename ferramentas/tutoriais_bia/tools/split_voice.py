import subprocess, re, sys, json, os
# uso: split_voice.py <dir com full.mp3> <n_cenas>
d, n = sys.argv[1], int(sys.argv[2])
f = os.path.join(d, 'full.mp3')
dur = float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f],capture_output=True,text=True).stdout)
def detect(th, md):
    o = subprocess.run(['ffmpeg','-hide_banner','-i',f,'-af',f'silencedetect=noise={th}dB:d={md}','-f','null','-'],capture_output=True,text=True).stderr
    st = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', o)]; en = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', o)]
    return [(s, e) for s, e in zip(st, en) if s > 0.3 and e < dur - 0.3]
best = None
for md in (1.3, 1.2, 1.1, 1.0, 0.9, 0.8):
    for th in (-40, -38, -36, -42, -34):
        sil = detect(th, md)
        if len(sil) == n - 1: best = sil; break
        if len(sil) > n - 1 and best is None:
            # escolhe as n-1 pausas mais longas
            pass
    if best: break
if not best:
    sil = detect(-40, 0.7); sil = sorted(sorted(sil, key=lambda x: x[0]-x[1])[:n-1])
    if len(sil) != n - 1: print('FALHOU', len(sil)); sys.exit(1)
    best = sil
cuts = [0.0] + [ (s + e) / 2 for s, e in best ] + [dur]
durs = {}; os.makedirs(os.path.join(d, 'cenas'), exist_ok=True)
for i in range(n):
    a, b = cuts[i], cuts[i+1]
    out = os.path.join(d, 'cenas', f's{i+1:02d}.wav')
    # corta e apara silêncio inicial/final da cena
    subprocess.run(['ffmpeg','-y','-loglevel','error','-ss',f'{a:.3f}','-to',f'{b:.3f}','-i',f,
        '-af','silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.12,areverse,aresample=48000',
        '-ac','2',out],check=True)
    durs[f's{i+1:02d}'] = float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',out],capture_output=True,text=True).stdout)
json.dump(durs, open(os.path.join(d,'durs.json'),'w'), indent=1)
print(json.dumps(durs)); print('total voz %.1fs'%sum(durs.values()))
