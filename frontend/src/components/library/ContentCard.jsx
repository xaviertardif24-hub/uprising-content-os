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
            className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-100/50 dark:shadow-none hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 cursor-pointer relative flex flex-col h-full hover:-translate-y-2"
        >
            {/* Thumbnail Area */}
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Play Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 scale-50 group-hover:scale-100 transition-transform duration-500">
                        <Play className="text-white fill-white ml-1" size={24} />
                    </div>
                </div>

                {/* Pillar Badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                        {item.pillar}
                    </span>
                </div>

                {/* Score Badge */}
                <div className="absolute bottom-4 right-4 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 scale-90 group-hover:scale-100 transition-transform border border-transparent dark:border-slate-700">
                    <Star className="text-amber-500 fill-amber-500" size={14} />
                    <span className="font-black text-slate-900 dark:text-white text-sm">{item.score}</span>
                </div>
            </div>

            {/* Content Info */}
            <div className="p-8 flex-1 flex flex-col justify-between">
                <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {item.title}
                </h3>

                <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-50 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-wider">
                        <Calendar size={14} />
                        {item.date}
                    </div>
                    <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-300 dark:text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 hover:rotate-12">
                        <ArrowUpRight size={20} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentCard
