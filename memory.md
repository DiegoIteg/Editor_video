# Memória — Estúdio de Edição de Vídeo e Imagem

> Formato: `- AAAA-MM-DD | Tipo | Descrição | Projeto/Ficheiros`.

- 2026-10-14 | Decisão | Estúdio de Edição criado: 7 agentes de pós-produção (vídeo+imagem). Nasce porque vídeos anteriores saíram desenquadrados e com erros (ex.: lançar orçamento). Regra-mãe: "se está desenquadrado, não sai". | `CLAUDE.md`
- 2026-10-14 | Preferência | Diego edita à sua maneira: quando pedir, entregar VÍDEO de ecrã limpo e ÁUDIO (voz Benedita) em ficheiros SEPARADOS, sem ficheiros de texto. | geral
- 2026-10-14 | Preferência | Persona de formação: BIA = Business Intelligence Artificial; voz Benedita (ElevenLabs, PT-PT, Multilingual v2). | `../agencia-digital`
- 2026-10-14 | Decisão | Stack: captura Playwright/Chromium (viewport exato), montagem ffmpeg, motion Remotion, imagem ImageMagick/SVG, locução ElevenLabs + loudnorm, legendas. | `ferramentas/`, `skills/`
- 2026-10-14 | Aprendizagem | Enquadramento: capturar no viewport certo + safe margins >=5%; escalar sempre com force_original_aspect_ratio + pad; nunca esticar. Painéis Chart.js congelam captura — desligar animações antes. | `skills/captura_de_ecra`
- 2026-10-14 | Resolvido | Stack verificado a funcionar: Playwright+Chromium captura 1920×1080 ×2 (3840×2160 super-sample) com enquadramento exato; ffmpeg 6.1 e ImageMagick 6.9 ok. Playwright já pré-instalado. | ferramentas/
