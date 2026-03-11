import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Star, Share, Clock, PanelLeft, Moon, Sun } from 'lucide-react';
import { useToast } from '../../common/Toaster';
import { useThemeStore } from '../../../store/themeStore';
import NotificationDropdown from '../../common/NotificationDropdown';
import ShareDropdown from '../../common/ShareDropdown';
import InviteModal from '../../common/InviteModal';

const PageTopbar = ({ title, breadcrumbs, onToggleSidebar, isSidebarCollapsed }) => {
    const { toast } = useToast();
    const { isDarkMode, toggleTheme } = useThemeStore();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [isInviteOpen, setIsInviteOpen] = useState(false);

    const notificationRef = useRef(null);
    const shareRef = useRef(null);

    // Close popovers when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotificationsOpen(false);
            }
            if (shareRef.current && !shareRef.current.contains(event.target)) {
                setIsShareOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Apply theme to document body
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

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
                    <div
                        onClick={toggleTheme}
                        title={isDarkMode ? "Passer en mode clair" : "Passer en mode sombre"}
                        className="hover:bg-notion-bg-hover p-1.5 rounded cursor-pointer transition-colors"
                    >
                        {isDarkMode ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
                    </div>

                    <div ref={shareRef} className="relative flex items-center">
                        <span
                            onClick={() => setIsShareOpen(!isShareOpen)}
                            className={`text-[13px] hover:bg-notion-bg-hover px-2 py-1 rounded cursor-pointer transition-colors text-notion-text mr-0.5 ${isShareOpen ? 'bg-notion-bg-hover' : ''}`}
                        >
                            Partager
                        </span>
                        <div
                            title="Partager"
                            onClick={() => setIsShareOpen(!isShareOpen)}
                            className={`hover:bg-notion-bg-hover p-1.5 rounded cursor-pointer transition-colors ${isShareOpen ? 'bg-notion-bg-hover' : ''}`}
                        >
                            <Share size={16} strokeWidth={1.5} />
                        </div>
                        <ShareDropdown
                            isOpen={isShareOpen}
                            onClose={() => setIsShareOpen(false)}
                            onOpenInvite={() => setIsInviteOpen(true)}
                        />
                    </div>

                    <div ref={notificationRef} className="relative">
                        <div
                            title="Mises à jour"
                            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                            className={`hover:bg-notion-bg-hover p-1.5 rounded cursor-pointer transition-colors relative ${isNotificationsOpen ? 'bg-notion-bg-hover' : ''}`}
                        >
                            <Clock size={16} strokeWidth={1.5} />
                            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white dark:border-[#191919]"></div>
                        </div>
                        <NotificationDropdown isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
                    </div>

                    <div title="Favoris" onClick={() => toast("Ajouté aux favoris ! ⭐")} className="hover:bg-notion-bg-hover p-1.5 rounded cursor-pointer transition-colors">
                        <Star size={16} strokeWidth={1.5} />
                    </div>
                    <div title="Plus" className="hover:bg-notion-bg-hover p-1.5 rounded cursor-pointer transition-colors ml-1">
                        <MoreHorizontal size={16} strokeWidth={1.5} />
                    </div>
                </div>
            </div>

            <InviteModal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} />
        </div>
    );
};

export default PageTopbar;
