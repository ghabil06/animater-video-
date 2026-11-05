// scenes/shots/02_act2.js — ACT 2: "The Thought Loop" (Shots s015 - s036)
import {
  E, V, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, shake,
  seg, circle, ring, rr, glow, alpha, shade, linGrad, text, FONTS
} from '../../studio/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, bigFace } from '../../studio/engine/rig2d.js';
import * as FX from '../../studio/engine/fx2d.js';
import * as UI from '../../studio/engine/ui2d.js';
import { thoughtSpace, drawLoopCircle, drawDomino } from '../sets/thought.js';
import { bedroom, bed, nightstand } from '../sets/bedroom.js';
import { ALEX } from '../cast.js';

// s015 — "Psychologists call one version of this rumination:"
registerShot('s015', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    const p = ease.out(prog(t, 0.2, 1.2));
    UI.bigLine(g, t, { line: 'RUMINATION', y: E.H * 0.42, dur: info.dur });
    UI.badge(g, { text: 'TYPE 1', x: E.W * 0.5 - 60, y: E.H * 0.30, color: '#38bdf8' });
  }
});

// s016 — "thinking that circles back on itself,"
registerShot('s016', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1 + 0.05 * (t / info.dur) });
    drawLoopCircle(g, E.W * 0.5, E.H * 0.5, V(220, 240), t * 1.5);
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.62, s: 1.3, facing: -1, outfit: ALEX,
      pose: POSES.think, expr: 'thinking',
      rim: { color: '#38bdf8', dir: [-1, 0], w: 3 }
    });
  }
});

// s017 — "returning to the same painful ground without ever reaching a conclusion."
registerShot('s017', {
  draw(g, t, info) {
    const { GY } = thoughtSpace(g, t, { z: 1.1, x: -30 });
    // Circular ground ring
    g.strokeStyle = 'rgba(239, 68, 68, 0.25)';
    g.lineWidth = 6;
    g.beginPath();
    g.ellipse(E.W * 0.5, GY - 20, 360, 60, 0, 0, Math.PI * 2);
    g.stroke();

    // Alex walking along the elliptical track
    const phase = t * Math.PI * 1.2;
    const px = E.W * 0.5 + Math.cos(phase) * 320;
    const facing = Math.sin(phase) > 0 ? -1 : 1;
    drawFigure(g, {
      x: px, y: GY - 20, s: 1.3, facing, outfit: ALEX,
      pose: breathe(POSES.stand, t), expr: 'sad',
      rim: { color: '#f87171', dir: [facing, -0.5], w: 3 }
    });
    UI.readout(g, { label: 'CONCLUSION:', value: 'NONE REACHED', x: V(120, 80), y: E.H - V(160, 520) });
  }
});

// s018 — "Another version is worry."
registerShot('s018', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    UI.bigLine(g, t, { line: 'WORRY', y: E.H * 0.42, dur: info.dur });
    UI.badge(g, { text: 'TYPE 2', x: E.W * 0.5 - 50, y: E.H * 0.30, color: '#f59e0b' });
  }
});

// s019 — "Thinking pointed forward, at what might happen next."
registerShot('s019', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 40 });
    // Forward pointing glowing arrows
    const p = ease.out(prog(t, 0.1, info.dur * 0.8));
    g.save();
    g.strokeStyle = '#f59e0b';
    g.lineWidth = 5;
    for (let i = 0; i < 3; i++) {
      const y = E.H * (0.35 + i * 0.15);
      const curX = lerp(E.W * 0.35, E.W * 0.75 + i * 40, p);
      seg(g, [[E.W * 0.35, y], [curX, y]], 4, '#f59e0b');
      // Arrowhead
      seg(g, [[curX - 20, y - 16], [curX, y], [curX - 20, y + 16]], 4, '#f59e0b');
    }
    g.restore();

    drawFigure(g, {
      x: E.W * 0.28, y: E.H * 0.65, s: 1.4, facing: 1, outfit: ALEX,
      pose: POSES.ready, expr: 'worried',
      rim: { color: '#f59e0b', dir: [1, 0], w: 4 }
    });
  }
});

// s020 — "One looks back." (Split comparison Left)
registerShot('s020', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    // Alex looking back into past
    drawFigure(g, {
      x: E.W * 0.4, y: E.H * 0.62, s: 1.4, facing: -1, outfit: ALEX,
      pose: POSES.think, expr: 'thinking',
      rim: { color: '#38bdf8', dir: [-1, 0], w: 4 }
    });
    UI.badge(g, { text: '← PAST (RUMINATION)', x: E.W * 0.2, y: E.H * 0.28, color: '#38bdf8' });
  }
});

// s021 — "One looks forward." (Split comparison Right)
registerShot('s021', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    // Alex looking forward into future
    drawFigure(g, {
      x: E.W * 0.6, y: E.H * 0.62, s: 1.4, facing: 1, outfit: ALEX,
      pose: POSES.ready, expr: 'nervous',
      rim: { color: '#f59e0b', dir: [1, 0], w: 4 }
    });
    UI.badge(g, { text: 'FUTURE (WORRY) →', x: E.W * 0.6, y: E.H * 0.28, color: '#f59e0b' });
  }
});

// s022 — "Both feel like thinking."
registerShot('s022', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    UI.compareBars(g, t, {
      title: 'PERCEIVED EFFORT vs PROBLEM SOLVING',
      items: [
        { label: 'EFFORT FELT', value: '98%', p: 0.98, color: '#38bdf8' },
        { label: 'ACTUAL RESOLUTION', value: '0%', p: 0.02, color: '#ef4444' }
      ],
      dur: info.dur
    });
  }
});

// s023 — "And both can keep you awake at night."
registerShot('s023', {
  bars: 'scope',
  draw(g, t, info) {
    const { GY } = bedroom(g, t, { z: 1.2, x: 0 });
    const bedX = E.W * 0.55;
    layer(g, { z: 1.2, x: 0 }, 1, (g) => {
      bed(g, bedX, GY, 1.4);
      nightstand(g, bedX - 260, GY, '03:42');
      drawFigure(g, {
        x: bedX - 90, y: GY - 28, s: 1.3, facing: 1, outfit: ALEX,
        pose: POSES.lie, expr: 'thinking',
        rim: { color: '#38bdf8', dir: [-0.5, -1], w: 3 }
      });
    });
    veil(g, '#090d14', 0.35);
  }
});

// s024 — "Here is how a loop starts."
registerShot('s024', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    const p = ease.outBack(prog(t, 0.2, 0.9));
    circle(g, E.W * 0.5, E.H * 0.5, 24 * p, '#38bdf8');
    glow(g, E.W * 0.5, E.H * 0.5, 60 * p, '#38bdf8', 0.5);
    UI.callout(g, { text: 'ORIGIN POINT', x: E.W * 0.5 + 40, y: E.H * 0.44 });
  }
});

// s025 — "A single thought arrives."
registerShot('s025', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    const p = ease.outBack(prog(t, 0.1, 0.8));
    circle(g, E.W * 0.5, E.H * 0.46, 32 * p, '#38bdf8');
    glow(g, E.W * 0.5, E.H * 0.46, 80 * p, '#38bdf8', 0.4);
    UI.badge(g, { text: 'THOUGHT #1', x: E.W * 0.5 - 55, y: E.H * 0.56, color: '#38bdf8' });
  }
});

// s026 — "Did I say something wrong?"
registerShot('s026', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    UI.bubble(g, E.W * 0.5, E.H * 0.45, {
      w: 420, h: 74, str: 'Did I say something wrong?'
    });
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.75, s: 1.2, facing: 1, outfit: ALEX,
      pose: POSES.think, expr: 'worried',
      rim: { color: '#38bdf8', dir: [0, -1], w: 3 }
    });
  }
});

// s027 — "That thought asks for an answer."
registerShot('s027', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    const p = ease.out(prog(t, 0.1, 0.8));
    // Question branching down into answer query
    circle(g, E.W * 0.5, E.H * 0.35, 20, '#38bdf8');
    seg(g, [[E.W * 0.5, E.H * 0.38], [E.W * 0.5, E.H * (0.38 + 0.22 * p)]], 4, '#38bdf8');
    if (p > 0.8) {
      circle(g, E.W * 0.5, E.H * 0.60, 16, '#fbbf24');
      UI.callout(g, { text: 'DEMAND FOR CERTAINTY', x: E.W * 0.5 + 30, y: E.H * 0.60 });
    }
  }
});

// s028 — "So your mind supplies one."
registerShot('s028', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    UI.bubble(g, E.W * 0.5, E.H * 0.42, {
      w: 440, h: 70, str: '"They thought you were awkward."'
    });
  }
});

// s029 — "And then judges it."
registerShot('s029', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    const p = ease.outBack(prog(t, 0.2, 0.7));
    // Red stamp of self-criticism
    g.save();
    g.translate(E.W * 0.5, E.H * 0.45);
    g.scale(p, p);
    g.rotate(-0.08);
    g.strokeStyle = '#ef4444';
    g.lineWidth = 4;
    rr(g, -180, -40, 360, 80, 8);
    g.stroke();
    text(g, 'CRITICAL JUDGMENT', 0, 8, { size: 28, color: '#ef4444', font: FONTS.ui, weight: 900 });
    g.restore();
  }
});

// s030 — "Now there are two thoughts. Then four."
registerShot('s030', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    const p = prog(t, 0, info.dur);
    // Tree multiplying from 1 -> 2 -> 4
    const nodes = [
      [E.W * 0.5, E.H * 0.25],
      [E.W * 0.35, E.H * 0.45], [E.W * 0.65, E.H * 0.45],
      [E.W * 0.22, E.H * 0.68], [E.W * 0.38, E.H * 0.68],
      [E.W * 0.62, E.H * 0.68], [E.W * 0.78, E.H * 0.68]
    ];
    // Draw lines
    seg(g, [nodes[0], nodes[1]], 3, '#38bdf8');
    seg(g, [nodes[0], nodes[2]], 3, '#38bdf8');
    if (p > 0.4) {
      seg(g, [nodes[1], nodes[3]], 3, '#f59e0b');
      seg(g, [nodes[1], nodes[4]], 3, '#f59e0b');
      seg(g, [nodes[2], nodes[5]], 3, '#f59e0b');
      seg(g, [nodes[2], nodes[6]], 3, '#f59e0b');
    }
    nodes.slice(0, p > 0.4 ? 7 : 3).forEach(([nx, ny]) => {
      circle(g, nx, ny, 14, '#38bdf8');
    });
    UI.badge(g, { text: p > 0.4 ? '4 THOUGHTS' : '2 THOUGHTS', x: E.W * 0.5 - 55, y: E.H * 0.85 });
  }
});

// s031 — Domino chain: "like a chain of dominoes you cannot stop setting up."
registerShot('s031', {
  draw(g, t, info) {
    const { GY } = thoughtSpace(g, t, { z: 1.1, x: -50 });
    const count = 9;
    const startX = E.W * 0.22, step = 110;
    const fallT = prog(t, 0.4, info.dur * 0.85);

    for (let i = 0; i < count; i++) {
      const dx = startX + i * step;
      const dominoProg = clamp((fallT * count - i) / 1.0, 0, 1);
      const tilt = ease.in(dominoProg) * 0.75;
      drawDomino(g, dx, GY, tilt, '#1e293b', i < 4 ? '#38bdf8' : '#f59e0b');
    }

    drawFigure(g, {
      x: startX - 80, y: GY, s: 1.3, facing: 1, outfit: ALEX,
      pose: POSES.handsOnHead, expr: 'shocked',
      rim: { color: '#ef4444', dir: [1, 0], w: 3 }
    });
  }
});

// s032 — "Notice what is missing. An exit."
registerShot('s032', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    drawLoopCircle(g, E.W * 0.5, E.H * 0.48, V(240, 260), t);

    // Large Red "NO EXIT" indicator at bottom of loop
    const p = ease.outBack(prog(t, 0.3, 0.9));
    g.save();
    g.translate(E.W * 0.5, E.H * 0.48 + V(240, 260));
    g.scale(p, p);
    circle(g, 0, 0, 32, '#ef4444');
    // White X
    seg(g, [[-12, -12], [12, 12]], 5, '#ffffff');
    seg(g, [[12, -12], [-12, 12]], 5, '#ffffff');
    g.restore();

    UI.readout(g, { label: 'EXIT CONDITION:', value: 'NOT FOUND', x: E.W * 0.5 - 110, y: E.H * 0.88 });
  }
});

// s033 — "A solved problem closes."
registerShot('s033', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    const p = ease.out(prog(t, 0.2, 0.8));
    // Green checkmark closing problem
    g.save();
    g.translate(E.W * 0.5, E.H * 0.48);
    circle(g, 0, 0, 48 * p, '#10b981');
    // Checkmark
    seg(g, [[-16, 2], [-4, 16], [20, -12]], 6, '#ffffff');
    g.restore();
    UI.callout(g, { text: 'CLOSED LOOP (SOLVED)', x: E.W * 0.5 + 70, y: E.H * 0.48 });
  }
});

// s034 — "A thought loop does not close. It repeats."
registerShot('s034', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    drawLoopCircle(g, E.W * 0.5, E.H * 0.48, V(260, 280), t * 2.2);
    UI.bigLine(g, t, { line: 'REPEATING...', y: E.H * 0.48, dur: info.dur });
  }
});

// s035 — "And because it feels unfinished,"
registerShot('s035', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    // Open gap in the circle
    g.strokeStyle = '#f59e0b';
    g.lineWidth = 5;
    g.beginPath();
    g.arc(E.W * 0.5, E.H * 0.48, 220, 0.2, Math.PI * 1.8);
    g.stroke();
    // Missing puzzle gap
    circle(g, E.W * 0.5 + 220, E.H * 0.48, 14, '#ef4444');
    UI.callout(g, { text: 'OPEN GAP: REQUIRES CLOSURE', x: E.W * 0.5 + 240, y: E.H * 0.48 });
  }
});

// s036 — "your brain keeps returning to it, trying to finish it."
registerShot('s036', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    drawLoopCircle(g, E.W * 0.5, E.H * 0.48, V(250, 270), t);

    // Alex reaching toward the gap
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.65, s: 1.35, facing: 1, outfit: ALEX,
      pose: POSES.reach, expr: 'determined',
      rim: { color: '#38bdf8', dir: [1, -0.5], w: 4 }
    });
  }
});

