"use client";

import { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface SnippetBlockProps {
  botId: string;
}

export default function SnippetBlock({ botId }: SnippetBlockProps) {
  const [copied, setCopied] = useState(false);
  const embedUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/embed.js`;
  
  const snippet = `<script src="${embedUrl}" data-bot-id="${botId}"></script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-surface border border-white/5 rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-2 text-primary font-bold">
        <Terminal className="w-5 h-5" />
        Intégration sur votre site
      </div>
      <p className="text-sm text-gray-400">
        Copiez ce code et collez-le à la fin de la balise <code>&lt;body&gt;</code> de votre site web pour afficher le chatbot.
      </p>
      <div className="relative group">
        <pre className="bg-black/40 p-4 rounded-xl text-xs font-mono text-gray-300 overflow-x-auto border border-white/5">
          {snippet}
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 transition-all border border-white/10"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
