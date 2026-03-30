import os
import asyncio
import json
import sys

# Ensure backend path is in sys.path
sys.path.append(os.path.join(os.getcwd(), "OLIVIER", "backend"))

from app.services.chat_service import chat_service

async def test_integration():
    print("--- Test Integration Assistant Royal AI ---")
    
    # Check for API key
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("[WARNING] OPENAI_API_KEY non trouvée. Le test utilisera le mode SIMULATION.")
    else:
        print("[INFO] OPENAI_API_KEY trouvée. Test en mode RÉEL.")

    # Mock Message
    class MockMessage:
        def __init__(self, role, content):
            self.role = role
            self.content = content

    test_messages = [MockMessage("user", "Qui est Olivier et quelle est sa vision ?")]

    print(f"Envoi du message: {test_messages[0].content}")
    
    try:
        response = await chat_service.generate_response(test_messages)
        print("\n--- Réponse de l'AI ---")
        print(response)
        print("------------------------")
    except Exception as e:
        print(f"[ERROR] Échec du test: {e}")

if __name__ == "__main__":
    asyncio.run(test_integration())
