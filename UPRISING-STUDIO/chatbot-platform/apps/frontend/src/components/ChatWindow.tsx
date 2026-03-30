"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatWindowProps {
  botId: string;
  welcomeMessage?: string;
}

export default function ChatWindow({ botId, welcomeMessage }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: welcomeMessage || 'Bonjour ! Comment puis-je vous aider ?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await api.sendMessage(botId, [
        ...messages,
        { role: 'user', content: userMessage }
      ]);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Désolé, une erreur s'est produite. Veuillez réessayer." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-black/40 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`p-2 rounded-xl border ${
              msg.role === 'user' 
                ? 'bg-primary/20 border-primary/30 text-primary' 
                : 'bg-white/5 border-white/10 text-gray-400'
            }`}>
              {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-primary text-white rounded-tr-none' 
                : 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-sm text-gray-400">En train d'écrire...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 bg-black/20 border-t border-white/5 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Écrivez votre message..."
          disabled={isLoading}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-primary hover:bg-primary/90 text-white p-3 rounded-xl transition-all disabled:opacity-50 disabled:grayscale shadow-lg shadow-primary/20"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
