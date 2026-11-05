import json

with open("story/shots.json", encoding="utf-8") as f:
    d = json.load(f)

shots = d["shots"]
print(f"Total shots: {len(shots)}")

act_keywords = [
    ("ACT 1: The Never-Ending Mind", 0),
    ("ACT 2: The Thought Loop", "psychologists call"),
    ("ACT 3: Inside the Brain", "look inside"),
    ("ACT 4: The Hidden Cost", "disorder by itself"),
    ("ACT 5: The Turning Point", "turning point"),
    ("ACT 6: The Conclusion", "worth remembering"),
]

for name, kw in act_keywords:
    if isinstance(kw, int):
        s = shots[kw]
        print(f"\n=== {name} ===")
        print(f"Starts at {s['id']} [{s['start']:.1f}s]: {s['line'][:60]}")
    else:
        for idx, s in enumerate(shots):
            if kw in s["line"].lower():
                print(f"\n=== {name} ===")
                print(f"Starts at {s['id']} ({idx}) [{s['start']:.1f}s]: {s['line'][:60]}")
                break

