# Princípios de Edição (o que faz um vídeo/imagem parecer profissional)

## Enquadramento (o nosso nº 1)
- **Safe margins:** mantém todo o conteúdo importante dentro de 90px (5%) da borda em 1080p. Títulos, legendas, logótipos e destaques nunca tocam o bordo.
- **Captura na origem certa:** grava-se no viewport/resolução de saída para não haver reescalas que cortam. Para ecrãs de sistema, enquadrar a zona útil (sem barras do navegador).
- **Escalar sem deformar:** `scale=...:force_original_aspect_ratio=decrease` + `pad` para o tamanho final. Nunca `scale=1920:1080` direto numa fonte de outro rácio.
- **Destaques:** anel/caixa com folga à volta do alvo; se o alvo está colado à margem, aproxima-se (zoom/crop) em vez de cortar o anel.

## Ritmo e movimento
- Cada plano "respira": tempo suficiente para ler. Transições suaves (cross-dissolve 0.3–0.5 s).
- Movimento subtil (zoom/pan lento) em ecrãs estáticos; nunca tremido.
- A ação acompanha a narração: o que a voz diz, o ecrã mostra.

## Tipografia e cor
- Famílias da marca (ex.: Poppins + Inter). Escala de tamanhos clara. Alto contraste (texto legível sobre o fundo).
- Fundo da marca (navy Go Auto: topo #0c2546 → base #061428; verde #1BE02A; azul #38BDF8).

## Áudio
- Locução normalizada (−16 LUFS), música de fundo com *ducking*, limiter no fim. Sem cliques nem silêncios estranhos.

## Imagem
- Exportar no tamanho exato do destino; nitidez sem artefactos; recortes com bordos limpos (feather subtil).
