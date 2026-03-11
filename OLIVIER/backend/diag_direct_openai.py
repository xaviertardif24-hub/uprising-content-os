import os
import asyncio
import traceback
from dotenv import load_dotenv
from openai import OpenAI

# Force load .env
load_dotenv()

async def diag_direct_openai():
    api_key = os.getenv("OPENAI_API_KEY")
    print(f"Key loaded: {api_key[:10]}...")
    
    client = OpenAI(api_key=api_key)
    
    try:
        print("Attempting DIRECT OpenAI call with gpt-3.5-turbo...")
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": "Hello"}],
            max_tokens=5
        )
        print(f"Success! Response: {response.choices[0].message.content}")
        
    except Exception as e:
        print("\n--- DETAILED OPENAI ERROR ---")
        print(f"Type: {type(e).__name__}")
        print(f"Message: {str(e)}")
        if hasattr(e, 'status_code'):
            print(f"Status Code: {e.status_code}")
        if hasattr(e, 'body'):
            print(f"Body: {e.body}")
        print("-----------------------------")

if __name__ == "__main__":
    asyncio.run(diag_direct_openai())
