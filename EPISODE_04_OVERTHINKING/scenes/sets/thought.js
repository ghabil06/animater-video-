// scenes/sets/thought.js — Abstract mental void & thought loop space
import { E, V, mood, layer, rr, seg, circle, glow, linGrad, alpha } from '../../studio/engine/core.js';
import * as FX from '../../studio/engine/fx2d.js';

export function thoughtSpace(g, t, cam = { z: 1, x: 0, y: 0 }) {
  const M = mood('midnight');
  const GY = E.H * V(0.80, 0.72);

  layer(g, cam, 0.2, (g) => {
    // Rich atmospheric deep space gradient: navy to teal
    const bg = linGrad(g, 0, 0, 0, E.H, [
      [0, '#040711'],
      [0.45, '#081224'],
      [0.72, '#0f2038'],
      [1, '#182f4e']
    ]);
    g.fillStyle = bg;
    g.fillRect(-E.W * 0.5, -E.H * 0.5, E.W * 2, E.H * 2);

    // Soft atmospheric horizon glow
    glow(g, E.W * 0.5, GY - 40, E.W * 0.55, '#1e3a5f', 0.45);

    // Drifting background thought filaments & nodes (associative memory web)
    for (let i = 0; i < 16; i++) {
      const nx = ((i * 127.3 + t * 6) % (E.W * 1.2)) - E.W * 0.1;
      const ny = 120 + ((i * 61.7 + Math.sin(t * 0.5 + i) * 30) % (GY - 180));
      const nr = 2.5 + (i % 3) * 1.2;
      circle(g, nx, ny, nr, 'rgba(56, 189, 248, 0.35)');
      if (i % 2 === 0) {
        glow(g, nx, ny, 16, '#38bdf8', 0.3);
      }
      // Faint connection to neighboring node
      if (i > 0 && i % 3 !== 0) {
        const prevX = (((i - 1) * 127.3 + t * 6) % (E.W * 1.2)) - E.W * 0.1;
        const prevY = 120 + (((i - 1) * 61.7 + Math.sin(t * 0.5 + i - 1) * 30) % (GY - 180));
        g.strokeStyle = 'rgba(56, 189, 248, 0.08)';
        g.lineWidth = 1;
        g.beginPath();
        g.moveTo(prevX, prevY);
        g.lineTo(nx, ny);
        g.stroke();
      }
    }

    // Subtle isometric/perspective floor grid
    g.strokeStyle = 'rgba(56, 189, 248, 0.14)';
    g.lineWidth = 1.5;
    for (let x = -E.W; x < E.W * 2; x += 110) {
      g.beginPath();
      g.moveTo(x, GY);
      g.lineTo(E.W * 0.5 + (x - E.W * 0.5) * 3.2, E.H * 1.5);
      g.stroke();
    }
    for (let y = GY; y < E.H * 1.2; y += 38) {
      const depthAlpha = 0.08 + (y - GY) / (E.H * 0.5) * 0.15;
      g.strokeStyle = `rgba(56, 189, 248, ${depthAlpha})`;
      g.beginPath();
      g.moveTo(-E.W, y);
      g.lineTo(E.W * 2, y);
      g.stroke();
    }

    // Horizon boundary line with soft glow
    g.strokeStyle = 'rgba(56, 189, 248, 0.3)';
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(-E.W, GY);
    g.lineTo(E.W * 2, GY);
    g.stroke();
  });

  return { GY, M };
}

// Draw a circular thought loop with feedback arrows
export function drawLoopCircle(g, cx, cy, radius, t, activeProgress = 1) {
  g.save();
  // Outer faint glowing track
  g.strokeStyle = 'rgba(56, 189, 248, 0.22)';
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
    glow(g, ax, ay, 18, '#38bdf8', 0.5);
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
