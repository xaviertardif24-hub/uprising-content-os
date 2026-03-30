import { create } from 'zustand'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, X } from 'lucide-react'

const useToastStore = create((set) => ({
    toasts: [],
    addToast: (message, type = 'success') => {
        const id = Date.now()
        set((state) => ({
            toasts: [...state.toasts, { id, message, type }]
        }))
        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter((t) => t.id !== id)
            }))
        }, 4000)
    },
    removeToast: (id) => {
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id)
        }))
    }
}))

export const useToast = () => {
    const addToast = useToastStore((state) => state.addToast)
    return { toast: addToast }
}

export const Toaster = () => {
    const toasts = useToastStore((state) => state.toasts)
    const removeToast = useToastStore((state) => state.removeToast)

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3 pointer-events-none items-end">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        layout
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95, transition: { duration: 0.2 } }}
                        className={`
                            pointer-events-auto flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md
                            ${toast.type === 'success'
                                ? 'bg-slate-900/95 dark:bg-slate-800/95 border-emerald-900/50 text-white shadow-emerald-900/20'
                                : 'bg-slate-900/95 dark:bg-slate-800/95 border-red-900/50 text-white shadow-red-900/20'}
                        `}
                    >
                        {toast.type === 'success' ? (
                            <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                        ) : (
                            <AlertCircle size={20} className="text-red-500 shrink-0" />
                        )}

                        <p className="font-bold text-sm tracking-tight">{toast.message}</p>

                        <button
                            onClick={() => removeToast(toast.id)}
                            className="ml-2 p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}
