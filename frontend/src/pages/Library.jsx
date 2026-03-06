import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Grid, List, Plus } from 'lucide-react'
import { MOCK_CONTENT } from '../data/mockContent'
import ContentCard from '../components/library/ContentCard'
import ContentDetails from '../components/library/ContentDetails'
import Skeleton from '../components/common/Skeleton'

const Library = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [selectedPillar, setSelectedPillar] = useState('All')
    const [minScore, setMinScore] = useState(0)
    const [viewMode, setViewMode] = useState('grid')
    const [selectedItem, setSelectedItem] = useState(null)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

    useEffect(() => {
        // Simulate loading delay for "premium" feel
        const timer = setTimeout(() => setIsLoading(false), 800)
        return () => clearTimeout(timer)
    }, [])

    const pillars = ['All', 'Sales', 'Leadership', 'Systems', 'Discipline', 'Community']

    const filteredItems = useMemo(() => {
        return MOCK_CONTENT.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase())
            const matchesPillar = selectedPillar === 'All' || item.pillar === selectedPillar
            const matchesScore = item.score >= minScore
            return matchesSearch && matchesPillar && matchesScore
        })
    }, [search, selectedPillar, minScore])

    const handleCardClick = (item) => {
        setSelectedItem(item)
        setIsDetailsOpen(true)
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Content Library</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-lg">Manage and organize your video transcription assets.</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-blue-100 transition-all hover:scale-105 active:scale-95">
                    <Plus size={22} />
                    <span>Import from Drive</span>
                </button>
            </div>

            {/* Filters & Search Bar */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none flex flex-col lg:flex-row gap-5 sticky top-0 z-10 transition-colors">
                {/* Search */}
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search titles, hooks, or topics..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white font-medium"
                    />
                </div>

                {/* AI Score Filter */}
                <div className="flex flex-col gap-1 min-w-[160px] px-2">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <span>Min Score</span>
                        <span className="text-blue-500">{minScore}+</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.5"
                        value={minScore}
                        onChange={(e) => setMinScore(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                </div>

                {/* Pillar Filter (Pills) */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                    <div className="flex items-center gap-2 pr-4 border-r border-slate-200 mr-2 text-slate-400">
                        <Filter size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest">Pillars</span>
                    </div>
                    {pillars.map((pillar) => (
                        <button
                            key={pillar}
                            onClick={() => setSelectedPillar(pillar)}
                            className={`px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${selectedPillar === pillar
                                ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-lg shadow-slate-300 dark:shadow-blue-900/20 scale-105'
                                : 'bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200'
                                }`}
                        >
                            {pillar}
                        </button>
                    ))}
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-2xl ml-auto border border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2.5 rounded-xl transition-all duration-300 ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-md text-blue-600 dark:text-blue-400 scale-110' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                    >
                        <Grid size={20} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2.5 rounded-xl transition-all duration-300 ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-md text-blue-600 dark:text-blue-400 scale-110' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                    >
                        <List size={20} />
                    </button>
                </div>
            </div>

            {/* Grid View */}
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <div key={n} className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm">
                            <Skeleton className="aspect-video w-full mb-4" />
                            <Skeleton className="h-6 w-3/4 mb-2" variant="text" />
                            <Skeleton className="h-4 w-1/2" variant="text" />
                        </div>
                    ))}
                </div>
            ) : filteredItems.length > 0 ? (
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    <AnimatePresence>
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <ContentCard
                                    item={item}
                                    onClick={handleCardClick}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[2.5rem] border-4 border-dashed border-slate-100">
                    <div className="bg-slate-50 p-10 rounded-full text-slate-200 mb-6 animate-pulse">
                        <Search size={64} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">No content matches your search</h3>
                    <p className="text-slate-500 mt-2 text-lg">Try a different keyword or pillar.</p>
                    <button
                        onClick={() => { setSearch(''); setSelectedPillar('All') }}
                        className="mt-6 bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl active:scale-95"
                    >
                        Clear all filters
                    </button>
                </div>
            )}

            {/* Detail Slide-over */}
            <ContentDetails
                item={selectedItem}
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
            />
        </div>
    )
}

export default Library
