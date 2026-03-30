import httpx from 'httpx';
import { ChatEngine, BotConfig, Message } from './types';

export class GeminiEngine implements ChatEngine {
  private apiKey: string;
  private model: string = "gemini-2.5-flash"; // Assuming this is available/target

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(config: BotConfig, messages: Message[]): Promise<string> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;

    const geminiContents = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Prepend system prompt as context
    geminiContents.unshift({
      role: 'user',
      parts: [{ text: `INSTRUCTIONS: ${config.systemPrompt}` }]
    }, {
      role: 'model',
      parts: [{ text: "Compris. Je suivrai ces instructions pour le reste de la conversation." }]
    });

    const payload = { contents: geminiContents };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json();
      const candidates = data.candidates || [];
      if (candidates.length > 0 && candidates[0].content?.parts?.length > 0) {
        return candidates[0].content.parts[0].text;
      }

      return "Je n'ai pas pu générer de réponse.";
    } catch (error) {
      console.error("[GeminiEngine] Error:", error);
      throw error;
    }
  }
}
