"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Loader2 } from 'lucide-react';
import { api, BotConfig } from '@/lib/api';
import BotCard from '@/components/BotCard';

export default function DashboardPage() {
  const [bots, setBots] = useState<BotConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchBots = async () => {
    try {
      const data = await api.getBots();
      setBots(data);
    } catch (error) {
      console.error('Error fetching bots:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBots();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce chatbot ?')) {
      try {
        await api.deleteBot(id);
        setBots(bots.filter(b => b.id !== id));
      } catch (error) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  const filteredBots = bots.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Vos Chatbots</h1>
          <p className="text-gray-400 mt-1">Gérez et déployez vos assistants personnels.</p>
        </div>
        <Link 
          href="/dashboard/new" 
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" />
          Nouveau Bot
        </Link>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Rechercher un bot..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl leading-5 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all"
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Loader2 className="w-10 h-10 animate-spin mb-4" />
          Chargement de vos bots...
        </div>
      ) : filteredBots.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBots.map(bot => (
            <BotCard key={bot.id} bot={bot} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="bg-white/5 border border-dashed border-white/10 rounded-2xl py-20 flex flex-col items-center justify-center text-center px-4">
          <div className="bg-white/5 p-4 rounded-full mb-4">
            <Plus className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Aucun chatbot trouvé</h3>
          <p className="text-gray-400 max-w-sm mb-8">Commencez par créer votre premier assistant intelligent en cliquant sur le bouton ci-dessus.</p>
          <Link 
            href="/dashboard/new" 
            className="text-primary font-bold hover:underline"
          >
            Créer mon premier bot
          </Link>
        </div>
      )}
    </div>
  );
}
