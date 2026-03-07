import React from 'react';
import { Sparkles, TrendingUp, Search, Home, Users, Settings, FileText, Network, BookOpen, Link2, CopyCheck, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Library = () => {
    const navigate = useNavigate();

    return (
        <div className="h-full animate-in fade-in duration-500 overflow-y-auto px-6 py-10 lg:px-16 max-w-[1100px] mx-auto">
            {/* The top bar in the screenshot is handled by MainLayoutNotion, here we just show the content */}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
                {/* Column 1: Suggéré pour vous */}
                <div>
                    <div className="flex items-center gap-2 text-[var(--color-notion-text-muted)] mb-4 px-2">
                        <Sparkles size={16} strokeWidth={1.5} />
                        <h3 className="text-[13px] font-medium">Suggéré pour vous</h3>
                    </div>
                    <div className="space-y-0.5">
                        <HoverItem icon={FileText} label="Content" onClick={() => navigate('/editor')} />
                        <HoverItem icon={Search} label="App" />
                        <HoverItem icon={Home} label="Home" onClick={() => navigate('/dashboard')} />
                        <HoverItem icon={Network} label="Flow" />
                        <HoverItem icon={BookOpen} label="Curator" />
                        <HoverItem icon={Users} label="People" />
                        <HoverItem icon={Settings} label="Tools" onClick={() => navigate('/settings')} />
                    </div>
                </div>

                {/* Column 2: Tendances */}
                <div>
                    <div className="flex items-center gap-2 text-[var(--color-notion-text-muted)] mb-4 px-2">
                        <TrendingUp size={16} strokeWidth={1.5} />
                        <h3 className="text-[13px] font-medium">Tendances</h3>
                    </div>
                    <div className="space-y-0.5">
                        <HoverItem icon={BookOpen} label="Curator" />
                        <HoverItem icon={Network} label="Flow" />
                        <HoverItem icon={FileText} label="Compensation review policy" />
                        <HoverItem icon={Link2} label="Hyperlink" />
                        <HoverItem icon={CopyCheck} label="Toggle Button & Group" />
                        <HoverItem icon={FileText} label="Weekly sync @Tuesday" />
                        <HoverItem icon={FileText} label="Label" />
                    </div>
                </div>

                {/* Column 3: Dans M Uprising Studio */}
                <div>
                    <div className="flex items-center gap-2 text-[var(--color-notion-text-muted)] mb-4 px-2">
                        <h3 className="text-[13px] font-medium">Dans M Uprising Studio</h3>
                    </div>
                    <div className="space-y-0.5 text-sm text-[var(--color-notion-text-muted)] px-2">
                        {/* Area is empty in the screenshot, but we add a placeholder for realism or keep it blank */}
                    </div>
                </div>
            </div>
        </div>
    );
};

const HoverItem = ({ icon: Icon, label, onClick }) => (
    <div 
        onClick={onClick}
        className="flex items-center gap-3 px-2 py-1 rounded-md cursor-pointer hover:bg-[var(--color-notion-bg-hover)] transition-colors text-[var(--color-notion-text)]"
    >
        <Icon size={16} className="text-[var(--color-notion-text-muted)]" strokeWidth={1.5} />
        <span className="text-[14px] font-medium">{label}</span>
    </div>
);

export default Library;
