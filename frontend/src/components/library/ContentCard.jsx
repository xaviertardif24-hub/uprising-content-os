import { Play, Star, Calendar, ArrowUpRight } from 'lucide-react'

const ContentCard = ({ item, onClick, isLoading }) => {
    if (isLoading) {
        return (
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm animate-pulse">
                <div className="aspect-video bg-slate-100 dark:bg-slate-800" />
                <div className="p-8 space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="h-4 w-20 bg-slate-100 rounded-lg" />
                        <div className="h-4 w-12 bg-slate-100 rounded-lg" />
                    </div>
                    <div className="h-8 w-3/4 bg-slate-100 rounded-lg" />
                    <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                        <div className="h-4 w-24 bg-slate-100 rounded-lg" />
                        <div className="h-10 w-10 bg-slate-100 rounded-2xl" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div
            onClick={() => onClick(item)}
            className="group flex flex-col bg-transparent rounded-md border border-[var(--color-notion-border)] overflow-hidden hover:bg-[var(--color-notion-bg-hover)] transition-colors duration-200 cursor-pointer h-full"
        >
            {/* Thumbnail Area */}
            <div className="relative aspect-video overflow-hidden border-b border-[var(--color-notion-border)]">
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />

                {/* Pillar Badge */}
                <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 bg-[var(--color-notion-bg)]/90 backdrop-blur-sm border border-[var(--color-notion-border)] text-[var(--color-notion-text-muted)] text-[10px] uppercase tracking-wider rounded">
                        {item.pillar}
                    </span>
                </div>
            </div>

            {/* Content Info */}
            <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-[var(--color-notion-text)] leading-snug line-clamp-2 mb-1 group-hover:text-[var(--color-notion-accent)] transition-colors">
                        {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[var(--color-notion-text-meta)] text-[11px]">
                        <span className="flex items-center gap-1">
                            <Star size={10} className="text-[var(--color-notion-accent)]" />
                            {item.score}
                        </span>
                        <span>•</span>
                        <span>{item.date}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentCard
