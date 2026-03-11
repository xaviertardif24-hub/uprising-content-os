import sys
import os

print(f"Python version: {sys.version}")
print(f"Python executable: {sys.executable}")
print(f"Current directory: {os.getcwd()}")
print(f"PYTHONPATH: {os.environ.get('PYTHONPATH')}")

try:
    import openai
    print(f"OpenAI file: {openai.__file__}")
    from openai import OpenAI
    print("Successfully imported OpenAI class from openai")
except ImportError as e:
    print(f"ImportError: {e}")
    if 'openai' in sys.modules:
        print(f"OpenAI already in sys.modules: {sys.modules['openai']}")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
