import Link from 'next/link';
import { Bot, Settings, Trash2, MessageSquare } from 'lucide-react';
import { BotConfig } from '@/lib/api';

interface BotCardProps {
  bot: BotConfig;
  onDelete: (id: string) => void;
}

export default function BotCard({ bot, onDelete }: BotCardProps) {
  return (
    <div className="bg-surface border border-white/5 rounded-2xl p-6 hover:border-primary/50 transition-all group shadow-xl">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-primary/10 rounded-xl">
          <Bot className="w-8 h-8 text-primary" />
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onDelete(bot.id)}
            className="p-2 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
            title="Supprimer"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">{bot.name}</h3>
      <p className="text-sm text-gray-400 mb-6 line-clamp-2 min-h-[40px]">
        {bot.systemPrompt}
      </p>
      
      <div className="flex gap-3 mt-auto">
        <Link 
          href={`/bot/${bot.id}`}
          className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-2.5 rounded-xl text-sm font-semibold transition-all"
        >
          <MessageSquare className="w-4 h-4" />
          Tester
        </Link>
        <Link 
          href={`/dashboard/edit/${bot.id}`}
          className="p-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all border border-white/10"
          title="Paramètres"
        >
          <Settings className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
