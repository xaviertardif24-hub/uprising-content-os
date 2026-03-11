import sys
import os

print(f"--- PATH DIAGNOSTIC ---")
print(f"Current Directory: {os.getcwd()}")
for i, path in enumerate(sys.path):
    print(f"[{i}] {path}")
    if os.path.isdir(path):
        contents = os.listdir(path)
        shadows = [c for c in contents if 'openai' in c.lower()]
        if shadows:
            print(f"    FOUND POTENTIAL SHADOWS: {shadows}")

try:
    import openai
    print(f"Successfully imported 'openai' module.")
    print(f"openai.__file__: {getattr(openai, '__file__', 'NONE')}")
    print(f"openai.__path__: {getattr(openai, '__path__', 'NONE')}")
    from openai import OpenAI
    print("Successfully imported 'OpenAI' class.")
except Exception as e:
    print(f"FAILED: {e}")
