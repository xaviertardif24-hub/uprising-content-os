"use client";

import { useState } from 'react';
import { BotConfig } from '@/lib/api';

interface BotFormProps {
  initialData?: Partial<BotConfig>;
  onSubmit: (data: Partial<BotConfig>) => void;
  isLoading?: boolean;
}

export default function BotForm({ initialData, onSubmit, isLoading }: BotFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    systemPrompt: initialData?.systemPrompt || '',
    language: initialData?.language || 'fr',
    welcomeMessage: initialData?.welcomeMessage || 'Bonjour ! Comment puis-je vous aider ?',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Nom du Chatbot</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Ex: Assistant Support"
          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Instructions (System Prompt)</label>
        <textarea
          required
          rows={5}
          value={formData.systemPrompt}
          onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
          placeholder="Décrivez la personnalité et les connaissances du bot..."
          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none transition-all resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Langue</label>
          <select
            value={formData.language}
            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none transition-all"
          >
            <option value="fr">Français</option>
            <option value="en">Anglais</option>
            <option value="es">Espagnol</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Message de bienvenue</label>
          <input
            type="text"
            value={formData.welcomeMessage}
            onChange={(e) => setFormData({ ...formData, welcomeMessage: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold transition-all disabled:opacity-50"
      >
        {isLoading ? 'Enregistrement...' : initialData?.id ? 'Modifier le Chatbot' : 'Créer le Chatbot'}
      </button>
    </form>
  );
}
