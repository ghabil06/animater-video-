// scenes/sets/cafe.js — Sunset café exterior scene
import { E, V, mood, layer, rr, seg, circle, linGrad, alpha, shade } from '../../studio/engine/core.js';
import * as FX from '../../studio/engine/fx2d.js';

export function cafe(g, t, cam = { z: 1, x: 0, y: 0 }) {
  const M = mood('dusk');
  const GY = E.H * V(0.80, 0.72);

  // Background Sky & sunset glow
  layer(g, cam, 0.2, (g) => {
    const sky = linGrad(g, 0, 0, 0, GY, [
      [0, '#1c152a'],
      [0.45, '#3a203f'],
      [0.85, '#a35043'],
      [1.0, '#e89a5c']
    ]);
    g.fillStyle = sky;
    g.fillRect(-E.W * 0.5, -E.H * 0.5, E.W * 2, E.H * 2);
    // Sunset sun disc low on left
    FX.sun(g, E.W * 0.2, GY - 100, 75, '#ffe1a8', '#ffd59a', 3);
  });

  // Distant skyline
  layer(g, cam, 0.35, (g) => {
    FX.skyline(g, GY - 20, { color: '#1a1226', density: 1.2, hMax: 180 });
  });

  // Café facade & building
  layer(g, cam, 0.6, (g) => {
    // Sidewalk ground
    g.fillStyle = '#171220';
    g.fillRect(-E.W, GY - 10, E.W * 3, E.H);
    // Café wall
    g.fillStyle = '#22192e';
    g.fillRect(E.W * 0.35, GY - 420, E.W * 0.75, 420);
    // Warm lit window
    const winGlow = linGrad(g, E.W * 0.42, GY - 350, E.W * 0.42, GY - 80, [
      [0, '#ffe4a0'],
      [1, '#ff9640']
    ]);
    g.fillStyle = winGlow;
    rr(g, E.W * 0.42, GY - 350, 480, 260, 8, true);
    // Window mullions
    g.fillStyle = '#1c1424';
    g.fillRect(E.W * 0.42 + 235, GY - 350, 10, 260);
    g.fillRect(E.W * 0.42, GY - 225, 480, 10);
    // Striped awning above window
    for (let i = 0; i < 16; i++) {
      g.fillStyle = i % 2 === 0 ? '#b03a48' : '#e6d8b8';
      g.fillRect(E.W * 0.40 + i * 32, GY - 380, 32, 40);
    }
  });

  return { GY, M };
}

export function cafeTable(g, x, GY) {
  // Simple café table
  g.fillStyle = '#16121c';
  rr(g, x - 75, GY - 120, 150, 12, 4, true); // table top
  g.fillRect(x - 5, GY - 108, 10, 108);       // leg
  rr(g, x - 45, GY - 8, 90, 8, 3, true);      // base
  return { top: GY - 120 };
}

export function coffeeCup(g, x, y, s = 1) {
  g.fillStyle = '#f0e6d2';
  rr(g, x - 10 * s, y - 20 * s, 20 * s, 20 * s, 3 * s, true);
}
