with open("audio/mix.py", "r", encoding="utf-8") as f:
    txt = f.read()

target = '            path = os.path.join(P, "build", "music.wav")\n            plan = story.get("music") or MUSIC.default_plan(total)'
target_crlf = '            path = os.path.join(P, "build", "music.wav")\r\n            plan = story.get("music") or MUSIC.default_plan(total)'

replacement = '''            path = os.path.join(P, "build", "music.wav")
            if os.path.exists(path):
                print(f"reusing existing score: {path}")
                mus = load_any(path)
            else:
                plan = story.get("music") or MUSIC.default_plan(total)'''

if target_crlf in txt:
    txt = txt.replace(target_crlf, replacement.replace('\n', '\r\n'), 1)
    with open("audio/mix.py", "w", encoding="utf-8") as f:
        f.write(txt)
    print("mix.py updated (crlf)!")
elif target in txt:
    txt = txt.replace(target, replacement, 1)
    with open("audio/mix.py", "w", encoding="utf-8") as f:
        f.write(txt)
    print("mix.py updated (lf)!")
else:
    print("Target not found")

