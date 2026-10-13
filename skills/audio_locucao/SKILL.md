---
name: "audio_locucao"
description: "Locução (ElevenLabs/Benedita), normalização EBU R128 (−16 LUFS), música com ducking e sincronia. Para qualquer áudio de vídeo."
---
# Áudio e locução — Rita

## Voz
- **Benedita** (ElevenLabs, PT-PT, Eleven Multilingual v2). Login sempre do Diego. Nunca escrever a palavra-passe.
- Guião fluido, pausado e humanizado; siglas explicadas com naturalidade.

## Normalizar a voz (profissional)
```bash
ffmpeg -i voz.mp3 -af loudnorm=I=-16:TP=-1.5:LRA=11 voz_norm.wav
```

## Música de fundo com ducking (baixa quando a voz fala)
```bash
# [voz][musica] -> música baixa sob a voz
sidechaincompress=threshold=0.015:ratio=12:attack=15:release=320:makeup=1
# depois: amix=inputs=2:normalize=0 , alimiter=limit=0.95
```

## Entrega separada
Quando o Diego quer editar: entregar `voz_norm.wav` (e `musica.wav`) à parte do vídeo.
