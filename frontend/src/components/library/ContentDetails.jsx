import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { X, Play, RotateCw, FileText, Copy, Star, Calendar, Tag, Wand2, Edit3 } from 'lucide-react'
import { useToast } from '../common/Toaster'
import { useNavigate } from 'react-router-dom'

const ContentDetails = ({ item, isOpen, onClose, onGenerateCaptions }) => {
    const { toast } = useToast()
    const navigate = useNavigate()

    if (!item) return null

    const handleCopyTranscript = () => {
        navigator.clipboard.writeText(item.transcript)
        toast('Transcript copied to clipboard!')
    }

    const handleEdit = () => {
        onClose();
        navigate('/editor');
    }

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            {/* Backdrop */}
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition duration-500 data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                        <DialogPanel
                            transition
                            className="pointer-events-auto w-screen max-w-2xl transform transition ease-in-out duration-500 data-[closed]:translate-x-full"
                        >
                            <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-slate-900 shadow-2xl transition-colors">
                                {/* Hero Image */}
                                <div className="relative h-80 w-full shrink-0 overflow-hidden">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                                    <button
                                        onClick={onClose}
                                        className="absolute right-6 top-6 p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all border border-white/10"
                                    >
                                        <X size={24} />
                                    </button>

                                    <div className="absolute bottom-8 left-8 right-8">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-900/20">
                                                {item.pillar}
                                            </span>
                                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-900 text-xs font-black shadow-lg shadow-amber-900/20">
                                                <Star size={12} className="fill-slate-900" />
                                                {item.score} / 10
                                            </div>
                                        </div>
                                        <DialogTitle className="text-3xl font-black text-white leading-tight tracking-tight">
                                            {item.title}
                                        </DialogTitle>
                                    </div>
                                </div>

                                <div className="flex-1 p-8 space-y-10">
                                    {/* Action Bar */}
                                    <div className="flex flex-wrap gap-4 border-b border-slate-100 dark:border-slate-800 pb-8">
                                        <button 
                                            onClick={handleEdit}
                                            className="flex-1 min-w-[140px] flex items-center justify-center gap-3 bg-[var(--color-notion-text)] text-[var(--color-notion-bg)] px-6 py-4 rounded-2xl font-black text-sm hover:opacity-90 transition-all shadow-xl shadow-slate-200 dark:shadow-none active:scale-95"
                                        >
                                            <Edit3 size={20} />
                                            Edit Content
                                        </button>
                                        <button className="flex-1 min-w-[140px] flex items-center justify-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-2xl font-black text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 dark:shadow-none active:scale-95">
                                            <Play size={20} className="fill-white" />
                                            Watch Content
                                        </button>
                                        <button
                                            onClick={() => onGenerateCaptions?.(item)}
                                            className="flex-1 min-w-[170px] flex items-center justify-center gap-3 bg-[var(--color-notion-accent)] text-white px-6 py-4 rounded-2xl font-black text-sm hover:opacity-90 transition-all active:scale-95"
                                        >
                                            <Wand2 size={20} />
                                            Auto-Captions
                                        </button>
                                    </div>

                                    {/* Metadata Grid */}
                                    <div className="grid grid-cols-2 gap-8 py-2">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500">
                                                <Calendar size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500">Import Date</p>
                                                <p className="font-bold text-slate-900 dark:text-white">{item.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500">
                                                <Tag size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500">Status</p>
                                                <p className={`font-bold ${item.status === 'Published' ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}`}>
                                                    {item.status}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Transcript Section */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                                    <FileText size={18} />
                                                </div>
                                                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Full Transcript</h3>
                                            </div>
                                            <button
                                                onClick={handleCopyTranscript}
                                                className="flex items-center gap-2 p-2 px-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-bold text-xs group"
                                            >
                                                <Copy size={14} className="group-hover:scale-110 transition-transform" />
                                                Copy All
                                            </button>
                                        </div>
                                        <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 relative group overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl pointer-events-none" />
                                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium relative z-10 text-lg italic">
                                                "{item.transcript}"
                                            </p>
                                        </div>
                                    </div>

                                    {/* AI Insights */}
                                    <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-900/20 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[100px] pointer-events-none" />
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md">
                                                    <RotateCw size={20} className="text-blue-400" />
                                                </div>
                                                <h4 className="text-xl font-black tracking-tight">AI Insights & Hook Ideas</h4>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                                    <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-1">Viral Hook Idea</p>
                                                    <p className="text-sm font-bold opacity-90">"L'erreur silencieuse qui tue vos ventes (et comment la corriger par le silence)..."</p>
                                                </div>
                                                <div className="p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                                    <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-1">Recommended Platform</p>
                                                    <p className="text-sm font-bold opacity-90">Perfect for: LinkedIn Carousel or Short-form Video.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default ContentDetails
