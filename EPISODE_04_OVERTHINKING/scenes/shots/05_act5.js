// scenes/shots/05_act5.js — ACT 5: "The Turning Point" (Shots s079 - s098)
import {
  E, V, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp,
  seg, circle, ring, rr, glow, alpha, shade, linGrad, text, FONTS
} from '../../studio/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, bigFace } from '../../studio/engine/rig2d.js';
import * as FX from '../../studio/engine/fx2d.js';
import * as UI from '../../studio/engine/ui2d.js';
import { thoughtSpace } from '../sets/thought.js';
import { ALEX, SAM } from '../cast.js';

// s079 — "Here is the turning point."
registerShot('s079', {
  bars: 'scope',
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1 + 0.04 * (t / info.dur), x: 0 });
    glow(g, E.W * 0.5, E.H * 0.45, 260, '#fbbf24', 0.45);
    UI.bigLine(g, t, { line: 'THE TURNING POINT', sub: 'BREAKING THE AUTOMATIC CAROUSEL', y: E.H * 0.45, dur: info.dur });
  }
});

// s080 — "And it is a strange one."
registerShot('s080', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.08, x: 0 });
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.72, s: 1.65, facing: 1, outfit: ALEX,
      pose: breathe(POSES.think, t), expr: 'thinking',
      rim: { color: '#fbbf24', dir: [0, -1], w: 4.5 }
    });
  }
});

// s081 — "The moment you realise that thinking about a problem is not the same as solving it."
registerShot('s081', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    UI.compareBars(g, t, {
      title: 'CRITICAL COGNITIVE ILLUSION',
      rows: [
        { label: 'THINKING ABOUT A PROBLEM', v: 0.94, color: '#f59e0b' },
        { label: 'ACTIVE PROBLEM SOLVING', v: 0.15, color: '#10b981' }
      ]
    });
  }
});

// s082 — "Repetition feels productive."
registerShot('s082', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.08, x: 0 });
    UI.badge(g, { text: 'REPETITION FEELS LIKE PROGRESS', x: E.W * 0.5, y: E.H * 0.36, color: '#f59e0b' });
  }
});

// s083 — "It feels like work."
registerShot('s083', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.12, x: 0 });
    UI.bigLine(g, t, { line: 'IT FEELS LIKE WORK', sub: 'EXPENDING ENERGY WITHOUT FORWARD MOTION', y: E.H * 0.45, dur: info.dur });
  }
});

// s084 — "But rumination rarely produces new information."
registerShot('s084', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    UI.readout(g, { label: 'NEW DATA GAINED:', value: '0.00 % (ZERO NOVELTY)', x: E.W * 0.5 - 140, y: E.H * 0.48, color: '#ef4444' });
  }
});

// s085 — "It produces the same information, with more emotion attached."
registerShot('s085', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.08, x: 0 });
    UI.compareBars(g, t, {
      title: 'NET YIELD PER RUMINATION CYCLE',
      rows: [
        { label: 'NEW INSIGHT / FACTS', v: 0.04, color: '#64748b' },
        { label: 'EMOTIONAL AMPLIFICATION', v: 0.96, color: '#ef4444' }
      ]
    });
  }
});

// s086 — "So psychology offers a different move. First, name it."
registerShot('s086', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.12, x: 0 });
    UI.badge(g, { text: 'MOVE 1 OF 5', x: E.W * 0.5, y: E.H * 0.28, color: '#10b981' });
    UI.bigLine(g, t, { line: 'NAME IT: DECENTERING', sub: 'STEPPING OUTSIDE THE THOUGHT STREAM', y: E.H * 0.45, dur: info.dur });
  }
});

// s087 — "Not I am an anxious person, but I am having a rumination loop."
registerShot('s087', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    g.save();
    // Left: Crossed out identity
    g.fillStyle = 'rgba(239, 68, 68, 0.18)';
    rr(g, E.W * 0.12, E.H * 0.35, 380, 110, 14, true);
    g.strokeStyle = 'rgba(239, 68, 68, 0.5)';
    g.lineWidth = 2;
    g.stroke();
    text(g, '"I am an anxious person"', E.W * 0.12 + 190, E.H * 0.42, { size: 21, color: '#fca5a5', font: FONTS.ui, weight: 900 });
    seg(g, [[E.W * 0.15, E.H * 0.42], [E.W * 0.12 + 350, E.H * 0.42]], 4, '#ef4444');

    // Right: Decentered event
    g.fillStyle = 'rgba(16, 185, 129, 0.18)';
    rr(g, E.W * 0.52, E.H * 0.35, 460, 110, 14, true);
    g.strokeStyle = 'rgba(16, 185, 129, 0.5)';
    g.lineWidth = 2;
    g.stroke();
    text(g, '"I am having a rumination loop"', E.W * 0.52 + 230, E.H * 0.42, { size: 21, color: '#6ee7b7', font: FONTS.ui, weight: 900 });
    circle(g, E.W * 0.52 + 430, E.H * 0.42, 16, '#10b981');
    glow(g, E.W * 0.52 + 430, E.H * 0.42, 32, '#10b981', 0.5);
    g.restore();
  }
});

// s088 — "That small distance is called decentering,"
registerShot('s088', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.08, x: 0 });
    UI.bigLine(g, t, { line: 'DECENTERING', sub: 'OBSERVING THE THOUGHT FROM THE OUTSIDE', y: E.H * 0.45, dur: info.dur });
  }
});

// s089 — "and it changes how much the thought can push you around."
registerShot('s089', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.12, x: 0 });
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.72, s: 1.7, facing: 1, outfit: ALEX,
      pose: breathe(POSES.crossArms, t), expr: 'determined',
      rim: { color: '#10b981', dir: [0, -1], w: 4.5 }
    });
  }
});

// s090 — "Second, postpone, do not suppress."
registerShot('s090', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.12, x: 0 });
    UI.badge(g, { text: 'MOVE 2 OF 5', x: E.W * 0.5, y: E.H * 0.28, color: '#38bdf8' });
    UI.bigLine(g, t, { line: 'POSTPONE, DO NOT SUPPRESS', sub: 'SCHEDULE THE WORRY WINDOW', y: E.H * 0.45, dur: info.dur });
  }
});

// s091 — "Set a time later today for worrying."
registerShot('s091', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    g.save();
    g.fillStyle = 'rgba(30, 41, 59, 0.9)';
    rr(g, E.W * 0.5 - 210, E.H * 0.34, 420, 180, 16, true);
    g.strokeStyle = '#38bdf8';
    g.lineWidth = 2.5;
    g.stroke();
    text(g, 'CALENDAR APPOINTMENT', E.W * 0.5, E.H * 0.39, { size: 15, color: '#94a3b8', font: FONTS.ui, weight: 700 });
    text(g, '5:00 PM — 5:15 PM', E.W * 0.5, E.H * 0.46, { size: 32, color: '#38bdf8', font: FONTS.ui, weight: 900 });
    text(g, '"Scheduled 15-Minute Worry Window"', E.W * 0.5, E.H * 0.53, { size: 18, color: '#f8fafc', font: FONTS.ui, weight: 700 });
    g.restore();
  }
});

// s092 — "When the thought arrives before then, write it down, and let it wait."
registerShot('s092', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    g.save();
    g.fillStyle = '#f8fafc';
    rr(g, E.W * 0.5 - 140, E.H * 0.36, 280, 180, 10, true);
    g.fillStyle = '#cbd5e1';
    for (let l = 0; l < 4; l++) {
      g.fillRect(E.W * 0.5 - 110, E.H * 0.43 + l * 28, 220, 2);
    }
    text(g, 'Let it wait.', E.W * 0.5, E.H * 0.50, { size: 24, color: '#0f172a', font: FONTS.ui, weight: 900 });
    g.restore();
  }
});

// s093 — "Third, ask a better question."
registerShot('s093', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.12, x: 0 });
    UI.badge(g, { text: 'MOVE 3 OF 5', x: E.W * 0.5, y: E.H * 0.28, color: '#f59e0b' });
    UI.bigLine(g, t, { line: 'ASK A BETTER QUESTION', sub: 'THE FRIEND PERSPECTIVE TEST', y: E.H * 0.45, dur: info.dur });
  }
});

// s094 — "Not what did they think of me, but what would I tell a friend who asked me this?"
registerShot('s094', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    drawFigure(g, {
      x: E.W * 0.40, y: E.H * 0.72, s: 1.65, facing: 1, outfit: ALEX,
      pose: breathe(POSES.explain, t), expr: 'smile',
      rim: { color: '#10b981', dir: [1, 0], w: 4.5 }
    });
    drawFigure(g, {
      x: E.W * 0.60, y: E.H * 0.72, s: 1.65, facing: -1, outfit: SAM,
      pose: breathe(POSES.stand, t, 0.8), expr: 'smile',
      rim: { color: '#f59e0b', dir: [-1, 0], w: 4.5 }
    });
    UI.bubble(g, E.W * 0.5, E.H * 0.32, {
      w: 520, h: 72, str: '"You did nothing wrong. It was completely fine."'
    });
  }
});

// s095 — "Fourth, put it in the body. A walk. A shower. Slow breathing."
registerShot('s095', {
  draw(g, t, info) {
    const { GY } = thoughtSpace(g, t, { z: 1.12, x: 0 });
    UI.badge(g, { text: 'MOVE 4: SOMATIC ANCHOR', x: E.W * 0.5, y: E.H * 0.26, color: '#10b981' });

    drawFigure(g, {
      x: E.W * 0.5, y: GY - 20, s: 1.65, facing: 1, outfit: ALEX,
      pose: breathe(POSES.stand, t, 1.2), expr: 'smile',
      rim: { color: '#10b981', dir: [0, -1], w: 4.5 }
    });
    UI.readout(g, { label: 'SOMATIC REGULATION:', value: 'WALK · DEEP BREATH · GROUNDING', x: E.W * 0.5 - 160, y: E.H * 0.85, color: '#10b981' });
  }
});

// s096 — "When attention has somewhere real to go, the loop loses its grip."
registerShot('s096', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.08, x: 0 });
    const fade = 1 - ease.inOut(prog(t, 0.2, info.dur * 0.8));
    g.save();
    g.globalAlpha = fade * 0.5;
    circle(g, E.W * 0.5, E.H * 0.45, 200, '#64748b');
    g.restore();

    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.72, s: 1.75, facing: 1, outfit: ALEX,
      pose: breathe(POSES.cheer, t), expr: 'joy',
      rim: { color: '#10b981', dir: [0, -1], w: 5 }
    });
  }
});

// s097 — "And fifth, accept the uncertainty on purpose. Say it plainly."
registerShot('s097', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.12, x: 0 });
    UI.badge(g, { text: 'MOVE 5 OF 5', x: E.W * 0.5, y: E.H * 0.28, color: '#38bdf8' });
    UI.bigLine(g, t, { line: 'ACCEPT UNCERTAINTY', sub: 'DROPPING THE PHANTOM SHIELD', y: E.H * 0.45, dur: info.dur });
  }
});

// s098 — "I do not know, and I can live with not knowing."
registerShot('s098', {
  bars: 'scope',
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.18, x: 0 });
    bigFace(g, E.W * 0.5, E.H * 0.55, 330, {
      outfit: ALEX, expr: 'smile', rimColor: '#10b981', rimSide: 1
    });
    UI.bubble(g, E.W * 0.5, E.H * 0.24, {
      w: 540, h: 74, str: '"I do not know, and I can live with not knowing."'
    });
  }
});
