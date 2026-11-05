// scenes/shots/01_act1.js — ACT 1: "The Never-Ending Mind" (Shots s001 - s012)
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
    const cam = { z: 1 + 0.05 * ease.inOut(t / info.dur), x: -20 * ease.inOut(t / info.dur) };
    const { GY, M } = cafe(g, t, cam);
    const s = V(1.5, 1.6);
    const alexX = E.W * 0.42, samX = E.W * 0.62;

    layer(g, cam, 1, (g) => {
      // Chairs and table
      chair(g, alexX, GY, s, 1);
      chair(g, samX, GY, s, -1);
      const tb = cafeTable(g, (alexX + samX) * 0.5, GY);
      coffeeCup(g, (alexX + samX) * 0.5 - 18, tb.top, 1.1);
      coffeeCup(g, (alexX + samX) * 0.5 + 24, tb.top, 1.1);

      // Alex sitting, talking/gesturing with arm
      const alexPose = breathe(posesAt(t, [
        [0, POSES.sit],
        [2.2, { ...POSES.sit, eF: [22, -130], hF: [35, -165] }],
        [4.5, POSES.sit]
      ]), t, 1, 1);

      drawFigure(g, {
        x: alexX, y: GY, s, facing: 1, outfit: ALEX,
        pose: alexPose, expr: t > 4.8 ? 'neutral' : 'smile',
        rim: { color: M.rim, dir: [-1, -0.2], w: 4 }
      });

      // Sam sitting opposite, listening and smiling
      const samPose = breathe(POSES.sit, t, 1, 2);
      drawFigure(g, {
        x: samX, y: GY, s, facing: -1, outfit: SAM,
        pose: samPose, expr: 'smile',
        rim: { color: M.rim, dir: [-1, -0.2], w: 4 }
      });
    });

    FX.dust(g, t, { count: 30, color: '#ffd6a5', a: 0.3 });
  }
});

// s002 — Medium close: The awkward sentence
registerShot('s002', {
  draw(g, t, info) {
    const cam = { z: 1.8 + 0.1 * (t / info.dur), x: 40 };
    const { GY, M } = cafe(g, t, cam);
    const s = V(2.0, 2.2);
    const alexX = E.W * 0.48;

    layer(g, cam, 1, (g) => {
      const alexPose = posesAt(t, [
        [0, POSES.sit],
        [0.8, { ...POSES.sit, eF: [18, -120], hF: [28, -150] }]
      ]);
      drawFigure(g, {
        x: alexX, y: GY, s, facing: 1, outfit: ALEX,
        pose: alexPose, expr: t > 1.2 ? 'worried' : 'neutral',
        rim: { color: M.rim, dir: [-1, -0.2], w: 5 }
      });
    });

    // Subtle freeze / time-warp vignette in the background
    veil(g, '#181224', ease.inOut(prog(t, 1.2, 2.5)) * 0.35);
  }
});

// s003 — Wide bedroom: 2:14 AM in the dark
registerShot('s003', {
  bars: 'scope',
  draw(g, t, info) {
    const cam = { z: 1 + 0.04 * (t / info.dur), x: 0 };
    const { GY, M } = bedroom(g, t, cam);
    const bedX = E.W * 0.58;

    layer(g, cam, 1, (g) => {
      bed(g, bedX, GY, 1.4);
      nightstand(g, bedX - 260, GY, '02:14');

      // Alex lying on bed staring up at ceiling
      const liePose = { ...POSES.lie, rot: 0 };
      drawFigure(g, {
        x: bedX - 90, y: GY - 28, s: 1.3, facing: 1, rot: 0, outfit: ALEX,
        pose: liePose, expr: 'thinking',
        rim: { color: '#7dd3fc', dir: [-0.6, -1], w: 3 }
      });
    });

    FX.dust(g, t, { count: 20, color: '#93c5fd', a: 0.2 });
  }
});

// s004 — Giant face: Insomnia rumination
registerShot('s004', {
  bars: 'scope',
  draw(g, t, info) {
    blurLayer(g, 16, (g) => bedroom(g, t, { z: 1.6, x: -80 }));
    veil(g, '#090d14', 0.5);

    const r = V(300, 320) * (1 + 0.03 * (t / info.dur));
    bigFace(g, E.W * 0.5, E.H * V(0.58, 0.52), r, {
      outfit: ALEX,
      expr: 'worried',
      look: [0, -0.4], // looking up into the dark
      rimColor: '#7dd3fc',
      rimSide: -1,
      blink: false
    });

    // Faint ripples in the air above head
    FX.rings(g, E.W * 0.5, E.H * 0.32, t, {
      count: 3, r0: 40, r1: 220, speed: 0.8, color: '#38bdf8', a: 0.22
    });
  }
});

// s005 — Echoes of conversation: Ghost memory of Sam
registerShot('s005', {
  draw(g, t, info) {
    const { GY } = bedroom(g, t, { z: 1.1, x: 0 });
    veil(g, '#080c14', 0.6);

    // Floating translucent memory of Sam at the café
    const alphaFade = 0.45 + Math.sin(t * 3) * 0.15;
    g.save();
    g.globalAlpha = alphaFade;
    drawFigure(g, {
      x: E.W * 0.5, y: GY - 60, s: 1.4, facing: -1, outfit: SAM,
      pose: POSES.talk, expr: 'smile',
      rim: { color: '#f59e0b', dir: [0, -1], w: 4 }
    });
    g.restore();

    // Floating question thought bubble
    UI.bubble(g, E.W * 0.5, E.H * 0.32, {
      w: 380, h: 64, str: 'Did I say something wrong?'
    });
  }
});

// s006 — "You wonder if they noticed."
registerShot('s006', {
  draw(g, t, info) {
    const { GY } = bedroom(g, t, { z: 1.2, x: 0 });
    veil(g, '#080c14', 0.55);

    const r = V(260, 280);
    bigFace(g, E.W * 0.45, E.H * 0.55, r, {
      outfit: ALEX, expr: 'nervous', look: [0.3, -0.2],
      rimColor: '#38bdf8', rimSide: -1
    });

    UI.readout(g, {
      label: 'STATUS:', value: 'ANALYZING TONE...',
      x: E.W * 0.62, y: E.H * 0.45, a: ease.out(prog(t, 0.3, 0.9))
    });
  }
});

// s007 — 10 different ways it could have gone (Branching tree)
registerShot('s007', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1, x: 0 });
    const p = ease.out(prog(t, 0, info.dur));

    // Branching glowing lines
    const startX = E.W * 0.2, startY = E.H * 0.5;
    g.strokeStyle = '#38bdf8';
    g.lineWidth = 3;

    for (let i = 0; i < 10; i++) {
      const targetY = E.H * 0.15 + (i / 9) * E.H * 0.7;
      const targetX = E.W * 0.75;
      const curX = lerp(startX, targetX, p);
      const curY = lerp(startY, targetY, p);

      g.beginPath();
      g.moveTo(startX, startY);
      g.bezierCurveTo(startX + 180, startY, curX - 120, curY, curX, curY);
      g.stroke();

      if (p > 0.8) {
        circle(g, targetX, targetY, 6, '#fbbf24');
      }
    }

    circle(g, startX, startY, 14, '#38bdf8');
    UI.badge(g, { text: '10 SCENARIOS', x: V(120, 80), y: V(120, 100), color: '#38bdf8' });
  }
});

// s008 — And then you imagine ten more (Multiplier)
registerShot('s008', {
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1.1, x: 0 });

    UI.dataCard(g, t, {
      title: 'SCENARIO GENERATOR',
      subtitle: 'REHEARSED ALTERNATIVE FUTURES',
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
    const { GY } = thoughtSpace(g, t, { z: 1, x: 0 });
    drawLoopCircle(g, E.W * 0.5, E.H * 0.5, V(240, 260), t);

    // Silhouette of Alex standing at center of loop
    drawFigure(g, {
      x: E.W * 0.5, y: E.H * 0.62, s: 1.3, facing: 1, outfit: ALEX,
      pose: POSES.think, expr: 'thinking',
      rim: { color: '#38bdf8', dir: [0, -1], w: 3 }
    });
  }
});

// s010 — The day is over. The room is quiet.
registerShot('s010', {
  bars: 'scope',
  draw(g, t, info) {
    const { GY } = bedroom(g, t, { z: 0.95 + 0.03 * (t / info.dur), x: 0 });
    // Still quiet night
    nightstand(g, E.W * 0.35, GY, '02:15');
    bed(g, E.W * 0.62, GY, 1.4);
    veil(g, '#080c14', 0.25);
  }
});

// s011 — Everyone else has moved on.
registerShot('s011', {
  draw(g, t, info) {
    const GY = E.H * 0.8;
    // Distant sleeping city skyline
    g.fillStyle = '#060810';
    g.fillRect(0, 0, E.W, E.H);
    FX.skyline(g, GY, { color: '#0f172a', density: 1.5, hMax: 240, winAlpha: 0.1 });
    FX.stars(g, t, { count: 60, a: 0.5 });
  }
});

// s012 — Title Card: "WHY DOES YOUR BRAIN MAKE YOU OVERTHINK?"
registerShot('s012', {
  bars: 'scope',
  draw(g, t, info) {
    thoughtSpace(g, t, { z: 1 + 0.05 * (t / info.dur) });
    drawLoopCircle(g, E.W * 0.5, E.H * 0.48, V(280, 300), t);

    // Cinematic Title Card
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
    const { GY } = thoughtSpace(g, t, { z: 1.1, x: 0 });
    // Protective glowing aura / shield in front of Alex
    const shieldP = ease.out(prog(t, 0.2, 0.8));
    g.save();
    g.strokeStyle = '#38bdf8';
    g.lineWidth = 4;
    g.beginPath();
    g.arc(E.W * 0.54, E.H * 0.52, 140 * shieldP, -Math.PI * 0.35, Math.PI * 0.35);
    g.stroke();
    glow(g, E.W * 0.54, E.H * 0.52, 160 * shieldP, '#38bdf8', 0.25);
    g.restore();

    drawFigure(g, {
      x: E.W * 0.48, y: GY - 20, s: 1.4, facing: 1, outfit: ALEX,
      pose: POSES.ready, expr: 'determined',
      rim: { color: '#38bdf8', dir: [1, 0], w: 4 }
    });
  }
});

// s014 — "Or is it creating problems that were never there?" (Dissolving phantom shadows)
registerShot('s014', {
  draw(g, t, info) {
    const { GY } = thoughtSpace(g, t, { z: 1.2, x: 0 });
    const fade = 1 - ease.inOut(prog(t, 0.4, info.dur * 0.9));

    // Phantom shadow figures dissolving away
    g.save();
    g.globalAlpha = fade * 0.4;
    drawFigure(g, {
      x: E.W * 0.72, y: GY - 20, s: 1.5, facing: -1,
      outfit: { top: 'none' }, pose: POSES.crossArms, expr: 'neutral'
    });
    g.restore();

    drawFigure(g, {
      x: E.W * 0.38, y: GY - 20, s: 1.4, facing: 1, outfit: ALEX,
      pose: POSES.shrug, expr: 'confused',
      rim: { color: '#fbbf24', dir: [0, -1], w: 4 }
    });
  }
});
