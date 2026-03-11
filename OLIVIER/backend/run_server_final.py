import sys
import os

# Absolute path to the correct Python 3.12 site-packages
SITE_PACKAGES = r"C:\Users\xavie\AppData\Local\Programs\Python\Python312\Lib\site-packages"

# Ensure our backend directory and correct site-packages are at the top of the path
current_dir = os.getcwd()
if SITE_PACKAGES not in sys.path:
    sys.path.insert(0, SITE_PACKAGES)
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

import uvicorn

if __name__ == "__main__":
    print(f"--- Assistant Royal AI Server Startup ---")
    print(f"Python: {sys.executable}")
    print(f"Site-Packages: {SITE_PACKAGES}")
    
    try:
        import openai
        print(f"OpenAI found at: {getattr(openai, '__file__', 'unknown')}")
        from openai import OpenAI
        print("Success: OpenAI class imported.")
    except Exception as e:
        print(f"Error checking OpenAI during startup: {e}")

    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, log_level="info")
