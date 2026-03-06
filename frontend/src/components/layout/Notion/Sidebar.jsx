import React from 'react';
import { ChevronRight, Search, Clock, Settings, LayoutDashboard, Library, Calendar, Lightbulb, Edit3 } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, isActive, onClick, hasChildren = false, childrenItems = [] }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const toggleExpand = (e) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="flex flex-col">
            <div
                onClick={onClick}
                className={`
          group flex items-center justify-between px-3 py-[6px] rounded-md cursor-pointer transition-colors duration-100
          ${isActive ? 'bg-[var(--color-notion-bg-active)] font-medium' : 'hover:bg-[var(--color-notion-bg-hover)] text-[var(--color-notion-text-muted)] hover:text-[var(--color-notion-text)]'}
        `}
            >
                <div className="flex items-center gap-2 overflow-hidden">
                    {hasChildren && (
                        <div
                            onClick={toggleExpand}
                            className={`p-0.5 rounded hover:bg-[var(--color-notion-bg-active)] transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                        >
                            <ChevronRight size={14} className="text-[var(--color-notion-text-muted)]" />
                        </div>
                    )}
                    {Icon && <Icon size={16} className={`flex-shrink-0 ${isActive ? 'text-[var(--color-notion-text)]' : ''}`} />}
                    <span className="text-[14px] truncate">{label}</span>
                </div>
            </div>

            {/* Children rendering */}
            {hasChildren && isExpanded && (
                <div className="pl-6 space-y-[1px]">
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
            <div className="px-3 pb-1 text-[11px] font-semibold text-[var(--color-notion-text-muted)] hover:text-[var(--color-notion-text)] transition-colors cursor-pointer uppercase tracking-wider group flex items-center justify-between">
                {title}
            </div>
        )}
        <div className="space-y-[1px]">
            {children}
        </div>
    </div>
);

const Sidebar = ({ currentPath, onNavigate }) => {
    return (
        <div className="flex flex-col h-full py-3">
            {/* Workspace Switcher Component Mock */}
            <div className="px-3 mb-4">
                <div className="flex items-center gap-2 p-1 hover:bg-[var(--color-notion-bg-hover)] rounded-md cursor-pointer transition-colors">
                    <div className="w-5 h-5 rounded-[4px] bg-[var(--color-notion-text)] text-[var(--color-notion-bg)] flex items-center justify-center font-bold text-xs">U</div>
                    <span className="text-[14px] font-medium truncate flex-1">Uprising Studio</span>
                    <div className="text-[10px] bg-[var(--color-notion-border)] px-1.5 rounded text-[var(--color-notion-text-muted)]">Free</div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar px-1">

                {/* Quick Actions */}
                <SidebarSection>
                    <SidebarItem icon={Search} label="Search" />
                    <SidebarItem icon={Clock} label="Updates" />
                    <SidebarItem icon={Settings} label="Settings & members" />
                </SidebarSection>

                {/* Main Navigation Workspace */}
                <SidebarSection title="Workspace">
                    <SidebarItem
                        icon={LayoutDashboard}
                        label="Dashboard"
                        isActive={currentPath === '/' || currentPath === '/dashboard'}
                        onClick={() => onNavigate('/dashboard')}
                    />
                    <SidebarItem
                        icon={Library}
                        label="Library"
                        isActive={currentPath === '/library' || currentPath === '/library/design' || currentPath === '/library/assets'}
                        onClick={() => onNavigate('/library')}
                        hasChildren={true}
                        childrenItems={[
                            { label: "Design System", isActive: currentPath === '/library/design', onClick: () => onNavigate('/library/design') },
                            { label: "Assets", isActive: currentPath === '/library/assets', onClick: () => onNavigate('/library/assets') }
                        ]}
                    />
                    <SidebarItem
                        icon={Calendar}
                        label="Calendar"
                        isActive={currentPath === '/calendar'}
                        onClick={() => onNavigate('/calendar')}
                    />
                    <SidebarItem
                        icon={Lightbulb}
                        label="Ideas Bank"
                        isActive={currentPath === '/ideas'}
                        onClick={() => onNavigate('/ideas')}
                    />
                </SidebarSection>

            </div>
        </div>
    );
};

export default Sidebar;
