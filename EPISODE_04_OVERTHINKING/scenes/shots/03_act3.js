// scenes/shots/03_act3.js — ACT 3: "Inside the Brain" (Shots s037 - s065)
import {
  E, V, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp,
  seg, circle, ring, rr, glow, alpha, shade, linGrad, text, FONTS
} from '../../studio/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, bigFace } from '../../studio/engine/rig2d.js';
import * as FX from '../../studio/engine/fx2d.js';
import * as UI from '../../studio/engine/ui2d.js';
import { brainSpace, drawBrainNetwork } from '../sets/brain.js';
import { thoughtSpace, drawLoopCircle } from '../sets/thought.js';
import { ALEX, DR_ELLIS } from '../cast.js';

// s037 — "To understand why, we need to look inside."
registerShot('s037', {
  draw(g, t, info) {
    brainSpace(g, t, { z: 1 + 0.08 * (t / info.dur), x: 0 });
    // Dr. Ellis presenting the diagram
    drawFigure(g, {
      x: E.W * 0.32, y: E.H * 0.72, s: 1.4, facing: 1, outfit: DR_ELLIS,
      pose: POSES.point, expr: 'explain',
      rim: { color: '#38bdf8', dir: [1, 0], w: 4 }
    });
    drawBrainNetwork(g, E.W * 0.65, E.H * 0.5, 0.9, t, { pulseDMN: false, labelNodes: false });
  }
});

// s038 — "In the nineteen nineties and two thousands,"
registerShot('s038', {
  draw(g, t, info) {
    brainSpace(g, t, { z: 1, x: 0 });
    UI.badge(g, { text: '1990s — 2000s', x: E.W * 0.5 - 70, y: E.H * 0.35, color: '#f59e0b' });
    UI.bigLine(g, t, { line: 'NEUROIMAGING MAPPING', y: E.H * 0.50, dur: info.dur });
  }
});

// s039 — "neuroscientists began mapping a set of brain regions that become more active"
registerShot('s039', {
  draw(g, t, info) {
    brainSpace(g, t, { z: 1.1, x: 0 });
    drawBrainNetwork(g, E.W * 0.5, E.H * 0.5, 1.25, t, { pulseDMN: true, labelNodes: false });
  }
});

// s040 — "when you are not focused on the outside world."
registerShot('s040', {
  draw(g, t, info) {
    brainSpace(g, t, { z: 1.15, x: 0 });
    drawBrainNetwork(g, E.W * 0.5, E.H * 0.5, 1.25, t, { pulseDMN: true, labelNodes: false });
    UI.readout(g, { label: 'EXTERNAL FOCUS:', value: 'IDLE (RESTING STATE)', x: V(120, 80), y: E.H - V(160, 520) });
  }
});

// s041 — "It is called the default mode network."
registerShot('s041', {
  bars: 'scope',
  draw(g, t, info) {
    brainSpace(g, t, { z: 1.2, x: 0 });
    drawBrainNetwork(g, E.W * 0.5, E.H * 0.48, 1.35, t, { pulseDMN: true, labelNodes: true });
    UI.titleCard(g, t, {
      lines: ['DEFAULT MODE', 'NETWORK (DMN)'],
      sub: 'SELF-REFERENTIAL NEURAL SYSTEM',
      dur: info.dur
    });
  }
});

// s042 — "It is active when you daydream, remember,"
registerShot('s042', {
  draw(g, t, info) {
    brainSpace(g, t, { z: 1.05, x: 0 });
    drawBrainNetwork(g, E.W * 0.4, E.H * 0.52, 1.0, t, { pulseDMN: true, labelNodes: true });
    UI.badge(g, { text: '1. DAYDREAMING', x: E.W * 0.65, y: E.H * 0.38, color: '#38bdf8' });
    UI.badge(g, { text: '2. AUTOBIOGRAPHICAL MEMORY', x: E.W * 0.65, y: E.H * 0.52, color: '#38bdf8' });
  }
});

// s043 — "imagine the future, or think about yourself."
registerShot('s043', {
  draw(g, t, info) {
    brainSpace(g, t, { z: 1.05, x: 0 });
    drawBrainNetwork(g, E.W * 0.4, E.H * 0.52, 1.0, t, { pulseDMN: true, labelNodes: true });
    UI.badge(g, { text: '3. SIMULATING THE FUTURE', x: E.W * 0.65, y: E.H * 0.38, color: '#f59e0b' });
    UI.badge(g, { text: '4. SELF-REFERENTIAL THOUGHT', x: E.W * 0.65, y: E.H * 0.52, color: '#f59e0b' });
  }
});

// s044 — "Researchers have linked activity in this network to self-generated thought,"
registerShot('s044', {
  draw(g, t, info) {
    brainSpace(g, t, { z: 1, x: 0 });
    UI.dataCard(g, t, {
      title: 'DMN CONNECTIVITY & SELF-GENERATED THOUGHT',
      subtitle: 'CORRELATION INDEX',
      from: 0.2, to: 0.85, decimals: 2, unit: '',
      dur: info.dur * 0.8, total: info.dur
    });
  }
});

// s045 — "including rumination."
registerShot('s045', {
  draw(g, t, info) {
    brainSpace(g, t, { z: 1.2, x: 0 });
    drawBrainNetwork(g, E.W * 0.5, E.H * 0.5, 1.3, t, { pulseDMN: true, labelNodes: true });
    UI.callout(g, { text: 'HIGH HYPERCONNECTIVITY', x: E.W * 0.5 + 120, y: E.H * 0.38 });
  }
});

// s046 — "But here is the careful part."
registerShot('s046', {
  draw(g, t, info) {
    brainSpace(g, t, { z: 1.1, x: 0 });
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.72, s: 1.5, facing: 1, outfit: DR_ELLIS,
      pose: POSES.explain, expr: 'neutral',
      rim: { color: '#f59e0b', dir: [0, -1], w: 4 }
    });
  }
});

// s047 — "A correlation is not a cause."
registerShot('s047', {
  draw(g, t, info) {
    brainSpace(g, t, { z: 1, x: 0 });
    g.save();
    g.strokeStyle = '#ef4444';
    g.lineWidth = 4;
    rr(g, E.W * 0.5 - 280, E.H * 0.4, 560, 100, 16);
    g.stroke();
    text(g, 'CORRELATION ≠ CAUSATION', E.W * 0.5, E.H * 0.46, {
      size: 36, color: '#f8fafc', font: FONTS.ui, weight: 900
    });
    g.restore();
  }
});

// s048 — "The default mode network is not a broken part that makes you overthink."
registerShot('s048', {
  draw(g, t, info) {
    brainSpace(g, t, { z: 1.15, x: 0 });
    drawBrainNetwork(g, E.W * 0.5, E.H * 0.5, 1.2, t, { pulseDMN: true, labelNodes: false });
    // Green shield
    circle(g, E.W * 0.5, E.H * 0.5, 48, '#10b981');
    seg(g, [[E.W * 0.5 - 16, E.H * 0.5], [E.W * 0.5 - 4, E.H * 0.5 + 14], [E.W * 0.5 + 20, E.H * 0.5 - 12]], 6, '#ffffff');
    UI.callout(g, { text: 'HEALTHY ADAPTIVE SYSTEM', x: E.W * 0.5 + 70, y: E.H * 0.5 });
  }
});

// s049 — "It is a system for imagining and remembering."
registerShot('s049', {
  draw(g, t, info) {
    brainSpace(g, t, { z: 1.1, x: 0 });
    drawBrainNetwork(g, E.W * 0.5, E.H * 0.48, 1.2, t, { pulseDMN: true, labelNodes: false });
    UI.bigLine(g, t, { line: 'MEMORY & IMAGINATION', y: E.H * 0.82, dur: info.dur });
  }
});

// s050 — "Overthinking may be that system running without a destination."
registerShot('s050', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    // Endless circular train track
    const cx = E.W * 0.5, cy = E.H * 0.5, r = 240;
    g.strokeStyle = '#38bdf8';
    g.lineWidth = 4;
    g.beginPath();
    g.arc(cx, cy, r, 0, Math.PI * 2);
    g.stroke();

    // Moving traveler node with no stop
    const angle = t * 1.5;
    circle(g, cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, 16, '#f59e0b');
    glow(g, cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, 40, '#f59e0b', 0.5);

    UI.readout(g, { label: 'DESTINATION:', value: 'UNDEFINED (NO STOP)', x: cx - 110, y: cy + 40 });
  }
});

// s051 — "There is a second player. Uncertainty."
registerShot('s051', {
  bars: 'scope',
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    circle(g, E.W * 0.5, E.H * 0.38, 50, '#ef4444');
    text(g, '?', E.W * 0.5, E.H * 0.40, { size: 60, color: '#ffffff', font: FONTS.ui, weight: 900 });
    UI.bigLine(g, t, { line: 'UNCERTAINTY', y: E.H * 0.62, dur: info.dur });
  }
});

// s052 — "Psychologists describe intolerance of uncertainty."
registerShot('s052', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    UI.meter(g, {
      title: 'INTOLERANCE OF UNCERTAINTY',
      val: 0.92,
      x: E.W * 0.5 - 200, y: E.H * 0.42, w: 400
    });
  }
});

// s053 — "The tendency to find I do not know genuinely uncomfortable."
registerShot('s053', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    UI.bubble(g, E.W * 0.5, E.H * 0.38, {
      w: 360, h: 64, str: '"I do not know."'
    });
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.72, s: 1.4, facing: 1, outfit: ALEX,
      pose: POSES.sad, expr: 'worried',
      rim: { color: '#ef4444', dir: [0, -1], w: 4 }
    });
  }
});

// s054 — "For some people, an unanswered question feels like an itch that must be scratched."
registerShot('s054', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    const p = Math.sin(t * 8) * 0.5 + 0.5;
    circle(g, E.W * 0.5, E.H * 0.45, 60 + p * 15, '#ef4444');
    glow(g, E.W * 0.5, E.H * 0.45, 120 + p * 30, '#ef4444', 0.4);
    text(g, '!', E.W * 0.5, E.H * 0.48, { size: 70, color: '#ffffff', font: FONTS.ui, weight: 900 });
    UI.callout(g, { text: 'URGENT COGNITIVE TENSION', x: E.W * 0.5 + 90, y: E.H * 0.45 });
  }
});

// s055 — "So the mind asks again."
registerShot('s055', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    UI.bubble(g, E.W * 0.45, E.H * 0.45, { w: 260, h: 56, str: 'Why did they pause?' });
  }
});

// s056 — "And again."
registerShot('s056', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    UI.bubble(g, E.W * 0.45, E.H * 0.38, { w: 260, h: 56, str: 'Why did they pause?' });
    UI.bubble(g, E.W * 0.55, E.H * 0.52, { w: 260, h: 56, str: 'What did they mean?' });
  }
});

// s057 — "Your brain would rather have an answer, even a bad one, than no answer at all."
registerShot('s057', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    // Comparison card: False Certainty vs Unanswered Question
    UI.compareBars(g, t, {
      title: 'BRAIN COGNITIVE PREFERENCE',
      items: [
        { label: 'ANY ANSWER (EVEN A BAD ONE)', value: 'PREFERRED', p: 0.95, color: '#f59e0b' },
        { label: 'AMBIGUITY / UNKNOWN', value: 'INTOLERABLE', p: 0.1, color: '#ef4444' }
      ],
      dur: info.dur
    });
  }
});

// s058 — "Then there is metacognition."
registerShot('s058', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    UI.bigLine(g, t, { line: 'METACOGNITION', y: E.H * 0.45, dur: info.dur });
  }
});

// s059 — "Thinking about your thinking."
registerShot('s059', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    // Nested thinking figures
    drawFigure(g, {
      x: E.W * 0.38, y: E.H * 0.72, s: 1.4, facing: 1, outfit: ALEX,
      pose: POSES.think, expr: 'thinking',
      rim: { color: '#38bdf8', dir: [1, 0], w: 4 }
    });
    // Above head: smaller miniature figure thinking
    drawFigure(g, {
      x: E.W * 0.62, y: E.H * 0.48, s: 0.7, facing: -1, outfit: ALEX,
      pose: POSES.think, expr: 'thinking',
      rim: { color: '#f59e0b', dir: [-1, 0], w: 3 }
    });
    circle(g, E.W * 0.52, E.H * 0.44, 8, '#38bdf8');
    circle(g, E.W * 0.48, E.H * 0.48, 5, '#38bdf8');
  }
});

// s060 — "In small doses it is a superpower."
registerShot('s060', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    glow(g, E.W * 0.5, E.H * 0.5, 200, '#fbbf24', 0.45);
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.72, s: 1.5, facing: 1, outfit: ALEX,
      pose: POSES.cheer, expr: 'joy',
      rim: { color: '#fbbf24', dir: [0, -1], w: 5 }
    });
    UI.badge(g, { text: 'SUPERPOWER', x: E.W * 0.5 - 55, y: E.H * 0.28, color: '#fbbf24' });
  }
});

// s061 — "It lets you check your own reasoning."
registerShot('s061', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    drawFigure(g, {
      x: E.W * 0.38, y: E.H * 0.72, s: 1.4, facing: 1, outfit: ALEX,
      pose: POSES.explain, expr: 'smile',
      rim: { color: '#38bdf8', dir: [1, 0], w: 4 }
    });
    UI.dataCard(g, t, {
      title: 'ERROR DETECTION',
      subtitle: 'REASONING AUDIT',
      from: 0, to: 100, decimals: 0, unit: '%',
      dur: info.dur * 0.8, total: info.dur
    });
  }
});

// s062 — "But it can also become a loop of its own."
registerShot('s062', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    // Two concentric loops
    drawLoopCircle(g, E.W * 0.5, E.H * 0.48, 160, t * 1.5);
    drawLoopCircle(g, E.W * 0.5, E.H * 0.48, 280, -t * 1.0);
  }
});

// s063 — "Worrying about worrying."
registerShot('s063', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.15, x: 0 });
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.72, s: 1.4, facing: 1, outfit: ALEX,
      pose: POSES.handsOnHead, expr: 'worried',
      rim: { color: '#ef4444', dir: [0, -1], w: 4 }
    });
    UI.bubble(g, E.W * 0.5, E.H * 0.32, { w: 380, h: 64, str: '"Why am I worrying so much?!"' });
  }
});

// s064 — "And stress turns the volume up."
registerShot('s064', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    // Analog volume knob dial cranking up
    const p = ease.inOut(prog(t, 0.2, info.dur * 0.8));
    const dialAngle = lerp(-Math.PI * 0.75, Math.PI * 0.75, p);
    g.save();
    g.translate(E.W * 0.5, E.H * 0.45);
    // Outer dial body
    circle(g, 0, 0, 90, '#1e293b');
    g.strokeStyle = '#ef4444';
    g.lineWidth = 6;
    g.beginPath();
    g.arc(0, 0, 80, -Math.PI * 0.75, dialAngle);
    g.stroke();
    // Needle pointer
    seg(g, [[0, 0], [Math.cos(dialAngle) * 75, Math.sin(dialAngle) * 75]], 6, '#ffffff');
    circle(g, 0, 0, 14, '#ef4444');
    g.restore();
    UI.readout(g, { label: 'CORTISOL / STRESS LEVEL:', value: `VOLUME ${(p * 10).toFixed(1)} / 10`, x: E.W * 0.5 - 120, y: E.H * 0.72 });
  }
});

// s065 — "Under pressure, attention narrows, and it becomes harder to step back."
registerShot('s065', {
  bars: 'scope',
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.2, x: 0 });
    const p = ease.out(prog(t, 0, info.dur * 0.8));

    // Tunnel vision spotlight narrowing
    const radius = lerp(480, 180, p);
    g.save();
    g.fillStyle = 'rgba(5, 7, 12, 0.88)';
    g.beginPath();
    g.rect(0, 0, E.W, E.H);
    g.arc(E.W * 0.5, E.H * 0.52, radius, 0, Math.PI * 2, true);
    g.fill();
    g.restore();

    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.72, s: 1.4, facing: 1, outfit: ALEX,
      pose: POSES.ready, expr: 'scared',
      rim: { color: '#ef4444', dir: [0, -1], w: 4 }
    });
  }
});
