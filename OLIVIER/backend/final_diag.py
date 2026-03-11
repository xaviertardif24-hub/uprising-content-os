import sys
import os

print("--- STEP-BY-STEP IMPORT TEST ---")
sys.path.append(os.getcwd())

print("1. Importing fastapi...")
import fastapi
print("   Success.")

print("2. Importing openAI class (minimal)...")
from openai import OpenAI
print("   Success.")

print("3. Importing app.services.chat_service...")
try:
    from app.services.chat_service import chat_service
    print("   Success.")
except Exception as e:
    import traceback
    traceback.print_exc()
    print(f"   FAILED: {e}")

print("4. Importing app.main...")
try:
    import app.main
    print("   Success.")
except Exception as e:
    import traceback
    traceback.print_exc()
    print(f"   FAILED: {e}")
