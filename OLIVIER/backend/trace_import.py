import sys
import os

def check_openai(step):
    print(f"--- Check {step} ---")
    if 'openai' in sys.modules:
        mod = sys.modules['openai']
        print(f"  openai in sys.modules: {mod}")
        print(f"  file: {getattr(mod, '__file__', 'N/A')}")
        print(f"  has OpenAI: {'OpenAI' in dir(mod)}")
    else:
        print("  openai NOT in sys.modules")

check_openai("START")

print("Importing openai class...")
from openai import OpenAI
check_openai("AFTER DIRECT IMPORT")

print("Importing app.services.chat_service...")
try:
    import app.services.chat_service
    check_openai("AFTER CHAT_SERVICE IMPORT")
except Exception as e:
    print(f"FAILED IMPORT: {e}")
    import traceback
    traceback.print_exc()

print("DONE")
