import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Lightbulb, Star, Trash2, Send, Wand2, X } from 'lucide-react'
import { useToast } from '../components/common/Toaster'

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
    const [selectedIdea, setSelectedIdea] = useState(null)
    const { toast } = useToast()

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

        // Scoring IA réel
        const scoreIdea = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/chat/score`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: idea.title })
                });
                const data = await response.json();
                setIdeas(prev => prev.map(i => i.id === idea.id ? { ...i, score: data.score.toFixed(1) } : i));
            } catch (err) {
                console.error("Scoring error:", err);
                setIdeas(prev => prev.map(i => i.id === idea.id ? { ...i, score: "Err" } : i));
            }
        };
        scoreIdea();
    }

    const handlePromote = (e, idea) => {
        e.stopPropagation();
        toast("Idée promue avec succès !");
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between border-b border-notion-border pb-4 mb-6">
                <h1 className="text-3xl font-semibold text-notion-text tracking-tight">Boîte à idées</h1>
                <div className="flex items-center gap-2 text-[11px] font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
                    <Wand2 size={12} />
                    Suggestions IA Disponibles
                </div>
            </div>

            {/* Input Area */}
            <div className="mb-8">
                <form onSubmit={handleAddIdea} className="flex gap-2">
                    <div className="relative flex-1 group">
                        <Lightbulb className="absolute left-3 top-1/2 -translate-y-1/2 text-notion-text-muted group-focus-within:text-amber-500 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Tapez une nouvelle idée ici..."
                            value={newIdea}
                            onChange={(e) => setNewIdea(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-transparent border border-notion-border hover:bg-notion-bg-hover focus:bg-notion-bg rounded-md outline-none transition-colors text-notion-text text-sm placeholder:text-notion-text-muted"
                        />
                    </div>
                    <button className="bg-notion-accent text-white px-4 py-2 rounded-md font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap">
                        <Send size={14} />
                        Ajouter l'idée
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
                            onClick={() => setSelectedIdea(idea)}
                            className="group p-2 -mx-2 rounded hover:bg-notion-bg-hover transition-colors duration-150 flex items-center justify-between cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 flex items-center justify-center text-notion-text-muted group-hover:text-amber-500 transition-colors">
                                    <Lightbulb size={16} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-notion-text leading-snug group-hover:text-notion-accent transition-colors">{idea.title}</h3>
                                    <div className="flex items-center gap-2 mt-0.5 text-xs text-[var(--color-notion-text-meta)]">
                                        <span>{idea.date}</span>
                                        <span>•</span>
                                        <span className={`px-1.5 py-0.5 rounded-[4px] font-medium text-[10px] ${idea.status === 'New' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                idea.status === 'Draft' ? 'bg-[var(--color-notion-bg-subtle)] text-notion-text-muted' :
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
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (window.confirm("Êtes-vous sûr de vouloir supprimer cette idée ?")) {
                                                setIdeas(ideas.filter(i => i.id !== idea.id));
                                            }
                                        }}
                                        className="p-1.5 text-notion-text-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                        title="Supprimer l'idée"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                    <button 
                                        onClick={(e) => handlePromote(e, idea)}
                                        className="text-[11px] font-medium text-notion-accent hover:text-white border border-notion-accent hover:bg-notion-accent px-2 py-1 rounded transition-colors"
                                    >
                                        Promouvoir
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Idea Details Modal */}
            <AnimatePresence>
                {selectedIdea && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-[#191919] w-full max-w-[600px] rounded-xl shadow-2xl p-6 border border-notion-border relative"
                        >
                            <button 
                                onClick={() => setSelectedIdea(null)}
                                className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-notion-bg-hover text-notion-text-muted hover:text-notion-text transition-colors"
                            >
                                <X size={20} />
                            </button>
                            
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
                                    <Lightbulb size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-notion-text">{selectedIdea.title}</h2>
                                    <div className="flex items-center gap-3 text-sm text-notion-text-muted mt-1">
                                        <span>Créé le : {selectedIdea.date}</span>
                                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 font-medium text-[11px]">Score IA: {selectedIdea.score}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-4 mb-8">
                                <div>
                                    <label className="text-xs font-semibold text-notion-text-muted uppercase tracking-wider mb-2 block">Description / Notes</label>
                                    <textarea 
                                        className="w-full bg-notion-bg-hover border border-notion-border rounded-md p-3 text-sm text-notion-text min-h-[120px] focus:outline-none focus:border-notion-accent resize-none"
                                        placeholder="Ajoutez des détails, un plan ou des références pour cette idée..."
                                        defaultValue={`Notes pour: ${selectedIdea.title}\n\n[L'édition détaillée sera bientôt disponible]`}
                                    />
                                </div>
                            </div>
                            
                            <div className="flex justify-end gap-3 border-t border-notion-border pt-4">
                                <button 
                                    onClick={() => setSelectedIdea(null)}
                                    className="px-4 py-2 text-sm font-medium text-notion-text-muted hover:text-notion-text transition-colors"
                                >
                                    Fermer
                                </button>
                                <button 
                                    onClick={(e) => {
                                        handlePromote(e, selectedIdea);
                                        setSelectedIdea(null);
                                    }}
                                    className="px-4 py-2 text-sm font-medium bg-notion-accent text-white rounded-md hover:opacity-90 transition-opacity flex items-center gap-2"
                                >
                                    <Star size={16} className="fill-current" />
                                    Promouvoir en brouillon
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default IdeasBank
