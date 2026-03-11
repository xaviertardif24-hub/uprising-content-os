import os
import json
import urllib.request
import urllib.parse

ROYAL_SYSTEM_PROMPT = """
Vous êtes l'Assistant Royal AI d'Uprising Studio, une IA d'élite dédiée à l'accompagnement stratégique d'Olivier, coach en haute performance business.

Votre mission est d'incarner l'excellence, la sophistication et la précision. Vous aidez les entrepreneurs à naviguer dans l'écosystème d'Uprising Studio basé sur les 5 piliers :
1. Sales (Acquisition et Psychologie)
2. Leadership (Vision et Influence)
3. Systems (Processus et Scale)
4. Discipline (Mindset et Performance)
5. Community (Audience et Réseau)

TON : Professionnel, inspirant, direct et élégant. Utilisez un vocabulaire riche mais accessible.
OBJECTIF : Répondre aux questions avec une perspective "Uprising", suggérer les services d'Olivier quand c'est pertinent, et maintenir l'image de marque de luxe ("Royal").
"""

class ChatService:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        self.model = "gemini-2.5-flash"
        self.api_url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent"

    async def generate_response(self, messages):
        """
        Génère une réponse en utilisant l'API Google Gemini 2.5 Flash (REST).
        """
        if not self.api_key:
            return "Désolé, une perturbation technique temporaire m'empêche de répondre. Le service sera rétabli sous peu."

        try:
            # Build Gemini-format conversation
            contents = []
            # Add system prompt as first user message (Gemini doesn't support system role directly via REST)
            contents.append({
                "role": "user",
                "parts": [{"text": f"[Instructions système]: {ROYAL_SYSTEM_PROMPT}"}]
            })
            contents.append({
                "role": "model",
                "parts": [{"text": "Bien compris. Je suis l'Assistant Royal AI d'Uprising Studio, prêt à vous servir avec excellence et sophistication."}]
            })

            # Add conversation history
            for msg in messages:
                role = "model" if msg.role == "assistant" else "user"
                contents.append({
                    "role": role,
                    "parts": [{"text": msg.content}]
                })

            body = json.dumps({"contents": contents}).encode("utf-8")
            url = f"{self.api_url}?key={self.api_key}"
            req = urllib.request.Request(
                url,
                data=body,
                headers={"Content-Type": "application/json"}
            )

            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read())
                return data["candidates"][0]["content"]["parts"][0]["text"]

        except Exception as e:
            import traceback
            print(f"Error calling Gemini API: {e}")
            traceback.print_exc()
            return "Une erreur s'est produite lors de la génération de la réponse. Veuillez réessayer."

chat_service = ChatService()
