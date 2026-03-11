import os
import asyncio
from dotenv import load_dotenv
from google import genai

load_dotenv()
key = os.getenv("GEMINI_API_KEY")
print(f"Testing key: {key[:10]}...")

client = genai.Client(api_key=key)

async def test():
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents="Dis bonjour en francais"
        )
        print(f"SUCCESS: {response.text[:200]}")
    except Exception as e:
        print(f"FAILURE: {e}")
        import traceback
        traceback.print_exc()

asyncio.run(test())
