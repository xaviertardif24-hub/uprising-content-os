import { MoreHorizontal, Star, Share, Clock, PanelLeft } from 'lucide-react';
import { useToast } from '../../common/Toaster';
import { useTranslation } from 'react-i18next';

const PageTopbar = ({ title, breadcrumbs, onToggleSidebar, isSidebarCollapsed }) => {
    const { t } = useTranslation();
    const { toast } = useToast();
    return (
        <div className="h-14 border-b border-notion-border flex items-center justify-between px-6 sticky top-0 bg-notion-bg z-10 transition-all">
            {/* Breadcrumbs Left */}
            <div className="flex items-center gap-1 text-[14px] text-notion-text-muted">
                <button
                    onClick={onToggleSidebar}
                    className="p-1 hover:bg-notion-bg-hover rounded transition-colors mr-1"
                    title={isSidebarCollapsed ? t('common.open_sidebar') : t('common.close_sidebar')}
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
                        onClick={() => toast(t('common.share_soon'))}
                        className="text-[13px] hover:bg-notion-bg-hover px-2 py-1 rounded cursor-pointer transition-colors text-notion-text mr-2"
                    >
                        {t('common.share')}
                    </span>
                    <div title={t('common.share')} onClick={() => toast(t('common.share_soon'))} className="hover:bg-notion-bg-hover p-1.5 rounded cursor-pointer transition-colors">
                        <Share size={16} strokeWidth={1.5} />
                    </div>
                    <div title={t('common.updates')} onClick={() => toast(t('common.notify_soon'))} className="hover:bg-notion-bg-hover p-1.5 rounded cursor-pointer transition-colors">
                        <Clock size={16} strokeWidth={1.5} />
                    </div>
                    <div title={t('common.favorites')} onClick={() => toast(t('common.favorites_added'))} className="hover:bg-notion-bg-hover p-1.5 rounded cursor-pointer transition-colors">
                        <Star size={16} strokeWidth={1.5} />
                    </div>
                    <div title={t('common.more')} className="hover:bg-notion-bg-hover p-1.5 rounded cursor-pointer transition-colors ml-1">
                        <MoreHorizontal size={16} strokeWidth={1.5} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageTopbar;
