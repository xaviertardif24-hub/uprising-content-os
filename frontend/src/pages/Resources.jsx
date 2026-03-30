import { motion } from 'framer-motion'
import {
    BookOpen, ExternalLink, Download, Monitor, Database, Settings as SettingsIcon,
    Figma, FileText, Globe
} from 'lucide-react'

const RESOURCES_DATA = [
    {
        title: 'Project Management',
        icon: Database,
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        description: 'Espace notion principal avec toutes les tâches, notes et suivis du projet Content OS.',
        link: '#to-be-provided',
        linkText: 'Ouvrir Notion'
    },
    {
        title: 'Design & CMS',
        icon: Figma,
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10',
        description: 'Maquettes interactives et accès au CMS Framer pour la gestion du contenu public.',
        link: 'https://framer.com',
        linkText: 'Voir sur Framer'
    },
    {
        title: 'Tech Stack (React + Tailwind)',
        icon: Monitor,
        color: 'text-cyan-500',
        bgColor: 'bg-cyan-500/10',
        description: 'Documentation technique des technologies utilisées pour l\'interface utilisateur.',
        link: 'https://react.dev',
        linkText: 'Docs React'
    },
    {
        title: 'Guide d\'Utilisation Projet',
        icon: FileText,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10',
        description: 'Document PDF récapitulatif du fonctionnement global du système à remettre au professeur.',
        link: '#',
        linkText: 'Télécharger le PDF',
        download: true
    }
]

const Resources = () => {
    return (
        <div className="w-full max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-12 pt-6 px-4">
            {/* Header */}
            <header className="mb-10 text-center sm:text-left">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4"
                >
                    <BookOpen size={14} />
                    <span>Ressources</span>
                </motion.div>
                <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                    Documents & Liens <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                        Pour le Professeur
                    </span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-4 font-medium max-w-2xl text-lg">
                    Retrouvez ici l'ensemble des liens fonctionnels, accès CMS, et documentations techniques relatifs au projet Content OS.
                </p>
            </header>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
                
                {RESOURCES_DATA.map((resource, idx) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={idx}
                        className="group bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-slate-800/50 p-8 rounded-3xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden"
                    >
                        {/* Decorative glow */}
                        <div className={`absolute -top-20 -right-20 w-40 h-40 ${resource.bgColor} blur-3xl group-hover:scale-150 transition-transform duration-700`} />
                        
                        <div className="relative z-10 flex flex-col h-full">
                            <div className={`w-14 h-14 rounded-2xl ${resource.bgColor} flex items-center justify-center mb-6`}>
                                <resource.icon size={28} className={resource.color} />
                            </div>
                            
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                {resource.title}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 font-medium mb-8 flex-1">
                                {resource.description}
                            </p>
                            
                            <a
                                href={resource.link}
                                target={resource.download ? "_self" : "_blank"}
                                rel={resource.download ? "" : "noopener noreferrer"}
                                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer
                                    ${resource.download 
                                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105'
                                        : 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20'
                                    }
                                `}
                            >
                                {resource.download ? <Download size={18} /> : <ExternalLink size={18} />}
                                {resource.linkText}
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            {/* Environment Info Panel */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 bg-gradient-to-br from-blue-900 to-slate-900 p-8 rounded-3xl text-white relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                            <SettingsIcon size={20} className="text-blue-400" />
                            Environnement de Production
                        </h3>
                        <p className="text-blue-200/80 font-medium text-sm">
                            Version API: v1.0.4 | Base de données: Connectée | AI Models: Actifs
                        </p>
                    </div>
                    <button className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl font-bold border border-white/10 transition-colors flex items-center gap-2">
                        <Globe size={18} />
                        Voir les Logs Système
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

export default Resources
