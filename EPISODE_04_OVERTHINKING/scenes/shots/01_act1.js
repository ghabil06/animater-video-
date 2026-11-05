// scenes/shots/01_act1.js — ACT 1: "The Never-Ending Mind" (Shots s001 - s014)
import {
  E, V, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, shake,
  seg, circle, ring, rr, glow, alpha, shade, linGrad
} from '../../studio/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, bigFace, headPos } from '../../studio/engine/rig2d.js';
import * as FX from '../../studio/engine/fx2d.js';
import * as UI from '../../studio/engine/ui2d.js';
import { cafe, cafeTable, coffeeCup } from '../sets/cafe.js';
import { bedroom, bed, nightstand } from '../sets/bedroom.js';
import { thoughtSpace, drawLoopCircle } from '../sets/thought.js';
import { ALEX, SAM } from '../cast.js';

// Helper for chair
function chair(g, x, GY, s, facing) {
  g.save();
  g.translate(x, 0);
  g.scale(facing, 1);
  FX.chair(g, -15 * s, GY, s, '#1c1524');
  g.restore();
}

// s001 — Café wide: Alex and Sam chatting at sunset
registerShot('s001', {
  draw(g, t, info) {
    const cam = { z: 1.02 + 0.06 * ease.inOut(t / info.dur), x: -25 * ease.inOut(t / info.dur) };
    const { GY, M } = cafe(g, t, cam);
    const s = 1.65;
    const alexX = E.W * 0.40, samX = E.W * 0.64;

    layer(g, cam, 1, (g) => {
      chair(g, alexX, GY, s, 1);
      chair(g, samX, GY, s, -1);
      const tb = cafeTable(g, (alexX + samX) * 0.5, GY);
      coffeeCup(g, (alexX + samX) * 0.5 - 22, tb.top, 1.15);
      coffeeCup(g, (alexX + samX) * 0.5 + 26, tb.top, 1.15);

      const alexPose = breathe(posesAt(t, [
        [0, POSES.sit],
        [2.2, { ...POSES.sit, eF: [22, -130], hF: [35, -165] }],
        [4.5, POSES.sit]
      ]), t, 1, 1);

      drawFigure(g, {
        x: alexX, y: GY, s, facing: 1, outfit: ALEX,
        pose: alexPose, expr: t > 4.8 ? 'neutral' : 'smile',
        rim: { color: M.rim, dir: [-1, -0.2], w: 4.5 }
      });

      const samPose = breathe(POSES.sit, t, 1, 2);
      drawFigure(g, {
        x: samX, y: GY, s, facing: -1, outfit: SAM,
        pose: samPose, expr: 'smile',
        rim: { color: M.rim, dir: [-1, -0.2], w: 4.5 }
      });
    });

    FX.dust(g, t, { count: 28, color: '#ffd6a5', a: 0.35 });
  }
});

// s002 — Medium close: The awkward sentence
registerShot('s002', {
  draw(g, t, info) {
    const cam = { z: 1.85 + 0.12 * (t / info.dur), x: 35 };
    const { GY, M } = cafe(g, t, cam);
    const s = 2.25;
    const alexX = E.W * 0.48;

    layer(g, cam, 1, (g) => {
      const alexPose = breathe(posesAt(t, [
        [0, POSES.sit],
        [0.8, { ...POSES.sit, eF: [18, -120], hF: [28, -150] }]
      ]), t, 0.8, 1);
      drawFigure(g, {
        x: alexX, y: GY, s, facing: 1, outfit: ALEX,
        pose: alexPose, expr: t > 1.2 ? 'worried' : 'neutral',
        rim: { color: M.rim, dir: [-1, -0.2], w: 5 }
      });
    });

    veil(g, '#181224', ease.inOut(prog(t, 1.2, 2.5)) * 0.35);
  }
});

// s003 — Wide bedroom: 2:14 AM in the dark
registerShot('s003', {
  bars: 'scope',
  draw(g, t, info) {
    const cam = { z: 1.05 + 0.05 * (t / info.dur), x: 0 };
    const { GY, M } = bedroom(g, t, cam);
    const bedX = E.W * 0.58;

    layer(g, cam, 1, (g) => {
      bed(g, bedX, GY, 1.5);
      nightstand(g, bedX - 290, GY, '02:14');

      const liePose = breathe({ ...POSES.lie, rot: 0 }, t, 0.8, 3);
      drawFigure(g, {
        x: bedX - 100, y: GY - 30, s: 1.6, facing: 1, rot: 0, outfit: ALEX,
        pose: liePose, expr: 'thinking',
        rim: { color: '#7dd3fc', dir: [-0.6, -1], w: 3.5 }
      });
    });

    FX.dust(g, t, { count: 24, color: '#93c5fd', a: 0.25 });
  }
});

// s004 — Giant face: Insomnia rumination
registerShot('s004', {
  bars: 'scope',
  draw(g, t, info) {
    blurLayer(g, 16, (g) => bedroom(g, t, { z: 1.65, x: -80 }));
    veil(g, '#090d14', 0.52);

    const r = V(320, 340) * (1 + 0.03 * (t / info.dur));
    bigFace(g, E.W * 0.5, E.H * V(0.58, 0.52), r, {
      outfit: ALEX,
      expr: 'worried',
      look: [0, -0.4],
      rimColor: '#7dd3fc',
      rimSide: -1,
      blink: false
    });

    FX.rings(g, E.W * 0.5, E.H * 0.32, t, {
      count: 3, r0: 40, r1: 240, speed: 0.8, color: '#38bdf8', a: 0.25
    });
  }
});

// s005 — Echoes of conversation: Ghost memory of Sam
registerShot('s005', {
  draw(g, t, info) {
    const { GY } = bedroom(g, t, { z: 1.15, x: 0 });
    veil(g, '#080c14', 0.58);

    const alphaFade = 0.50 + Math.sin(t * 3) * 0.15;
    g.save();
    g.globalAlpha = alphaFade;
    drawFigure(g, {
      x: E.W * 0.5, y: GY - 60, s: 1.65, facing: -1, outfit: SAM,
      pose: breathe(POSES.talk, t), expr: 'smile',
      rim: { color: '#f59e0b', dir: [0, -1], w: 4 }
    });
    g.restore();

    UI.bubble(g, E.W * 0.5, E.H * 0.30, {
      w: 420, h: 68, str: 'Did I say something wrong?'
    });
  }
});

// s006 — "You wonder if they noticed."
registerShot('s006', {
  draw(g, t, info) {
    const { GY } = bedroom(g, t, { z: 1.25, x: 0 });
    veil(g, '#080c14', 0.52);

    const r = V(280, 300);
    bigFace(g, E.W * 0.44, E.H * 0.55, r, {
      outfit: ALEX, expr: 'nervous', look: [0.3, -0.2],
      rimColor: '#38bdf8', rimSide: -1
    });

    UI.readout(g, {
      label: 'INTERNAL STATUS:', value: 'ANALYZING SOCIAL CUES...',
      x: E.W * 0.60, y: E.H * 0.45, a: ease.out(prog(t, 0.3, 0.9))
    });
  }
});

// s007 — 10 different ways it could have gone (Branching tree)
registerShot('s007', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.05, x: 0 });
    const p = ease.out(prog(t, 0, info.dur));

    const startX = E.W * 0.22, startY = E.H * 0.5;
    g.strokeStyle = '#38bdf8';
    g.lineWidth = 3.5;

    for (let i = 0; i < 10; i++) {
      const targetY = E.H * 0.16 + (i / 9) * E.H * 0.68;
      const targetX = E.W * 0.78;
      const curX = lerp(startX, targetX, p);
      const curY = lerp(startY, targetY, p);

      g.beginPath();
      g.moveTo(startX, startY);
      g.bezierCurveTo(startX + 190, startY, curX - 130, curY, curX, curY);
      g.stroke();

      if (p > 0.8) {
        circle(g, targetX, targetY, 7, '#fbbf24');
        glow(g, targetX, targetY, 18, '#fbbf24', 0.5);
      }
    }

    circle(g, startX, startY, 16, '#38bdf8');
    glow(g, startX, startY, 32, '#38bdf8', 0.6);
    UI.badge(g, { text: '10 BRANCHING SCENARIOS', x: V(140, 90), y: V(130, 110), color: '#38bdf8' });
  }
});

// s008 — And then you imagine ten more (Multiplier)
registerShot('s008', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.12, x: 0 });

    UI.dataCard(g, t, {
      title: 'SCENARIO GENERATOR',
      subtitle: 'REHEARSED HYPOTHETICAL OUTCOMES',
      from: 10,
      to: 20,
      decimals: 0,
      unit: '',
      dur: info.dur * 0.8,
      total: info.dur
    });
  }
});

// s009 — Mind never stops thinking (The circular thought loop)
registerShot('s009', {
  draw(g, t, info) {
    const { GY } = thoughtSpace(g, t, { z: 1.08, x: 0 });
    drawLoopCircle(g, E.W * 0.5, E.H * 0.5, V(250, 270), t);

    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.64, s: 1.65, facing: 1, outfit: ALEX,
      pose: breathe(POSES.think, t), expr: 'thinking',
      rim: { color: '#38bdf8', dir: [0, -1], w: 3.5 }
    });
  }
});

// s010 — The day is over. The room is quiet.
registerShot('s010', {
  bars: 'scope',
  draw(g, t, info) {
    const { GY } = bedroom(g, t, { z: 0.98 + 0.04 * (t / info.dur), x: 0 });
    nightstand(g, E.W * 0.32, GY, '02:15');
    bed(g, E.W * 0.62, GY, 1.5);
    veil(g, '#080c14', 0.25);
  }
});

// s011 — Everyone else has moved on.
registerShot('s011', {
  draw(g, t, info) {
    const GY = E.H * 0.82;
    const bg = linGrad(g, 0, 0, 0, E.H, [
      [0, '#040710'],
      [0.6, '#0b1329'],
      [1, '#152445']
    ]);
    g.fillStyle = bg;
    g.fillRect(0, 0, E.W, E.H);
    FX.skyline(g, GY, { color: '#0c1527', density: 1.5, hMax: 260, winAlpha: 0.15 });
    FX.stars(g, t, { count: 70, a: 0.6 });
    glow(g, E.W * 0.5, GY, E.W * 0.6, '#1e3a5f', 0.35);
  }
});

// s012 — Title Card: "WHY DOES YOUR BRAIN MAKE YOU OVERTHINK?"
registerShot('s012', {
  bars: 'scope',
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1 + 0.05 * (t / info.dur) });
    drawLoopCircle(g, E.W * 0.5, E.H * 0.48, V(290, 310), t);

    UI.titleCard(g, t, {
      lines: ['WHY DOES YOUR BRAIN', 'MAKE YOU OVERTHINK?'],
      sub: 'MEMORY PULSE  ·  EPISODE 04',
      dur: info.dur
    });
  }
});

// s013 — "Is your brain trying to protect you?" (Shield / protective impulse)
registerShot('s013', {
  draw(g, t, info) {
    const { GY } = thoughtSpace(g, t, { z: 1.15 + 0.05 * (t / info.dur), x: 0 });
    const shieldP = ease.out(prog(t, 0.2, 0.8));
    g.save();
    g.strokeStyle = '#38bdf8';
    g.lineWidth = 4.5;
    g.beginPath();
    g.arc(E.W * 0.55, E.H * 0.52, 160 * shieldP, -Math.PI * 0.35, Math.PI * 0.35);
    g.stroke();
    glow(g, E.W * 0.55, E.H * 0.52, 180 * shieldP, '#38bdf8', 0.35);
    g.restore();

    drawFigure(g, {
      x: E.W * 0.46, y: GY - 20, s: 1.65, facing: 1, outfit: ALEX,
      pose: breathe(POSES.ready, t), expr: 'determined',
      rim: { color: '#38bdf8', dir: [1, 0], w: 4.5 }
    });
  }
});

// s014 — "Or is it creating problems that were never there?" (Dissolving phantom shadows)
registerShot('s014', {
  draw(g, t, info) {
    const { GY } = thoughtSpace(g, t, { z: 1.2, x: 0 });
    const fade = 1 - ease.inOut(prog(t, 0.4, info.dur * 0.9));

    g.save();
    g.globalAlpha = fade * 0.45;
    drawFigure(g, {
      x: E.W * 0.74, y: GY - 20, s: 1.7, facing: -1,
      outfit: { top: 'none' }, pose: breathe(POSES.crossArms, t, 0.6), expr: 'neutral'
    });
    g.restore();

    drawFigure(g, {
      x: E.W * 0.36, y: GY - 20, s: 1.65, facing: 1, outfit: ALEX,
      pose: breathe(POSES.shrug, t), expr: 'confused',
      rim: { color: '#fbbf24', dir: [0, -1], w: 4.5 }
    });
  }
});
