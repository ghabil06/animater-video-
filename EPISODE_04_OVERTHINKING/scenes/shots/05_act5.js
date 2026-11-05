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
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    glow(g, E.W * 0.5, E.H * 0.45, 220, '#fbbf24', 0.4);
    UI.bigLine(g, t, { line: 'THE TURNING POINT', y: E.H * 0.45, dur: info.dur });
  }
});

// s080 — "And it is a strange one."
registerShot('s080', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.72, s: 1.4, facing: 1, outfit: ALEX,
      pose: POSES.think, expr: 'thinking',
      rim: { color: '#fbbf24', dir: [0, -1], w: 4 }
    });
  }
});

// s081 — "The moment you realise that thinking about a problem is not the same as solving it."
registerShot('s081', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    UI.compareBars(g, t, {
      title: 'COGNITIVE ILLUSION',
      items: [
        { label: 'THINKING ABOUT A PROBLEM', value: 'CIRCULAR REPETITION', p: 0.9, color: '#f59e0b' },
        { label: 'SOLVING A PROBLEM', value: 'ACTIONABLE RESOLUTION', p: 0.25, color: '#10b981' }
      ],
      dur: info.dur
    });
  }
});

// s082 — "Repetition feels productive."
registerShot('s082', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    UI.badge(g, { text: 'FEELS LIKE PRODUCTIVITY', x: E.W * 0.5 - 90, y: E.H * 0.38, color: '#f59e0b' });
  }
});

// s083 — "It feels like work."
registerShot('s083', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    UI.bigLine(g, t, { line: 'IT FEELS LIKE WORK', y: E.H * 0.45, dur: info.dur });
  }
});

// s084 — "But rumination rarely produces new information."
registerShot('s084', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    UI.readout(g, { label: 'NEW INFORMATION YIELD:', value: '0.00 %', x: E.W * 0.5 - 110, y: E.H * 0.48 });
  }
});

// s085 — "It produces the same information, with more emotion attached."
registerShot('s085', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    UI.compareBars(g, t, {
      title: 'OUTPUT PER RUMINATION CYCLE',
      items: [
        { label: 'NEW DATA GAINED', value: '0 %', p: 0.05, color: '#64748b' },
        { label: 'EMOTIONAL AMPLIFICATION', value: '+340 %', p: 0.95, color: '#ef4444' }
      ],
      dur: info.dur
    });
  }
});

// s086 — "So psychology offers a different move. First, name it."
registerShot('s086', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    UI.badge(g, { text: 'STEP 1', x: E.W * 0.5 - 40, y: E.H * 0.30, color: '#10b981' });
    UI.bigLine(g, t, { line: 'NAME IT', y: E.H * 0.45, dur: info.dur });
  }
});

// s087 — "Not I am an anxious person, but I am having a rumination loop."
registerShot('s087', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    // Left: Crossed out identity
    g.save();
    g.fillStyle = 'rgba(239, 68, 68, 0.15)';
    rr(g, E.W * 0.15, E.H * 0.35, 340, 100, 12, true);
    text(g, '"I am an anxious person"', E.W * 0.15 + 170, E.H * 0.41, { size: 18, color: '#f87171', font: FONTS.ui, weight: 700 });
    seg(g, [[E.W * 0.18, E.H * 0.41], [E.W * 0.15 + 310, E.H * 0.41]], 3, '#ef4444');

    // Right: Decentered event
    g.fillStyle = 'rgba(16, 185, 129, 0.15)';
    rr(g, E.W * 0.55, E.H * 0.35, 420, 100, 12, true);
    text(g, '"I am having a rumination loop"', E.W * 0.55 + 210, E.H * 0.41, { size: 18, color: '#34d399', font: FONTS.ui, weight: 700 });
    circle(g, E.W * 0.55 + 400, E.H * 0.41, 14, '#10b981');
    g.restore();
  }
});

// s088 — "That small distance is called decentering,"
registerShot('s088', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    UI.bigLine(g, t, { line: 'DECENTERING', y: E.H * 0.45, dur: info.dur });
    UI.callout(g, { text: 'OBSERVING THE THOUGHT FROM OUTSIDE', x: E.W * 0.5 - 120, y: E.H * 0.58 });
  }
});

// s089 — "and it changes how much the thought can push you around."
registerShot('s089', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.72, s: 1.45, facing: 1, outfit: ALEX,
      pose: POSES.crossArms, expr: 'determined',
      rim: { color: '#10b981', dir: [0, -1], w: 4 }
    });
  }
});

// s090 — "Second, postpone, do not suppress."
registerShot('s090', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    UI.badge(g, { text: 'STEP 2', x: E.W * 0.5 - 40, y: E.H * 0.30, color: '#38bdf8' });
    UI.bigLine(g, t, { line: 'POSTPONE, DO NOT SUPPRESS', y: E.H * 0.45, dur: info.dur });
  }
});

// s091 — "Set a time later today for worrying."
registerShot('s091', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    // Scheduled calendar block: 5:00 PM - 5:15 PM Worry Time
    g.save();
    g.fillStyle = '#1e293b';
    rr(g, E.W * 0.5 - 180, E.H * 0.35, 360, 160, 12, true);
    text(g, 'SCHEDULED APPOINTMENT', E.W * 0.5, E.H * 0.40, { size: 14, color: '#94a3b8', font: FONTS.ui, weight: 700 });
    text(g, '5:00 PM — 5:15 PM', E.W * 0.5, E.H * 0.47, { size: 28, color: '#38bdf8', font: FONTS.ui, weight: 900 });
    text(g, '"Worry Time Window"', E.W * 0.5, E.H * 0.53, { size: 16, color: '#f8fafc', font: FONTS.ui, weight: 700 });
    g.restore();
  }
});

// s092 — "When the thought arrives before then, write it down, and let it wait."
registerShot('s092', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    // Notebook writing animation
    g.save();
    g.fillStyle = '#f8fafc';
    rr(g, E.W * 0.5 - 120, E.H * 0.38, 240, 160, 8, true);
    // Ruled lines
    g.fillStyle = '#cbd5e1';
    for (let l = 0; l < 4; l++) {
      g.fillRect(E.W * 0.5 - 90, E.H * 0.44 + l * 24, 180, 2);
    }
    text(g, 'Let it wait.', E.W * 0.5, E.H * 0.50, { size: 20, color: '#0f172a', font: FONTS.ui, weight: 900 });
    g.restore();
  }
});

// s093 — "Third, ask a better question."
registerShot('s093', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    UI.badge(g, { text: 'STEP 3', x: E.W * 0.5 - 40, y: E.H * 0.30, color: '#f59e0b' });
    UI.bigLine(g, t, { line: 'ASK A BETTER QUESTION', y: E.H * 0.45, dur: info.dur });
  }
});

// s094 — "Not what did they think of me, but what would I tell a friend who asked me this?"
registerShot('s094', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    // Alex comforting friend Sam
    drawFigure(g, {
      x: E.W * 0.42, y: E.H * 0.72, s: 1.4, facing: 1, outfit: ALEX,
      pose: POSES.explain, expr: 'smile',
      rim: { color: '#10b981', dir: [1, 0], w: 4 }
    });
    drawFigure(g, {
      x: E.W * 0.58, y: E.H * 0.72, s: 1.4, facing: -1, outfit: SAM,
      pose: POSES.stand, expr: 'smile',
      rim: { color: '#f59e0b', dir: [-1, 0], w: 4 }
    });
    UI.bubble(g, E.W * 0.5, E.H * 0.35, {
      w: 460, h: 64, str: '"You did nothing wrong. It was fine."'
    });
  }
});

// s095 — "Fourth, put it in the body. A walk. A shower. Slow breathing."
registerShot('s095', {
  draw(g, t, info) {
    const { GY } = thoughtSpace(g, t, { z: 1.1, x: 0 });
    UI.badge(g, { text: 'STEP 4: SOMATIC ANCHOR', x: E.W * 0.5 - 85, y: E.H * 0.28, color: '#10b981' });

    // Walking stick figure outside under morning air
    const phase = t * Math.PI * 1.6;
    drawFigure(g, {
      x: E.W * 0.5, y: GY - 20, s: 1.4, facing: 1, outfit: ALEX,
      pose: breathe(POSES.stand, t), expr: 'smile',
      rim: { color: '#10b981', dir: [0, -1], w: 4 }
    });
    UI.readout(g, { label: 'SOMATIC REGULATION:', value: 'WALK · DEEP BREATH', x: E.W * 0.5 - 110, y: E.H * 0.85 });
  }
});

// s096 — "When attention has somewhere real to go, the loop loses its grip."
registerShot('s096', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    // Dissolving loop
    const fade = 1 - ease.inOut(prog(t, 0.2, info.dur * 0.8));
    g.save();
    g.globalAlpha = fade * 0.5;
    circle(g, E.W * 0.5, E.H * 0.45, 180, '#64748b');
    g.restore();

    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.72, s: 1.45, facing: 1, outfit: ALEX,
      pose: POSES.cheer, expr: 'joy',
      rim: { color: '#10b981', dir: [0, -1], w: 5 }
    });
  }
});

// s097 — "And fifth, accept the uncertainty on purpose. Say it plainly."
registerShot('s097', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    UI.badge(g, { text: 'STEP 5', x: E.W * 0.5 - 40, y: E.H * 0.30, color: '#38bdf8' });
    UI.bigLine(g, t, { line: 'ACCEPT UNCERTAINTY', y: E.H * 0.45, dur: info.dur });
  }
});

// s098 — "I do not know, and I can live with not knowing."
registerShot('s098', {
  bars: 'scope',
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.15, x: 0 });
    bigFace(g, E.W * 0.5, E.H * 0.55, 300, {
      outfit: ALEX, expr: 'smile', rimColor: '#10b981', rimSide: 1
    });
    UI.bubble(g, E.W * 0.5, E.H * 0.26, {
      w: 480, h: 68, str: '"I do not know, and I can live with not knowing."'
    });
  }
});

