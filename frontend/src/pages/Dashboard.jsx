import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Clock, CheckSquare, Sparkles, TrendingUp, Search,
    FileText, Users, Home, Workflow, Settings, FileIcon, UserIcon, LibraryBig, Star, LayoutGrid, ChevronRight
} from 'lucide-react'
import { useClipflowStore } from '../store/useClipflowStore'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../components/common/Toaster'
import { useNavigate } from 'react-router-dom'

const RECENTLY_VISITED = [
    { title: 'Example PRD', icon: FileText, date: 'J Feb 21', color: 'text-blue-500' },
    { title: 'Docs', icon: FileIcon, date: 'J Feb 21', color: 'text-gray-500' },
    { title: 'Interview participants', icon: Users, date: 'J Just now', color: 'text-gray-500' },
    { title: 'Trial run', icon: FileText, date: 'J Just now', color: 'text-gray-500' },
    { title: 'Getting Started', icon: Star, date: 'J Feb 21', color: 'text-gray-500' },
]

const MY_TASKS = [
    { title: 'Task', date: 'February 6, 2024', status: 'In progress', statusColor: 'bg-blue-100 text-blue-800', list: 'Tasks', listIcon: CheckSquare },
    { title: 'Trial run', date: 'February 25, 2024', status: 'Not started', statusColor: 'bg-gray-100 text-gray-800', list: 'Tasks', listIcon: CheckSquare },
    { title: 'Interview participants', date: 'Add Due', status: 'Not started', statusColor: 'bg-gray-100 text-gray-800', list: 'Tasks', listIcon: CheckSquare },
]

const SUGGESTED = [
    { title: 'Content', icon: FileText },
    { title: 'App', icon: Search },
    { title: 'Home', icon: Home },
    { title: 'Flow', icon: Workflow },
    { title: 'Curator', icon: LibraryBig },
    { title: 'People', icon: Users },
    { title: 'Tools', icon: Settings },
]

const TRENDING = [
    { title: 'Curator', icon: LibraryBig },
    { title: 'Flow', icon: Workflow },
    { title: 'Compensation review policy', icon: FileIcon },
    { title: 'Hyperlink', icon: Sparkles },
    { title: 'Toggle Button & Group', icon: Sparkles },
    { title: 'Weekly sync @Tuesday', icon: FileIcon },
    { title: 'Label', icon: FileIcon },
]



const Dashboard = () => {
    const { user } = useAuth()
    const { toast } = useToast()
    const navigate = useNavigate()
    const userName = user?.name || 'Jane Smith' // Fallback for matching image exactly

    return (
        <div className="w-full max-w-[900px] mx-auto animate-in fade-in duration-500 pb-12 pt-4">

            {/* Header */}
            <header className="flex items-center justify-center mb-10">
                <h1 className="text-2xl font-bold text-[#37352F] tracking-tight">
                    🌤️ Bonjour, {userName}
                </h1>
            </header>

            <div className="space-y-8">

                {/* Recently Visited */}
                <section>
                    <div className="flex items-center gap-2 mb-3 text-[rgba(55,53,47,0.65)] text-sm font-medium">
                        <Clock size={14} />
                        <h2>Récemment visité</h2>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
                        {RECENTLY_VISITED.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2, delay: idx * 0.05 }}
                                onClick={() => navigate('/editor')}
                                className="group shrink-0 w-[140px] h-[100px] border border-[rgba(55,53,47,0.16)] rounded-lg p-3 flex flex-col justify-between hover:bg-[rgba(55,53,47,0.04)] cursor-pointer transition-colors shadow-sm"
                            >
                                <div className={`${item.color}`}>
                                    <item.icon size={20} className={item.title === 'Example PRD' ? 'text-blue-500 fill-blue-500' : ''} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-[#37352F] truncate">{item.title}</h3>
                                    <div className="flex items-center gap-1 mt-1 text-xs text-[rgba(55,53,47,0.65)]">
                                        <div className="w-4 h-4 rounded-sm bg-gray-200 flex items-center justify-center text-[10px]">
                                            {item.date.charAt(0)}
                                        </div>
                                        <span className="truncate">{item.date.substring(2)}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Clipflow Workload Overview */}
                <section>
                    <div className="flex items-center justify-between mb-3 text-[rgba(55,53,47,0.65)] text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <LayoutGrid size={14} />
                            <h2>Projets Clipflow (Charge de travail)</h2>
                        </div>
                        <button
                            onClick={() => navigate('/tasks')}
                            className="text-xs hover:bg-[rgba(55,53,47,0.08)] px-1.5 py-0.5 rounded transition-colors"
                        >
                            Voir tout
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {useClipflowStore.getState().projects.map((project) => (
                            <motion.div
                                key={project.id}
                                onClick={() => navigate(`/project/${project.id}`)}
                                className="group p-4 border border-[rgba(55,53,47,0.16)] rounded-lg hover:bg-[rgba(55,53,47,0.04)] cursor-pointer transition-all shadow-sm bg-white"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-blue-600">
                                            <TrendingUp size={16} />
                                        </div>
                                        <h3 className="text-sm font-semibold text-[#37352F]">{project.title}</h3>
                                    </div>
                                    <ChevronRight size={14} className="text-[rgba(55,53,47,0.4)] group-hover:text-blue-600 transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs text-[rgba(55,53,47,0.65)]">
                                        <span>Charge de travail</span>
                                        <span className="font-mono font-bold text-blue-600">{Math.round(project.workload * 100)}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${project.workload * 100}%` }}
                                            className={`h-full ${project.workload > 0.8 ? 'bg-red-500' : project.workload > 0.5 ? 'bg-orange-500' : 'bg-green-500'}`}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* My Tasks */}
                <section>
                    <div className="flex items-center gap-2 mb-3 text-[rgba(55,53,47,0.65)] text-sm font-medium">
                        <CheckSquare size={14} />
                        <h2>Mes tâches</h2>
                    </div>
                    <div className="border border-[rgba(55,53,47,0.16)] rounded-lg overflow-hidden shadow-sm">
                        <div className="flex flex-col">
                            {MY_TASKS.map((task, idx) => (
                                <div key={idx} className="group flex items-center justify-between p-3 border-b border-[rgba(55,53,47,0.1)] last:border-0 hover:bg-[rgba(55,53,47,0.04)] cursor-pointer transition-colors">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="text-[rgba(55,53,47,0.4)] group-hover:text-[rgba(55,53,47,0.8)]"><FileIcon size={16} /></div>
                                        <span className="text-sm font-medium text-[#37352F]">{task.title}</span>
                                    </div>
                                    <div className="flex items-center gap-6 text-sm text-[rgba(55,53,47,0.65)]">
                                        <div className="flex items-center" title="Assigné à Jane Smith">
                                            <div className="w-5 h-5 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex justify-center items-center font-semibold text-white text-[10px]">
                                                J
                                            </div>
                                        </div>
                                        <span className="w-32 text-right">{task.date}</span>
                                        <span className={`px-2 py-0.5 rounded-sm text-xs font-medium ${task.statusColor} w-24 text-center`}>
                                            {task.status}
                                        </span>
                                        <div className="flex flex-row items-center gap-1 w-16">
                                            <task.listIcon size={14} className="text-orange-400" />
                                            <span>{task.list}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Bottom Grid */}
                <div className="grid grid-cols-2 gap-8 pt-4">
                    {/* Suggested */}
                    <section>
                        <div className="flex items-center gap-2 mb-3 text-[rgba(55,53,47,0.65)] text-sm font-medium">
                            <Sparkles size={14} />
                            <h2>Suggéré pour vous</h2>
                        </div>
                        <div className="flex flex-col gap-1">
                            {SUGGESTED.map((item, idx) => (
                                <div
                                    key={idx}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => toast(`Navigation vers ${item.title}`)}
                                    onKeyDown={(e) => e.key === 'Enter' && toast(`Navigation vers ${item.title}`)}
                                    className="flex items-center gap-2 p-1.5 rounded hover:bg-[rgba(55,53,47,0.08)] cursor-pointer text-sm text-[#37352F]"
                                >
                                    <div className="text-[rgba(55,53,47,0.65)]"><item.icon size={16} /></div>
                                    <span className="font-medium">{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Trending */}
                    <section>
                        <div className="flex items-center justify-between mb-3 text-[rgba(55,53,47,0.65)] text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <TrendingUp size={14} />
                                <h2>Tendances</h2>
                            </div>
                            <div className="text-xs flex items-center gap-1 cursor-pointer hover:bg-[rgba(55,53,47,0.08)] px-1.5 py-0.5 rounded">
                                Dans M Uprising Studio <span className="text-[10px]">▼</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            {TRENDING.map((item, idx) => (
                                <div
                                    key={idx}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => toast(`Ouverture de la tendance : ${item.title}`)}
                                    onKeyDown={(e) => e.key === 'Enter' && toast(`Ouverture de la tendance : ${item.title}`)}
                                    className="flex items-center gap-2 p-1.5 rounded hover:bg-[rgba(55,53,47,0.08)] cursor-pointer text-sm text-[#37352F]"
                                >
                                    <div className="text-[rgba(55,53,47,0.65)]"><item.icon size={16} /></div>
                                    <span className="font-medium truncate">{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

        </div>
    )
}

export default Dashboard
