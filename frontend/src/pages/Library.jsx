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
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex items-center justify-between border-b border-[var(--color-notion-border)] pb-4 mb-6">
                <h1 className="text-3xl font-semibold text-[var(--color-notion-text)] tracking-tight">Library</h1>
                <button className="flex items-center gap-2 bg-[var(--color-notion-accent)] text-white px-4 py-2 rounded-md font-medium text-sm hover:opacity-90 transition-opacity">
                    <Plus size={16} />
                    <span>New Content</span>
                </button>
            </div>

            {/* Filters & Search Bar - Flat UI */}
            <div className="flex flex-col lg:flex-row gap-4 items-center mb-6">
                {/* Search */}
                <div className="relative flex-1 group max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-notion-text-muted)]" size={16} />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 bg-transparent border border-[var(--color-notion-border)] hover:bg-[var(--color-notion-bg-hover)] focus:bg-[var(--color-notion-bg)] rounded-md outline-none transition-colors text-[var(--color-notion-text)] text-sm"
                    />
                </div>

                {/* AI Score Filter */}
                <div className="flex items-center gap-3">
                    <span className="text-xs text-[var(--color-notion-text-muted)]">Score &ge; {minScore}</span>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.5"
                        value={minScore}
                        onChange={(e) => setMinScore(parseFloat(e.target.value))}
                        className="w-24 h-1 bg-[var(--color-notion-border-strong)] rounded-full appearance-none flex-shrink-0"
                    />
                </div>

                {/* Pillar Filter */}
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar mx-2">
                    {pillars.map((pillar) => (
                        <button
                            key={pillar}
                            onClick={() => setSelectedPillar(pillar)}
                            className={`px-3 py-1 rounded-[4px] text-sm whitespace-nowrap transition-colors ${selectedPillar === pillar
                                ? 'bg-[var(--color-notion-bg-active)] font-medium text-[var(--color-notion-text)]'
                                : 'text-[var(--color-notion-text-muted)] hover:bg-[var(--color-notion-bg-hover)] hover:text-[var(--color-notion-text)]'
                                }`}
                        >
                            {pillar}
                        </button>
                    ))}
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-1 ml-auto">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded-[4px] transition-colors ${viewMode === 'grid' ? 'bg-[var(--color-notion-bg-active)] text-[var(--color-notion-text)]' : 'text-[var(--color-notion-text-muted)] hover:bg-[var(--color-notion-bg-hover)]'}`}
                    >
                        <Grid size={16} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-1.5 rounded-[4px] transition-colors ${viewMode === 'list' ? 'bg-[var(--color-notion-bg-active)] text-[var(--color-notion-text)]' : 'text-[var(--color-notion-text-muted)] hover:bg-[var(--color-notion-bg-hover)]'}`}
                    >
                        <List size={16} />
                    </button>
                </div>
            </div>

            {/* Grid View */}
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <div key={n} className="bg-[var(--color-notion-bg)] rounded-md p-3 border border-[var(--color-notion-border)]">
                            <Skeleton className="aspect-video w-full mb-3" />
                            <Skeleton className="h-4 w-3/4 mb-1.5" variant="text" />
                            <Skeleton className="h-3 w-1/2" variant="text" />
                        </div>
                    ))}
                </div>
            ) : filteredItems.length > 0 ? (
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                >
                    <AnimatePresence>
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
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
                <div className="flex flex-col items-center justify-center py-20 bg-[var(--color-notion-bg-subtle)] rounded-md border border-[var(--color-notion-border)]">
                    <Search size={32} className="text-[var(--color-notion-text-muted)] mb-4" />
                    <h3 className="text-sm font-semibold text-[var(--color-notion-text)]">No results</h3>
                    <p className="text-[var(--color-notion-text-meta)] text-xs mt-1 mb-4">Try different keywords or filters.</p>
                    <button
                        onClick={() => { setSearch(''); setSelectedPillar('All') }}
                        className="text-[var(--color-notion-text)] text-xs font-medium px-3 py-1.5 border border-[var(--color-notion-border)] rounded bg-[var(--color-notion-bg)] hover:bg-[var(--color-notion-bg-hover)] transition-colors"
                    >
                        Clear filters
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
