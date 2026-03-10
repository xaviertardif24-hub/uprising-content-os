import React from 'react'
import { motion } from 'framer-motion'
import { Play, FileText, Share2, Youtube, Instagram, Twitter } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const ContentTasks = () => {
    const { t } = useTranslation()
    const { tasks } = useClipflowStore()
    const contentTasks = tasks.filter(t => ['Writer', 'Creator'].includes(t.role))

    const getPlatformIcon = (platform) => {
        switch (platform) {
            case 'YouTube': return <Youtube className="w-4 h-4 text-red-500" />
            case 'TikTok': return <span className="text-[10px] font-black">TT</span>
            case 'Instagram': return <Instagram className="w-4 h-4 text-pink-500" />
            default: return <Share2 className="w-4 h-4 text-primary" />
        }
    }

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <header className="mb-10">
                <h1 className="text-3xl font-semibold tracking-tight">{t('content_tasks.title')}</h1>
                <p className="text-muted-foreground mt-2">{t('content_tasks.subtitle')}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contentTasks.map((task, idx) => (
                    <motion.div
                        key={task.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group bg-white rounded-2xl border border-border/60 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                            {getPlatformIcon('YouTube')}
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                {task.role}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600">
                                {task.status}
                            </span>
                        </div>

                        <h3 className="text-lg font-semibold leading-tight mb-4 group-hover:text-primary transition-colors">
                            {task.title}
                        </h3>

                        <div className="flex items-center gap-3 mt-auto">
                            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-secondary/10 hover:bg-secondary/20 text-xs font-semibold transition-colors">
                                <FileText className="w-3.5 h-3.5" /> {t('content_tasks.script')}
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 text-xs font-semibold transition-colors shadow-sm">
                                <Play className="w-3.5 h-3.5 fill-current" /> {t('content_tasks.capture')}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default ContentTasks
