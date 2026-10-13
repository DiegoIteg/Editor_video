---
name: "legendas_sincronia"
description: "Legendas SRT sincronizadas e burn-in opcional dentro das safe margins. Transcrição com whisper quando útil. Para legendar vídeos."
---
# Legendas e sincronia — Tomás

## SRT
Escrever `legendas.srt` (ou transcrever com whisper/faster-whisper) e rever PT-PT.

## Burn-in dentro das margens
```bash
ffmpeg -i video.mp4 -vf "subtitles=legendas.srt:force_style='Alignment=2,MarginV=90,FontName=Inter,Fontsize=28'" out.mp4
```
`MarginV=90` mantém a legenda fora da borda (safe margin).

## Regra
Legenda sincronizada ao que a voz diz; nunca a tocar o bordo; PT-PT correto.
