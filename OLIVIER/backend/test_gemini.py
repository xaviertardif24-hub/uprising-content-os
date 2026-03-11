import os
import asyncio
from dotenv import load_dotenv

# Force load .env
load_dotenv()

from app.services.chat_service import chat_service

async def test_gemini():
    print(f"Gemini Key loaded: {os.getenv('GEMINI_API_KEY')[:10]}...")
    
    class MockMessage:
        def __init__(self, role, content):
            self.role = role
            self.content = content

    test_messages = [MockMessage("user", "Qui est Olivier et quelle est sa vision ?")]
    
    print("Testing Gemini integration via ChatService...")
    try:
        response = await chat_service.generate_response(test_messages)
        print("\n--- GEMINI RESPONSE ---")
        print(response)
        print("-----------------------")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(test_gemini())
