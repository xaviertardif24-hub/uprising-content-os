import sys
import os

# 1. Enforce correct site-packages at the top of sys.path
SITE_PACKAGES = r"C:\Users\xavie\AppData\Local\Programs\Python\Python312\Lib\site-packages"
if SITE_PACKAGES not in sys.path:
    sys.path.insert(0, SITE_PACKAGES)

# 2. Add current directory to path
backend_dir = os.getcwd()
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

print("--- Assistant Royal AI Server (Single Process) ---")
print(f"Python: {sys.executable}")

try:
    from openai import OpenAI
    print(f"SUCCESS: OpenAI class imported: {OpenAI}")
except Exception as e:
    print(f"FAILED: OpenAI import failure: {e}")
    import traceback
    traceback.print_exc()

import uvicorn
from app.main import app

if __name__ == "__main__":
    # We use uvicorn.run directly without a string to avoid child process spawning issues
    # reload=False is mandatory here for single-process operation
    print("Launching server...")
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
