---
name: "imagem_retoque"
description: "Imagem fixa com ImageMagick/SVG: thumbnails, recortes, cor, compositing, cartazes — tamanho exato do destino, bordos limpos. Para qualquer imagem."
---
# Imagem e retoque — Helena

## Redimensionar sem deformar + fundo da marca
```bash
convert in.png -resize 1920x1080 -background '#0c2546' -gravity center -extent 1920x1080 out.png
```
`-resize WxH` já mantém o rácio; `-extent` preenche com o fundo (não estica).

## Recorte com bordo suave (feather)
```bash
convert retrato.png \( +clone -alpha extract -morphology Distance Euclidean:1 -level 0,2% \) -compose multiply -composite recorte.png
```

## Thumbnail / cartaz
- Tamanho exato do destino (YouTube 1280×720; redes conforme). Texto grande, alto contraste, dentro das safe margins.
- Paleta e tipos da marca. Exportar PNG (nitidez) ou JPG q90 (peso).

## Nunca
Esticar (`-resize WxH!`), exportar com artefactos ou no tamanho errado.
