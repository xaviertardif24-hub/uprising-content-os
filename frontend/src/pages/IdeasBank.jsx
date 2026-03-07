import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Lightbulb, Star, Trash2, Send, Wand2 } from 'lucide-react'

const MOCK_IDEAS = [
    { id: 1, title: 'Comment gérer son temps en tant que solopreneur', score: 8.8, status: 'Draft', date: '2026-03-06' },
    { id: 2, title: 'Top 5 outils IA pour le marketing en 2026', score: 9.2, status: 'New', date: '2026-03-05' },
    { id: 3, title: 'Pourquoi vous devriez arrêter de faire des meetings', score: 7.5, status: 'Reviewing', date: '2026-03-05' },
]

const statusColors = {
    New: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    Draft: 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400',
    Reviewing: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
}

const IdeasBank = () => {
    const [ideas, setIdeas] = useState(MOCK_IDEAS)
    const [newIdea, setNewIdea] = useState('')

    const handleAddIdea = (e) => {
        e.preventDefault()
        if (!newIdea.trim()) return
        const idea = {
            id: Date.now(),
            title: newIdea,
            score: 'Analysing...',
            status: 'New',
            date: new Date().toISOString().split('T')[0]
        }
        setIdeas([idea, ...ideas])
        setNewIdea('')

        // Simuler le scoring AI
        setTimeout(() => {
            setIdeas(prev => prev.map(i => i.id === idea.id ? { ...i, score: (Math.random() * 3 + 7).toFixed(1) } : i))
        }, 2000)
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between border-b border-[var(--color-notion-border)] pb-4 mb-6">
                <h1 className="text-3xl font-semibold text-[var(--color-notion-text)] tracking-tight">Ideas Bank</h1>
                <div className="flex items-center gap-2 text-[11px] font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
                    <Wand2 size={12} />
                    AI Suggestions Available
                </div>
            </div>

            {/* Input Area */}
            <div className="mb-8">
                <form onSubmit={handleAddIdea} className="flex gap-2">
                    <div className="relative flex-1 group">
                        <Lightbulb className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-notion-text-muted)] group-focus-within:text-amber-500 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Type a new idea here..."
                            value={newIdea}
                            onChange={(e) => setNewIdea(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-transparent border border-[var(--color-notion-border)] hover:bg-[var(--color-notion-bg-hover)] focus:bg-[var(--color-notion-bg)] rounded-md outline-none transition-colors text-[var(--color-notion-text)] text-sm placeholder:text-[var(--color-notion-text-muted)]"
                        />
                    </div>
                    <button className="bg-[var(--color-notion-accent)] text-white px-4 py-2 rounded-md font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap">
                        <Send size={14} />
                        Add Idea
                    </button>
                </form>
            </div>

            {/* Ideas List */}
            <div className="flex flex-col gap-1">
                <AnimatePresence>
                    {ideas.map((idea, index) => (
                        <motion.div
                            key={idea.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            className="group p-2 -mx-2 rounded hover:bg-[var(--color-notion-bg-hover)] transition-colors duration-150 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 flex items-center justify-center text-[var(--color-notion-text-muted)] group-hover:text-amber-500 transition-colors">
                                    <Lightbulb size={16} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-[var(--color-notion-text)] leading-snug group-hover:text-[var(--color-notion-accent)] transition-colors">{idea.title}</h3>
                                    <div className="flex items-center gap-2 mt-0.5 text-xs text-[var(--color-notion-text-meta)]">
                                        <span>{idea.date}</span>
                                        <span>•</span>
                                        <span className={`px-1.5 py-0.5 rounded-[4px] font-medium text-[10px] ${idea.status === 'New' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                idea.status === 'Draft' ? 'bg-[var(--color-notion-bg-subtle)] text-[var(--color-notion-text-muted)]' :
                                                    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                            }`}>
                                            {idea.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5 text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded">
                                    <Star size={12} className="fill-amber-500" />
                                    <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                                        {idea.score}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => {
                                            if (window.confirm("Êtes-vous sûr de vouloir supprimer cette idée ?")) {
                                                setIdeas(ideas.filter(i => i.id !== idea.id));
                                            }
                                        }}
                                        className="p-1.5 text-[var(--color-notion-text-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                        title="Delete Idea"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                    <button className="text-[11px] font-medium text-[var(--color-notion-accent)] hover:text-white border border-[var(--color-notion-accent)] hover:bg-[var(--color-notion-accent)] px-2 py-1 rounded transition-colors">
                                        Promote
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default IdeasBank
