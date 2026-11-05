// scenes/sets/brain.js — Neuroscience diagram set & Neural Network Dynamics
import { E, V, mood, layer, rr, seg, circle, glow, text, FONTS, alpha } from '../../studio/engine/core.js';
import * as UI from '../../studio/engine/ui2d.js';

export function brainSpace(g, t, cam = { z: 1, x: 0, y: 0 }) {
  const M = mood('dusk');
  const GY = E.H * V(0.80, 0.72);

  layer(g, cam, 0.2, (g) => {
    // Rich navy / deep indigo gradient background
    const grad = g.createRadialGradient(E.W * 0.5, E.H * 0.45, 100, E.W * 0.5, E.H * 0.5, E.W * 0.85);
    grad.addColorStop(0, '#0d1833');
    grad.addColorStop(0.6, '#080e1e');
    grad.addColorStop(1, '#040710');
    g.fillStyle = grad;
    g.fillRect(-E.W * 0.5, -E.H * 0.5, E.W * 2, E.H * 2);

    // Subtle technical coordinate grid
    g.strokeStyle = 'rgba(56, 189, 248, 0.06)';
    g.lineWidth = 1;
    for (let x = 0; x < E.W; x += 60) {
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, E.H); g.stroke();
    }
    for (let y = 0; y < E.H; y += 60) {
      g.beginPath(); g.moveTo(0, y); g.lineTo(E.W, y); g.stroke();
    }

    // Floating synaptic micro-particles
    for (let i = 0; i < 28; i++) {
      const px = ((i * 137.5) % E.W) + Math.sin(t * 0.8 + i) * 20;
      const py = ((i * 89.3 + t * 12) % E.H);
      const pr = 1.5 + (i % 3) * 0.8;
      const op = 0.15 + 0.15 * Math.sin(t * 1.5 + i);
      circle(g, px, py, pr, `rgba(56, 189, 248, ${op})`);
    }

    // Subtle sagittal axis indicators in corners
    g.save();
    g.fillStyle = 'rgba(148, 163, 184, 0.35)';
    g.font = '11px "SansUI"';
    g.fillText('ANTERIOR (ROSTRAL) [FRONT]  ◄', 80, 70);
    g.fillText('►  POSTERIOR (CAUDAL) [BACK]', E.W - 320, 70);
    g.fillText('RESTING-STATE fMRI CORRELATION MAPPING', 80, E.H - 50);
    g.restore();
  });

  return { GY, M };
}

// Stylized profile cross-section of the head and multi-network brain system
export function drawBrainNetwork(g, cx, cy, s = 1.2, t = 0, options = {}) {
  const {
    pulseDMN = true,
    labelNodes = true,
    showDMN = true,
    showSalience = false,
    showControl = false,
    interplay = false,
    showLegend = false
  } = options;

  g.save();
  g.translate(cx, cy);
  g.scale(s, s);

  // Outer head silhouette outline with soft glow
  g.strokeStyle = 'rgba(148, 163, 184, 0.4)';
  g.lineWidth = 3;
  g.beginPath();
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

  // Brain lobes outline (Cerebral Cortex)
  g.strokeStyle = 'rgba(56, 189, 248, 0.55)';
  g.lineWidth = 2.5;
  g.beginPath();
  g.arc(-15, -45, 98, Math.PI * 0.85, Math.PI * 0.15);
  g.bezierCurveTo(90, 20, 20, 30, -15, 10);
  g.bezierCurveTo(-50, 20, -90, 20, -15, -45);
  g.stroke();

  // Internal structural sulci lines (gyri contours)
  g.strokeStyle = 'rgba(56, 189, 248, 0.18)';
  g.lineWidth = 1.5;
  g.beginPath();
  g.moveTo(40, -90);
  g.bezierCurveTo(20, -60, -20, -50, -40, -80);
  g.moveTo(-10, -30);
  g.bezierCurveTo(30, -20, 50, -50, 70, -40);
  g.stroke();

  // 1. DMN Hubs (Cyan #38bdf8)
  const dmnHubs = [
    { name: 'mPFC', x: 65, y: -65, full: 'Medial Prefrontal Cortex (Self/Future)' },
    { name: 'PCC', x: -45, y: -50, full: 'Posterior Cingulate (Memory/Consolidation)' },
    { name: 'Angular Gyrus', x: -60, y: -95, full: 'Angular Gyrus / IPL (Association)' }
  ];

  // 2. Salience / Threat Hubs (Amber/Orange #f59e0b)
  const salienceHubs = [
    { name: 'dACC', x: 25, y: -75, full: 'Dorsal ACC (Conflict/Uncertainty)' },
    { name: 'Insula', x: 10, y: -25, full: 'Anterior Insula (Salience & Sensation)' },
    { name: 'Amygdala', x: 15, y: 0, full: 'Amygdala (Arousal & Threat Alert)' }
  ];

  // 3. Central Executive / Frontoparietal Control Hubs (Lavender/Violet #a78bfa)
  const controlHubs = [
    { name: 'dlPFC', x: 80, y: -100, full: 'Dorsolateral PFC (Executive Control)' },
    { name: 'dPC', x: -20, y: -125, full: 'Posterior Parietal (Attention Steering)' }
  ];

  const pulse = Math.sin(t * 3) * 0.5 + 0.5;

  // DMN tracts
  if (showDMN) {
    g.strokeStyle = pulseDMN ? `rgba(56, 189, 248, ${0.45 + pulse * 0.45})` : 'rgba(56, 189, 248, 0.25)';
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(dmnHubs[0].x, dmnHubs[0].y);
    g.quadraticCurveTo(10, -90, dmnHubs[1].x, dmnHubs[1].y);
    g.lineTo(dmnHubs[2].x, dmnHubs[2].y);
    g.quadraticCurveTo(0, -120, dmnHubs[0].x, dmnHubs[0].y);
    g.stroke();

    dmnHubs.forEach((h, i) => {
      const hubPulse = Math.sin(t * 3.5 + i * 2) * 4;
      circle(g, h.x, h.y, 11 + hubPulse * 0.4, '#38bdf8');
      if (pulseDMN) {
        glow(g, h.x, h.y, 30 + hubPulse, '#38bdf8', 0.6);
      }
      if (labelNodes) {
        // High contrast text label
        const tw = h.name.length * 8 + 14;
        rr(g, h.x - tw / 2, h.y - 32, tw, 20, 6);
        g.fillStyle = 'rgba(8, 14, 26, 0.9)';
        g.fill();
        g.strokeStyle = 'rgba(56, 189, 248, 0.6)';
        g.lineWidth = 1;
        g.stroke();
        text(g, h.name, h.x, h.y - 20, { size: 12, color: '#f8fafc', font: FONTS.ui, weight: 900 });
      }
    });
  }

  // Salience tracts
  if (showSalience || interplay) {
    g.strokeStyle = `rgba(245, 158, 11, ${0.4 + pulse * 0.45})`;
    g.lineWidth = 2.5;
    g.beginPath();
    g.moveTo(salienceHubs[0].x, salienceHubs[0].y);
    g.lineTo(salienceHubs[1].x, salienceHubs[1].y);
    g.lineTo(salienceHubs[2].x, salienceHubs[2].y);
    g.stroke();

    salienceHubs.forEach((h, i) => {
      const sp = Math.sin(t * 4 + i * 1.5) * 3;
      circle(g, h.x, h.y, 9 + sp * 0.4, '#f59e0b');
      glow(g, h.x, h.y, 22 + sp, '#f59e0b', 0.5);
      if (labelNodes) {
        const tw = h.name.length * 8 + 14;
        rr(g, h.x - tw / 2, h.y + 12, tw, 18, 5);
        g.fillStyle = 'rgba(26, 16, 8, 0.9)';
        g.fill();
        g.strokeStyle = 'rgba(245, 158, 11, 0.6)';
        g.lineWidth = 1;
        g.stroke();
        text(g, h.name, h.x, h.y + 22, { size: 11, color: '#fef3c7', font: FONTS.ui, weight: 900 });
      }
    });
  }

  // Control / Executive tracts
  if (showControl || interplay) {
    g.strokeStyle = `rgba(167, 139, 250, ${0.35 + (1 - pulse) * 0.45})`;
    g.lineWidth = 2.5;
    g.beginPath();
    g.moveTo(controlHubs[0].x, controlHubs[0].y);
    g.lineTo(controlHubs[1].x, controlHubs[1].y);
    g.stroke();

    controlHubs.forEach((h, i) => {
      circle(g, h.x, h.y, 9, '#a78bfa');
      glow(g, h.x, h.y, 20, '#a78bfa', 0.45);
      if (labelNodes) {
        const tw = h.name.length * 8 + 14;
        rr(g, h.x - tw / 2, h.y - 32, tw, 18, 5);
        g.fillStyle = 'rgba(20, 14, 34, 0.9)';
        g.fill();
        g.strokeStyle = 'rgba(167, 139, 250, 0.6)';
        g.lineWidth = 1;
        g.stroke();
        text(g, h.name, h.x, h.y - 21, { size: 11, color: '#ede9fe', font: FONTS.ui, weight: 900 });
      }
    });
  }

  // Interplay dynamics: cross-talk between Salience alarm & DMN simulation
  if (interplay) {
    // Interconnecting signaling waves
    const waveT = (t * 2) % 1;
    g.strokeStyle = 'rgba(239, 68, 68, 0.65)';
    g.lineWidth = 2;
    g.setLineDash([4, 4]);
    g.beginPath();
    // Insula -> mPFC
    g.moveTo(salienceHubs[1].x, salienceHubs[1].y);
    g.lineTo(dmnHubs[0].x, dmnHubs[0].y);
    // dACC -> dlPFC
    g.moveTo(salienceHubs[0].x, salienceHubs[0].y);
    g.lineTo(controlHubs[0].x, controlHubs[0].y);
    g.stroke();
    g.setLineDash([]);
  }

  // Network Legend
  if (showLegend) {
    g.save();
    const lx = -130, ly = 135;
    rr(g, lx, ly, 260, 80, 10);
    g.fillStyle = 'rgba(8, 14, 28, 0.88)';
    g.fill();
    g.strokeStyle = 'rgba(148, 163, 184, 0.3)';
    g.lineWidth = 1.5;
    g.stroke();

    circle(g, lx + 16, ly + 20, 6, '#38bdf8');
    text(g, 'DMN (Self/Memory/Future)', lx + 30, ly + 22, { size: 11, color: '#f8fafc', font: FONTS.ui, weight: 900, align: 'left' });

    circle(g, lx + 16, ly + 42, 6, '#f59e0b');
    text(g, 'Salience (Uncertainty/Alert)', lx + 30, ly + 44, { size: 11, color: '#fef3c7', font: FONTS.ui, weight: 900, align: 'left' });

    circle(g, lx + 16, ly + 64, 6, '#a78bfa');
    text(g, 'Central Executive (Control)', lx + 30, ly + 66, { size: 11, color: '#ede9fe', font: FONTS.ui, weight: 900, align: 'left' });
    g.restore();
  }

  g.restore();
}
