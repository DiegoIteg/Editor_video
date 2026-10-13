---
name: "captura_de_ecra"
description: "Capturar ecrãs de sistema (Go Auto e web) com enquadramento e resolução certos, no viewport de saída, para nunca haver nada cortado nem reescalas. Usar sempre que há ecrãs a gravar."
---
# Captura de ecrã — Miguel

**Objetivo:** matéria-prima nítida e **bem enquadrada na origem**. Enquadra-se na captura, não se conserta na montagem.

## Com o navegador do Diego (login dele)
- Trabalhar no viewport da saída. Para 1080p, usar janela/zoom que deixe a **zona útil** cheia, sem barras do navegador no plano.
- Capturar cada estado do fluxo em separado (lista, filtros, combos abertos, formulário, criação, validação, resultado).
- **Painéis com gráficos (Chart.js) congelam a captura.** Antes de capturar, injetar:
```js
document.head.insertAdjacentHTML('beforeend','<style>*{animation:none!important;transition:none!important}</style>');
if(window.Chart){Chart.defaults.animation=false;Object.values(Chart.instances||{}).forEach(c=>{try{c.options.animation=false;c.stop();c.update('none')}catch(e){}})}
```

## Captura programática (Playwright/Chromium) — enquadramento exato
```bash
npm i -D playwright   # Chromium já em /opt/pw-browsers (PLAYWRIGHT_BROWSERS_PATH)
```
```js
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const page = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
  await page.goto(process.argv[2], { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: '*{animation:none!important;transition:none!important}' });
  await page.screenshot({ path: process.argv[3] });      // ecrã inteiro no viewport exato
  // await page.locator('#painel').screenshot({ path: ... }); // só um elemento, enquadrado
  await b.close();
})();
```
`deviceScaleFactor: 2` → captura a 3840×2160 (super-sample) para 1080p nítido. Para ecrãs autenticados, usar o navegador com sessão do Diego.

## Regra de ouro
Nada cortado, nada tremido, resolução de saída. Se a ação fica junto à margem, **aproxima (zoom/crop)** em vez de deixar meio fora.
