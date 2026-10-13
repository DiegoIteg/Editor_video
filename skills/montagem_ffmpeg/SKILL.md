---
name: "montagem_ffmpeg"
description: "Montar vídeo com ffmpeg sem deformar: escalar com pad, cross-dissolve, Ken Burns barato, concat e master 1080p H.264. Usar para montar qualquer vídeo."
---
# Montagem com ffmpeg — André

## Escalar SEM deformar (regra de ouro)
```bash
# imagem/clip de qualquer rácio -> 1920x1080 com fundo da marca, sem esticar
-vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=0x0c2546,setsar=1"
```
Nunca `scale=1920:1080` direto (deforma).

## Ken Burns barato (sem zoompan, que pendura com imagens em loop)
```bash
-vf "scale=2112:1188,crop=1920:1080:x='(192)*(t/DUR)':y='(108)*(t/DUR)',fps=30"
```

## Cross-dissolve entre planos
```bash
xfade=transition=fade:duration=0.4:offset=<fim_do_plano_anterior - 0.4>
```

## Master
```bash
-c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -r 30 -movflags +faststart
```

## Erros a evitar
- `zoompan` com `-loop 1` multiplica frames e **pendura** → usar o crop-drift acima.
- Concatenar clips com fps/tb diferentes → normalizar com `settb=AVTB,fps=30`.
