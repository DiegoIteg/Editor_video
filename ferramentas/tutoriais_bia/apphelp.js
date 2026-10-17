// Ajudas para os vídeos da app (telemóvel numa moldura, app num iframe)
const fs = require('fs');
const { sleep } = require('./engine');
const PW = () => fs.readFileSync('/root/work/rec/app_demo_seed.txt', 'utf8').match(/teste: (\S+)/)[1];
const F = r => r.p.frameLocator('#app');
const A = (r, sel) => F(r).locator(sel).filter({ visible: true }).first();
const host = (r, fn, ...args) => r.p.evaluate(([f, a]) => window.app[f](...a), [fn, args]);
const side = (r, t, s, steps, on) => host(r, 'side', t, s, steps || null, on || 0);
const step = (r, i) => host(r, 'step', i);
const ensure = async (r, l) => { const fr = r.p.frames().find(f => f.url().includes('/app/')); if (!fr) return; const h = await l.evaluate(e => { const b = e.getBoundingClientRect(); const H = window.innerHeight; if (b.top < 70 || b.bottom > H - 90) return document.scrollingElement.scrollTop + b.top - H * 0.42; return null; }).catch(() => null); if (h !== null) { await scrollApp(r, Math.max(0, h), 600); await sleep(250); } };
const typeA = async (r, sel, txt, d = 85) => { const l = A(r, sel); await ensure(r, l); await r.click(l, 420); await sleep(150); for (const ch of txt) { await r.p.keyboard.type(ch); await sleep(r.dry ? 15 : d); } await sleep(200); };
const tapA = async (r, sel, ring = true) => { const l = typeof sel === 'string' ? A(r, sel) : sel; await ensure(r, l); if (ring) await r.ring(l, 6, 12); await r.click(l, 450); if (ring) await r.off(); };
const login = async (r, user) => { await typeA(r, '#u', user, 55); await typeA(r, '#p', PW(), 40); await tapA(r, '#enter'); await sleep(2500); };
const start = async (r, u, mode) => { await r.p.goto(process.env.GA_BASE.replace(/\/$/, '') + '/appvideo/index.html?u=' + encodeURIComponent(u || '/app/') + (mode ? '&m=' + encodeURIComponent(mode) : '')); await sleep(2500); await r.p.mouse.move(1400, 900); };
const scrollApp = async (r, y, ms = 700) => { const fr = r.p.frames().find(f => f.url().includes('/app/')); if (!fr) return; await fr.evaluate(([y, ms]) => new Promise(res => { const s = document.scrollingElement || document.documentElement; const y0 = s.scrollTop, t0 = performance.now(); const f = t => { const k = Math.min(1, (t - t0) / ms); const e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; s.scrollTop = y0 + (y - y0) * e; if (k < 1) requestAnimationFrame(f); else res(); }; requestAnimationFrame(f); }), [y, ms]); };
const scrollTo = async (r, sel, off = 120, ms = 700) => { const fr = r.p.frames().find(f => f.url().includes('/app/')); if (!fr) return; const y = await fr.evaluate(([s, o]) => { const e = document.querySelector(s); return e ? e.getBoundingClientRect().top + (document.scrollingElement.scrollTop) - o : 0; }, [sel, off]); await scrollApp(r, Math.max(0, y), ms); };
const appEval = async (r, fn, arg) => { const fr = r.p.frames().find(f => f.url().includes('/app/')); return fr ? fr.evaluate(fn, arg) : null; };
module.exports = { ensure, PW, F, A, host, side, step, typeA, tapA, login, start, scrollApp, scrollTo, appEval, sleep };
