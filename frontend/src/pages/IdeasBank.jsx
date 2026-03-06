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
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Ideas Bank</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-lg">Brainstorm and evaluate your next viral content pieces.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-2xl border border-amber-100 dark:border-amber-900/30 flex items-center gap-2 font-bold text-sm">
                        <Wand2 size={16} />
                        AI Suggestions Available
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-colors">
                <form onSubmit={handleAddIdea} className="flex gap-4">
                    <div className="relative flex-1 group">
                        <Lightbulb className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" size={24} />
                        <input
                            type="text"
                            placeholder="Post an idea for your next video or thread..."
                            value={newIdea}
                            onChange={(e) => setNewIdea(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-lg font-medium text-slate-900 dark:text-white placeholder:text-slate-400"
                        />
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-xl shadow-blue-100 dark:shadow-blue-900/20">
                        <Send size={20} />
                        Add Idea
                    </button>
                </form>
            </div>

            {/* Ideas List */}
            <div className="grid grid-cols-1 gap-4">
                <AnimatePresence>
                    {ideas.map((idea, index) => (
                        <motion.div
                            key={idea.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="group bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:bg-slate-800/50 transition-all duration-300 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-300 dark:text-slate-600 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-500 transition-colors">
                                    <Lightbulb size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{idea.title}</h3>
                                    <div className="flex items-center gap-4 mt-1 text-sm text-slate-400 dark:text-slate-500 font-medium">
                                        <span>{idea.date}</span>
                                        <span className="w-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full"></span>
                                        <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${statusColors[idea.status] || statusColors.Draft}`}>
                                            {idea.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="text-center">
                                    <div className="flex items-center gap-1.5 text-amber-500 mb-1">
                                        <Star size={18} className="fill-amber-500" />
                                        <span className="text-xl font-black text-slate-900 dark:text-white">
                                            {idea.score}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">AI Score</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIdeas(ideas.filter(i => i.id !== idea.id))}
                                        className="p-3 text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                    <button className="bg-slate-900 dark:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-blue-500 transition-all shadow-lg active:scale-95">
                                        Promote to Library
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
