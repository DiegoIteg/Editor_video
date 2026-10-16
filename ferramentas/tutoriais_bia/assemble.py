#!/usr/bin/env python3
"""Montagem dos tutoriais Go Auto com a Bia (padrão do vídeo de referência do Diego).
logo → título → abertura em cartão sobre navy + Bia (avatar, barra, nome, tagline) → zoom para ecrã inteiro
→ gravação real com destaques → zoom de volta ao cartão + despedida da Bia → logo. Voz por cena + música com ducking."""
import json, os, subprocess, sys, math, shutil
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

R = '/root/work/rec'; AS = f'{R}/assets'
W, H, FPS = 1920, 1080, 30
NAVY_T, NAVY_B = (12, 37, 70), (6, 20, 40)
VERDE, AZUL, BR, MUT = (27, 224, 42), (56, 189, 248), (240, 246, 255), (150, 172, 205)
FB = '/usr/share/fonts/truetype/google-fonts/Poppins-Bold.ttf'
FM = '/usr/share/fonts/truetype/google-fonts/Poppins-Medium.ttf'
FI = '/usr/share/fonts/opentype/inter/Inter-Regular.otf'
ENC = ['-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-r', str(FPS), '-profile:v', 'high']

def F(p, s): return ImageFont.truetype(p, s)
def run(c): subprocess.run(c, check=True)
def dur(f): return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout)
def ease(t): t = max(0, min(1, t)); return 1 - (1 - t) ** 3
def eio(t): t = max(0, min(1, t)); return 4 * t * t * t if t < .5 else 1 - (-2 * t + 2) ** 3 / 2

# ---------- fundo navy (padrão + brilho verde + marca d'água iTEG), como na referência
def background():
    p = f'{AS}/bg_navy.png'
    if os.path.exists(p): return Image.open(p).convert('RGB')
    y = np.linspace(0, 1, H)[:, None]
    base = np.zeros((H, W, 3), np.float32)
    for i in range(3): base[:, :, i] = NAVY_T[i] + (NAVY_B[i] - NAVY_T[i]) * y
    xx, yy = np.meshgrid(np.arange(W), np.arange(H))
    glow = np.exp(-(((xx - 120) / 700) ** 2 + ((yy - 1150) / 420) ** 2)) * 1.0
    base[:, :, 0] += glow * 4; base[:, :, 1] += glow * 38; base[:, :, 2] += glow * 22
    glow2 = np.exp(-(((xx - 1700) / 900) ** 2 + ((yy + 100) / 500) ** 2))
    base[:, :, 1] += glow2 * 14; base[:, :, 2] += glow2 * 30
    im = Image.fromarray(np.clip(base, 0, 255).astype('uint8'))
    pat = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(pat)
    for k in range(-H, W, 46):
        d.line([(k, 0), (k + H, H)], fill=(120, 160, 220, 10), width=1); d.line([(k + H, 0), (k, H)], fill=(120, 160, 220, 10), width=1)
    im = Image.alpha_composite(im.convert('RGBA'), pat)
    wm = Image.new('RGBA', (W, H), (0, 0, 0, 0)); dw = ImageDraw.Draw(wm)
    dw.text((1180, 700), 'iTEG', font=F(FB, 520), fill=(255, 255, 255, 9))
    im = Image.alpha_composite(im, wm).convert('RGB'); im.save(p); return im

# ---------- cartão do título (igual à referência)
def title_card(serie, n, titulo, sub):
    y = np.linspace(0, 1, H)[:, None]; g = np.zeros((H, W, 3), np.float32)
    for i in range(3): g[:, :, i] = NAVY_T[i] + (NAVY_B[i] - NAVY_T[i]) * y
    im = Image.fromarray(g.astype('uint8')); d = ImageDraw.Draw(im)
    f2 = F(FB, 44); gx = W / 2 - (d.textlength('GO', font=f2) + d.textlength('|', font=f2) + d.textlength('AUTO', font=f2)) / 2
    d.text((gx, 205), 'GO', font=f2, fill=BR, anchor='lm'); w1 = d.textlength('GO', font=f2)
    d.text((gx + w1, 205), '|', font=f2, fill=VERDE, anchor='lm'); w2 = d.textlength('|', font=f2)
    d.text((gx + w1 + w2, 205), 'AUTO', font=f2, fill=AZUL, anchor='lm')
    d.text((W / 2, 405), f'FORMAÇÃO · {serie} · VÍDEO {n}', font=F(FI, 30), fill=MUT, anchor='mm')
    d.text((W / 2, 495), titulo, font=F(FB, 96), fill=BR, anchor='mm')
    d.text((W / 2, 590), sub, font=F(FI, 36), fill=MUT, anchor='mm')
    d.line([(W / 2 - 200, 660), (W / 2 + 200, 660)], fill=VERDE, width=4)
    return im

# ---------- Bia: avatar recortado + barra + nome + tagline
AV = Image.open(f'{AS}/bia_cutout.png').convert('RGBA')
AVH = 270; AVW = round(AV.width * AVH / AV.height); AVI = AV.resize((AVW, AVH), Image.LANCZOS)
F_BIA, F_TAG = F(FB, 112), F(FI, 38)
LT_X, LT_Y = 46, 1080 - 64 - AVH          # canto inferior esquerdo, dentro das margens

def lower_third(k_in, k_out=0.0):
    """k_in: tempo (s) desde a entrada; k_out: tempo desde a saída (0 = ainda não sai)."""
    lt = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    fade = 1 - ease(k_out / 0.45) if k_out > 0 else 1.0
    if fade <= 0: return lt
    # avatar sobe e cresce (como na referência)
    a = ease((k_in - 0.0) / 0.55)
    if a > 0:
        s = 0.82 + 0.18 * a; aw, ah = round(AVW * s), round(AVH * s)
        av = AVI.resize((aw, ah), Image.LANCZOS)
        al = av.split()[3].point(lambda v: int(v * a * fade)); av.putalpha(al)
        lt.alpha_composite(av, (LT_X + (AVW - aw) // 2, LT_Y + (AVH - ah) + round(30 * (1 - a))))
    d = ImageDraw.Draw(lt)
    bx = LT_X + AVW + 26; by0, by1 = LT_Y + 92, LT_Y + AVH - 22
    b = ease((k_in - 0.35) / 0.35)
    if b > 0:
        yb = by1 - (by1 - by0) * b
        d.rectangle([bx, yb, bx + 9, by1], fill=(255, 255, 255, int(255 * fade)))
    c = ease((k_in - 0.65) / 0.55)
    if c > 0:
        txt = Image.new('RGBA', (W, H), (0, 0, 0, 0)); dt = ImageDraw.Draw(txt)
        dt.text((bx + 30, LT_Y + 150), 'Bia', font=F_BIA, fill=(255, 255, 255, 255), anchor='lm')
        wbia = dt.textlength('Bia', font=F_BIA) + 10
        m = Image.new('L', (W, H), 0); ImageDraw.Draw(m).rectangle([bx + 12, 0, bx + 30 + wbia * c, H], fill=int(255 * fade))
        lt = Image.composite(txt, lt, m) if False else Image.alpha_composite(lt, Image.composite(txt, Image.new('RGBA', (W, H), (0, 0, 0, 0)), m))
        d = ImageDraw.Draw(lt)
    e = ease((k_in - 1.05) / 0.5)
    if e > 0:
        d.text((bx + 34, LT_Y + 232), 'Business Intelligence Artificial', font=F_TAG, fill=(255, 255, 255, int(255 * e * fade)), anchor='lm')
    return lt

# ---------- cartão: ecrã reduzido sobre o fundo navy
CARD_W = 1320; CARD_H = round(CARD_W * 9 / 16); CARD_CX, CARD_CY = 960, 60 + CARD_H / 2
def compose(screen, k, bg, lt=None):
    """k=0 → cartão; k=1 → ecrã inteiro."""
    s0 = CARD_W / W; s = s0 + (1 - s0) * k
    cx = CARD_CX + (960 - CARD_CX) * k; cy = CARD_CY + (540 - CARD_CY) * k
    w, h = round(W * s), round(H * s)
    if k >= 0.999: out = screen.copy()
    else:
        out = bg.copy()
        sc = screen.resize((w, h), Image.LANCZOS)
        rad = round(22 * (1 - k))
        m = Image.new('L', (w, h), 0); ImageDraw.Draw(m).rounded_rectangle([0, 0, w - 1, h - 1], radius=rad, fill=255)
        x, y = round(cx - w / 2), round(cy - h / 2)
        sh = Image.new('RGBA', (W, H), (0, 0, 0, 0)); ImageDraw.Draw(sh).rounded_rectangle([x - 4, y + 10, x + w + 4, y + h + 22], radius=rad + 8, fill=(0, 0, 0, int(140 * (1 - k))))
        sh = sh.filter(ImageFilter.GaussianBlur(22))
        out = Image.alpha_composite(out.convert('RGBA'), sh).convert('RGB')
        out.paste(sc, (x, y), m)
        bd = ImageDraw.Draw(out); bd.rounded_rectangle([x, y, x + w - 1, y + h - 1], radius=rad, outline=(70, 110, 170), width=1)
    if lt is not None: out = Image.alpha_composite(out.convert('RGBA'), lt).convert('RGB')
    return out

def pipe_writer(path, n_hint=None):
    return subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-'] + ENC + [path], stdin=subprocess.PIPE)

def frames_of(video, t0, t1, tmp):
    os.makedirs(tmp, exist_ok=True)
    for f in os.listdir(tmp): os.remove(os.path.join(tmp, f))
    run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', f'{t0:.3f}', '-to', f'{t1:.3f}', '-i', video, '-vf', f'fps={FPS}', '-q:v', '2', f'{tmp}/%05d.jpg'])
    return sorted(os.path.join(tmp, f) for f in os.listdir(tmp))

def main(name, serie, n, titulo, sub):
    out = f'{R}/out/{name}'; meta = json.load(open(f'{out}/meta.json'))
    T = f'{out}/tmp'; os.makedirs(T, exist_ok=True)
    sc = meta['scenes']; D = meta['tEnd'] - meta['t0']
    # 1) ecrã gravado → mp4 CFR
    fr = meta['frames']; lines = []
    first = max([i for i, f in enumerate(fr) if f['t'] <= 0] or [0])
    def blank(fn):
        im = Image.open(f'{out}/frames/{fn}'); im.draft('L', (240, 135)); a = np.asarray(im.convert('L'), np.float32)
        h, w = a.shape; c = a[int(h * .08):, int(w * .16):]
        return c.std() < 6.0          # ecrã em branco durante o carregamento de uma página → mantém o frame anterior
    seq = [{'t': 0.0, 'f': fr[first]['f']}] + [f for f in fr[first + 1:] if 0 < f['t'] < D and not blank(f['f'])]
    print('frames', len(fr), 'usados', len(seq))
    for i, f in enumerate(seq):
        nxt = seq[i + 1]['t'] if i + 1 < len(seq) else D
        lines.append(f"file '{out}/frames/{f['f']}'\nduration {max(0.001, nxt - f['t']):.4f}\n")
    lines.append(f"file '{out}/frames/{seq[-1]['f']}'\n")
    open(f'{T}/frames.txt', 'w').write(''.join(lines))
    screen = f'{T}/screen.mp4'
    run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', f'{T}/frames.txt', '-vf', f'fps={FPS},scale={W}:{H}:flags=lanczos,format=yuv420p'] + ENC + [screen])
    D = dur(screen)
    tB = sc[1]['t']; tC = sc[-1]['t']
    ZOOM = 0.9
    bg = background()
    # 2) parte A: cartão + Bia (0 → tB + ZOOM)
    fa = frames_of(screen, 0, tB + ZOOM, f'{T}/fa')
    pw = pipe_writer(f'{T}/A.mp4')
    lt_out_at = tB - 0.5
    for i, f in enumerate(fa):
        t = i / FPS; im = Image.open(f).convert('RGB')
        k = eio((t - tB) / ZOOM) if t > tB else 0.0
        lt = lower_third(t - 0.5, (t - lt_out_at) if t > lt_out_at else 0) if t < tB + 0.1 else None
        pw.stdin.write(compose(im, k, bg, lt).tobytes())
    pw.stdin.close(); pw.wait()
    # 3) parte B: ecrã inteiro
    run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', f'{tB + ZOOM:.3f}', '-to', f'{tC:.3f}', '-i', screen] + ENC + ['-an', f'{T}/B.mp4'])
    # 4) parte C: volta ao cartão + despedida da Bia
    fc = frames_of(screen, tC, D, f'{T}/fc')
    pw = pipe_writer(f'{T}/C.mp4')
    for i, f in enumerate(fc):
        t = i / FPS; im = Image.open(f).convert('RGB')
        k = 1 - eio(t / ZOOM)
        endk = (t - (len(fc) / FPS - 0.6)) if t > len(fc) / FPS - 0.6 else 0
        lt = lower_third(t - ZOOM, endk) if t > ZOOM else None
        pw.stdin.write(compose(im, k, bg, lt).tobytes())
    pw.stdin.close(); pw.wait()
    # 5) título
    tc = title_card(serie, n, titulo, sub); tc.save(f'{T}/title.png')
    run(['ffmpeg', '-y', '-loglevel', 'error', '-loop', '1', '-t', '4.2', '-i', f'{T}/title.png', '-vf', 'fade=t=in:st=0:d=0.6,fade=t=out:st=3.7:d=0.5,format=yuv420p'] + ENC + [f'{T}/title.mp4'])
    # 6) concat (logo + título + A + B + C + logo)
    segs = []
    for nm, src in [('i', f'{AS}/logo_intro.mp4'), ('t', f'{T}/title.mp4'), ('a', f'{T}/A.mp4'), ('b', f'{T}/B.mp4'), ('c', f'{T}/C.mp4'), ('o', f'{AS}/logo_outro.mp4')]:
        o = f'{T}/seg_{nm}.mp4'
        run(['ffmpeg', '-y', '-loglevel', 'error', '-i', src, '-vf', f'scale={W}:{H}:force_original_aspect_ratio=decrease,pad={W}:{H}:(ow-iw)/2:(oh-ih)/2,fps={FPS},format=yuv420p'] + ENC + ['-an', o]); segs.append(o)
    open(f'{T}/list.txt', 'w').write(''.join(f"file '{s}'\n" for s in segs))
    run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', f'{T}/list.txt', '-c', 'copy', f'{T}/silent.mp4'])
    VT = dur(f'{T}/silent.mp4'); off = dur(segs[0]) + dur(segs[1])   # início do conteúdo
    # 7) áudio: voz por cena (normalizada) + música com ducking
    vd = f'{R}/voice/{name}/cenas'; ins = []; flt = []; k = 0
    for s in sc:
        w = f'{vd}/{s["id"]}.wav'
        if not os.path.exists(w): continue
        ins += ['-i', w]; ms = int(round((off + s['t'] + 0.25) * 1000))
        flt.append(f'[{k}:a]adelay={ms}|{ms}[v{k}]'); k += 1
    mix = ''.join(f'[v{i}]' for i in range(k))
    fcmd = ';'.join(flt) + f';{mix}amix=inputs={k}:normalize=0:duration=longest,apad,atrim=0:{VT:.3f},loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000,asplit=2[vm][vs];'
    fcmd += f'[{k}:a]atrim=0:{VT:.3f},aresample=48000,volume=0.30,afade=t=in:st=0:d=1.5,afade=t=out:st={VT - 2.5:.2f}:d=2.5[bg0];[bg0][vs]sidechaincompress=threshold=0.012:ratio=10:attack=20:release=450:makeup=1[bgd];[bgd][vm]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.95[a]'
    run(['ffmpeg', '-y', '-loglevel', 'error'] + ins + ['-stream_loop', '-1', '-i', f'{AS}/bg_ambient160.wav', '-filter_complex', fcmd, '-map', '[a]', '-c:a', 'pcm_s16le', f'{T}/audio.wav'])
    final = f'{R}/final/{name}.mp4'; os.makedirs(f'{R}/final', exist_ok=True)
    run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f'{T}/silent.mp4', '-i', f'{T}/audio.wav', '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', '-shortest', final])
    print('OK', final, f'{dur(final):.1f}s', os.path.getsize(final) // 1024, 'KB')

if __name__ == '__main__':
    main(*sys.argv[1:6])
