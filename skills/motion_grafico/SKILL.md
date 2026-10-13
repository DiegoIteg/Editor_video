---
name: "motion_grafico"
description: "Motion graphics com layout exato (Remotion em React) para títulos, lower-thirds, destaques e infografias — nada cortado, tudo alinhado. Para animações e gráficos profissionais."
---
# Motion graphics — Catarina (Remotion)

**Porquê Remotion:** layout declarativo (React/CSS) = enquadramento ao pixel e **nada cortado**; render determinístico a 1080p.

## Arrancar
```bash
npm i remotion @remotion/cli @remotion/bundler @remotion/renderer react react-dom
npx remotion studio     # pré-visualizar
npx remotion render src/index.ts Comp out/video.mp4 --codec=h264
```
Usa o Chromium de `/opt/pw-browsers` (`PLAYWRIGHT_BROWSERS_PATH`); não voltar a descarregar.

## Safe margins (sempre)
Um `<AbsoluteFill>` com `padding: 90px` (5% de 1080p) e todo o texto/destaque dentro dele. Lower-third e anéis com folga à borda.

## Quando chega o ffmpeg
Animações simples (fade, drift, dissolve) fazem-se em ffmpeg. Remotion é para reveals, gráficos animados e composições com texto preciso.
