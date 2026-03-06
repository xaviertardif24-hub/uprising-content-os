import React from 'react';
import { MoreHorizontal, Star, Share, Clock } from 'lucide-react';

const PageTopbar = ({ title, breadcrumbs }) => {
    return (
        <div className="h-12 border-b border-[var(--color-notion-border)] flex items-center justify-between px-3 sticky top-0 bg-[var(--color-notion-bg)] z-10">
            {/* Breadcrumbs Left */}
            <div className="flex items-center gap-1 text-[14px] text-[var(--color-notion-text-muted)]">
                {breadcrumbs && breadcrumbs.map((crumb, idx) => (
                    <React.Fragment key={idx}>
                        <span className="hover:bg-[var(--color-notion-bg-hover)] px-1.5 py-0.5 rounded cursor-pointer transition-colors max-w-[120px] truncate">
                            {crumb.label}
                        </span>
                        {idx < breadcrumbs.length - 1 && <span>/</span>}
                    </React.Fragment>
                ))}
            </div>

            {/* Actions Right */}
            <div className="flex items-center gap-2 text-[14px] text-[var(--color-notion-text-muted)]">
                <div className="hover:bg-[var(--color-notion-bg-hover)] p-1.5 rounded cursor-pointer transition-colors">
                    <Share size={16} />
                </div>
                <div className="hover:bg-[var(--color-notion-bg-hover)] p-1.5 rounded cursor-pointer transition-colors">
                    <Clock size={16} />
                </div>
                <div className="hover:bg-[var(--color-notion-bg-hover)] p-1.5 rounded cursor-pointer transition-colors">
                    <Star size={16} />
                </div>
                <div className="hover:bg-[var(--color-notion-bg-hover)] p-1.5 rounded cursor-pointer transition-colors ml-1">
                    <MoreHorizontal size={16} />
                </div>
            </div>
        </div>
    );
};

export default PageTopbar;
