import os
import asyncio
import traceback
from dotenv import load_dotenv

# Force load .env
load_dotenv()

from app.services.chat_service import chat_service

async def diag_error():
    print(f"Key loaded: {os.getenv('OPENAI_API_KEY')[:10]}...")
    
    class MockMessage:
        def __init__(self, role, content):
            self.role = role
            self.content = content

    test_messages = [MockMessage("user", "Hello")]
    
    try:
        print("Attempting service call with gpt-3.5-turbo...")
        response = await chat_service.generate_response(test_messages)
        print(f"Service Response: {response}")
        
    except Exception as e:
        print("\n--- DETAILED ERROR ---")
        print(traceback.format_exc())
        print("----------------------")

if __name__ == "__main__":
    asyncio.run(diag_error())
