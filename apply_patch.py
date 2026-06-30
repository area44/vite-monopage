import sys

def apply_diff(file_path, patch_path):
    with open(file_path, 'r') as f:
        lines = f.readlines()

    with open(patch_path, 'r') as f:
        patch = f.read()

    import re
    chunks = re.findall(r'<<<<<<< SEARCH\n(.*?)\n=======\n(.*?)\n>>>>>>> REPLACE', patch, re.DOTALL)

    content = "".join(lines)
    for search, replace in chunks:
        if search in content:
            content = content.replace(search, replace)
        else:
            print(f"Warning: Search block not found:\n{search}")
            sys.exit(1)

    with open(file_path, 'w') as f:
        f.write(content)

apply_diff('src/app/app.tsx', 'app_diff.patch')
