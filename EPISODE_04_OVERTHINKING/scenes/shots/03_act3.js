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
    const cam = { z: 1.05 + 0.08 * (t / info.dur), x: -20 * (t / info.dur) };
    brainSpace(g, t, cam);
    drawFigure(g, {
      x: E.W * 0.30, y: E.H * 0.72, s: 1.75, facing: 1, outfit: DR_ELLIS,
      pose: breathe(POSES.point, t), expr: 'explain',
      rim: { color: '#38bdf8', dir: [1, 0], w: 4.5 }
    });
    drawBrainNetwork(g, E.W * 0.68, E.H * 0.48, 1.15, t, { pulseDMN: false, labelNodes: false });
  }
});

// s038 — "In the nineteen nineties and two thousands,"
registerShot('s038', {
  draw(g, t, info) {
    brainSpace(g, t, { z: 1.05, x: 0 });
    UI.badge(g, { text: '1990s — 2000s NEUROIMAGING REVOLUTION', x: E.W * 0.5, y: E.H * 0.32, color: '#f59e0b' });
    UI.bigLine(g, t, { line: 'MAPPING NEURAL NETWORKS', sub: 'RESTING-STATE fMRI DISCOVERY', y: E.H * 0.50, dur: info.dur });
  }
});

// s039 — "neuroscientists began mapping a set of brain regions that become more active"
registerShot('s039', {
  draw(g, t, info) {
    brainSpace(g, t, { z: 1.12, x: 0 });
    drawBrainNetwork(g, E.W * 0.5, E.H * 0.48, 1.35, t, { pulseDMN: true, labelNodes: false });
  }
});

// s040 — "when you are not focused on the outside world."
registerShot('s040', {
  draw(g, t, info) {
    brainSpace(g, t, { z: 1.16, x: 0 });
    drawBrainNetwork(g, E.W * 0.5, E.H * 0.48, 1.35, t, { pulseDMN: true, labelNodes: false });
    UI.readout(g, { label: 'EXTERNAL TASK FOCUS:', value: 'IDLE (RESTING-STATE BASELINE)', x: V(140, 90), y: E.H - V(160, 520) });
  }
});

// s041 — "It is called the default mode network."
registerShot('s041', {
  bars: 'scope',
  draw(g, t, info) {
    brainSpace(g, t, { z: 1.2, x: 0 });
    drawBrainNetwork(g, E.W * 0.5, E.H * 0.46, 1.4, t, { pulseDMN: true, labelNodes: true });
    UI.titleCard(g, t, {
      lines: ['DEFAULT MODE', 'NETWORK (DMN)'],
      sub: 'DISCOVERED BY MARCUS RAICHLE & COLLEAGUES',
      dur: info.dur
    });
  }
});

// s042 — "It is active when you daydream, remember,"
registerShot('s042', {
  draw(g, t, info) {
    brainSpace(g, t, { z: 1.08, x: 0 });
    drawBrainNetwork(g, E.W * 0.38, E.H * 0.52, 1.15, t, { pulseDMN: true, labelNodes: true });
    UI.badge(g, { text: '1. SPONTANEOUS DAYDREAMING', x: E.W * 0.74, y: E.H * 0.36, color: '#38bdf8' });
    UI.badge(g, { text: '2. AUTOBIOGRAPHICAL MEMORY', x: E.W * 0.74, y: E.H * 0.52, color: '#38bdf8' });
  }
});

// s043 — "imagine the future, or think about yourself."
registerShot('s043', {
  draw(g, t, info) {
    brainSpace(g, t, { z: 1.08, x: 0 });
    drawBrainNetwork(g, E.W * 0.38, E.H * 0.52, 1.15, t, { pulseDMN: true, labelNodes: true });
    UI.badge(g, { text: '3. SIMULATING FUTURE SCENARIOS', x: E.W * 0.74, y: E.H * 0.36, color: '#f59e0b' });
    UI.badge(g, { text: '4. SELF-REFERENTIAL COGNITION', x: E.W * 0.74, y: E.H * 0.52, color: '#f59e0b' });
  }
});

// s044 — "Researchers have linked activity in this network to self-generated thought,"
registerShot('s044', {
  draw(g, t, info) {
    brainSpace(g, t, { z: 1.05, x: 0 });
    UI.dataCard(g, t, {
      title: 'DMN FUNCTIONAL CONNECTIVITY & RUMINATION',
      subtitle: 'RESTING-STATE fMRI CORRELATION COEFFICIENT',
      from: 0.20, to: 0.76, decimals: 2, unit: ' r',
      dur: info.dur * 0.8, total: info.dur
    });
  }
});

// s045 — "including rumination."
registerShot('s045', {
  draw(g, t, info) {
    brainSpace(g, t, { z: 1.2, x: 0 });
    drawBrainNetwork(g, E.W * 0.5, E.H * 0.48, 1.35, t, { pulseDMN: true, labelNodes: true });
    UI.callout(g, t, { text: 'CORRELATED HYPERCONNECTIVITY IN RUMINATION', at: [E.W * 0.5 + 40, E.H * 0.42], to: [E.W * 0.5 + 160, E.H * 0.30], color: '#38bdf8' });
  }
});

// s046 — "But here is the careful part."
registerShot('s046', {
  draw(g, t, info) {
    const cam = { z: 1.22 + 0.05 * (t / info.dur), x: 0 };
    brainSpace(g, t, cam);
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.72, s: 1.85, facing: 1, outfit: DR_ELLIS,
      pose: breathe(POSES.explain, t), expr: 'explain',
      rim: { color: '#f59e0b', dir: [0, -1], w: 4.5 }
    });
  }
});

// s047 — "A correlation is not a cause."
registerShot('s047', {
  draw(g, t, info) {
    brainSpace(g, t, { z: 1.05, x: 0 });
    g.save();
    rr(g, E.W * 0.5 - 380, E.H * 0.32, 760, 180, 20);
    g.fillStyle = 'rgba(10, 16, 32, 0.92)';
    g.fill();
    g.strokeStyle = '#ef4444';
    g.lineWidth = 3.5;
    g.stroke();

    UI.badge(g, { text: 'CRITICAL SCIENTIFIC DISTINCTION', x: E.W * 0.5, y: E.H * 0.38, color: '#f59e0b', bg: false });
    text(g, 'CORRELATION ≠ CAUSATION', E.W * 0.5, E.H * 0.45, {
      size: 42, color: '#f8fafc', font: FONTS.ui, weight: 900
    });
    text(g, 'The Default Mode Network alone does NOT cause overthinking.', E.W * 0.5, E.H * 0.51, {
      size: 19, color: '#94a3b8', font: FONTS.ui, weight: 900
    });
    g.restore();
  }
});

// s048 — "The default mode network is not a broken part that makes you overthink."
registerShot('s048', {
  draw(g, t, info) {
    brainSpace(g, t, { z: 1.15, x: 0 });
    drawBrainNetwork(g, E.W * 0.5, E.H * 0.46, 1.3, t, {
      showDMN: true, showSalience: true, showControl: true, labelNodes: true, showLegend: true
    });
    UI.badge(g, { text: 'ADAPTIVE MULTI-NETWORK SYSTEM', x: E.W * 0.5, y: E.H * 0.16, color: '#10b981' });
    UI.readout(g, { label: 'DMN STATUS:', value: 'HEALTHY / VITAL FOR MEMORY & PLANNING', x: V(140, 90), y: E.H - V(160, 520), color: '#10b981' });
  }
});

// s049 — "It is a system for imagining and remembering."
registerShot('s049', {
  draw(g, t, info) {
    brainSpace(g, t, { z: 1.12, x: 0 });
    drawBrainNetwork(g, E.W * 0.5, E.H * 0.46, 1.3, t, {
      showDMN: true, showSalience: false, showControl: false, labelNodes: true
    });
    UI.bigLine(g, t, { line: 'MEMORY CONSOLIDATION & IMAGINATION', sub: 'ESSENTIAL FOR EMPATHY, CREATIVITY & PLANNING', y: E.H * 0.82, dur: info.dur });
  }
});

// s050 — "Overthinking may be that system running without a destination."
registerShot('s050', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.12, x: 0 });
    const cx = E.W * 0.5, cy = E.H * 0.48, r = 250;
    g.strokeStyle = '#38bdf8';
    g.lineWidth = 4.5;
    g.beginPath();
    g.arc(cx, cy, r, 0, Math.PI * 2);
    g.stroke();

    const angle = t * 1.5;
    circle(g, cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, 18, '#f59e0b');
    glow(g, cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, 45, '#f59e0b', 0.55);

    UI.readout(g, { label: 'EXECUTIVE BRAKE:', value: 'FAILED TO DISENGAGE', x: cx - 130, y: cy + 30 });
    UI.badge(g, { text: 'DMN RUNNING WITHOUT TERMINATION', x: cx, y: cy - 40, color: '#f59e0b' });
  }
});

// s051 — "There is a second player. Uncertainty."
registerShot('s051', {
  bars: 'scope',
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    circle(g, E.W * 0.5, E.H * 0.38, 56, '#ef4444');
    glow(g, E.W * 0.5, E.H * 0.38, 100, '#ef4444', 0.5);
    text(g, '?', E.W * 0.5, E.H * 0.41, { size: 68, color: '#ffffff', font: FONTS.ui, weight: 900 });
    UI.bigLine(g, t, { line: 'UNCERTAINTY', sub: 'THE SECOND COGNITIVE DRIVER', y: E.H * 0.62, dur: info.dur });
  }
});

// s052 — "Psychologists describe intolerance of uncertainty."
registerShot('s052', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.08, x: 0 });
    UI.dataCard(g, t, {
      title: 'INTOLERANCE OF UNCERTAINTY (IU)',
      subtitle: 'NEGATIVE EMOTIONAL RESPONSE TO AMBIGUITY',
      from: 10, to: 94, decimals: 0, unit: '%',
      dur: info.dur * 0.8, total: info.dur
    });
  }
});

// s053 — "The tendency to find I do not know genuinely uncomfortable."
registerShot('s053', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.12, x: 0 });
    UI.bubble(g, E.W * 0.5, E.H * 0.36, {
      w: 420, h: 72, str: '"I do not know."'
    });
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.72, s: 1.65, facing: 1, outfit: ALEX,
      pose: breathe(POSES.sad, t), expr: 'worried',
      rim: { color: '#ef4444', dir: [0, -1], w: 4.5 }
    });
  }
});

// s054 — "For some people, an unanswered question feels like an itch that must be scratched."
registerShot('s054', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.08, x: 0 });
    const p = Math.sin(t * 8) * 0.5 + 0.5;
    circle(g, E.W * 0.5, E.H * 0.44, 66 + p * 16, '#ef4444');
    glow(g, E.W * 0.5, E.H * 0.44, 130 + p * 30, '#ef4444', 0.45);
    text(g, '!', E.W * 0.5, E.H * 0.48, { size: 76, color: '#ffffff', font: FONTS.ui, weight: 900 });
    UI.callout(g, t, { text: 'URGENT COGNITIVE TENSION', at: [E.W * 0.5, E.H * 0.44], to: [E.W * 0.5 + 140, E.H * 0.44], color: '#ef4444' });
  }
});

// s055 — "So the mind asks again."
registerShot('s055', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.08, x: 0 });
    UI.bubble(g, E.W * 0.45, E.H * 0.44, { w: 320, h: 64, str: 'Why did they pause?' });
  }
});

// s056 — "And again."
registerShot('s056', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.12, x: 0 });
    UI.bubble(g, E.W * 0.44, E.H * 0.36, { w: 320, h: 62, str: 'Why did they pause?' });
    UI.bubble(g, E.W * 0.56, E.H * 0.52, { w: 320, h: 62, str: 'What did they mean?' });
  }
});

// s057 — "Your brain would rather have an answer, even a bad one, than no answer at all."
registerShot('s057', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    UI.compareBars(g, t, {
      title: 'COGNITIVE PREFERENCE UNDER UNCERTAINTY',
      rows: [
        { label: 'ANY ANSWER (EVEN CATASTROPHIC)', v: 0.94, color: '#f59e0b' },
        { label: 'TOLERATING THE UNKNOWN', v: 0.08, color: '#ef4444' }
      ]
    });
  }
});

// s058 — "Then there is metacognition."
registerShot('s058', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    UI.bigLine(g, t, { line: 'METACOGNITION', sub: 'THINKING ABOUT YOUR OWN THINKING', y: E.H * 0.45, dur: info.dur });
  }
});

// s059 — "Thinking about your thinking."
registerShot('s059', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });
    drawFigure(g, {
      x: E.W * 0.38, y: E.H * 0.72, s: 1.65, facing: 1, outfit: ALEX,
      pose: breathe(POSES.think, t), expr: 'thinking',
      rim: { color: '#38bdf8', dir: [1, 0], w: 4.5 }
    });
    drawFigure(g, {
      x: E.W * 0.62, y: E.H * 0.46, s: 0.85, facing: -1, outfit: ALEX,
      pose: breathe(POSES.think, t, 0.8), expr: 'thinking',
      rim: { color: '#f59e0b', dir: [-1, 0], w: 3.5 }
    });
    circle(g, E.W * 0.52, E.H * 0.44, 9, '#38bdf8');
    circle(g, E.W * 0.47, E.H * 0.48, 6, '#38bdf8');
  }
});

// s060 — "In small doses it is a superpower."
registerShot('s060', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.12, x: 0 });
    glow(g, E.W * 0.5, E.H * 0.5, 240, '#fbbf24', 0.5);
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.72, s: 1.75, facing: 1, outfit: ALEX,
      pose: breathe(POSES.cheer, t), expr: 'smile',
      rim: { color: '#fbbf24', dir: [0, -1], w: 5 }
    });
    UI.badge(g, { text: 'ADAPTIVE SUPERPOWER', x: E.W * 0.5, y: E.H * 0.26, color: '#fbbf24' });
  }
});

// s061 — "It lets you check your own reasoning."
registerShot('s061', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    drawFigure(g, {
      x: E.W * 0.36, y: E.H * 0.72, s: 1.65, facing: 1, outfit: ALEX,
      pose: breathe(POSES.explain, t), expr: 'smile',
      rim: { color: '#38bdf8', dir: [1, 0], w: 4.5 }
    });
    UI.dataCard(g, t, {
      title: 'METACOGNITIVE MONITORING',
      subtitle: 'REASONING AUDIT & ERROR CORRECTION',
      from: 0, to: 100, decimals: 0, unit: '%',
      dur: info.dur * 0.8, total: info.dur
    });
  }
});

// s062 — "But it can also become a loop of its own."
registerShot('s062', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.12, x: 0 });
    drawLoopCircle(g, E.W * 0.5, E.H * 0.48, 170, t * 1.5);
    drawLoopCircle(g, E.W * 0.5, E.H * 0.48, 290, -t * 1.0);
    UI.badge(g, { text: 'SECOND-ORDER RECURSIVE LOOP', x: E.W * 0.5, y: E.H * 0.16, color: '#ef4444' });
  }
});

// s063 — "Worrying about worrying."
registerShot('s063', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.16, x: 0 });
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.72, s: 1.7, facing: 1, outfit: ALEX,
      pose: breathe(POSES.handsOnHead, t), expr: 'worried',
      rim: { color: '#ef4444', dir: [0, -1], w: 4.5 }
    });
    UI.bubble(g, E.W * 0.5, E.H * 0.30, { w: 440, h: 72, str: '"Why am I worrying so much?!"' });
  }
});

// s064 — "And stress turns the volume up."
registerShot('s064', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    const p = ease.inOut(prog(t, 0.2, info.dur * 0.8));
    const dialAngle = lerp(-Math.PI * 0.75, Math.PI * 0.75, p);
    g.save();
    g.translate(E.W * 0.5, E.H * 0.44);
    circle(g, 0, 0, 96, '#1e293b');
    g.strokeStyle = '#ef4444';
    g.lineWidth = 7;
    g.beginPath();
    g.arc(0, 0, 84, -Math.PI * 0.75, dialAngle);
    g.stroke();
    glow(g, Math.cos(dialAngle) * 80, Math.sin(dialAngle) * 80, 24, '#ef4444', 0.6);
    seg(g, [[0, 0], [Math.cos(dialAngle) * 78, Math.sin(dialAngle) * 78]], 7, '#ffffff');
    circle(g, 0, 0, 16, '#ef4444');
    g.restore();
    UI.readout(g, { label: 'PHYSIOLOGICAL AROUSAL:', value: `STRESS VOLUME ${(p * 10).toFixed(1)} / 10`, x: E.W * 0.5 - 140, y: E.H * 0.72, color: '#ef4444' });
  }
});

// s065 — "Under pressure, attention narrows, and it becomes harder to step back."
registerShot('s065', {
  bars: 'scope',
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.22, x: 0 });
    const p = ease.out(prog(t, 0, info.dur * 0.8));

    const radius = lerp(500, 190, p);
    g.save();
    g.fillStyle = 'rgba(4, 7, 14, 0.90)';
    g.beginPath();
    g.rect(0, 0, E.W, E.H);
    g.arc(E.W * 0.5, E.H * 0.52, radius, 0, Math.PI * 2, true);
    g.fill();
    g.restore();

    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.72, s: 1.7, facing: 1, outfit: ALEX,
      pose: breathe(POSES.ready, t), expr: 'scared',
      rim: { color: '#ef4444', dir: [0, -1], w: 4.5 }
    });
    UI.badge(g, { text: 'COGNITIVE TUNNEL VISION', x: E.W * 0.5, y: E.H * 0.22, color: '#ef4444' });
  }
});
