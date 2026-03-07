import React, { useState } from 'react';
import { 
    Search, 
    Plus, 
    History, 
    Star, 
    Users, 
    Lock, 
    ChevronRight, 
    Home, 
    Globe,
    LayoutGrid
} from 'lucide-react';
import { useToast } from '../components/common/Toaster';
import { useNavigate } from 'react-router-dom';

const Library = () => {
    const [activeTab, setActiveTab] = useState('Espaces d\'équipe');
    const { toast } = useToast();
    const navigate = useNavigate();

    const tabs = [
        { id: 'Espaces d\'équipe', icon: LayoutGrid },
        { id: 'Récentes', icon: History },
        { id: 'Favoris', icon: Star },
        { id: 'Partagées', icon: Users },
        { id: 'Pages privées', icon: Lock },
    ];

    return (
        <div className="h-full animate-in fade-in duration-500 overflow-y-auto bg-notion-bg px-16 py-16 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-[32px] font-bold text-notion-text tracking-tight">Bibliothèque</h1>
                <button className="bg-[#2383E2] hover:bg-[#0077D4] text-white text-[14px] font-semibold px-4 py-1.5 rounded-md shadow-sm transition-colors flex items-center">
                    Nouvel espace d'équipe
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center justify-between mb-2 border-b border-[rgba(55,53,47,0.09)]">
                <div className="flex items-center gap-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-3 py-2 text-[14px] font-medium transition-colors relative group ${
                                activeTab === tab.id 
                                ? 'text-notion-text' 
                                : 'text-notion-text-muted hover:bg-[rgba(55,53,47,0.04)]'
                            }`}
                        >
                            <tab.icon size={16} strokeWidth={2} />
                            {tab.id}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#37352F]"></div>
                            )}
                        </button>
                    ))}
                </div>
                <div className="p-2 text-notion-text-muted hover:bg-[rgba(55,53,47,0.04)] rounded cursor-pointer transition-colors">
                    <Search size={16} />
                </div>
            </div>

            {/* Table */}
            <div className="w-full mt-4">
                {/* Table Headers */}
                <div className="grid grid-cols-[1.5fr_1fr_0.5fr_0.5fr] px-2 py-2 text-[12px] font-medium text-notion-text-meta uppercase tracking-wider border-b border-[rgba(55,53,47,0.09)]">
                    <div className="flex items-center gap-2">
                        <LayoutGrid size={14} className="opacity-0" /> {/* Placeholder spacing */}
                        Nom
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Placeholder text for Description header matches screenshot aspect */}
                        <span className="flex items-center gap-2">
                             <div className="w-4 h-0.5 bg-notion-text-meta opacity-40"></div>
                             Description
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users size={14} />
                        Accès
                    </div>
                    <div className="flex items-center gap-2">
                        <Users size={14} />
                        Membres
                    </div>
                </div>

                {/* Table Row: Agence Uprising Studio */}
                <div 
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate('/editor')}
                    onKeyDown={(e) => e.key === 'Enter' && navigate('/editor')}
                    className="grid grid-cols-[1.5fr_1fr_0.5fr_0.5fr] px-2 py-3 text-[14px] group hover:bg-[rgba(55,53,47,0.03)] cursor-pointer rounded-lg transition-colors border-b border-[rgba(55,53,47,0.03)] items-center"
                >
                    <div className="flex items-center gap-2">
                        <ChevronRight size={16} className="text-notion-text-muted" />
                        <div className="p-1 rounded bg-[rgba(55,53,47,0.04)]">
                            <Home size={16} className="text-notion-text" />
                        </div>
                        <span className="font-bold text-notion-text">Agence Uprising Studio</span>
                    </div>
                    <div>
                        <span className="text-notion-text-muted italic text-xs">Aucune description</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Globe size={14} className="text-notion-text-muted" />
                        <span className="text-notion-text">Par défaut</span>
                    </div>
                    <div className="flex items-center -space-x-1.5">
                        <div className="w-5 h-5 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex justify-center items-center font-semibold text-white text-[10px] border border-white z-10" title="Jane Smith">
                            J
                        </div>
                        <img src="https://i.pravatar.cc/100?img=11" alt="Alexandre Dupont" className="w-5 h-5 rounded-full border border-white z-0" title="Alexandre Dupont" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Library;
