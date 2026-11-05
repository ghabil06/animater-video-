// scenes/sets/bedroom.js — Nighttime insomnia bedroom
import { E, V, mood, layer, rr, seg, circle, linGrad, alpha } from '../../studio/engine/core.js';
import * as FX from '../../studio/engine/fx2d.js';

export function bedroom(g, t, cam = { z: 1, x: 0, y: 0 }) {
  const M = mood('midnight');
  const GY = E.H * V(0.80, 0.72);

  // Deep midnight room background
  layer(g, cam, 0.2, (g) => {
    g.fillStyle = '#0a0d14';
    g.fillRect(-E.W * 0.5, -E.H * 0.5, E.W * 2, E.H * 2);

    // Large bedroom window with night sky outside
    const winX = E.W * 0.12, winY = GY - 480, winW = 340, winH = 420;
    const nightSky = linGrad(g, winX, winY, winX, winY + winH, [
      [0, '#090d16'],
      [1, '#1b2438']
    ]);
    g.fillStyle = nightSky;
    rr(g, winX, winY, winW, winH, 4, true);

    // Distant soft moon and clouds through window
    circle(g, winX + 80, winY + 90, 24, '#d9e2ec');

    // Venetian blinds across window
    g.fillStyle = 'rgba(8, 12, 18, 0.85)';
    for (let y = winY + 12; y < winY + winH; y += 18) {
      g.fillRect(winX, y, winW, 8);
    }

    // Moonlight slanting onto back wall and floor
    g.save();
    g.fillStyle = 'rgba(130, 170, 220, 0.08)';
    g.beginPath();
    g.moveTo(winX + winW, winY + 80);
    g.lineTo(winX + winW + 480, GY);
    g.lineTo(winX + 100, GY);
    g.lineTo(winX, winY + winH);
    g.closePath();
    g.fill();
    g.restore();
  });

  // Bedroom floor and baseboard
  layer(g, cam, 0.6, (g) => {
    g.fillStyle = '#0f141f';
    g.fillRect(-E.W, GY, E.W * 3, E.H);
    // Baseboard trim
    g.fillStyle = '#172033';
    g.fillRect(-E.W, GY - 14, E.W * 3, 14);
  });

  return { GY, M };
}

// Bed geometry (low platform, pillows, blanket)
export function bed(g, x, GY, s = 1.3) {
  const bedW = 380 * s, bedH = 80 * s;
  // Frame
  g.fillStyle = '#121824';
  rr(g, x - bedW * 0.5, GY - bedH * 0.4, bedW, bedH * 0.4, 4, true);
  // Mattress
  g.fillStyle = '#1c2436';
  rr(g, x - bedW * 0.48, GY - bedH * 0.9, bedW * 0.96, bedH * 0.55, 8, true);
  // Pillow at head (left side)
  g.fillStyle = '#28364f';
  rr(g, x - bedW * 0.45, GY - bedH * 1.15, 90 * s, 32 * s, 10, true);
  // Blanket
  g.fillStyle = '#1e293b';
  rr(g, x - bedW * 0.15, GY - bedH * 1.0, bedW * 0.62, bedH * 0.65, 6, true);
  return { headX: x - bedW * 0.35, headY: GY - bedH * 1.0 };
}

// Nightstand with glowing digital clock
export function nightstand(g, x, GY, timeStr = '02:14') {
  // Table
  g.fillStyle = '#131926';
  rr(g, x - 40, GY - 90, 80, 90, 4, true);
  // Digital clock body
  g.fillStyle = '#090c12';
  rr(g, x - 25, GY - 118, 50, 26, 3, true);
  // Soft glowing numbers
  g.font = 'bold 12px monospace';
  g.fillStyle = '#38bdf8';
  g.textAlign = 'center';
  g.fillText(timeStr, x, GY - 101);
}

