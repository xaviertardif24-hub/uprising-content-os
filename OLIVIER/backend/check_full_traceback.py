import traceback
import sys
import os

sys.path.append(os.getcwd())

try:
    print("Attempting to import app.main...")
    import app.main
    print("Success!")
except Exception:
    print("\n--- FULL TRACEBACK ---")
    traceback.print_exc()
    print("----------------------")
