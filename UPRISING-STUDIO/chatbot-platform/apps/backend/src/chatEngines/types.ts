export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface BotConfig {
  id: string;
  name: string;
  systemPrompt: string;
  language: string;
}

export interface ChatEngine {
  generateResponse(config: BotConfig, messages: Message[]): Promise<string>;
}
