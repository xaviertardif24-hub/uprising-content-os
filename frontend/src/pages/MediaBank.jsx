import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Upload, Grid, List, Play, MoreHorizontal, Folder } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const MediaBank = () => {
    const { t } = useTranslation()
    const { media } = useClipflowStore()
    const [viewMode, setViewMode] = useState('grid')

    return (
        <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">{t('media_bank.title')}</h1>
                    <p className="text-muted-foreground mt-2">{t('media_bank.subtitle')}</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder={t('media_bank.search_placeholder')}
                            className="pl-10 pr-4 py-2 bg-secondary/10 border-transparent focus:border-primary/20 focus:bg-white rounded-xl text-sm transition-all outline-none w-64"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm">
                        <Upload className="w-4 h-4" /> {t('media_bank.import')}
                    </button>
                </div>
            </header>

            <div className="flex-1 overflow-auto pr-2">
                {/* Categories / Folders */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    {[
                        { id: 'all', label: t('media_bank.categories.all') },
                        { id: 'raw', label: t('media_bank.categories.raw') },
                        { id: 'broll', label: t('media_bank.categories.broll') },
                        { id: 'assets', label: t('media_bank.categories.assets') },
                        { id: 'scripts', label: t('media_bank.categories.scripts') },
                        { id: 'exports', label: t('media_bank.categories.exports') }
                    ].map((cat) => (
                        <button key={cat.id} className="whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/20 hover:bg-secondary/40 text-sm font-medium transition-all">
                            <Folder className="w-4 h-4 text-muted-foreground" /> {cat.label}
                        </button>
                    ))}
                </div>

                {/* Media Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {media.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className="group relative cursor-pointer"
                        >
                            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-secondary relative">
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                        <Play className="w-5 h-5 fill-current" />
                                    </div>
                                </div>
                                <div className="absolute top-2 right-2 flex gap-1">
                                    <span className="px-2 py-0.5 rounded-lg bg-black/40 backdrop-blur-md text-[10px] text-white font-medium">
                                        0:12
                                    </span>
                                </div>
                            </div>
                            <div className="mt-3 px-1">
                                <h4 className="text-sm font-medium truncate group-hover:text-primary transition-colors">{item.title}</h4>
                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">{item.category}</span>
                                    <MoreHorizontal className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MediaBank
