import sys
import os

# Aggressively clear any existing openai modules that might be shadowing
to_del = [m for m in sys.modules if m.startswith('openai')]
for m in to_del:
    del sys.modules[m]

try:
    import openai
    from openai import OpenAI
    print(f"SUCCESS: OpenAI class imported after module cleanup: {OpenAI}")
except Exception as e:
    print(f"FAILED: OpenAI import still failing after cleanup: {e}")

SITE_PACKAGES = r"C:\Users\xavie\AppData\Local\Programs\Python\Python312\Lib\site-packages"
if SITE_PACKAGES not in sys.path:
    sys.path.insert(0, SITE_PACKAGES)

import uvicorn

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, log_level="info")
