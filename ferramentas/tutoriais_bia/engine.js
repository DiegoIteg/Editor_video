// Motor de gravação dos tutoriais Go Auto (Bia) — 1920x1080, cursor visível, destaques verdes,
// escrita incremental, cenas cronometradas pela voz. Grava com CDP screencast (JPEG q92).
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const BASE = 'http://127.0.0.1:8770';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const INIT = () => {
  try { localStorage.setItem('ga_pin', '1'); localStorage.setItem('ga_theme', 'light'); } catch (e) {}
  const LIG = { more_vert: '⋮', more_horiz: '⋯', expand_more: '▾', close: '✕', add: '+', delete: '🗑', edit: '✎', search: '⌕', menu: '☰', check: '✓' };
  const fixIcons = () => {
    document.querySelectorAll('.material-icons, .material-icons-outlined, i.mdi, span.material-symbols-outlined').forEach(e => {
      const t = (e.textContent || '').trim(); if (LIG[t]) { e.textContent = LIG[t]; e.style.fontFamily = 'Inter, Arial, sans-serif'; e.style.fontStyle = 'normal'; e.style.fontWeight = '700'; }
    });
    // ícones material escritos como texto em itálico nos cabeçalhos do quadro de prospeção
    document.querySelectorAll('i, span').forEach(e => { if (e.childElementCount === 0) { const t = (e.textContent || '').trim(); if (t === 'more_vert') { e.textContent = '⋮'; e.style.fontStyle = 'normal'; e.style.fontWeight = '800'; e.style.fontSize = '22px'; } } });
  };
  const add = () => {
    if (!document.body || !document.head || document.getElementById('__cur')) return;
    const st = document.createElement('style'); st.id = '__recstyle';
    st.textContent = `
      #__cur{position:fixed;left:-80px;top:-80px;z-index:2147483647;pointer-events:none;width:34px;height:34px;filter:drop-shadow(0 3px 5px rgba(0,0,0,.45));}
      .__rip{position:fixed;z-index:2147483646;pointer-events:none;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;border:3px solid #1BE02A;animation:__rip .55s ease-out forwards}
      @keyframes __rip{from{transform:scale(.4);opacity:1}to{transform:scale(3.6);opacity:0}}
      #__hl{position:fixed;left:0;top:0;width:100vw;height:100vh;z-index:2147483645;pointer-events:none}
      .__ring{position:fixed;border:4px solid #1BE02A;border-radius:14px;box-shadow:0 0 14px 4px rgba(27,224,42,.75),inset 0 0 10px 1px rgba(27,224,42,.35);
        opacity:0;transform:scale(1.06);transition:opacity .35s ease,transform .35s ease}
      .__ring.on{opacity:1;transform:scale(1)}
      .__arrow{position:fixed;opacity:0;transition:opacity .35s ease, transform .35s ease}
      .__arrow.on{opacity:1}
      html{scroll-behavior:auto!important}`;
    document.head.appendChild(st);
    const c = document.createElement('div'); c.id = '__cur';
    c.innerHTML = '<svg width="34" height="34" viewBox="0 0 24 24"><path d="M4 2 L4 20 L9 15 L12.5 22.5 L15.5 21 L12 13.5 L19 13.5 Z" fill="#fff" stroke="#0c2546" stroke-width="1.5" stroke-linejoin="round"/></svg>';
    document.body.appendChild(c);
    const hl = document.createElement('div'); hl.id = '__hl'; document.body.appendChild(hl);
    if (window.__lastXY) { c.style.left = window.__lastXY[0] + 'px'; c.style.top = window.__lastXY[1] + 'px'; }
  };
  window.addEventListener('mousemove', e => { window.__lastXY = [e.clientX, e.clientY]; const c = document.getElementById('__cur'); if (c) { c.style.left = (e.clientX - 3) + 'px'; c.style.top = (e.clientY - 2) + 'px'; } }, true);
  window.addEventListener('mousedown', e => { const r = document.createElement('div'); r.className = '__rip'; r.style.left = e.clientX + 'px'; r.style.top = e.clientY + 'px'; document.body.appendChild(r); setTimeout(() => r.remove(), 700); }, true);
  window.__ring = (rects) => { add(); const hl = document.getElementById('__hl'); hl.innerHTML = ''; for (const [x, y, w, h, rad] of rects) { const d = document.createElement('div'); d.className = '__ring'; d.style.left = x + 'px'; d.style.top = y + 'px'; d.style.width = w + 'px'; d.style.height = h + 'px'; if (rad != null) d.style.borderRadius = rad + 'px'; hl.appendChild(d); requestAnimationFrame(() => requestAnimationFrame(() => d.classList.add('on'))); } };
  window.__ringOff = () => { const hl = document.getElementById('__hl'); if (!hl) return; hl.querySelectorAll('.__ring,.__arrow').forEach(d => { d.classList.remove('on'); setTimeout(() => d.remove(), 400); }); };
  // seta de chamada (contorno verde, como no vídeo de referência) a apontar para (tx,ty) vinda da direção ang (graus)
  window.__arrow = (tx, ty, ang, len) => {
    add(); len = len || 150; const hl = document.getElementById('__hl');
    const a = document.createElement('div'); a.className = '__arrow';
    const W = len + 40, H = 90;
    a.innerHTML = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="overflow:visible;filter:drop-shadow(0 0 6px rgba(27,224,42,.8))">
      <path d="M2 45 L48 8 L48 30 L${W - 6} 30 L${W - 6} 60 L48 60 L48 82 Z" fill="rgba(27,224,42,.12)" stroke="#1BE02A" stroke-width="5" stroke-linejoin="round"/></svg>`;
    a.style.left = tx + 'px'; a.style.top = (ty - H / 2) + 'px'; a.style.transformOrigin = '0px ' + (H / 2) + 'px';
    a.style.transform = `rotate(${ang}deg) translateX(18px)`;
    hl.appendChild(a); requestAnimationFrame(() => requestAnimationFrame(() => { a.classList.add('on'); a.style.transform = `rotate(${ang}deg) translateX(4px)`; }));
  };
  if (document.readyState !== 'loading') add(); else document.addEventListener('DOMContentLoaded', add);
  setInterval(() => { add(); fixIcons(); }, 200);
};

class Rec {
  constructor(name, opts = {}) {
    this.name = name; this.dir = path.join('/root/work/rec/out', name); this.dry = !!opts.dry;
    this.voice = opts.voice || null; // {sceneId: seconds}
    this.scenes = []; this.frames = []; this.x = 960; this.y = 600; this.log = [];
  }
  async start() {
    fs.rmSync(this.dir, { recursive: true, force: true }); fs.mkdirSync(path.join(this.dir, 'frames'), { recursive: true });
    this.b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--force-device-scale-factor=1', '--font-render-hinting=none'] });
    this.c = await this.b.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1, locale: 'pt-PT', timezoneId: 'Europe/Lisbon' });
    await this.c.addInitScript(INIT);
    this.p = await this.c.newPage();
    this.p.on('pageerror', e => this.log.push('JSERR ' + e.message));
    this.p.on('dialog', d => d.accept());
    await this.p.goto(BASE + '/_login_local.php?u=1&unit=1');
  }
  async open(cls, extra = '') { await this.p.goto(BASE + '/index.php?class=' + cls + '&method=onShow' + extra); await this.settle(2200); }
  async settle(ms = 900) { try { await this.p.waitForLoadState('networkidle', { timeout: 1200 }); } catch (e) {} await sleep(ms); }
  async rec() {
    if (this.dry) return;
    this.cdp = await this.c.newCDPSession(this.p);
    let n = 0;
    this.cdp.on('Page.screencastFrame', async f => {
      const file = path.join(this.dir, 'frames', String(n++).padStart(6, '0') + '.jpg');
      fs.writeFileSync(file, Buffer.from(f.data, 'base64'));
      this.frames.push({ t: Date.now() / 1000, file });
      try { await this.cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }); } catch (e) {}
    });
    await this.cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: 1920, maxHeight: 1080, everyNthFrame: 1 });
    // força um primeiro frame
    await this.move(this.x + 1, this.y, 2); await sleep(300);
    this.t0 = Date.now() / 1000;
  }
  // ---- cenas
  async scene(id, est, fn) {
    const t = Date.now() / 1000; const want = (this.voice && this.voice[id] != null) ? this.voice[id] + 0.55 : est;
    this.scenes.push({ id, t: this.dry ? 0 : t - this.t0 });
    await fn();
    const el = Date.now() / 1000 - t;
    if (this.dry) { await this.p.screenshot({ path: path.join(this.dir, `dry_${id}.png`) }); this.log.push(`${id}: ações ${el.toFixed(1)}s / voz ${want.toFixed(1)}s`); return; }
    if (el < want) await sleep((want - el) * 1000);
    else this.log.push(`AVISO ${id}: ações ${el.toFixed(1)}s > voz ${want.toFixed(1)}s`);
    this.scenes[this.scenes.length - 1].dur = Date.now() / 1000 - t;
  }
  // ---- rato
  async move(x, y, ms = 650) {
    const sx = this.x, sy = this.y, steps = Math.max(2, Math.round((this.dry ? 40 : ms) / 16));
    for (let i = 1; i <= steps; i++) { const k = i / steps, e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; await this.p.mouse.move(sx + (x - sx) * e, sy + (y - sy) * e); if (!this.dry) await sleep(14); }
    this.x = x; this.y = y;
  }
  // elemento visível cujo texto é exatamente t (o mais interior)
  el(t, tags = 'a,button,span,div,label,li,h1,h2,h3,h4,h5,b,strong,td,th,p') { const re = t instanceof RegExp ? t : new RegExp('^\\s*' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*$'); return this.p.locator(tags).filter({ hasText: re }).filter({ visible: true }).last(); }
  // como el(), mas devolve o elemento que está mesmo à vista (não tapado nem fora do ecrã)
  async hit(t, tags = 'a,button,span,div,label,li') {
    const l = this.el(t, tags).locator('xpath=.'); const all = this.p.locator(tags).filter({ hasText: t instanceof RegExp ? t : new RegExp('^\\s*' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*$') }).filter({ visible: true });
    const n = await all.count();
    for (let i = n - 1; i >= 0; i--) { const c = all.nth(i); const ok = await c.evaluate(e => { const b = e.getBoundingClientRect(); if (b.width < 2 || b.x < 0 || b.y < 0 || b.x > innerWidth - 2 || b.y > innerHeight - 2) return false; const t = document.elementFromPoint(b.x + b.width / 2, b.y + b.height / 2); return !!t && (t === e || e.contains(t) || t.contains(e)); }).catch(() => false); if (ok) return c; }
    return this.el(t, tags);
  }
  vis(l) { return (typeof l === 'string' ? this.p.locator(l) : l).filter({ visible: true }).first(); }
  // abre um item do menu lateral (abre o grupo só se estiver fechado)
  async menu(group, item, ringIt = true) {
    const side = t => this.p.locator('#ga-side a').filter({ hasText: new RegExp('^\\s*' + t + '\\s*$') }).first();
    const reach = async l => { try { const b = await l.boundingBox({ timeout: 1500 }); if (!b || b.height < 4) return false; return await l.evaluate((e, [x, y]) => { const t = document.elementFromPoint(x, y); return !!t && (t === e || e.contains(t) || t.contains(e) || (t.closest('li') && t.closest('li') === e.closest('li'))); }, [b.x + b.width / 2, b.y + b.height / 2]); } catch (e) { return false; } };
    if (!(await reach(side(item)))) { await this.click(side(group), 800); await sleep(700); }
    if (ringIt) await this.ring(side(item), 4, 8);
    await this.click(side(item), 650); await this.off(); await this.settle(1500);
  }
  // menu de dois níveis (ex.: CRM › Pós-venda › Pesquisas de satisfação)
  async menu2(g1, g2, item) {
    const side = t => this.p.locator('#ga-side a').filter({ hasText: new RegExp('^\\s*' + t + '\\s*$') }).first();
    const reach = async l => { try { const b = await l.boundingBox({ timeout: 1500 }); if (!b || b.height < 4) return false; return await l.evaluate((e, [x, y]) => { const t = document.elementFromPoint(x, y); return !!t && (t === e || e.contains(t) || t.contains(e)); }, [b.x + b.width / 2, b.y + b.height / 2]); } catch (e) { return false; } };
    if (!(await reach(side(item)))) {
      if (!(await reach(side(g2)))) { await this.click(side(g1), 550, 150); await sleep(450); }
      await this.click(side(g2), 500, 150); await sleep(450);
    }
    await this.ring(side(item), 4, 8); await this.click(side(item), 500, 200); await this.off(); await sleep(600);
  }
  async box(sel) { const l = typeof sel === 'string' ? this.p.locator(sel).filter({ visible: true }).first() : sel; await l.waitFor({ state: 'visible', timeout: 8000 }); return await l.boundingBox(); }
  async to(sel, ms, dx = .5, dy = .5) { const b = await this.box(sel); await this.move(b.x + b.width * dx, b.y + b.height * dy, ms); return b; }
  async click(sel, ms = 650, pause = 250) { const b = await this.to(sel, ms); await sleep(pause); await this.p.mouse.down(); await sleep(70); await this.p.mouse.up(); return b; }
  async type(sel, text, delay = 75) { await this.click(sel); await sleep(200); for (const ch of text) { await this.p.keyboard.type(ch); await sleep(this.dry ? 0 : delay + Math.random() * 35); } }
  async ring(sel, pad = 8, rad) { const list = Array.isArray(sel) ? sel : [sel]; const rs = []; for (const s of list) { const b = await this.box(s); let x = Math.max(6, b.x - pad), y = Math.max(6, b.y - pad), x2 = Math.min(1914, b.x + b.width + pad), y2 = Math.min(1074, b.y + b.height + pad); rs.push([x, y, x2 - x, y2 - y, rad]); } await this.p.evaluate(r => window.__ring(r), rs); }
  async ringXY(x, y, w, h, rad) { await this.p.evaluate(r => window.__ring(r), [[x, y, w, h, rad]]); }
  async arrow(sel, ang = 200, len = 150, side = 'right') { const b = await this.box(sel); const tx = side === 'right' ? b.x + b.width + 6 : side === 'left' ? b.x - 6 : b.x + b.width / 2; const ty = side === 'bottom' ? b.y + b.height + 6 : side === 'top' ? b.y - 6 : b.y + b.height / 2; await this.p.evaluate(([a, b, c, d]) => window.__arrow(a, b, c, d), [tx, ty, ang, len]); }
  async off() { try { await this.p.evaluate(() => window.__ringOff && window.__ringOff()); } catch (e) {} await sleep(250); }
  async wait(ms) { if (!this.dry) await sleep(ms); }
  // select2 do Adianti: abre e escolhe pelo texto, com o rato
  async pick(name, text, search) {
    const s2 = this.p.locator(`select[name="${name}"] + .select2 .select2-selection`).first();
    await this.click(s2); await sleep(500);
    const sf = this.p.locator('.select2-container--open .select2-search__field').first();
    if (search && await sf.isVisible().catch(() => false)) { for (const ch of search) { await this.p.keyboard.type(ch); await this.wait(110); } await sleep(900); }
    const opt = this.p.locator('.select2-container--open .select2-results__option', { hasText: text }).first();
    await this.to(opt, 450); await this.wait(250); await opt.click(); await sleep(400);
  }
  // pick rápido: pesquisa curta e escolha imediata
  async pickFast(name, text, search) {
    const s2 = this.p.locator(`select[name="${name}"] + .select2 .select2-selection`).first();
    await this.click(s2, 420); await sleep(200);
    const f = this.p.locator('.select2-container--open .select2-search__field').first();
    if (search && await f.isVisible().catch(() => false)) { for (const ch of search) { await this.p.keyboard.type(ch); await this.wait(50); } await sleep(this.dry ? 150 : 400); }
    const opt = this.p.locator('.select2-container--open .select2-results__option', { hasText: text }).first();
    await this.to(opt, 260); await opt.click(); await sleep(200);
  }
  async scrollEl(sel, dy, ms = 900) { // rolagem suave no contentor principal
    const steps = Math.max(1, Math.round(ms / 16));
    for (let i = 0; i < steps; i++) { await this.p.evaluate(([s, d]) => { const e = document.querySelector(s) || document.scrollingElement; e.scrollBy(0, d); }, [sel, dy / steps]); if (!this.dry) await sleep(16); }
  }
  async scrollX(sel, dx, ms = 900) { const steps = Math.max(1, Math.round(ms / 16)); for (let i = 0; i < steps; i++) { await this.p.evaluate(([s, d]) => { const c = [...document.querySelectorAll(s + ', ' + s + ' *')].find(e => e.scrollWidth > e.clientWidth + 20 && ['auto', 'scroll'].includes(getComputedStyle(e).overflowX)) || document.querySelector(s); c.scrollBy(d, 0); }, [sel, dx / steps]); if (!this.dry) await sleep(16); } }
  async scrollTo(sel, top, ms = 900) { const cur = await this.p.evaluate(s => (document.querySelector(s) || document.scrollingElement).scrollTop, sel); await this.scrollEl(sel, top - cur, ms); }
  async finish() {
    if (!this.dry) { try { await this.cdp.send('Page.stopScreencast'); } catch (e) {} this.tEnd = Date.now() / 1000; }
    await this.b.close();
    const meta = { name: this.name, t0: this.t0, tEnd: this.tEnd, scenes: this.scenes, frames: this.frames.map(f => ({ t: f.t - this.t0, f: path.basename(f.file) })), log: this.log };
    fs.writeFileSync(path.join(this.dir, 'meta.json'), JSON.stringify(meta, null, 1));
    console.log(this.log.join('\n')); console.log('cenas', this.scenes.map(s => s.id + '@' + (s.t || 0).toFixed(1)).join(' '));
  }
}
module.exports = { Rec, sleep };
