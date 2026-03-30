import React, { useState } from 'react';
import { Search as SearchIcon, FileText, Calendar, Lightbulb, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/common/Toaster';

const Search = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const { toast } = useToast();

    const recentSearches = [
        { id: 1, text: 'Plan de contenu Q3', icon: FileText, path: '/library' },
        { id: 2, text: 'Réunion de réflexion', icon: Calendar, path: '/calendar' },
        { id: 3, text: 'Idées de hooks viraux', icon: Lightbulb, path: '/ideas' },
    ];

    return (
        <div className="h-full animate-in fade-in duration-500 overflow-y-auto px-12 py-16 max-w-[800px] mx-auto">
            <h1 className="text-3xl font-semibold text-notion-text tracking-tight mb-8">Recherche</h1>
            
            <div className="relative mb-12">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-notion-text-muted" size={20} />
                <input
                    type="text"
                    placeholder="Posez une question ou cherchez un document..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg bg-notion-bg border border-[rgba(55,53,47,0.16)] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder:font-normal"
                    autoFocus
                />
                {query && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <button 
                            onClick={() => toast?.(`Recherche de: ${query}`)}
                            className="text-xs bg-[#2383E2] text-white px-2.5 py-1 rounded shadow-sm hover:bg-[#0077D4] transition-colors"
                        >
                            Rechercher
                        </button>
                    </div>
                )}
            </div>

            {!query && (
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-2 text-notion-text-muted mb-3">
                            <Clock size={14} />
                            <h3 className="text-xs font-semibold uppercase tracking-wider">Récemment consulté</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {recentSearches.map((item) => (
                                <div 
                                    key={item.id} 
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => navigate(item.path)}
                                    onKeyDown={(e) => e.key === 'Enter' && navigate(item.path)}
                                    className="flex items-center justify-between p-3 rounded-lg border border-transparent hover:border-[rgba(55,53,47,0.08)] hover:bg-[rgba(55,53,47,0.03)] cursor-pointer transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 border border-[rgba(55,53,47,0.1)] rounded bg-white text-notion-text-muted">
                                            <item.icon size={16} />
                                        </div>
                                        <span className="text-sm font-medium text-notion-text">{item.text}</span>
                                    </div>
                                    <ArrowRight size={14} className="text-notion-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {query && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <SearchIcon size={32} className="text-[rgba(55,53,47,0.2)] mb-4" />
                    <p className="text-notion-text-muted">Recherche de "<strong>{query}</strong>"...</p>
                    <p className="text-xs text-notion-text-meta mt-2">Cette fonctionnalité sera bientôt connectée à l'API de recherche.</p>
                </div>
            )}
        </div>
    );
};

export default Search;
