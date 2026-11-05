// scenes/shots/06_act6.js — ACT 6: "The Conclusion" (Shots s099 - s118)
import {
  E, V, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp,
  seg, circle, ring, rr, glow, alpha, shade, linGrad, text, FONTS
} from '../../studio/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, bigFace } from '../../studio/engine/rig2d.js';
import * as FX from '../../studio/engine/fx2d.js';
import * as UI from '../../studio/engine/ui2d.js';
import { bedroom, bed, nightstand } from '../sets/bedroom.js';
import { thoughtSpace } from '../sets/thought.js';
import { ALEX, SAM, DR_ELLIS, CAST } from '../cast.js';

// s099 — "This is the part worth remembering."
registerShot('s099', {
  bars: 'scope',
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1 + 0.04 * (t / info.dur), x: 0 });
    glow(g, E.W * 0.5, E.H * 0.45, 280, '#fbbf24', 0.45);
    UI.bigLine(g, t, { line: 'WORTH REMEMBERING', sub: 'THE CORE COGNITIVE INSIGHT', y: E.H * 0.45, dur: info.dur });
  }
});

// s100 — "Your thoughts are real."
registerShot('s100', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.08, x: 0 });
    circle(g, E.W * 0.5, E.H * 0.45, 34, '#38bdf8');
    glow(g, E.W * 0.5, E.H * 0.45, 90, '#38bdf8', 0.55);
    UI.callout(g, t, { text: 'NEURAL ELECTROCHEMICAL EVENTS', at: [E.W * 0.5, E.H * 0.45], to: [E.W * 0.5 + 160, E.H * 0.35], color: '#38bdf8' });
  }
});

// s101 — "They are events in your brain."
registerShot('s101', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    UI.badge(g, { text: 'TANGIBLE BIOLOGICAL PHENOMENA', x: E.W * 0.5, y: E.H * 0.32, color: '#38bdf8' });
    circle(g, E.W * 0.5, E.H * 0.48, 42, '#38bdf8');
    glow(g, E.W * 0.5, E.H * 0.48, 100, '#38bdf8', 0.5);
  }
});

// s102 — "They are not nothing."
registerShot('s102', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.08, x: 0 });
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.72, s: 1.65, facing: 1, outfit: ALEX,
      pose: breathe(POSES.stand, t), expr: 'neutral',
      rim: { color: '#38bdf8', dir: [0, -1], w: 4.5 }
    });
  }
});

// s103 — "But they are not facts."
registerShot('s103', {
  bars: 'scope',
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.15, x: 0 });
    g.save();
    rr(g, E.W * 0.5 - 340, E.H * 0.34, 680, 160, 20);
    g.fillStyle = 'rgba(11, 19, 43, 0.92)';
    g.fill();
    g.strokeStyle = '#ef4444';
    g.lineWidth = 4;
    g.stroke();

    UI.badge(g, { text: 'FUNDAMENTAL AXIOM', x: E.W * 0.5, y: E.H * 0.39, color: '#f59e0b', bg: false });
    text(g, 'THOUGHTS ≠ FACTS', E.W * 0.5, E.H * 0.47, {
      size: 46, color: '#f8fafc', font: FONTS.ui, weight: 900
    });
    text(g, 'A thought is a predictive hypothesis, not an objective truth.', E.W * 0.5, E.H * 0.54, {
      size: 20, color: '#94a3b8', font: FONTS.ui, weight: 900
    });
    g.restore();
  }
});

// s104 — "A thought is a guess your brain makes, using old data, in the dark."
registerShot('s104', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    UI.readout(g, { label: 'PREDICTIVE COGNITION:', value: 'HEURISTIC GUESS (OLD PAST DATA)', x: E.W * 0.5 - 180, y: E.H * 0.46 });
  }
});

// s105 — "Sometimes it is right."
registerShot('s105', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.08, x: 0 });
    circle(g, E.W * 0.5, E.H * 0.44, 48, '#10b981');
    glow(g, E.W * 0.5, E.H * 0.44, 100, '#10b981', 0.5);
    text(g, '✓', E.W * 0.5, E.H * 0.48, { size: 48, color: '#ffffff', font: FONTS.ui, weight: 900 });
    UI.badge(g, { text: 'ACCURATE RISK ASSESSMENT', x: E.W * 0.5, y: E.H * 0.62, color: '#10b981' });
  }
});

// s106 — "Sometimes it is a story."
registerShot('s106', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.08, x: 0 });
    circle(g, E.W * 0.5, E.H * 0.44, 48, '#f59e0b');
    glow(g, E.W * 0.5, E.H * 0.44, 100, '#f59e0b', 0.5);
    text(g, '...', E.W * 0.5, E.H * 0.46, { size: 48, color: '#ffffff', font: FONTS.ui, weight: 900 });
    UI.badge(g, { text: 'CATASTROPHIC NARRATIVE', x: E.W * 0.5, y: E.H * 0.62, color: '#f59e0b' });
  }
});

// s107 — "The overthinking mind is usually not your enemy."
registerShot('s107', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.12, x: 0 });
    drawFigure(g, {
      x: E.W * 0.40, y: E.H * 0.72, s: 1.65, facing: 1, outfit: ALEX,
      pose: breathe(POSES.explain, t), expr: 'smile',
      rim: { color: '#38bdf8', dir: [1, 0], w: 4.5 }
    });
    drawFigure(g, {
      x: E.W * 0.60, y: E.H * 0.72, s: 1.65, facing: -1, outfit: ALEX,
      pose: breathe(POSES.stand, t, 0.8), expr: 'smile',
      rim: { color: '#fbbf24', dir: [-1, 0], w: 4.5 }
    });
  }
});

// s108 — "It is an old protective system, trying to keep you safe,"
registerShot('s108', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.12, x: 0 });
    glow(g, E.W * 0.5, E.H * 0.55, 220, '#fbbf24', 0.45);
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.72, s: 1.7, facing: 1, outfit: ALEX,
      pose: breathe(POSES.ready, t), expr: 'smile',
      rim: { color: '#fbbf24', dir: [0, -1], w: 5 }
    });
    UI.badge(g, { text: 'ANCIENT THREAT-DETECTION SYSTEM', x: E.W * 0.5, y: E.H * 0.26, color: '#fbbf24' });
  }
});

// s109 — "in a world that no longer has the same dangers."
registerShot('s109', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    UI.bigLine(g, t, { line: 'MODERN LIFE · ANCIENT HARDWARE', sub: 'PHYSICAL SURVIVAL CIRCS APPLIED TO SOCIAL SIGNALS', y: E.H * 0.45, dur: info.dur });
  }
});

// s110 — "You do not have to silence it."
registerShot('s110', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.12, x: 0 });
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.72, s: 1.7, facing: 1, outfit: ALEX,
      pose: breathe(POSES.relaxed, t), expr: 'smile',
      rim: { color: '#38bdf8', dir: [0, -1], w: 4.5 }
    });
  }
});

// s111 — "You only have to stop treating every thought as an instruction."
registerShot('s111', {
  bars: 'scope',
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.12, x: 0 });
    const bubbleY = E.H * 0.65 - (t * 45) % 260;
    circle(g, E.W * 0.5, bubbleY, 36, '#64748b');
    glow(g, E.W * 0.5, bubbleY, 60, '#64748b', 0.35);

    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.78, s: 1.65, facing: 1, outfit: ALEX,
      pose: breathe(POSES.stand, t), expr: 'smile',
      rim: { color: '#10b981', dir: [0, -1], w: 4.5 }
    });

    UI.callout(g, t, { text: 'THOUGHT ≠ MANDATORY ACTION', at: [E.W * 0.5, bubbleY], to: [E.W * 0.5 + 140, bubbleY], color: '#10b981' });
  }
});

// s112 — "So tonight, when the conversation starts again in your head,"
registerShot('s112', {
  draw(g, t, info) {
    const { GY } = bedroom(g, t, { z: 1.12, x: 0 });
    bed(g, E.W * 0.55, GY, 1.5);
    nightstand(g, E.W * 0.55 - 290, GY, '11:45');
    veil(g, '#090d14', 0.25);
  }
});

// s113 — "and it will, try asking one question."
registerShot('s113', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.08, x: 0 });
    UI.bigLine(g, t, { line: 'ASK ONE QUESTION', sub: 'THE GOLDEN REFLECTIVE CHECK', y: E.H * 0.45, dur: info.dur });
  }
});

// s114 — "Is this a thought I am having, or a fact I have checked?"
registerShot('s114', {
  bars: 'scope',
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.15, x: 0 });
    glow(g, E.W * 0.5, E.H * 0.46, 300, '#38bdf8', 0.4);
    UI.bubble(g, E.W * 0.5, E.H * 0.46, {
      w: 680, h: 86, str: '"Is this a thought I am having, or a fact I have checked?"'
    });
  }
});

// s115 — "If you want more of these quiet explanations of how your mind works,"
registerShot('s115', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    UI.bigLine(g, t, { line: 'MEMORY PULSE', sub: 'QUIET SCIENCE FOR BUSY MINDS', y: E.H * 0.45, dur: info.dur });
  }
});

// s116 — "subscribe to Memory Pulse."
registerShot('s116', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.08, x: 0 });
    g.save();
    g.fillStyle = '#ef4444';
    rr(g, E.W * 0.5 - 160, E.H * 0.42, 320, 68, 34, true);
    glow(g, E.W * 0.5, E.H * 0.45, 120, '#ef4444', 0.5);
    text(g, 'SUBSCRIBE', E.W * 0.5, E.H * 0.47, { size: 26, color: '#ffffff', font: FONTS.ui, weight: 900 });
    g.restore();
  }
});

// s117 — "And tell me in the comments."
registerShot('s117', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.12, x: 0 });
    UI.bubble(g, E.W * 0.5, E.H * 0.45, { w: 380, h: 70, str: 'Leave your answer in the comments...' });
  }
});

// s118 — "What is the one thought your brain keeps returning to?" (End Screen)
registerShot('s118', {
  draw(g, t, info) {
    UI.endScreen(g, t, {
      question: 'What is the one thought your brain keeps returning to?',
      cast: CAST,
      moodColors: ['#090d16', '#141c2c', '#28364f'],
      rim: '#38bdf8'
    });
  }
});
