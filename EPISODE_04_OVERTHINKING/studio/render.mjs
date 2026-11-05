// studio/render.mjs — deterministic frame renderer (native canvas -> ffmpeg), parallel workers.
//   node render.mjs --project ..                                  full video -> build/video_silent.mp4
//   node render.mjs --project .. --from 30 --to 45 --scale 0.5    preview a range -> build/preview.mp4
//   node render.mjs --project .. --sheet                          one still per shot -> build/sheets/*.png
//   node render.mjs --project .. --stills 3.5,12,40               stills -> build/stills/
//   node render.mjs --project .. --sheet --shots s001,s002        partial contact sheet
// Options: --workers N --scale K --crf C --preset P --out FILE --format jpeg|png
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
process.env.MP_STUDIO = ROOT;
const args = {};
{ const a = process.argv.slice(2); for (let i = 0; i < a.length; i++) if (a[i].startsWith('--')) { const k = a[i].slice(2); const v = a[i + 1] && !a[i + 1].startsWith('--') ? a[++i] : true; args[k] = v; } }
if (!args.project) { console.error('usage: node render.mjs --project <dir> [options]'); process.exit(1); }
const PROJECT = path.resolve(ROOT, args.project);
const BUILD = path.join(PROJECT, 'build');
fs.mkdirSync(BUILD, { recursive: true });
const FF = path.join(ROOT, 'bin', 'ffmpeg');
const FONT_DIR = path.join(ROOT, 'assets', 'fonts');
const fmtT = s => `${Math.floor(s / 60)}m${String(Math.round(s % 60)).padStart(2, '0')}s`;
const sh = (cmd, a, opts = {}) => spawn(cmd, a, { stdio: 'inherit', ...opts });

// ---------------------------------------------------------------- worker mode
if (args.worker) {
  const { boot, png, jpeg } = await import('./player.mjs');
  const meta = await boot(PROJECT, { scale: args.scale, style: args.style });
  const E = (await import('./engine/core.js')).E;   // live engine state, filled by boot()
  const [a, b] = args.range.split(',').map(Number);
  const fmt = args.format === 'png' ? png : jpeg;
  const ff = spawn(FF, ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(E.fps), '-i', '-',
    '-c:v', 'libx264', '-preset', args.preset || 'veryfast', '-crf', String(args.crf || 18),
    '-pix_fmt', 'yuv420p', '-r', String(E.fps), args.out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  for (let f = a; f < b; f++) {
    const buf = fmt(f, 95);
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if ((f - a) % 60 === 0) process.stderr.write(`\r  worker ${a}-${b}: ${f - a}/${b - a} (${((f - a) / ((Date.now() - t0) / 1000)).toFixed(2)} fps)`);
  }
  ff.stdin.end();
  await new Promise((res, rej) => ff.on('close', c => (c ? rej(new Error('ffmpeg failed')) : res())));
  process.exit(0);
}

// ---------------------------------------------------------------- main renderer
const { boot, jpeg, png: pngBuf } = await import('./player.mjs');
const meta = await boot(PROJECT, { scale: args.scale, style: args.style });
const { getShot, E } = await import('./engine/core.js');   // live engine state, filled by boot()
const missing = meta.shotList.filter(s => !getShot(s.id));
if (missing.length) console.log(`WARNING: ${missing.length} shot(s) with no scene file: ${missing.slice(0, 20).map(s => s.id).join(', ')}`);
const FPS = E.fps;
const total = Math.round(meta.dur * FPS);
console.log(`project ${path.basename(PROJECT)} · ${meta.dur.toFixed(2)}s · ${total} frames · ${E.outW * (args.scale || 1) | 0}x${E.outH * (args.scale || 1) | 0} · ${meta.shotList.length} shots · style ${E.styleId}`);

// ---------------------------------------------------------------- helpers
async function sheet(shots, file, cols = 3, scale = +args.scale || 0.5) {
  const { createCanvas, loadImage, GlobalFonts } = await import('@napi-rs/canvas');
  const W = Math.round(E.outW * scale), H = Math.round(E.outH * scale);
  const tw = Math.round(W / 2), th = Math.round(H / 2);
  const rows = Math.ceil(shots.length / cols);
  const pad = 6, lab = 20;
  const c = createCanvas(cols * (tw + pad) + pad, rows * (th + lab + pad) + lab);
  const g = c.getContext('2d');
  g.fillStyle = '#111'; g.fillRect(0, 0, c.width, c.height);
  GlobalFonts.registerFromPath(path.join(FONT_DIR, 'Nunito-Black.ttf'), 'SansUI');
  g.font = '13px "SansUI"'; g.textBaseline = 'top';
  for (let i = 0; i < shots.length; i++) {
    const [id, t] = shots[i];
    const f = Math.max(0, Math.min(total - 1, Math.round(t * FPS)));
    const buf = jpeg(f, 90);
    const img = await loadImage(buf);
    const x = pad + (i % cols) * (tw + pad), y = pad + Math.floor(i / cols) * (th + lab + pad);
    g.drawImage(img, x, y, tw, th);
    g.fillStyle = '#9be9a8'; g.fillText(`${id}  ${t.toFixed(2)}s`, x + 3, y + th + 3);
  }
  fs.writeFileSync(file, c.toBuffer('image/png'));
  console.log('wrote', file);
}

// ---------------------------------------------------------------- modes
if (args.sheet) {
  const dir = path.join(BUILD, 'sheets'); fs.mkdirSync(dir, { recursive: true });
  let list = meta.shotList.map(s => [s.id, +(s.start + (s.end - s.start) * 0.45).toFixed(2)]);
  if (args.shots) { const want = String(args.shots).split(','); list = list.filter(([id]) => want.includes(id)); }
  const per = +(args.per || 12);
  for (let k = 0; k < Math.max(1, Math.ceil(list.length / per)); k++) {
    const part = list.slice(k * per, (k + 1) * per);
    if (!part.length) continue;
    await sheet(part, path.join(dir, `sheet_${String(k + 1).padStart(2, '0')}.png`), 3, +(args.scale || 0.5));
  }
  process.exit(0);
}
if (args.stills) {
  const dir = path.join(BUILD, 'stills'); fs.mkdirSync(dir, { recursive: true });
  for (const s of String(args.stills).split(',').map(Number)) {
    const f = Math.max(0, Math.min(total - 1, Math.round(s * FPS)));
    fs.writeFileSync(path.join(dir, `still_${s.toFixed(2)}.png`), pngBuf(f));
  }
  console.log('stills ->', dir); process.exit(0);
}

// full / partial video render
const f0 = Math.max(0, Math.round((+args.from || 0) * FPS));
const f1 = Math.min(total, args.to ? Math.round(+args.to * FPS) : total);
const W = Math.max(1, Math.min(+(args.workers || Math.max(1, os.cpus().length - 1)), Math.ceil((f1 - f0) / 48)));
// scratch dir per output file, so two concurrent renders never wipe each other's parts
const tag = path.basename(path.resolve(args.out || (args.from || args.to ? 'preview.mp4' : 'video_silent.mp4'))).replace(/\.[^.]+$/, '');
const parts = path.join(BUILD, `parts-${tag}`);
fs.rmSync(parts, { recursive: true, force: true }); fs.mkdirSync(parts, { recursive: true });
const chunk = Math.ceil((f1 - f0) / W);
const t0 = Date.now();
console.log(`Rendering frames ${f0}-${f1} (${((f1 - f0) / FPS).toFixed(1)} s) with ${W} worker(s)…`);
const outs = [];
for (let k = 0; k < W; k++) {
  const a = f0 + k * chunk, b = Math.min(f1, a + chunk);
  if (a >= b) continue;
  const out = path.join(parts, `part_${String(k).padStart(3, '0')}.mp4`);
  await new Promise((res, rej) => {
    const p = spawn(process.execPath, [fileURLToPath(import.meta.url), '--project', PROJECT, '--worker',
      '--range', `${a},${b}`, '--out', out,
      ...(args.scale ? ['--scale', args.scale] : []), ...(args.style ? ['--style', args.style] : []),
      ...(args.format ? ['--format', args.format] : []), ...(args.crf ? ['--crf', args.crf] : []),
      ...(args.preset ? ['--preset', args.preset] : [])],
      { stdio: 'inherit', env: { ...process.env, MP_STUDIO: ROOT, MP_PROJECT: PROJECT } });
    p.on('close', c => (c === 0 ? res() : rej(new Error('worker failed'))));
  });
  outs.push(out);
  const el = (Date.now() - t0) / 1000, done = Math.min(f1 - f0, (k + 1) * chunk);
  console.log(`  ${done}/${f1 - f0} frames  ${(done / el).toFixed(2)} fps  elapsed ${fmtT(el)}  eta ${fmtT(el / done * (f1 - f0 - done))}`);
}
const list = path.join(parts, 'list.txt');
fs.writeFileSync(list, outs.map(p => `file '${p.replace(/'/g, "'\\''")}'`).join('\n'));
const outFile = path.resolve(args.out || path.join(BUILD, args.from || args.to ? 'preview.mp4' : 'video_silent.mp4'));
await new Promise((res, rej) => sh(FF, ['-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', '-movflags', '+faststart', outFile]).on('close', c => (c ? rej(new Error('concat failed')) : res())));
console.log(`\nDone: ${outFile}  (${fmtT((Date.now() - t0) / 1000)})`);
