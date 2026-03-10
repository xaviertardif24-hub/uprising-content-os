import React, { useState, useEffect } from 'react';
import { ChevronRight, Search, Clock, Settings, LayoutDashboard, Library, Calendar, Lightbulb, Edit3, UserPlus, Grid, CheckSquare, Database, Video } from 'lucide-react';
import InviteModal from '../../common/InviteModal';

const SidebarItem = ({ icon: Icon, label, isActive, onClick, hasChildren = false, childrenItems = [], defaultExpanded = false }) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    const toggleExpand = (e) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
        } else if (hasChildren) {
            toggleExpand(e);
        }
    };

    return (
        <div className="flex flex-col">
            <div
                onClick={handleClick}
                className={`
          group flex items-center justify-between px-3 py-[6px] rounded-md cursor-pointer transition-colors duration-100
          ${isActive ? 'bg-notion-bg-active font-medium' : 'hover:bg-notion-bg-hover text-notion-text-muted hover:text-notion-text'}
        `}
            >
                <div className="flex items-center gap-2 overflow-hidden">
                    {hasChildren && (
                        <div
                            onClick={toggleExpand}
                            className={`p-0.5 rounded hover:bg-notion-bg-active transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                        >
                            <ChevronRight size={14} className="text-[var(--color-notion-text-muted)]" />
                        </div>
                    )}
                    {!hasChildren && <div className="w-[18px]"></div> /* Spacer for alignment if no chevron */}
                    {Icon && <Icon size={16} className={`shrink-0 ${isActive ? 'text-notion-text' : ''}`} />}
                    <span className="text-[14px] truncate">{label}</span>
                </div>
            </div>

            {hasChildren && isExpanded && (
                <div className="pl-4 space-y-[1px]">
                    {childrenItems.map((child, idx) => (
                        <SidebarItem key={idx} {...child} />
                    ))}
                </div>
            )}
        </div>
    );
};

const SidebarSection = ({ title, children }) => (
    <div className="mb-4">
        {title && (
            <div className="px-3 pb-1 text-[11px] font-semibold text-notion-text-muted hover:text-notion-text transition-colors cursor-pointer uppercase tracking-wider group flex items-center justify-between mt-4">
                {title}
            </div>
        )}
        <div className="space-y-[1px]">
            {children}
        </div>
    </div>
);

const Sidebar = ({ currentPath, onNavigate, onOpenSettings }) => {
    const [isInviteOpen, setIsInviteOpen] = useState(false);

    return (
        <div className="flex flex-col h-full py-3">
            {/* Workspace Switcher */}
            <div className="px-3 mb-4">
                <div className="flex items-center gap-2 p-1 hover:bg-notion-bg-hover rounded-md cursor-pointer transition-colors">
                    <div className="w-5 h-5 rounded-[4px] bg-notion-text text-notion-bg flex items-center justify-center font-bold text-xs">U</div>
                    <span className="text-[14px] font-medium truncate flex-1">Uprising Studio</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar px-1">

                {/* Quick Actions */}
                <SidebarSection>
                    <SidebarItem icon={Search} label="Recherche" onClick={() => onNavigate('/search')} isActive={currentPath === '/search'} />
                    <SidebarItem
                        icon={Clock}
                        label={
                            <div className="flex items-center justify-between w-full pr-1">
                                <span>Nouveautés</span>
                                <span className="bg-[#EB5757] text-white text-[9px] font-bold px-1 rounded-sm h-4 min-w-[16px] flex items-center justify-center">3</span>
                            </div>
                        }
                        onClick={() => onNavigate('/updates')}
                        isActive={currentPath === '/updates'}
                    />
                </SidebarSection>

                {/* Main Navigation */}
                <SidebarSection title="Espaces d'équipe">
                    <SidebarItem
                        icon={Grid}
                        label="Création de contenu"
                        hasChildren={true}
                        defaultExpanded={true}
                        childrenItems={[
                            {
                                icon: Library,
                                label: "Bibliothèque",
                                isActive: currentPath === '/library',
                                onClick: () => onNavigate('/library')
                            },
                            {
                                icon: Lightbulb,
                                label: "Boîte à idées",
                                isActive: currentPath === '/ideas',
                                onClick: () => onNavigate('/ideas')
                            },
                            {
                                icon: Edit3,
                                label: "Éditeur de bloc",
                                isActive: currentPath === '/editor',
                                onClick: () => onNavigate('/editor')
                            },
                            {
                                icon: Video,
                                label: "Workflow Créatif",
                                isActive: currentPath === '/content-tasks',
                                onClick: () => onNavigate('/content-tasks')
                            }
                        ]}
                    />
                    <SidebarItem
                        icon={LayoutDashboard}
                        label="Organisation"
                        hasChildren={true}
                        defaultExpanded={true}
                        childrenItems={[
                            {
                                icon: LayoutDashboard,
                                label: "Tableau de bord",
                                isActive: currentPath === '/' || currentPath === '/dashboard',
                                onClick: () => onNavigate('/dashboard')
                            },
                            {
                                icon: Calendar,
                                label: "Calendrier",
                                isActive: currentPath === '/calendar',
                                onClick: () => onNavigate('/calendar')
                            },
                            {
                                icon: CheckSquare,
                                label: "Mes tâches",
                                isActive: currentPath === '/tasks',
                                onClick: () => onNavigate('/tasks')
                            },
                            {
                                icon: Database,
                                label: "La Banque",
                                isActive: currentPath === '/bank',
                                onClick: () => onNavigate('/bank')
                            },
                            {
                                icon: Layout,
                                label: "Templates",
                                isActive: currentPath === '/templates',
                                onClick: () => onNavigate('/templates')
                            }
                        ]}
                    />
                </SidebarSection>

                {/* Settings at the bottom */}
                <SidebarSection title="Système">
                    <SidebarItem
                        icon={Settings}
                        label="Paramètres et membres"
                        isActive={currentPath === '/settings'}
                        onClick={onOpenSettings}
                    />
                    <SidebarItem
                        icon={UserPlus}
                        label="Inviter des membres"
                        onClick={() => setIsInviteOpen(true)}
                    />
                </SidebarSection>

            </div>
            <InviteModal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} />
        </div>
    );
};

export default Sidebar;
