import { Star, Wand2 } from 'lucide-react'

const ContentCard = ({ item, onClick, onGenerateCaptions }) => {
    return (
        <div
            onClick={() => onClick?.(item)}
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

                {/* Generate Captions button — appears on hover */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onGenerateCaptions?.(item)
                        }}
                        className="flex items-center gap-1 px-2 py-1 bg-[var(--color-notion-accent)] text-white text-[10px] font-semibold rounded shadow-md hover:opacity-90 transition-opacity"
                        title="Generate Captions"
                    >
                        <Wand2 size={10} />
                        Captions
                    </button>
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
