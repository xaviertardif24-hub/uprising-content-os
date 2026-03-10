import React from 'react'
import { motion } from 'framer-motion'
import { Layout, Copy, Plus, ChevronRight, Share2, Star } from 'lucide-react'

const Templates = () => {
    const templates = [
        { id: 1, title: 'Workflow YouTube Long', description: 'Idéation -> Script -> Montage -> SEO', views: '2.4k', type: 'Linear' },
        { id: 2, title: 'TikTok/Reels Fast Track', description: 'Hook -> Capture -> Edit mobile -> Post', views: '5.1k', type: 'Agile' },
        { id: 3, title: 'Série Éducative', description: 'Curriculum -> Slide design -> Record -> QC', views: '842', type: 'Structure' },
    ]

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <header className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">Templates</h1>
                    <p className="text-muted-foreground mt-2">Réutilisez vos structures de projets gagnantes.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm">
                    <Plus className="w-4 h-4" /> Nouveau Template
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template, idx) => (
                    <motion.div
                        key={template.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group bg-white rounded-2xl border border-border/60 p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Layout className="w-5 h-5" />
                            </div>
                            <Star className="w-4 h-4 text-muted-foreground hover:text-orange-400 transition-colors" />
                        </div>

                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{template.title}</h3>
                        <p className="text-sm text-muted-foreground mb-6 flex-1">{template.description}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-border/40">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                    {template.type}
                                </span>
                                <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold">
                                    <Copy className="w-3 h-3" /> {template.views}
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <section className="mt-16">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-primary" /> Community Templates
                </h2>
                <div className="p-8 rounded-3xl bg-secondary/10 border-2 border-dashed border-border/60 flex flex-col items-center text-center">
                    <p className="text-muted-foreground max-w-sm mb-4">Découvrez les workflows partagés par les meilleurs créateurs de la communauté.</p>
                    <button className="text-sm font-bold text-primary hover:underline">Explorer la galerie →</button>
                </div>
            </section>
        </div>
    )
}

export default Templates
