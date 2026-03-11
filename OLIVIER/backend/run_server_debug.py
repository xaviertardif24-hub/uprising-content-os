import uvicorn
import traceback
import sys
import os

# Add current directory to path to find "app"
sys.path.append(os.getcwd())

if __name__ == "__main__":
    print("Starting Assistant Royal AI Server (Programmatic)...")
    try:
        uvicorn.run("app.main:app", host="127.0.0.1", port=8000, log_level="info")
    except Exception:
        print("\n--- SERVER CRASH TRACEBACK ---")
        traceback.print_exc()
        print("-------------------------------")
