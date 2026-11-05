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
    thoughtSpace(g, t, { z: 1, x: 0 });
    // Crowd of ordinary people
    for (let i = -3; i <= 3; i++) {
      drawFigure(g, {
        x: E.W * 0.5 + i * 140, y: E.H * 0.72, s: 1.25, facing: 1,
        outfit: i === 0 ? ALEX : { top: 'tshirt', color: '#334155' },
        pose: POSES.stand, expr: 'neutral',
        rim: { color: i === 0 ? '#38bdf8' : '#64748b', dir: [0, -1], w: 3 }
      });
    }
    UI.badge(g, { text: 'COMMON HUMAN EXPERIENCE', x: E.W * 0.5 - 90, y: E.H * 0.35, color: '#38bdf8' });
  }
});

// s067 — "Rumination is something every human brain does."
registerShot('s067', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    UI.bigLine(g, t, { line: 'EVERY HUMAN BRAIN', y: E.H * 0.45, dur: info.dur });
  }
});

// s068 — "It is not a diagnosis."
registerShot('s068', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    g.save();
    g.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    g.lineWidth = 3;
    rr(g, E.W * 0.5 - 200, E.H * 0.4, 400, 80, 12);
    g.stroke();
    text(g, 'NOT A DIAGNOSIS', E.W * 0.5, E.H * 0.46, { size: 30, color: '#94a3b8', font: FONTS.ui, weight: 900 });
    g.restore();
  }
});

// s069 — "But it has a cost."
registerShot('s069', {
  bars: 'scope',
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    veil(g, '#05070c', 0.65);
    UI.bigLine(g, t, { line: 'THE HIDDEN COST', y: E.H * 0.48, dur: info.dur });
  }
});

// s070 — "Sleep is often the first thing to go."
registerShot('s070', {
  bars: 'scope',
  draw(g, t, info) {
    const { GY } = bedroom(g, t, { z: 1.2, x: 0 });
    const bedX = E.W * 0.55;
    bed(g, bedX, GY, 1.4);
    nightstand(g, bedX - 260, GY, '04:18');
    drawFigure(g, {
      x: bedX - 90, y: GY - 28, s: 1.3, facing: 1, outfit: ALEX,
      pose: POSES.lie, expr: 'sleepy',
      rim: { color: '#ef4444', dir: [-0.5, -1], w: 3 }
    });
    UI.readout(g, { label: 'SLEEP DEBT:', value: 'CRITICAL', x: V(120, 80), y: E.H - V(160, 520) });
  }
});

// s071 — Surreal Boardroom Bed: "The bed becomes a meeting room, and the meeting has no agenda."
registerShot('s071', {
  bars: 'scope',
  draw(g, t, info) {
    const { GY } = bedroom(g, t, { z: 1 + 0.05 * (t / info.dur), x: 0 });

    // Long conference table extending from bed
    g.fillStyle = '#111827';
    rr(g, E.W * 0.2, GY - 100, E.W * 0.7, 24, 6, true);
    for (let leg = E.W * 0.25; leg < E.W * 0.85; leg += 160) {
      g.fillRect(leg, GY - 76, 12, 76);
    }

    // Overhead fluorescent spotlight cones
    for (let c = 0; c < 3; c++) {
      const cx = E.W * (0.35 + c * 0.2);
      g.save();
      g.fillStyle = 'rgba(255, 255, 255, 0.06)';
      g.beginPath();
      g.moveTo(cx, E.H * 0.1);
      g.lineTo(cx + 90, GY - 100);
      g.lineTo(cx - 90, GY - 100);
      g.closePath();
      g.fill();
      g.restore();
    }

    // Shadow figures sitting around table arguing
    for (let s = 0; s < 4; s++) {
      const sx = E.W * (0.3 + s * 0.16);
      drawFigure(g, {
        x: sx, y: GY - 20, s: 1.1, facing: s % 2 === 0 ? 1 : -1,
        outfit: { top: 'suit', color: '#1f2937' },
        pose: POSES.sit, expr: 'angry',
        rim: { color: '#ef4444', dir: [0, -1], w: 2 }
      });
    }

    UI.badge(g, { text: 'NO AGENDA', x: E.W * 0.5 - 55, y: E.H * 0.25, color: '#ef4444' });
  }
});

// s072 — "Concentration slips, because part of your attention is always somewhere else."
registerShot('s072', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    UI.compareBars(g, t, {
      title: 'ATTENTION ALLOCATION',
      items: [
        { label: 'PRESENT MOMENT TASK', value: '42%', p: 0.42, color: '#38bdf8' },
        { label: 'BACKGROUND LOOP REHEARSAL', value: '58%', p: 0.58, color: '#f59e0b' }
      ],
      dur: info.dur
    });
  }
});

// s073 — "Conversations get harder, because you are partly listening, and partly reviewing."
registerShot('s073', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    // Split conversation
    drawFigure(g, {
      x: E.W * 0.35, y: E.H * 0.72, s: 1.4, facing: 1, outfit: ALEX,
      pose: POSES.think, expr: 'thinking',
      rim: { color: '#38bdf8', dir: [1, 0], w: 4 }
    });
    drawFigure(g, {
      x: E.W * 0.65, y: E.H * 0.72, s: 1.4, facing: -1, outfit: SAM,
      pose: POSES.talk, expr: 'smile',
      rim: { color: '#f59e0b', dir: [-1, 0], w: 4 }
    });

    UI.callout(g, { text: 'INTERNAL REVIEW RUNNING...', x: E.W * 0.35, y: E.H * 0.45 });
  }
});

// s074 — "And decisions slow down,"
registerShot('s074', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    // Spinning loading indicator / slowed clock
    const angle = t * 2;
    g.save();
    g.translate(E.W * 0.5, E.H * 0.45);
    g.rotate(angle);
    g.strokeStyle = '#f59e0b';
    g.lineWidth = 6;
    g.beginPath();
    g.arc(0, 0, 60, 0, Math.PI * 1.4);
    g.stroke();
    g.restore();

    UI.readout(g, { label: 'PROCESSING SPEED:', value: 'LATENCY ELEVATED', x: E.W * 0.5 - 110, y: E.H * 0.68 });
  }
});

// s075 — "because every option arrives with a rehearsal of everything that could go wrong."
registerShot('s075', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    const count = 5;
    for (let i = 0; i < count; i++) {
      const x = E.W * 0.25 + (i / (count - 1)) * E.W * 0.5;
      const y = E.H * (0.35 + (i % 2) * 0.15);
      circle(g, x, y, 22, '#ef4444');
      text(g, '!', x, y + 4, { size: 24, color: '#ffffff', font: FONTS.ui, weight: 900 });
      text(g, `Worst Case #${i + 1}`, x, y + 36, { size: 14, color: '#fca5a5', font: FONTS.ui, weight: 700 });
    }
  }
});

// s076 — "The cost is not dramatic. It is quiet."
registerShot('s076', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    veil(g, '#070a12', 0.5);
    FX.dust(g, t, { count: 40, color: '#94a3b8', a: 0.25 });
    UI.bigLine(g, t, { line: 'A QUIET COST', y: E.H * 0.48, dur: info.dur });
  }
});

// s077 — "It is a hundred small withdrawals of attention from the life in front of you."
registerShot('s077', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    // Particles of light floating upward away from figure
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.72, s: 1.4, facing: 1, outfit: ALEX,
      pose: POSES.relaxed, expr: 'sad',
      rim: { color: '#94a3b8', dir: [0, -1], w: 3 }
    });
    for (let i = 0; i < 25; i++) {
      const px = E.W * 0.5 + Math.sin(i * 13 + t) * 120;
      const py = E.H * 0.65 - (t * 40 + i * 18) % 280;
      circle(g, px, py, 3, '#38bdf8');
    }
  }
});

// s078 — "And because nothing visibly breaks, it can go on for years."
registerShot('s078', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    UI.dataCard(g, t, {
      title: 'DURATION OF CHRONIC RUMINATION',
      subtitle: 'YEARS ELAPSED WITHOUT VISIBLE FAILURE',
      from: 1, to: 8, decimals: 0, unit: ' Years',
      dur: info.dur * 0.8, total: info.dur
    });
  }
});

