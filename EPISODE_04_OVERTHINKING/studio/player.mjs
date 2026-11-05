// studio/player.mjs — deterministic frame painter.
// Boots the engine, registers the fonts, loads scenes/shots/*.js and draws any frame at a time.
// Everything the renderer needs is exported from here: boot(), prepareGrade(), png(), jpeg().
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createCanvas, GlobalFonts } from '@napi-rs/canvas';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const PROJECT = process.env.MP_PROJECT || path.resolve(ROOT, '..');
const FONTS = path.join(ROOT, 'assets', 'fonts');

// ---------------------------------------------------------------- fonts
let fontsReady = false;
function fonts() {
  if (fontsReady) return;
  const add = (file, alias) => {
    const p = path.join(FONTS, file);
    if (fs.existsSync(p)) GlobalFonts.registerFromPath(p, alias);
  };
  add('Fredoka-Bold.ttf', 'Fredoka');
  add('Fredoka-SemiBold.ttf', 'Fredoka');
  add('Nunito-Black.ttf', 'Nunito');
  add('Nunito-ExtraBold.ttf', 'Nunito');
  add('Playfair-Black.ttf', 'Playfair Display');
  add('Playfair-BlackItalic.ttf', 'Playfair Display');
  fontsReady = true;
}

// ---------------------------------------------------------------- the engine grade
// engine/core.js has no post-processing hook of its own; render.mjs applies the *look* here so
// every shot gets the series grade without each scene re-implementing it.
export let E, V, getShot, setStyle, mood, S;
const GRADE = {
  contrast: 1.14, sat: 1.10,
  lift: [0.004, 0.008, 0.022], gamma: [1.10, 1.02, 0.94], gain: [1.13, 1.03, 0.92],
  vignette: 0.60, grain: 0.045, bloom: 0.45,
};

function applyGrade(ctx, w, h) {
  // contrast + saturation + per-channel lift/gamma/gain, then vignette + grain + a cheap bloom.
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  const c = GRADE.contrast, s = GRADE.sat;
  const [lr, lg, lb] = GRADE.lift, [gr, gg, gb] = GRADE.gamma, [nr, ng, nb] = GRADE.gain;
  const lut = new Uint8ClampedArray(256 * 3);
  for (let i = 0; i < 256; i++) {
    let v = i / 255;
    v = (v - 0.5) * c + 0.5;                       // contrast
    const ch = [v + lr, v + lg, v + lb];           // lift
    const gm = [gr, gg, gb], gn = [nr, ng, nb];
    for (let k = 0; k < 3; k++) {
      let x = Math.max(0, ch[k]);
      x = Math.pow(x, 1 / gm[k]) * gn[k];          // gamma then gain
      lut[i * 3 + k] = Math.round(Math.min(1, Math.max(0, x)) * 255);
    }
  }
  // saturation is applied per pixel around luma
  const cx = w / 2, cy = h / 2, maxR = Math.hypot(cx, cy);
  const vig = GRADE.vignette;
  let seed = 1234567;
  for (let p = 0; p < d.length; p += 4) {
    let r = d[p], g = d[p + 1], b = d[p + 2];
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    r = lum + (r - lum) * s; g = lum + (g - lum) * s; b = lum + (b - lum) * s;
    // each channel reads its OWN LUT column; all three reading column 0 turned warm highlights cyan
    r = Math.min(255, Math.max(0, r)); g = Math.min(255, Math.max(0, g)); b = Math.min(255, Math.max(0, b));
    r = lut[(r | 0) * 3]; g = lut[(g | 0) * 3 + 1]; b = lut[(b | 0) * 3 + 2];
    const px = (p >> 2) % w, py = (p >> 2) / w | 0;
    const dx = px - cx, dy = py - cy;
    const dd = Math.sqrt(dx * dx + dy * dy) / maxR;
    const v = 1 - vig * Math.pow(dd, 2.2);
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    const n = ((seed >> 16) & 255) / 255 - 0.5;
    r = r * v + n * GRADE.grain * 255;
    g = g * v + n * GRADE.grain * 255;
    b = b * v + n * GRADE.grain * 255;
    d[p] = r; d[p + 1] = g; d[p + 2] = b;
  }
  ctx.putImageData(img, 0, 0);
}

// a cheap screen bloom: bright pass blurred at 1/4 size, composited with "screen" (an additive
// pass clipped bright skies to mint green; screen never exceeds white and keeps the hue)
function applyBloom(ctx, w, h) {
  const k = 0.25, thresh = 0.66, gain = 1.5;
  const small = createCanvas(Math.round(w * k), Math.round(h * k));
  const sctx = small.getContext('2d');
  sctx.drawImage(ctx.canvas, 0, 0, small.width, small.height);
  const img = sctx.getImageData(0, 0, small.width, small.height);
  const d = img.data;
  for (let p = 0; p < d.length; p += 4) {
    const lum = (d[p] * 0.2126 + d[p + 1] * 0.7152 + d[p + 2] * 0.0722) / 255;
    const t = Math.max(0, (lum - thresh) / (1 - thresh)) * gain;
    d[p] *= t; d[p + 1] *= t; d[p + 2] *= t; d[p + 3] = 255;
  }
  sctx.putImageData(img, 0, 0);
  ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = GRADE.bloom * 0.9;
  ctx.imageSmoothingEnabled = true; ctx.drawImage(small, 0, 0, w, h); ctx.restore();
}

// ---------------------------------------------------------------- boot
let canvas, ctx, meta;
export async function boot(project, opts = {}) {
  const P = path.resolve(project);
  const scale = +(opts.scale || 1);
  fonts();
  const core = await import(pathToFileURL(path.join(ROOT, 'engine', 'core.js')).href);
  E = core.E; V = core.V; getShot = core.getShot; setStyle = core.setStyle; mood = core.mood; S = core.S;

  const cfg = JSON.parse(fs.readFileSync(path.join(P, 'config.json'), 'utf8'));
  const story = JSON.parse(fs.readFileSync(path.join(P, 'story', 'shots.json'), 'utf8'));
  const linesFile = path.join(P, 'build', 'lines.json');
  const lines = fs.existsSync(linesFile) ? JSON.parse(fs.readFileSync(linesFile, 'utf8')) : { words: [] };

  E.fps = cfg.fps || 24;
  E.outW = (cfg.resolution === '1080p' ? 1920 : 1280);
  E.outH = (cfg.aspect === '16:9' ? Math.round(E.outW * 9 / 16) : E.outW);
  E.PX = scale;
  E.styleId = opts.style || cfg.style || 'dusk';
  E.cfg = cfg;
  E.words = lines.words || [];
  E.shots = story.shots || [];
  setStyle(E.styleId);

  canvas = createCanvas(Math.round(E.outW * scale), Math.round(E.outH * scale));
  ctx = canvas.getContext('2d');

  // the engine's blurLayer builds scratch canvases through `document`
  if (!globalThis.document) {
    globalThis.document = { createElement: () => createCanvas(1, 1) };
  }

  // load every scene module (scenes/shots/*.js first so they can use scenes/*.js helpers)
  const dirs = [path.join(P, 'scenes'), path.join(P, 'scenes', 'shots')];
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).sort()) {
      if (!f.endsWith('.js')) continue;
      try {
        await import(pathToFileURL(path.join(dir, f)).href + `?v=${Date.now()}`);
      } catch (err) {
        console.error(`IMPORT ERROR ${f}`, err.message);
      }
    }
  }

  meta = {
    project: P, cfg, story, dur: story.duration || (E.shots.at(-1)?.end ?? 0),
    shotList: E.shots, fps: E.fps,
  };
  return meta;
}

export function prepareGrade() { /* grade is applied per frame in png()/jpeg() */ }

// ---------------------------------------------------------------- frame painting
function paint(frame) {
  const { fps, shotList } = meta;
  const t = frame / fps;
  // the shot that owns this instant
  let shot = shotList[0];
  for (const s of shotList) if (t >= s.start && t < s.end) { shot = s; break; }
  const local = Math.max(0, Math.min(t - shot.start, shot.end - shot.start - 1e-6));
  const info = {
    dur: shot.end - shot.start, globalT: t, p: local / Math.max(1e-6, shot.end - shot.start),
    shot, id: shot.id, ...(shot.params || {}),
  };
  const g = ctx;
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.clearRect(0, 0, canvas.width, canvas.height);
  g.save();
  g.scale(canvas.width / E.W, canvas.height / E.H);
  const def = getShot(shot.id);
  if (!def) {
    g.fillStyle = '#0e1118'; g.fillRect(0, 0, E.W, E.H);
  } else {
    try { def.draw(g, local, info); }
    catch (err) { console.error(`DRAW ERROR ${shot.id} @${t.toFixed(2)}`, err.message); }
  }
  g.restore();
  if (!process.env.MP_RAW && !process.env.MP_NOBLOOM) applyBloom(g, canvas.width, canvas.height);
  if (!process.env.MP_RAW && !process.env.MP_NOGRADE) applyGrade(g, canvas.width, canvas.height);
  return canvas;
}

export function png(frame) { return paint(frame).toBuffer('image/png'); }
export function jpeg(frame, quality = 92) { return paint(frame).toBuffer('image/jpeg', quality); }
export { GRADE };
