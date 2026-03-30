import os
import httpx

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
MODEL = "gemini-2.5-flash"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={GEMINI_API_KEY}"

SYSTEM_PROMPT = (
    "Tu es l'IA Réceptionniste d'Uprising Studio, le bras droit numérique d'Olivier Grenon. "
    "Ton rôle est d'accueillir les visiteurs, de répondre à leurs questions sur les services de l'agence, "
    "et de faciliter la collaboration avec Olivier. "
    "Ton ton est professionnel, chaleureux, sophistiqué et proactif. "
    "Tu maîtrises les 5 piliers d'Olivier : Leadership Éclairé, Marque Personnelle, "
    "Storytelling Authentique, Stratégie de Contenu, Monétisation Éthique. "
    "IMPORTANT : Si un visiteur semble intéressé par les services d'Olivier ou souhaite un devis, "
    "propose-lui poliment de laisser son adresse email ou de prendre rendez-vous (dis que l'équipe reviendra vers lui). "
    "Réponds toujours en français sauf si on te parle en anglais."
)

SCORING_PROMPT = (
    "Tu es un expert en stratégie de contenu. Évalue l'idée suivante sur une échelle de 1 à 10. "
    "Prends en compte le potentiel viral, l'alignement avec les 5 piliers d'Olivier (Leadership, Sales, Systems, Discipline, Community) "
    "et l'intérêt pour l'audience. "
    "Réponds au format JSON: {\"score\": 8.5, \"reasoning\": \"Explication courte\"}."
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

    async def score_idea(self, title: str, description: str = "") -> dict:
        try:
            prompt = f"{SCORING_PROMPT}\n\nIdée: {title}\nDescription: {description}"
            payload = {
                "contents": [{"role": "user", "parts": [{"text": prompt}]}]
            }

            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(GEMINI_URL, json=payload)
                response.raise_for_status()
                data = response.json()

            candidates = data.get("candidates", [])
            text = candidates[0].get("content", {}).get("parts", [{}])[0].get("text", "{}") if candidates else "{}"
            
            # Remove markdown code blocks if Gemini returns them
            if "```json" in text:
                text = text.split("```json")[1].split("```")[0]
            
            import json
            return json.loads(text.strip())
        except Exception as e:
            print(f"[ChatService] Erreur Scoring: {e}")
            return {"score": 5.0, "reasoning": "Échec de l'analyse IA."}


chat_service = ChatService()
