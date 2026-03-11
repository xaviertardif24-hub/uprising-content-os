import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

key = os.getenv("GEMINI_API_KEY")
print(f"Testing key: {key[:10]}...")

try:
    genai.configure(api_key=key)
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content("Hello, as a royal assistant, say hi.")
    print(f"SUCCESS: {response.text}")
except Exception as e:
    print(f"FAILURE: {e}")
    import traceback
    traceback.print_exc()
