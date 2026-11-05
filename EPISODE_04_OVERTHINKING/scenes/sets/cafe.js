// scenes/sets/cafe.js — Sunset café exterior scene
import { E, V, mood, layer, rr, seg, circle, glow, linGrad, alpha, shade } from '../../studio/engine/core.js';
import * as FX from '../../studio/engine/fx2d.js';

export function cafe(g, t, cam = { z: 1, x: 0, y: 0 }) {
  const M = mood('dusk');
  const GY = E.H * V(0.80, 0.72);

  // Background Sky & sunset glow
  layer(g, cam, 0.2, (g) => {
    const sky = linGrad(g, 0, 0, 0, GY, [
      [0, '#191226'],
      [0.42, '#351c3d'],
      [0.82, '#9e463d'],
      [1.0, '#e07a5f']
    ]);
    g.fillStyle = sky;
    g.fillRect(-E.W * 0.5, -E.H * 0.5, E.W * 2, E.H * 2);
    // Sunset sun disc low on left with rich atmospheric glow
    FX.sun(g, E.W * 0.22, GY - 110, 85, '#ffe3a8', '#ffd188', 3);
  });

  // Distant skyline silhouettes
  layer(g, cam, 0.35, (g) => {
    FX.skyline(g, GY - 20, { color: '#160e22', density: 1.25, hMax: 190 });
  });

  // Café facade, illuminated window & sidewalk
  layer(g, cam, 0.6, (g) => {
    // Cobblestone sidewalk ground
    g.fillStyle = '#16101f';
    g.fillRect(-E.W, GY - 10, E.W * 3, E.H);

    // Subtle cobblestone paving lines
    g.strokeStyle = 'rgba(230, 200, 180, 0.06)';
    g.lineWidth = 1;
    for (let py = GY + 15; py < E.H; py += 35) {
      g.beginPath();
      g.moveTo(-E.W, py);
      g.lineTo(E.W * 2, py);
      g.stroke();
    }

    // Café building wall
    g.fillStyle = '#23182e';
    g.fillRect(E.W * 0.38, GY - 460, E.W * 0.75, 460);

    // Warm interior window glow
    const winGlow = linGrad(g, E.W * 0.44, GY - 380, E.W * 0.44, GY - 90, [
      [0, '#ffe8a8'],
      [1, '#ff9640']
    ]);
    g.fillStyle = winGlow;
    rr(g, E.W * 0.44, GY - 380, 480, 280, 8, true);
    glow(g, E.W * 0.44 + 240, GY - 240, 200, '#ff9640', 0.25);

    // Window mullions / frame
    g.fillStyle = '#181020';
    g.fillRect(E.W * 0.44 + 235, GY - 380, 10, 280);
    g.fillRect(E.W * 0.44, GY - 240, 480, 10);
    g.strokeStyle = '#181020';
    g.lineWidth = 10;
    g.strokeRect(E.W * 0.44, GY - 380, 480, 280);

    // Striped awning above window
    for (let i = 0; i < 16; i++) {
      g.fillStyle = i % 2 === 0 ? '#b03a48' : '#e6d8b8';
      g.fillRect(E.W * 0.42 + i * 32, GY - 415, 32, 42);
    }
    // Awning shadow
    g.fillStyle = 'rgba(10, 5, 15, 0.4)';
    g.fillRect(E.W * 0.42, GY - 373, 512, 10);

    // Overhead festive string lights across café patio
    g.strokeStyle = 'rgba(40, 25, 50, 0.7)';
    g.lineWidth = 1.5;
    g.beginPath();
    g.moveTo(E.W * 0.05, GY - 340);
    g.quadraticCurveTo(E.W * 0.25, GY - 290, E.W * 0.44, GY - 330);
    g.stroke();

    for (let b = 1; b <= 7; b++) {
      const u = b / 8;
      const bx = (1 - u) * (1 - u) * (E.W * 0.05) + 2 * (1 - u) * u * (E.W * 0.25) + u * u * (E.W * 0.44);
      const by = (1 - u) * (1 - u) * (GY - 340) + 2 * (1 - u) * u * (GY - 290) + u * u * (GY - 330);
      circle(g, bx, by + 3, 5, '#fde68a');
      glow(g, bx, by + 3, 14, '#f59e0b', 0.5);
    }
  });

  return { GY, M };
}

export function cafeTable(g, x, GY) {
  // Café table
  g.fillStyle = '#16121c';
  rr(g, x - 80, GY - 124, 160, 14, 4, true); // table top
  // Table top highlight
  g.fillStyle = '#2c2035';
  rr(g, x - 80, GY - 124, 160, 3, 1, true);
  g.fillStyle = '#140f1a';
  g.fillRect(x - 6, GY - 110, 12, 110);      // central post
  rr(g, x - 50, GY - 10, 100, 10, 4, true);  // base feet
  return { top: GY - 124 };
}

export function coffeeCup(g, x, y, s = 1) {
  // Cup body
  g.fillStyle = '#f0e6d2';
  rr(g, x - 11 * s, y - 22 * s, 22 * s, 22 * s, 4 * s, true);
  // Saucer
  g.fillStyle = '#d4c5a9';
  rr(g, x - 16 * s, y - 2 * s, 32 * s, 4 * s, 2 * s, true);
  // Steam wisps
  g.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  g.lineWidth = 1.5;
  g.beginPath();
  g.moveTo(x - 3 * s, y - 25 * s);
  g.quadraticCurveTo(x - 7 * s, y - 35 * s, x - 2 * s, y - 45 * s);
  g.moveTo(x + 4 * s, y - 25 * s);
  g.quadraticCurveTo(x + 8 * s, y - 35 * s, x + 3 * s, y - 45 * s);
  g.stroke();
}
