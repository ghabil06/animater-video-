// scenes/sets/bedroom.js — Nighttime insomnia bedroom
import { E, V, mood, layer, rr, seg, circle, glow, linGrad, alpha } from '../../studio/engine/core.js';
import * as FX from '../../studio/engine/fx2d.js';

export function bedroom(g, t, cam = { z: 1, x: 0, y: 0 }) {
  const M = mood('midnight');
  const GY = E.H * V(0.80, 0.72);

  // Deep midnight room background
  layer(g, cam, 0.2, (g) => {
    // Wall gradient: deep blue-navy tone
    const wallGrad = linGrad(g, 0, 0, 0, GY, [
      [0, '#060912'],
      [0.6, '#0d1424'],
      [1, '#131e33']
    ]);
    g.fillStyle = wallGrad;
    g.fillRect(-E.W * 0.5, -E.H * 0.5, E.W * 2, E.H * 2);

    // Subtle wall molding / panel lines
    g.strokeStyle = 'rgba(30, 48, 80, 0.2)';
    g.lineWidth = 1.5;
    g.strokeRect(E.W * 0.55, GY - 460, 260, 320);
    g.strokeRect(E.W * 0.55 + 15, GY - 445, 230, 290);

    // Large bedroom window with night sky outside
    const winX = E.W * 0.10, winY = GY - 500, winW = 380, winH = 450;
    const nightSky = linGrad(g, winX, winY, winX, winY + winH, [
      [0, '#070c18'],
      [0.7, '#15223c'],
      [1, '#243b66']
    ]);
    g.fillStyle = nightSky;
    rr(g, winX, winY, winW, winH, 6, true);

    // Distant soft moon and night clouds through window
    circle(g, winX + 90, winY + 95, 26, '#e2e8f0');
    glow(g, winX + 90, winY + 95, 70, '#94a3b8', 0.4);

    // Stars outside
    for (let s = 0; s < 12; s++) {
      const sx = winX + 25 + (s * 31) % (winW - 50);
      const sy = winY + 20 + (s * 23) % (winH * 0.5);
      circle(g, sx, sy, 1.2, 'rgba(255, 255, 255, 0.7)');
    }

    // Window frame border
    g.strokeStyle = '#1a2336';
    g.lineWidth = 10;
    g.strokeRect(winX, winY, winW, winH);

    // Venetian blinds across window
    g.fillStyle = 'rgba(7, 10, 18, 0.88)';
    for (let y = winY + 14; y < winY + winH; y += 22) {
      g.fillRect(winX + 2, y, winW - 4, 10);
    }

    // Moonlight slanting beam onto back wall, bed and floor
    g.save();
    const moonGrad = linGrad(g, winX, winY, winX + 600, GY + 100, [
      [0, 'rgba(147, 197, 253, 0.16)'],
      [0.5, 'rgba(147, 197, 253, 0.08)'],
      [1, 'rgba(147, 197, 253, 0.0)']
    ]);
    g.fillStyle = moonGrad;
    g.beginPath();
    g.moveTo(winX + winW, winY + 60);
    g.lineTo(winX + winW + 540, GY + 80);
    g.lineTo(winX + 80, GY + 80);
    g.lineTo(winX, winY + winH);
    g.closePath();
    g.fill();

    // Floating illuminated dust motes in moonlight beam
    for (let d = 0; d < 18; d++) {
      const dx = winX + 100 + ((d * 47 + t * 8) % 450);
      const dy = winY + 120 + ((d * 33 + Math.sin(t * 1.2 + d) * 20) % 320);
      circle(g, dx, dy, 1.4, 'rgba(219, 234, 254, 0.45)');
    }
    g.restore();
  });

  // Bedroom floor, floorboards and baseboard trim
  layer(g, cam, 0.6, (g) => {
    const floorGrad = linGrad(g, 0, GY, 0, E.H, [
      [0, '#0e1422'],
      [1, '#080c14']
    ]);
    g.fillStyle = floorGrad;
    g.fillRect(-E.W, GY, E.W * 3, E.H);

    // Floorboard lines
    g.strokeStyle = 'rgba(25, 37, 60, 0.35)';
    g.lineWidth = 1;
    for (let f = GY + 40; f < E.H; f += 45) {
      g.beginPath();
      g.moveTo(-E.W, f);
      g.lineTo(E.W * 2, f);
      g.stroke();
    }

    // Baseboard trim
    g.fillStyle = '#172238';
    g.fillRect(-E.W, GY - 16, E.W * 3, 16);
    g.fillStyle = '#223252';
    g.fillRect(-E.W, GY - 16, E.W * 3, 2);
  });

  return { GY, M };
}

// Bed geometry (low modern platform, pillows, blanket)
export function bed(g, x, GY, s = 1.3) {
  const bedW = 400 * s, bedH = 85 * s;
  // Frame shadow on floor
  g.fillStyle = 'rgba(0, 0, 0, 0.45)';
  rr(g, x - bedW * 0.5 - 10, GY - 6, bedW + 20, 16, 6, true);
  // Frame
  g.fillStyle = '#111724';
  rr(g, x - bedW * 0.5, GY - bedH * 0.42, bedW, bedH * 0.42, 5, true);
  // Mattress
  g.fillStyle = '#1b2336';
  rr(g, x - bedW * 0.48, GY - bedH * 0.92, bedW * 0.96, bedH * 0.56, 8, true);
  // Mattress top edge highlight
  g.fillStyle = 'rgba(56, 189, 248, 0.12)';
  rr(g, x - bedW * 0.48, GY - bedH * 0.92, bedW * 0.96, 4, 2, true);
  // Pillow at head (left side)
  g.fillStyle = '#26344d';
  rr(g, x - bedW * 0.45, GY - bedH * 1.18, 95 * s, 34 * s, 10, true);
  // Blanket with soft fold contour
  g.fillStyle = '#1e2b40';
  rr(g, x - bedW * 0.15, GY - bedH * 1.02, bedW * 0.63, bedH * 0.68, 8, true);
  g.fillStyle = '#2a3b56';
  rr(g, x - bedW * 0.15, GY - bedH * 1.02, 28 * s, bedH * 0.68, 6, true);
  return { headX: x - bedW * 0.35, headY: GY - bedH * 1.0 };
}

// Nightstand with glowing digital clock
export function nightstand(g, x, GY, timeStr = '02:14') {
  // Table
  g.fillStyle = '#131928';
  rr(g, x - 45, GY - 95, 90, 95, 5, true);
  // Tabletop highlight
  g.fillStyle = '#1e293f';
  rr(g, x - 48, GY - 98, 96, 6, 2, true);
  // Digital clock body
  g.fillStyle = '#080b12';
  rr(g, x - 28, GY - 128, 56, 28, 4, true);
  // Clock stand
  g.fillStyle = '#1c2538';
  g.fillRect(x - 12, GY - 100, 24, 4);
  // Glowing time display
  g.font = 'bold 13px monospace';
  g.fillStyle = '#38bdf8';
  g.textAlign = 'center';
  g.fillText(timeStr, x, GY - 109);
  glow(g, x, GY - 114, 22, '#38bdf8', 0.45);
}
