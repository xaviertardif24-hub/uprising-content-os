"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/lib/api';
import BotForm from '@/components/BotForm';

export default function NewBotPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      await api.createBot(data);
      router.push('/dashboard');
    } catch (error) {
      alert('Erreur lors de la création du bot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Link 
        href="/dashboard" 
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        Retour au Dashboard
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-white">Nouveau Chatbot</h1>
        <p className="text-gray-400 mt-1">Configurez votre nouvel assistant IA.</p>
      </div>

      <div className="bg-surface border border-white/5 rounded-2xl p-8 shadow-xl">
        <BotForm onSubmit={handleSubmit} isLoading={loading} />
      </div>
    </div>
  );
}
