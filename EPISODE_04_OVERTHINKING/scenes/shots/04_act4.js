// scenes/shots/04_act4.js — ACT 4: "The Hidden Cost" (Shots s066 - s078)
import {
  E, V, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp,
  seg, circle, ring, rr, glow, alpha, shade, linGrad, text, FONTS
} from '../../studio/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, bigFace } from '../../studio/engine/rig2d.js';
import * as FX from '../../studio/engine/fx2d.js';
import * as UI from '../../studio/engine/ui2d.js';
import { bedroom, bed, nightstand } from '../sets/bedroom.js';
import { thoughtSpace } from '../sets/thought.js';
import { ALEX, SAM } from '../cast.js';

// s066 — "None of this is a disorder by itself."
registerShot('s066', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05 + 0.04 * (t / info.dur), x: 0 });
    for (let i = -3; i <= 3; i++) {
      drawFigure(g, {
        x: E.W * 0.5 + i * 150, y: E.H * 0.72, s: i === 0 ? 1.65 : 1.35, facing: 1,
        outfit: i === 0 ? ALEX : { top: 'tshirt', color: '#334155' },
        pose: breathe(POSES.stand, t, 0.8, i), expr: 'neutral',
        rim: { color: i === 0 ? '#38bdf8' : '#64748b', dir: [0, -1], w: i === 0 ? 4.5 : 3 }
      });
    }
    UI.badge(g, { text: 'COMMON HUMAN EXPERIENCE', x: E.W * 0.5, y: E.H * 0.28, color: '#38bdf8' });
  }
});

// s067 — "Rumination is something every human brain does."
registerShot('s067', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.08, x: 0 });
    UI.bigLine(g, t, { line: 'EVERY HUMAN BRAIN', sub: 'A UNIVERSAL COGNITIVE HABIT', y: E.H * 0.45, dur: info.dur });
  }
});

// s068 — "It is not a diagnosis."
registerShot('s068', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    g.save();
    rr(g, E.W * 0.5 - 240, E.H * 0.38, 480, 95, 16);
    g.fillStyle = 'rgba(11, 19, 43, 0.88)';
    g.fill();
    g.strokeStyle = 'rgba(148, 163, 184, 0.5)';
    g.lineWidth = 2.5;
    g.stroke();
    text(g, 'NOT A DIAGNOSIS', E.W * 0.5, E.H * 0.46, { size: 34, color: '#f8fafc', font: FONTS.ui, weight: 900 });
    g.restore();
  }
});

// s069 — "But it has a cost."
registerShot('s069', {
  bars: 'scope',
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.12, x: 0 });
    veil(g, '#05070c', 0.65);
    UI.bigLine(g, t, { line: 'THE HIDDEN COST', sub: 'WHERE ATTENTION SLOWLY LEAKS', y: E.H * 0.48, dur: info.dur });
  }
});

// s070 — "Sleep is often the first thing to go."
registerShot('s070', {
  bars: 'scope',
  draw(g, t, info) {
    const { GY } = bedroom(g, t, { z: 1.25, x: 0 });
    const bedX = E.W * 0.55;
    layer(g, { z: 1.25, x: 0 }, 1, (g) => {
      bed(g, bedX, GY, 1.5);
      nightstand(g, bedX - 290, GY, '04:18');
      drawFigure(g, {
        x: bedX - 100, y: GY - 30, s: 1.6, facing: 1, outfit: ALEX,
        pose: breathe(POSES.lie, t, 0.7), expr: 'sleepy',
        rim: { color: '#ef4444', dir: [-0.5, -1], w: 4 }
      });
    });
    UI.readout(g, { label: 'SLEEP DEBT:', value: 'CRITICAL (04:18 AM)', x: V(140, 90), y: E.H - V(160, 520), color: '#ef4444' });
  }
});

// s071 — Surreal Boardroom Bed: "The bed becomes a meeting room, and the meeting has no agenda."
registerShot('s071', {
  bars: 'scope',
  draw(g, t, info) {
    const cam = { z: 1.05 + 0.05 * (t / info.dur), x: 0 };
    const { GY } = bedroom(g, t, cam);

    // Long conference table extending from bed
    g.fillStyle = '#111827';
    rr(g, E.W * 0.18, GY - 105, E.W * 0.74, 26, 6, true);
    for (let leg = E.W * 0.22; leg < E.W * 0.88; leg += 170) {
      g.fillRect(leg, GY - 79, 14, 79);
    }

    // Overhead fluorescent spotlight cones
    for (let c = 0; c < 3; c++) {
      const cx = E.W * (0.35 + c * 0.2);
      g.save();
      g.fillStyle = 'rgba(255, 255, 255, 0.07)';
      g.beginPath();
      g.moveTo(cx, E.H * 0.08);
      g.lineTo(cx + 100, GY - 105);
      g.lineTo(cx - 100, GY - 105);
      g.closePath();
      g.fill();
      g.restore();
    }

    // Shadow figures sitting around table arguing
    for (let s = 0; s < 4; s++) {
      const sx = E.W * (0.32 + s * 0.16);
      drawFigure(g, {
        x: sx, y: GY - 20, s: 1.35, facing: s % 2 === 0 ? 1 : -1,
        outfit: { top: 'suit', color: '#1f2937' },
        pose: breathe(POSES.sit, t, 0.8, s), expr: 'angry',
        rim: { color: '#ef4444', dir: [0, -1], w: 3 }
      });
    }

    // Alex at head of bed sitting upright, overwhelmed
    drawFigure(g, {
      x: E.W * 0.16, y: GY - 20, s: 1.65, facing: 1, outfit: ALEX,
      pose: breathe(POSES.sit, t), expr: 'worried',
      rim: { color: '#38bdf8', dir: [1, -0.2], w: 4.5 }
    });

    UI.badge(g, { text: 'INTERNAL COMMITTEE: NO AGENDA', x: E.W * 0.5, y: E.H * 0.22, color: '#ef4444' });
  }
});

// s072 — "Concentration slips, because part of your attention is always somewhere else."
registerShot('s072', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    UI.compareBars(g, t, {
      title: 'ATTENTION ALLOCATION UNDER RUMINATION',
      rows: [
        { label: 'PRESENT MOMENT TASK', v: 0.42, color: '#38bdf8' },
        { label: 'BACKGROUND LOOP REHEARSAL', v: 0.58, color: '#f59e0b' }
      ]
    });
  }
});

// s073 — "Conversations get harder, because you are partly listening, and partly reviewing."
registerShot('s073', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.12, x: 0 });
    drawFigure(g, {
      x: E.W * 0.35, y: E.H * 0.72, s: 1.65, facing: 1, outfit: ALEX,
      pose: breathe(POSES.think, t), expr: 'thinking',
      rim: { color: '#38bdf8', dir: [1, 0], w: 4.5 }
    });
    drawFigure(g, {
      x: E.W * 0.65, y: E.H * 0.72, s: 1.65, facing: -1, outfit: SAM,
      pose: breathe(POSES.talk, t), expr: 'smile',
      rim: { color: '#f59e0b', dir: [-1, 0], w: 4.5 }
    });

    UI.callout(g, t, { text: 'INTERNAL REPLAY RUNNING IN BACKGROUND', at: [E.W * 0.35, E.H * 0.55], to: [E.W * 0.35 - 120, E.H * 0.42], color: '#38bdf8' });
  }
});

// s074 — "And decisions slow down,"
registerShot('s074', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    const angle = t * 2.2;
    g.save();
    g.translate(E.W * 0.5, E.H * 0.44);
    g.rotate(angle);
    g.strokeStyle = '#f59e0b';
    g.lineWidth = 7;
    g.beginPath();
    g.arc(0, 0, 70, 0, Math.PI * 1.4);
    g.stroke();
    glow(g, 0, 0, 80, '#f59e0b', 0.4);
    g.restore();

    UI.readout(g, { label: 'DECISION PROCESSING SPEED:', value: 'LATENCY ELEVATED', x: E.W * 0.5 - 150, y: E.H * 0.68, color: '#f59e0b' });
  }
});

// s075 — "because every option arrives with a rehearsal of everything that could go wrong."
registerShot('s075', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.08, x: 0 });
    const count = 5;
    for (let i = 0; i < count; i++) {
      const x = E.W * 0.22 + (i / (count - 1)) * E.W * 0.56;
      const y = E.H * (0.34 + (i % 2) * 0.16);
      circle(g, x, y, 26, '#ef4444');
      glow(g, x, y, 48, '#ef4444', 0.45);
      text(g, '!', x, y + 4, { size: 28, color: '#ffffff', font: FONTS.ui, weight: 900 });
      text(g, `Worst Case #${i + 1}`, x, y + 42, { size: 15, color: '#fca5a5', font: FONTS.ui, weight: 700 });
    }
  }
});

// s076 — "The cost is not dramatic. It is quiet."
registerShot('s076', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.12, x: 0 });
    veil(g, '#070a12', 0.5);
    FX.dust(g, t, { count: 35, color: '#94a3b8', a: 0.3 });
    UI.bigLine(g, t, { line: 'A QUIET COST', sub: 'GRADUAL & INVISIBLE ATTENTION EROSION', y: E.H * 0.48, dur: info.dur });
  }
});

// s077 — "It is a hundred small withdrawals of attention from the life in front of you."
registerShot('s077', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.72, s: 1.7, facing: 1, outfit: ALEX,
      pose: breathe(POSES.relaxed, t), expr: 'sad',
      rim: { color: '#94a3b8', dir: [0, -1], w: 3.5 }
    });
    for (let i = 0; i < 28; i++) {
      const px = E.W * 0.5 + Math.sin(i * 13 + t) * 140;
      const py = E.H * 0.65 - (t * 45 + i * 18) % 300;
      circle(g, px, py, 3.2, '#38bdf8');
      glow(g, px, py, 10, '#38bdf8', 0.4);
    }
  }
});

// s078 — "And because nothing visibly breaks, it can go on for years."
registerShot('s078', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.08, x: 0 });
    UI.dataCard(g, t, {
      title: 'DURATION OF CHRONIC OVERTHINKING',
      subtitle: 'YEARS OF SILENT EXECUTIVE REHEARSAL',
      from: 1, to: 8, decimals: 0, unit: ' Years',
      dur: info.dur * 0.8, total: info.dur
    });
  }
});
