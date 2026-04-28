with open("genesis_v2/prompts.py", "r") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if len(line) > 79:
        print(f"Line {i+1}: {len(line)} chars")
        print(line)
