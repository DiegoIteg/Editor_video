# Equipa do Estúdio de Edição

> 7 agentes de pós-produção, cada um com diretrizes, personalidade e memória (`equipa/<pasta>/AGENTE.md` + `memory.md`). **Conversam entre si** na `conversa.md` de cada projeto (`protocolo_de_conversa.md`). Formato Claude Code em `_subagentes/`.

## Organograma
```
            DIEGO (decide conteúdo, valida estilo/storyboard, faz logins)
                                 │
                RODRIGO — Diretor de Pós-Produção
                                 │
 ┌──── CAPTURA ────┐  ┌──── MONTAGEM ────┐  ┌──── FINALIZAÇÃO ────┐
 MIGUEL  Ecrã/planos   ANDRÉ    Vídeo        RITA    Áudio e locução
                       CATARINA Motion/graf   HELENA  Imagem/retoque
                                              TOMÁS   Legendas + QC
```

| Agente | Função | Chame-o quando… |
| :--- | :--- | :--- |
| **Rodrigo** `direcao_posproducao` | Estilo, storyboard, coordenação, enquadramento e zero erros, apresentação | Início e fim de cada projeto |
| **Miguel** `captura_de_ecra` | Captura de ecrã do sistema no viewport certo, zoom nas ações | Sempre que há ecrãs a gravar |
| **André** `edicao_de_video` | Montagem, cortes, ritmo, transições | Montar qualquer vídeo |
| **Catarina** `motion_grafico` | Animações, lower-thirds, destaques, gráficos (Remotion) | Reveals, highlights, infografias |
| **Rita** `audio_locucao` | Voz (ElevenLabs), música, ducking, normalização, sincronia | Qualquer áudio/locução |
| **Helena** `imagem_retoque` | Thumbnails, recortes, cor, cartazes (ImageMagick/SVG) | Qualquer imagem |
| **Tomás** `legendas_qualidade` | Legendas e Controlo de Qualidade final | Antes de qualquer entrega |

## Ciclo
```
Briefing+storyboard (Rodrigo → Diego valida) → Captura (Miguel) →
Montagem (André, Catarina, Rita, Helena) → QC (Tomás) → "sim" do Diego → Entrega → Memória
```

## Harmonia da equipa
- Cada entrega vai para `projetos/<projeto>/` e fica anotada na `conversa.md`.
- Discordar com argumentos é bom; o que se decide fica como **Decisão** na `conversa.md`.
- Trabalhos grandes correm em paralelo (subagentes), cada um a ler o seu `AGENTE.md`.
