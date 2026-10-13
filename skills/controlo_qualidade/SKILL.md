---
name: "controlo_qualidade"
description: "Controlo de Qualidade final de vídeo/imagem: enquadramento (safe margins), erros de sistema à vista, PT-PT, números e datas, sincronia. Correr antes de QUALQUER entrega."
---
# Controlo de Qualidade — Tomás

Correr **antes de entregar**. Ver também `rotina/checklist_enquadramento.md` e `rotina/checklist_qualidade_video.md`.

## Enquadramento (o nº 1)
- Nenhum texto, logótipo, destaque ou conteúdo importante a tocar os 90px de borda.
- Nada cortado; nada esticado/deformado (conferir rácios).
- Sobrepor uma grelha de safe margins para conferir:
```bash
ffmpeg -i video.mp4 -vf "drawbox=x=96:y=54:w=1728:h=972:color=red@0.6:t=2" -frames:v 1 check.png
```

## Conteúdo
- **Sem ecrãs de erro do sistema** à vista (ex.: "Permissão negada", validação falhada) por descuido.
- PT-PT correto; números `1.234,56`; datas `DD/MM/AAAA`.
- Áudio sincronizado; voz audível sobre a música.

## Veredicto
"Pode entregar" / "Não pode — corrigir X". Só depois vai ao Diego.
