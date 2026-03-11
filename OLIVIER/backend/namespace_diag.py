import sys
import os

try:
    import openai
    print(f"OpenAI module found: {openai}")
    print(f"OpenAI __path__: {getattr(openai, '__path__', 'N/A')}")
    
    if hasattr(openai, '__path__'):
        for p in openai.__path__:
            print(f"--- Listing {p} ---")
            if os.path.isdir(p):
                print(os.listdir(p))
            else:
                print("Path does not exist as directory.")
                
    from openai import OpenAI
    print("Success: Imported OpenAI class.")
except Exception as e:
    print(f"FAILED: {e}")
    import traceback
    traceback.print_exc()
