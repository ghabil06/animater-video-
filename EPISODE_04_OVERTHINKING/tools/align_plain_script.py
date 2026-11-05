import json, os, re, wave
from common import write_timeline, save_json, ts
from parse_script import spread_words

PROJECT = os.path.dirname(os.path.dirname(__file__))
SCRIPT_PATH = os.path.join(PROJECT, "input", "script.txt")
VOICE_PATH = os.path.join(PROJECT, "input", "voiceover.wav")

with wave.open(VOICE_PATH, "rb") as w:
    total_duration = w.getnframes() / float(w.getframerate())

with open(SCRIPT_PATH, encoding="utf-8") as f:
    raw_lines = [l.strip() for l in f if l.strip() and not l.strip().startswith("#")]

# Weight each line by characters + punctuation pause weight
def line_weight(line):
    # Extra pause for sentences ending with period/question
    pause_bonus = 8 if re.search(r"[.?!]$", line) else 4
    return len(line) + pause_bonus

weights = [line_weight(l) for l in raw_lines]
total_weight = sum(weights)

cues = []
acc = 0.5  # 0.5s initial breath
available_time = total_duration - 1.5  # keep 1s tail
for line, w in zip(raw_lines, weights):
    d = (w / total_weight) * available_time
    cues.append({
        "start": round(acc, 3),
        "end": round(acc + d * 0.95, 3),
        "text": line
    })
    acc += d

words = spread_words(cues, total_duration)
sentences = [{"i": i, "start": c["start"], "end": c["end"], "text": c["text"]} for i, c in enumerate(cues)]

outdir = os.path.join(PROJECT, "timeline")
os.makedirs(outdir, exist_ok=True)
write_timeline(outdir, words, sentences, "script:script.txt")
print(f"Total duration: {total_duration:.2f}s | Generated {len(words)} words across {len(sentences)} cues.")
