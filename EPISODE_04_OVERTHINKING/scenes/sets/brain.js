// scenes/sets/brain.js — Neuroscience diagram set & Default Mode Network
import { E, V, mood, layer, rr, seg, circle, glow, text, FONTS } from '../../studio/engine/core.js';
import * as UI from '../../studio/engine/ui2d.js';

export function brainSpace(g, t, cam = { z: 1, x: 0, y: 0 }) {
  const M = mood('dusk');
  const GY = E.H * V(0.80, 0.72);

  layer(g, cam, 0.2, (g) => {
    // Blueprint style dark navy background
    g.fillStyle = '#080e1a';
    g.fillRect(-E.W * 0.5, -E.H * 0.5, E.W * 2, E.H * 2);

    // Blueprint grid
    g.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    g.lineWidth = 1;
    for (let x = 0; x < E.W; x += 60) {
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, E.H); g.stroke();
    }
    for (let y = 0; y < E.H; y += 60) {
      g.beginPath(); g.moveTo(0, y); g.lineTo(E.W, y); g.stroke();
    }
  });

  return { GY, M };
}

// Stylized profile cross-section of the head and brain network
export function drawBrainNetwork(g, cx, cy, s = 1.2, t = 0, options = {}) {
  const { pulseDMN = true, labelNodes = true } = options;

  g.save();
  g.translate(cx, cy);
  g.scale(s, s);

  // Outer head silhouette outline
  g.strokeStyle = 'rgba(148, 163, 184, 0.35)';
  g.lineWidth = 3;
  g.beginPath();
  // Nose, chin, neck, skull curve
  g.moveTo(140, 40);
  g.bezierCurveTo(160, 40, 160, 90, 140, 90);   // nose
  g.lineTo(135, 120);                           // lips
  g.bezierCurveTo(140, 150, 120, 170, 90, 170); // chin
  g.lineTo(50, 200);                            // neck front
  g.lineTo(-70, 200);                           // neck back
  g.bezierCurveTo(-110, 160, -140, 80, -140, -20); // occipital skull
  g.bezierCurveTo(-140, -140, 40, -160, 110, -60); // crown & forehead
  g.closePath();
  g.stroke();

  // Brain lobes outline
  g.strokeStyle = 'rgba(56, 189, 248, 0.4)';
  g.lineWidth = 2.5;
  g.beginPath();
  g.arc(-15, -45, 95, Math.PI * 0.85, Math.PI * 0.15);
  g.bezierCurveTo(90, 20, 20, 30, -15, 10);
  g.bezierCurveTo(-50, 20, -90, 20, -15, -45);
  g.stroke();

  // The 3 primary DMN hubs (coordinates relative to brain center)
  const hubs = [
    { name: 'mPFC', x: 65, y: -65, desc: 'Medial Prefrontal Cortex (Self)' },
    { name: 'PCC', x: -45, y: -50, desc: 'Posterior Cingulate (Memory)' },
    { name: 'Angular Gyrus', x: -60, y: -95, desc: 'Parietal Hub' }
  ];

  // Neural pathways (axon tract connections)
  const pulse = Math.sin(t * 3) * 0.5 + 0.5;
  g.strokeStyle = pulseDMN ? `rgba(56, 189, 248, ${0.4 + pulse * 0.4})` : 'rgba(56, 189, 248, 0.2)';
  g.lineWidth = 3;

  // Interconnecting arcs
  g.beginPath();
  g.moveTo(hubs[0].x, hubs[0].y);
  g.quadraticCurveTo(10, -90, hubs[1].x, hubs[1].y);
  g.lineTo(hubs[2].x, hubs[2].y);
  g.quadraticCurveTo(0, -120, hubs[0].x, hubs[0].y);
  g.stroke();

  // Draw hubs
  hubs.forEach((h, i) => {
    const hubPulse = Math.sin(t * 3.5 + i * 2) * 4;
    circle(g, h.x, h.y, 10 + hubPulse * 0.5, '#38bdf8');
    if (pulseDMN) {
      glow(g, h.x, h.y, 28 + hubPulse, '#38bdf8', 0.5);
    }
    if (labelNodes) {
      g.save();
      text(g, h.name, h.x, h.y - 18, { size: 14, color: '#f8fafc', font: FONTS.ui, weight: 900 });
      g.restore();
    }
  });

  g.restore();
}

