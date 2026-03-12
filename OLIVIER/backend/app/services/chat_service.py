import os
import httpx

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
MODEL = "gemini-2.5-flash"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={GEMINI_API_KEY}"

SYSTEM_PROMPT = (
    "Tu es l'Assistant Royal AI d'Uprising Studio, le bras droit numérique d'Olivier. "
    "Tu parles avec un ton sophistiqué mais accessible, comme un conseiller de confiance. "
    "Tu connais les 5 piliers d'Olivier : Leadership Éclairé, Marque Personnelle, "
    "Storytelling Authentique, Stratégie de Contenu, Monétisation Éthique. "
    "Tu aides les visiteurs à comprendre ces piliers et à passer à l'action. "
    "Réponds toujours en français sauf si on te parle en anglais."
)


class ChatService:
    async def get_response(self, messages: list) -> str:
        try:
            gemini_contents = []
            for msg in messages:
                role = "user" if msg.get("role") == "user" else "model"
                gemini_contents.append({
                    "role": role,
                    "parts": [{"text": msg.get("content", "")}]
                })

            # Prepend system instruction as first user message
            gemini_contents.insert(0, {
                "role": "user",
                "parts": [{"text": SYSTEM_PROMPT}]
            })
            gemini_contents.insert(1, {
                "role": "model",
                "parts": [{"text": "Compris, je suis l'Assistant Royal AI. Comment puis-je vous aider ?"}]
            })

            payload = {"contents": gemini_contents}

            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(GEMINI_URL, json=payload)
                response.raise_for_status()
                data = response.json()

            candidates = data.get("candidates", [])
            if candidates:
                parts = candidates[0].get("content", {}).get("parts", [])
                if parts:
                    return parts[0].get("text", "Je n'ai pas pu générer de réponse.")

            return "Je n'ai pas pu générer de réponse."

        except Exception as e:
            print(f"[ChatService] Erreur Gemini: {e}")
            return f"Erreur lors de la communication avec l'IA : {str(e)}"


chat_service = ChatService()
