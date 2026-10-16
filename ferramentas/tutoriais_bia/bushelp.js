// Ajudas comuns aos vídeos do módulo Business
const { sleep } = require('./engine');
const C = '#adianti_content';
const re = t => (t instanceof RegExp ? t : new RegExp('^\\s*' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
const btn = (r, t) => r.p.locator('#adianti_div_content a, #adianti_div_content button').filter({ hasText: re(t) }).filter({ visible: true }).first();
const kpi = (r, t) => r.p.locator('a.gp-kpi').filter({ has: r.p.locator('.gp-kpi-rotulo', { hasText: re(t) }) }).filter({ visible: true }).first();
const card = (r, t) => r.p.locator('.gp-cartao').filter({ has: r.p.locator('.gp-cartao-topo', { hasText: re(t) }) }).filter({ visible: true }).first();
const yOf = loc => loc.evaluate(e => { const k = document.querySelector('#adianti_content'); return e.getBoundingClientRect().top - k.getBoundingClientRect().top + k.scrollTop - 90; });
const goTo = async (r, loc, ms = 800) => { await r.scrollTo(C, Math.max(0, await yOf(loc)), ms); await r.wait(200); };
const top = async (r, ms = 600) => { await r.scrollTo(C, 0, ms); };
const okModal = async r => { const ok = r.el(/^\s*OK\s*$/, 'button,a'); if (await ok.count()) { await r.click(ok, 400); await r.settle(500); } };
const kpis = async (r, list, w = 900) => { for (const t of list) { const k = kpi(r, t); if (!(await k.count())) continue; await r.ring(k, 5, 12); await r.to(k, 320, .35, .55); await r.wait(w); } await r.off(); };
const show = async (r, t, w = 1200, dy = .4) => { const c = card(r, t); await goTo(r, c); await r.ring(c, 6, 10); await r.to(c, 450, .5, dy); await r.wait(w); await r.off(); };
const RP = r => r.p.locator('#adianti_right_panel');
const fechaRP = async r => { const fc = RP(r).locator('a, button').filter({ hasText: /Fechar/ }).first(); if (await fc.isVisible().catch(() => false)) { await r.click(fc, 350); await r.settle(800); } if (await r.p.evaluate(() => { const p = document.querySelector('#adianti_right_panel'); return !!p && p.getBoundingClientRect().width > 50 && getComputedStyle(p).display !== 'none' && p.innerText.trim().length > 0; })) { await r.p.evaluate(() => { try { Template.closeRightPanel(); } catch (e) {} }); await r.settle(800); } };
const menuPath = async (r, path) => { // ['BUSINESS', 'Análises', 'RH', 'Painel RH']
  const [g, sub, grp, item] = path; await r.menuG(g, grp, sub);
  const side = r.p.locator('#ga-side a').filter({ hasText: new RegExp('^\\s*' + grp + '\\s*$', 'i') });
  const n = await side.count(); let target = null;
  for (let k = 0; k < n; k++) { const t = side.nth(k).locator('xpath=following-sibling::div[1]').locator('a').filter({ hasText: new RegExp('^\\s*' + item + '\\s*$', 'i') }).first(); if (await t.count()) { const b = await t.boundingBox().catch(() => null); if (b && b.height > 4) { target = t; break; } } }
  if (!target) throw new Error('menu ' + item);
  await sleep(400); await r.ring(target, 4, 8); await r.click(target, 420, 150); await r.off(); await sleep(500); };
module.exports = { menuPath,  C, re, btn, kpi, card, yOf, goTo, top, okModal, kpis, show, RP, fechaRP, sleep };
