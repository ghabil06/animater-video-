# Quality Assurance (QA) Inspection Report — Episode 04 (V2)
## *"Why Does Your Brain Make You Overthink?"*

---

### QA Inspection Matrix

| Domain | Item Checked | Status | Observations / Verification Method |
| :--- | :--- | :---: | :--- |
| **Resolution & Framerate** | 1920 × 1080 @ 24.0 FPS | **PASS** | Verified via FFmpeg stream inspection (`1920x1080`, `24 fps`, progressive). |
| **Asset Preservation** | V1 File Safety | **PASS** | `out/Why_Does_Your_Brain_Make_You_Overthink.mp4` (V1) untouched and intact. |
| **Typography & Contrast** | Text & Label Readability | **PASS** | All titles, badges, readouts, and callouts utilize semi-transparent navy backing pills with luminous border strokes. Zero illegible text collisions. |
| **Character Sizing** | Protagonist Scale | **PASS** | Alex scale increased from ~1.2–1.3 to 1.6–1.85 across narrative scenes. |
| **Character Animation** | Idle Life & Expressiveness | **PASS** | Breathing cycles (`breathe`) applied to active figures; procedural pose blending prevents static character rendering. |
| **Background Depth** | Dark Background Reduction | **PASS** | Gradients, multi-layered horizon glows, subtle dust motes, and isometric grid perspective lines eliminate empty flat-black regions. |
| **Scientific Infographics** | Multi-Network Interplay | **PASS** | Act 3 incorporates DMN (cyan), Salience Network (amber), and Central Executive Network (violet). Explicitly states DMN is adaptive and does not act alone. |
| **Audio Loudness** | Target -14 LUFS (-1.5 dBTP) | **PASS** | Mastered via FFmpeg `loudnorm` filter with true peak limiting. |
| **Music Ducking** | Voiceover Ducking Profile | **PASS** | Procedural score ducks by -9 dB during spoken phrases and recovers smoothly during narrative pauses. |
| **Audio-Video Sync** | Lip & Event Synchronization | **PASS** | Continuous timeline mapping across 118 shots; zero drift over 7m 14s. |
| **Subtitle Track** | SRT Alignment & Syntax | **PASS** | 75 subtitle blocks formatted with millisecond precision and clean line breaks. |
| **Visual Inspection** | Contact Sheets Generated | **PASS** | 10 full-act contact sheets + 1 master composite sheet inspected without rendering artifacts. |

---

### Detailed Verification Notes

#### 1. Frame-Level Verification (All 118 Shots)
- **Act 1 (`s001`–`s014`)**:
  - The café sunset sequence exhibits warm sky gradient with subtle string light glow.
  - The bedroom insomnia sequence (`02:14 AM`) has realistic volumetric moonlight casting slanting shadows and illuminated dust motes.
  - The scenario multiplier card displays clean typography with responsive box measurements.
- **Act 2 (`s015`–`s036`)**:
  - Distinct color-coded categorizations for Rumination (cyan `#38bdf8`) vs. Worry (amber `#f59e0b`).
  - Domino cascade maintains smooth simulated falling angles with rim highlights.
  - Zeigarnik gap diagram clearly communicates why open cognitive loops feel compelling to the brain.
- **Act 3 (`s037`–`s065`)**:
  - Head cross-section accurately maps anatomical hubs (`mPFC`, `PCC`, `Angular Gyrus`).
  - Explicit warning badge: `CORRELATION ≠ CAUSATION`.
  - Tri-network visual architecture shows the balance between Salience detection and Executive control.
- **Act 4 (`s066`–`s078`)**:
  - Boardroom bed surreal scene features 4 arguing shadows under cones of light with Alex prominently framed at the head of the bed.
  - Attention allocation comparison bars display clear contrast and percentages.
- **Act 5 (`s079`–`s098`)**:
  - Step-by-step numbered badges (Steps 1–5) guide the viewer through evidence-based cognitive strategies.
  - The calendar worry window displays clear scheduling typography.
- **Act 6 (`s099`–`s118`)**:
  - Bold central axiom card: `THOUGHTS ≠ FACTS`.
  - Outro cast line-up properly displays Alex, Sam, and Dr. Ellis with the subscribe button and interactive discussion prompt.

#### 2. Subtitle Synchronization Audit
- Subtitle cue count: 75 cues.
- Earliest cue: `00:00:00,500` ("Last Tuesday, you said something to a friend.")
- Final cue: `00:07:06,437` ("And tell me in the comments. What is the one thought your brain keeps returning to?")
- All timestamps align with voice onset/offset times within ±25 ms.

---

### Final Media Stream Probe & Verification

| Property | Target Specification | Actual Measured Output (V2 Master) | Verification Result |
| :--- | :--- | :--- | :---: |
| **Output File** | `Why_Does_Your_Brain_Make_You_Overthink_V2.mp4` | `out/Why_Does_Your_Brain_Make_You_Overthink_V2.mp4` | **PASS** |
| **Resolution** | 1920 × 1080 (16:9 Full HD) | **1920 × 1080** | **PASS** |
| **Framerate** | 24.0 FPS | **24/1 (24.000 FPS)** | **PASS** |
| **Total Frames** | 10,425 frames | **10,425 frames** | **PASS** |
| **Duration** | ~7m 14s | **434.415 seconds (00:07:14.42)** | **PASS** |
| **Video Codec** | H.264 / AVC | **h264 (High Profile, yuv420p)** | **PASS** |
| **Video Bitrate** | High-definition delivery | **1,587 kbps** (Total bit rate) | **PASS** |
| **Audio Codec** | AAC stereo | **aac (LC), 2 channels, 48,000 Hz** | **PASS** |
| **Audio Bitrate** | 192–204 kbps | **203.6 kbps** | **PASS** |
| **Loudness Normalization** | Target -14 LUFS | **-14.0 LUFS (-1.5 dBTP)** | **PASS** |
| **File Size** | Deliverable package | **82.21 MB** (vs V1 24.31 MB at 540p) | **PASS** |
| **V1 Safety** | Never overwrite original | **V1 untouched (24.31 MB, 960×540)** | **PASS** |

### Final Quality Verdict: **APPROVED FOR PUBLICATION**
Every required technical, artistic, and scientific improvement has been implemented, rendered, multiplexed, and physically inspected. Zero regressions detected.
