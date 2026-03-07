import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AppLayout from './AppLayout';
import Sidebar from './Sidebar';
import PageTopbar from './PageTopbar';
import SettingsModal from '../../common/SettingsModal';
import RoyalAIChat from '../../common/RoyalAIChat';

const MainLayoutNotion = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isAIOpen, setIsAIOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Basic breadcrumb logic based on path
    const pathParts = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = pathParts.length > 0
        ? pathParts.map(part => ({ label: part.charAt(0).toUpperCase() + part.slice(1) }))
        : [{ label: 'Tableau de bord' }];

    return (
        <>
            <AppLayout
                sidebarCollapsed={isSidebarCollapsed}
                sidebar={
                    <Sidebar
                        currentPath={location.pathname}
                        onNavigate={(path) => navigate(path)}
                        onOpenSettings={() => setIsSettingsOpen(true)}
                        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        isCollapsed={isSidebarCollapsed}
                    />
                }
                topbar={
                    <PageTopbar 
                        breadcrumbs={breadcrumbs} 
                        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        isSidebarCollapsed={isSidebarCollapsed}
                    />
                }
            >
                <div className={`h-full transition-all duration-300 ${isSidebarCollapsed ? 'max-w-full' : ''}`}>
                    <Outlet />
                </div>
            </AppLayout>

            {/* AI Trigger Icon (Bottom Right) */}
            <button 
                onClick={() => setIsAIOpen(true)}
                className="fixed bottom-6 right-6 z-900 w-12 h-12 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#efefef] flex items-center justify-center hover:scale-110 transition-transform group"
            >
                <div className="relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-blue-500 scale-75 group-hover:scale-100 transition-transform">
                        👑
                    </div>
                    <span className="text-2xl">👨</span>
                </div>
            </button>

            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
            <RoyalAIChat isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
        </>
    );
};

export default MainLayoutNotion;
