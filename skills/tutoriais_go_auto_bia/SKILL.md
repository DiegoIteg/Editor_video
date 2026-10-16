---
name: "tutoriais_go_auto_bia"
description: "Método aprovado pelo Diego (16/10/2026) para produzir os vídeos tutoriais do Go Auto com a formadora Bia: gravação real 1080p com cursor e destaques, voz Benedita por cena, abertura e despedida da Bia, logótipo, música com ducking. Usar em TODOS os próximos vídeos de formação."
---
# Tutoriais Go Auto com a Bia (padrão aprovado)

> Aprovado pelo Diego a 16/10/2026 («está fantástico»). A referência visual mínima é o vídeo do Diego
> `Meu_Vídeo.mp4` (= `Meu_Vídeo_1.mp4`). **Pode melhorar, nunca piorar.**

## 1. Estrutura de cada vídeo (sempre esta ordem)
1. **Logótipo animado** GO|AUTO (`assets/logo_intro.mp4`, 3,4 s, sem efeito sonoro).
2. **Cartão de título** sobre gradiente navy (#0c2546 → #061428): GO|AUTO pequeno no topo, «FORMAÇÃO · <MÓDULO> · VÍDEO N»,
   título grande (Poppins Bold), subtítulo (Inter), risco verde #1BE02A. 4,2 s com fade.
3. **Abertura com a Bia**: o ecrã real aparece em **cartão** (1320 px, cantos arredondados, sombra) sobre o fundo navy com
   padrão diagonal, brilho verde em baixo à esquerda e a marca d'água **iTEG**; a Bia entra no canto inferior esquerdo:
   avatar recortado (sobe e cresce) → barra branca → «Bia» a revelar-se da barra → «Business Intelligence Artificial».
   A Bia fala a abertura; no fim da frase o cartão faz **zoom suave para ecrã inteiro** (0,9 s).
4. **Ecrãs reais em ecrã inteiro 1920×1080**: menu fixado, cursor visível a mover-se com suavidade, clique com onda verde,
   **escrita campo a campo**, combos a abrir e a pesquisar, **destaques verdes** (#1BE02A, contorno 4 px com brilho) e setas
   de contorno verde quando ajudam. Sem ecrãs em branco (os frames de carregamento são retirados na montagem).
5. **Despedida**: zoom de volta ao cartão, a Bia reaparece e despede-se.
6. **Logótipo de fecho** (`assets/logo_outro.mp4`).

## 2. A Bia
- **BIA = Business Intelligence Artificial**, formadora, 22 anos, blazer azul-marinho, sorriso cordial.
- Avatar: `assets/bia_cutout.png` — recorte limpo tirado do vídeo-referência (GrabCut). **Não usar** o antigo `bia_avatar.png` (cortado e desfocado).
- Voz: **Benedita**, ElevenLabs, **Eleven Multilingual v2**, definições já guardadas na conta do Diego (velocidade 1,00, estabilidade 50, similaridade 75).
- Abertura obrigatória: «Olá, eu sou a Bia, a tua assistente de formação, e hoje vou ensinar-te a …».
- Fecho obrigatório: «E assim dominas … No próximo vídeo vamos … Eu sou a Bia, a tua assistente de formação. Até já!».
- Tratamento por **tu**, PT-PT, frases corridas e naturais; os nomes dos botões dizem-se como aparecem no ecrã.
  Termos do ecrã em PT-BR (ex.: «Contatos», «Deletar») não se leem em voz alta: diz-se «contactos», «apagar».

## 3. Regra de ouro da sincronia
**Se a voz menciona, o ecrã mostra — no mesmo momento.**
- O guião é escrito **por cenas** (uma frase ou duas por cena), e cada cena tem as ações que a mostram.
- A voz é gerada **de uma vez** no ElevenLabs, com `<break time="1.6s" />` entre cenas; depois corta-se por silêncios
  (`tools/split_voice.py`) e cada cena da gravação dura **o tempo da sua voz** (+0,55 s). A voz de cada cena é colocada
  exatamente no início da sua cena → sincronia perfeita, sem esticar nada.
- Se as ações de uma cena forem mais longas do que a voz, o motor avisa; encurtar as esperas até não haver avisos grandes.
- Cena com muitas ações (ex.: formulário com vários combos): **alongar a frase da Bia** para cobrir as ações — nunca deixar mais de ~1,5 s de silêncio a mais.
- Pode gerar-se a voz de **vários vídeos de uma vez** (≤ 5.000 carateres) e distribuir as cenas por vídeo. O MP3 descarregado tem no nome a hora **UTC do fim** da geração.

## 3.1 Zero erros à vista
- Ver no controlo de qualidade o frame **a seguir a cada confirmação** (guardar, eliminar). Se o sistema mostrar um erro, muda-se o passo (ex.: mostrar a confirmação e clicar «Não») e regrava-se.
- Menus de dois níveis (CRM › Pós-venda › …) com `menu2()`; combos seguidos com `pickFast()`.

## 4. Dados das gravações
- Grava-se numa **cópia local** do Go Auto com a **base de demonstração da Matriz** (a mesma que está em produção:
  `popular_demo.php`, determinística) — os formandos veem exatamente os mesmos clientes, orçamentos e números.
- Antes de cada gravação repõe-se a base limpa (`rec_pristine.db`) para que os cartões, listas e ids sejam sempre iguais.
- Nunca se grava em produção nem com dados reais de clientes. Registos criados no vídeo usam nomes fictícios e domínio `exemplo.pt`;
  NIF/NIPC com dígito de controlo válido.

## 5. Ferramentas (pasta `ferramentas/tutoriais_bia/`)
| Ficheiro | Função |
| :--- | :--- |
| `engine.js` | Motor Playwright + CDP screencast (JPEG q92): cursor, onda de clique, `ring()` destaque verde, `arrow()`, `type()` escrita, `pick()` combos select2 com pesquisa, `menu()` navegação lateral, `scene()` cronometrada pela voz, `hit()` elemento realmente visível. |
| `run.js <video> [dry]` | Corre o guião do vídeo. `dry` = ensaio rápido com capturas por cena (`out/<video>/dry_*.png`), sem gravar. |
| `crmNN.js` | Guião de cada vídeo: `say` (texto da Bia) + `act` (ações no ecrã) por cena. |
| `assemble.py <nome> <MÓDULO> <n> "<Título>" "<Subtítulo>"` | Montagem: logo → título → abertura em cartão + Bia → ecrã inteiro → despedida → logo; voz por cena com loudnorm (−16 LUFS), música `bg_ambient160.wav` em loop com **ducking** (sidechain), alimitador. |
| `tools/split_voice.py <pasta> <n_cenas>` | Corta o MP3 da Benedita por cenas e grava `durs.json`. |
| `assets/` | `logo_intro.mp4`, `logo_outro.mp4`, `bia_cutout.png`, `bg_ambient160.wav`, `bg_navy.png`. |

## 6. Passo a passo de um vídeo novo
1. Explorar o ecrã (Playwright) e escrever `crmNN.js`: cenas curtas, uma ideia por cena, ações que mostram exatamente o que a voz diz.
   Ver TUDO: barra de ações, filtros, exportar, ícones de cada linha, criar → preencher campo a campo → guardar → ver → editar → eliminar (com confirmação).
2. `node run.js crmNN dry` até não haver erros; ver a folha de contacto das capturas.
3. Texto para o ElevenLabs: frases das cenas unidas com `<break time="1.6s" />` (≤ 5.000 carateres). Gerar no ElevenLabs do Diego
   (login sempre dele), descarregar o MP3 (pedir autorização para descarregar), `split_voice.py` com o nº de cenas.
4. `node run.js crmNN` (gravação real sincronizada) → `python3 assemble.py ...`.
5. Controlo de qualidade: folha de contacto a cada 4 s (enquadramento, nada cortado, sem ecrãs de erro/branco, Bia legível),
   loudness ≈ −16 LUFS, títulos com acentos corretos.
6. Entregar na conversa + gravar em `D:\workspace_claude\go_auto\formacao\<modulo>_bia\` + memória.

## 7. Nomes e entrega
- `crm01_painel_do_dia.mp4`, `crm02_prospecao.mp4`, … (módulo + nº + submódulo, sem acentos).
- Um vídeo por submódulo do menu (exceto ecrãs que o Diego vai retirar — ex.: «Viaturas dos clientes» não tem vídeo).
- Série CRM (5): `crm01_painel_do_dia`, `crm02_prospecao`, `crm03_clientes`, `crm04_pesquisas_satisfacao`, `crm05_indicadores_qualidade`. Ordem da série: Conta → CRM → Vendas → Produção → restantes.
- Full HD 1920×1080, 30 fps, H.264 CRF 17, AAC 192 kbps, +faststart.
