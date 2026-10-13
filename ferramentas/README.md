# Ferramentas do Estúdio (stack profissional) e como usar

| Ferramenta | Para quê | Notas |
| :--- | :--- | :--- |
| **ffmpeg / ffprobe** | Montagem, escala+pad, Ken Burns, xfade, ducking, loudnorm, legendas | Núcleo. `skills/montagem_ffmpeg`, `skills/audio_locucao` |
| **Remotion** (Node/React) | Motion graphics com layout exato (nada cortado) | `npm i remotion @remotion/cli`; usa Chromium de `/opt/pw-browsers`. `skills/motion_grafico` |
| **Playwright + Chromium** | Captura de ecrã no viewport exato (super-sample x2) | Chromium pré-instalado; `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. `skills/captura_de_ecra` |
| **ImageMagick** (`convert`) | Imagem: resize sem deformar, recorte feather, compositing, thumbnails | `skills/imagem_retoque` |
| **ElevenLabs** (navegador) | Voz Benedita (PT-PT, Multilingual v2) | Login sempre do Diego; nunca gravar a palavra-passe |
| **loudnorm (ffmpeg)** | Normalização EBU R128 (−16 LUFS) | `skills/audio_locucao` |
| **whisper / faster-whisper** | Transcrição p/ legendas (quando útil) | `pip install faster-whisper`; `skills/legendas_sincronia` |
| **SVG + rsvg/convert** | Gráficos vetoriais, títulos, cartazes | Rasterizar com `convert` (ou instalar `librsvg2-bin`) |
| **Fontes** | Poppins-Bold, Inter | `fc-list` para confirmar; instalar via google-fonts se faltar |

## Regras
- **Enquadramento na origem** (viewport certo) e **escalar sempre com pad** — nunca esticar.
- Login (Go Auto, ElevenLabs) é sempre do Diego; Go Auto só em ambiente de testes.
- Preferir ferramentas que dão **layout determinístico** (Remotion, SVG) quando o risco de desenquadrar é alto.
