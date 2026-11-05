import json, sys

act_num = int(sys.argv[1]) if len(sys.argv) > 1 else 2

with open("story/shots.json", encoding="utf-8") as f:
    d = json.load(f)

shots = d["shots"]
ranges = {
    1: (0, 14),
    2: (14, 36),
    3: (36, 65),
    4: (65, 78),
    5: (78, 98),
    6: (98, len(shots)),
}

start_idx, end_idx = ranges[act_num]
print(f"=== ACT {act_num} (shots {start_idx} to {end_idx}) ===")
for s in shots[start_idx:end_idx]:
    print(f"{s['id']} [{s['start']:.1f}s -> {s['end']:.1f}s]: {s['line']}")

