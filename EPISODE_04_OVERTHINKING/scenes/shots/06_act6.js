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
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    glow(g, E.W * 0.5, E.H * 0.45, 260, '#fbbf24', 0.45);
    UI.bigLine(g, t, { line: 'WORTH REMEMBERING', y: E.H * 0.45, dur: info.dur });
  }
});

// s100 — "Your thoughts are real."
registerShot('s100', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    circle(g, E.W * 0.5, E.H * 0.45, 28, '#38bdf8');
    glow(g, E.W * 0.5, E.H * 0.45, 80, '#38bdf8', 0.5);
    UI.callout(g, { text: 'NEURAL PHENOMENA', x: E.W * 0.5 + 40, y: E.H * 0.45 });
  }
});

// s101 — "They are events in your brain."
registerShot('s101', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    UI.badge(g, { text: 'ELECTROCHEMICAL EVENTS', x: E.W * 0.5 - 90, y: E.H * 0.35, color: '#38bdf8' });
    circle(g, E.W * 0.5, E.H * 0.48, 36, '#38bdf8');
  }
});

// s102 — "They are not nothing."
registerShot('s102', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.72, s: 1.4, facing: 1, outfit: ALEX,
      pose: POSES.stand, expr: 'neutral',
      rim: { color: '#38bdf8', dir: [0, -1], w: 4 }
    });
  }
});

// s103 — "But they are not facts."
registerShot('s103', {
  bars: 'scope',
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.15, x: 0 });
    g.save();
    g.strokeStyle = '#ef4444';
    g.lineWidth = 5;
    rr(g, E.W * 0.5 - 280, E.H * 0.4, 560, 100, 16);
    g.stroke();
    text(g, 'THOUGHTS ≠ FACTS', E.W * 0.5, E.H * 0.46, {
      size: 40, color: '#f8fafc', font: FONTS.ui, weight: 900
    });
    g.restore();
  }
});

// s104 — "A thought is a guess your brain makes, using old data, in the dark."
registerShot('s104', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    UI.readout(g, { label: 'COGNITIVE ARCHITECTURE:', value: 'PREDICTIVE GUESS (OLD DATA)', x: E.W * 0.5 - 130, y: E.H * 0.45 });
  }
});

// s105 — "Sometimes it is right."
registerShot('s105', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    circle(g, E.W * 0.5, E.H * 0.45, 40, '#10b981');
    text(g, '✓', E.W * 0.5, E.H * 0.48, { size: 40, color: '#ffffff', font: FONTS.ui, weight: 900 });
  }
});

// s106 — "Sometimes it is a story."
registerShot('s106', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    circle(g, E.W * 0.5, E.H * 0.45, 40, '#f59e0b');
    text(g, '...', E.W * 0.5, E.H * 0.46, { size: 40, color: '#ffffff', font: FONTS.ui, weight: 900 });
  }
});

// s107 — "The overthinking mind is usually not your enemy."
registerShot('s107', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    // Alex and friendly reflection
    drawFigure(g, {
      x: E.W * 0.42, y: E.H * 0.72, s: 1.4, facing: 1, outfit: ALEX,
      pose: POSES.explain, expr: 'smile',
      rim: { color: '#38bdf8', dir: [1, 0], w: 4 }
    });
    drawFigure(g, {
      x: E.W * 0.58, y: E.H * 0.72, s: 1.4, facing: -1, outfit: ALEX,
      pose: POSES.stand, expr: 'smile',
      rim: { color: '#fbbf24', dir: [-1, 0], w: 4 }
    });
  }
});

// s108 — "It is an old protective system, trying to keep you safe,"
registerShot('s108', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    glow(g, E.W * 0.5, E.H * 0.55, 180, '#fbbf24', 0.4);
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.72, s: 1.45, facing: 1, outfit: ALEX,
      pose: POSES.ready, expr: 'smile',
      rim: { color: '#fbbf24', dir: [0, -1], w: 5 }
    });
  }
});

// s109 — "in a world that no longer has the same dangers."
registerShot('s109', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    UI.bigLine(g, t, { line: 'MODERN LIFE · ANCIENT HARDWARE', y: E.H * 0.45, dur: info.dur });
  }
});

// s110 — "You do not have to silence it."
registerShot('s110', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.72, s: 1.4, facing: 1, outfit: ALEX,
      pose: POSES.relaxed, expr: 'smile',
      rim: { color: '#38bdf8', dir: [0, -1], w: 4 }
    });
  }
});

// s111 — "You only have to stop treating every thought as an instruction."
registerShot('s111', {
  bars: 'scope',
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    // Thought floating up into the sky unattached
    const bubbleY = E.H * 0.65 - (t * 40) % 240;
    circle(g, E.W * 0.5, bubbleY, 32, '#64748b');
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.78, s: 1.35, facing: 1, outfit: ALEX,
      pose: POSES.stand, expr: 'smile',
      rim: { color: '#10b981', dir: [0, -1], w: 4 }
    });
    UI.callout(g, { text: 'NOT AN INSTRUCTION', x: E.W * 0.5 + 50, y: bubbleY });
  }
});

// s112 — "So tonight, when the conversation starts again in your head,"
registerShot('s112', {
  draw(g, t, info) {
    const { GY } = bedroom(g, t, { z: 1.1, x: 0 });
    bed(g, E.W * 0.55, GY, 1.4);
    nightstand(g, E.W * 0.55 - 260, GY, '11:45');
    veil(g, '#090d14', 0.25);
  }
});

// s113 — "and it will, try asking one question."
registerShot('s113', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    UI.bigLine(g, t, { line: 'ASK ONE QUESTION', y: E.H * 0.45, dur: info.dur });
  }
});

// s114 — "Is this a thought I am having, or a fact I have checked?"
registerShot('s114', {
  bars: 'scope',
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.15, x: 0 });
    glow(g, E.W * 0.5, E.H * 0.46, 260, '#38bdf8', 0.35);
    UI.bubble(g, E.W * 0.5, E.H * 0.46, {
      w: 620, h: 80, str: '"Is this a thought I am having, or a fact I have checked?"'
    });
  }
});

// s115 — "If you want more of these quiet explanations of how your mind works,"
registerShot('s115', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    UI.bigLine(g, t, { line: 'MEMORY PULSE', y: E.H * 0.45, dur: info.dur });
  }
});

// s116 — "subscribe to Memory Pulse."
registerShot('s116', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    // Subscribe pill button
    g.save();
    g.fillStyle = '#ef4444';
    rr(g, E.W * 0.5 - 140, E.H * 0.42, 280, 60, 30, true);
    text(g, 'SUBSCRIBE', E.W * 0.5, E.H * 0.47, { size: 22, color: '#ffffff', font: FONTS.ui, weight: 900 });
    g.restore();
  }
});

// s117 — "And tell me in the comments."
registerShot('s117', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    UI.bubble(g, E.W * 0.5, E.H * 0.45, { w: 320, h: 64, str: 'Leave a comment...' });
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

