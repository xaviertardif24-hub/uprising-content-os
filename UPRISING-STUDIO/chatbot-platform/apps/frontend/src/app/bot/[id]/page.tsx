"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, Loader2, Bot, Languages, MessageSquareOff } from 'lucide-react';
import Link from 'next/link';
import { api, BotConfig } from '@/lib/api';
import ChatWindow from '@/components/ChatWindow';
import SnippetBlock from '@/components/SnippetBlock';

export default function BotDetailPage() {
  const { id } = useParams();
  const [bot, setBot] = useState<BotConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBot = async () => {
      try {
        const data = await api.getBot(id as string);
        setBot(data);
      } catch (error) {
        console.error('Error fetching bot:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBot();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-gray-400">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        Chargement du chatbot...
      </div>
    );
  }

  if (!bot) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-center">
        <MessageSquareOff className="w-16 h-16 text-gray-500 mb-6" />
        <h1 className="text-2xl font-bold text-white mb-2">Chatbot introuvable</h1>
        <p className="text-gray-400 mb-8">Ce bot n'existe pas ou a été supprimé.</p>
        <Link 
          href="/dashboard" 
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold"
        >
          Retour au Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex gap-4 items-center">
        <Link 
          href="/dashboard" 
          className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{bot.name}</h1>
          <div className="flex gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1.5">
              <Languages className="w-4 h-4 text-primary" />
              {bot.language === 'fr' ? 'Français' : 'Anglais'}
            </div>
            <div className="flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-primary" />
              Gemini 2.5 Flash
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-8">
          <div className="bg-surface border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Configuration</h3>
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">System Prompt</span>
                <p className="text-sm text-gray-300 mt-1 bg-black/20 p-4 rounded-xl border border-white/5 max-h-[200px] overflow-y-auto italic">
                  "{bot.systemPrompt}"
                </p>
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Message de bienvenue</span>
                <p className="text-sm text-gray-300 mt-1">
                  {bot.welcomeMessage || 'Aucun message de bienvenue configuré.'}
                </p>
              </div>
            </div>
          </div>

          <SnippetBlock botId={bot.id} />
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-4">Zone de Test</h3>
          <ChatWindow botId={bot.id} welcomeMessage={bot.welcomeMessage} />
        </div>
      </div>
    </div>
  );
}
