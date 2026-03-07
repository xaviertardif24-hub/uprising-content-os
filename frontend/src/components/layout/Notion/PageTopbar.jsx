import React from 'react';
import { MoreHorizontal, Star, Share, Clock, PanelLeft } from 'lucide-react';
import { useToast } from '../../common/Toaster';

const PageTopbar = ({ title, breadcrumbs, onToggleSidebar, isSidebarCollapsed }) => {
    const { toast } = useToast();
    return (
        <div className="h-14 border-b border-notion-border flex items-center justify-between px-6 sticky top-0 bg-notion-bg z-10 transition-all">
            {/* Breadcrumbs Left */}
            <div className="flex items-center gap-1 text-[14px] text-notion-text-muted">
                <button 
                    onClick={onToggleSidebar}
                    className="p-1 hover:bg-notion-bg-hover rounded transition-colors mr-1"
                    title={isSidebarCollapsed ? "Ouvrir la barre latérale" : "Fermer la barre latérale"}
                >
                    <PanelLeft size={18} className={isSidebarCollapsed ? 'text-notion-accent' : 'text-notion-text-muted'} />
                </button>
                {breadcrumbs && breadcrumbs.map((crumb, idx) => (
                    <React.Fragment key={idx}>
                        <span className="hover:bg-notion-bg-hover px-1.5 py-0.5 rounded cursor-pointer transition-colors max-w-[120px] truncate text-notion-text">
                            {crumb.label}
                        </span>
                        {idx < breadcrumbs.length - 1 && <span className="opacity-50">/</span>}
                    </React.Fragment>
                ))}
            </div>

            {/* Actions Right */}
            <div className="flex items-center text-[14px] text-notion-text-muted">
                {/* Presence Indicators */}
                <div className="flex items-center mr-6 -space-x-2">
                    <img src="https://i.pravatar.cc/100?img=4" alt="User 1" className="w-6 h-6 rounded-full border-2 border-notion-bg z-20" title="Marie est sur cette page" />
                    <img src="https://i.pravatar.cc/100?img=11" alt="User 2" className="w-6 h-6 rounded-full border-2 border-notion-bg z-10" title="Alex Édite" />
                    <div className="w-6 h-6 rounded-full border-2 border-notion-bg bg-notion-bg-hover flex items-center justify-center text-[10px] font-medium z-0 text-notion-text">
                        +2
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span 
                        onClick={() => toast("Le partage sera bientôt disponible ! 🚀")}
                        className="text-[13px] hover:bg-notion-bg-hover px-2 py-1 rounded cursor-pointer transition-colors text-notion-text mr-2"
                    >
                        Partager
                    </span>
                    <div title="Partager" onClick={() => toast("Le partage sera bientôt disponible ! 🚀")} className="hover:bg-notion-bg-hover p-1.5 rounded cursor-pointer transition-colors">
                        <Share size={16} strokeWidth={1.5} />
                    </div>
                    <div title="Mises à jour" onClick={() => toast("Les notifications seront bientôt disponibles ! 🚀")} className="hover:bg-notion-bg-hover p-1.5 rounded cursor-pointer transition-colors">
                        <Clock size={16} strokeWidth={1.5} />
                    </div>
                    <div title="Favoris" onClick={() => toast("Ajouté aux favoris ! ⭐")} className="hover:bg-notion-bg-hover p-1.5 rounded cursor-pointer transition-colors">
                        <Star size={16} strokeWidth={1.5} />
                    </div>
                    <div title="Plus" className="hover:bg-notion-bg-hover p-1.5 rounded cursor-pointer transition-colors ml-1">
                        <MoreHorizontal size={16} strokeWidth={1.5} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageTopbar;
