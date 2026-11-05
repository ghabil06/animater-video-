// scenes/sets/thought.js — Abstract mental void & thought loop space
import { E, V, mood, layer, rr, seg, circle, linGrad } from '../../studio/engine/core.js';
import * as FX from '../../studio/engine/fx2d.js';

export function thoughtSpace(g, t, cam = { z: 1, x: 0, y: 0 }) {
  const M = mood('midnight');
  const GY = E.H * V(0.80, 0.72);

  layer(g, cam, 0.2, (g) => {
    // Deep gradient void
    const bg = linGrad(g, 0, 0, 0, E.H, [
      [0, '#06080e'],
      [0.6, '#0d1321'],
      [1, '#151f33']
    ]);
    g.fillStyle = bg;
    g.fillRect(-E.W * 0.5, -E.H * 0.5, E.W * 2, E.H * 2);

    // Subtle isometric/perspective floor grid
    g.strokeStyle = 'rgba(70, 95, 140, 0.12)';
    g.lineWidth = 1.5;
    for (let x = -E.W; x < E.W * 2; x += 120) {
      g.beginPath();
      g.moveTo(x, GY);
      g.lineTo(E.W * 0.5 + (x - E.W * 0.5) * 3, E.H * 1.5);
      g.stroke();
    }
    for (let y = GY; y < E.H * 1.2; y += 40) {
      g.beginPath();
      g.moveTo(-E.W, y);
      g.lineTo(E.W * 2, y);
      g.stroke();
    }
  });

  return { GY, M };
}

// Draw a circular thought loop with feedback arrows
export function drawLoopCircle(g, cx, cy, radius, t, activeProgress = 1) {
  g.save();
  // Outer faint glowing track
  g.strokeStyle = 'rgba(56, 189, 248, 0.18)';
  g.lineWidth = 4;
  g.beginPath();
  g.arc(cx, cy, radius, 0, Math.PI * 2);
  g.stroke();

  // Active traveling pulse
  const angle = (t * 1.2) % (Math.PI * 2);
  g.strokeStyle = '#38bdf8';
  g.lineWidth = 6;
  g.beginPath();
  g.arc(cx, cy, radius, angle, angle + Math.PI * 0.6);
  g.stroke();

  // Arrowheads around circle
  for (let a = 0; a < Math.PI * 2; a += Math.PI * 0.5) {
    const rot = a + angle;
    const ax = cx + Math.cos(rot) * radius;
    const ay = cy + Math.sin(rot) * radius;
    circle(g, ax, ay, 6, '#38bdf8');
  }
  g.restore();
}

// Dominoes falling in a chain
export function drawDomino(g, x, y, tilt = 0, color = '#223249', rim = '#60a5fa') {
  g.save();
  g.translate(x, y);
  g.rotate(tilt);
  g.fillStyle = color;
  rr(g, -12, -70, 24, 70, 4, true);
  // Edge rim light
  g.strokeStyle = rim;
  g.lineWidth = 2;
  g.strokeRect(-12, -70, 24, 70);
  g.restore();
}

