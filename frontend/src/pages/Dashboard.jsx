import { motion } from 'framer-motion'
import {
    Clock, CheckSquare, Sparkles, TrendingUp, Search,
    FileText, Users, Home, Workflow, Settings, FileIcon, UserIcon, LibraryBig, Star,
    Database, Lightbulb, TrendingUp as TrendingIcon, Upload, BookOpen
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../components/common/Toaster'
import { useNavigate } from 'react-router-dom'
import { StatCard, PillarPieChart, QueueItem, ActivityItem, QuickActionButton } from '../components/dashboard/DashboardWidgets'

const STATS_DATA = [
    { title: 'Total Contenus', value: '184', change: 12, trend: 'up', icon: Database, color: 'text-blue-500' },
    { title: 'Ready to Post', value: '24', change: 8, trend: 'up', icon: CheckSquare, color: 'text-green-500' },
    { title: 'Published (ce mois)', value: '42', change: 15, trend: 'up', icon: Star, color: 'text-purple-500' },
    { title: 'Score Avg.', value: '7.8', change: 2, trend: 'up', icon: TrendingIcon, color: 'text-orange-500' },
]

const PILLAR_DATA = [
    { name: 'Sales', value: 35 },
    { name: 'Leadership', value: 25 },
    { name: 'Systems', value: 20 },
    { name: 'Discipline', value: 15 },
    { name: 'Community', value: 5 },
]

const PUBLISHING_QUEUE = [
    { title: 'How to close high-ticket clients', platform: 'Instagram', date: 'Aujourd\'hui', time: '14:00', status: 'Scheduled', icon: FileText },
    { title: 'The Discipline Matrix', platform: 'LinkedIn', date: 'Demain', time: '09:30', status: 'Scheduled', icon: FileText },
    { title: 'Systematize your sales process', platform: 'TikTok', date: '12 Mars', time: '18:00', status: 'Pending', icon: FileIcon },
]

const RECENT_ACTIVITY = [
    { user: 'Olivier', action: 'a scoré', target: 'Objection Handling Guide', time: 'Il y a 15 min', icon: Star, color: 'bg-orange-500' },
    { user: 'AI System', action: 'a catégorisé', target: 'Morning Routine.mp4', time: 'Il y a 2h', icon: Sparkles, color: 'bg-blue-500' },
    { user: 'Assistante', action: 'a planifié', target: 'Closing Secrets', time: 'Il y a 4h', icon: CheckSquare, color: 'bg-green-500' },
]

const Dashboard = () => {
    const { user } = useAuth()
    const { toast } = useToast()
    const navigate = useNavigate()
    const userName = user?.name || 'Olivier'

    return (
        <div className="w-full max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-12 pt-6 px-4">

            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#37352F] tracking-tight">
                        🌤️ Bonjour, {userName}
                    </h1>
                    <p className="text-[rgba(55,53,47,0.6)] mt-1 font-medium">Voici l'état actuel de votre Content OS.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/search')}
                        className="p-2.5 rounded-xl border border-[rgba(55,53,47,0.1)] hover:bg-[rgba(55,53,47,0.04)] transition-colors"
                    >
                        <Search size={20} className="text-[rgba(55,53,47,0.6)]" />
                    </button>
                    <button
                        onClick={() => navigate('/settings')}
                        className="p-2.5 rounded-xl border border-[rgba(55,53,47,0.1)] hover:bg-[rgba(55,53,47,0.04)] transition-colors"
                    >
                        <Settings size={20} className="text-[rgba(55,53,47,0.6)]" />
                    </button>
                </div>
            </header>

            <div className="space-y-8">

                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {STATS_DATA.map((stat, idx) => (
                        <StatCard key={idx} {...stat} />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Charts and Queue */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Distribution by Pillar */}
                        <section className="bg-white p-6 rounded-2xl border border-[rgba(55,53,47,0.08)] shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-[#37352F] flex items-center gap-2">
                                    <TrendingUp size={18} className="text-blue-500" />
                                    Distribution par Pilier
                                </h2>
                                <select className="bg-[rgba(55,53,47,0.04)] border-none text-xs font-bold rounded-lg px-3 py-1.5 focus:ring-0 cursor-pointer">
                                    <option>Ce mois-ci</option>
                                    <option>Le mois dernier</option>
                                    <option>Cette année</option>
                                </select>
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="flex-1 w-full">
                                    <PillarPieChart data={PILLAR_DATA} />
                                </div>
                                <div className="flex flex-col gap-3 w-full md:w-48">
                                    {PILLAR_DATA.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'][idx] }}></div>
                                                <span className="text-[rgba(55,53,47,0.65)] font-medium">{item.name}</span>
                                            </div>
                                            <span className="font-bold text-[#37352F]">{item.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Recent Activity */}
                        <section className="bg-white p-6 rounded-2xl border border-[rgba(55,53,47,0.08)] shadow-sm">
                            <h2 className="text-lg font-bold text-[#37352F] mb-6 flex items-center gap-2">
                                <Clock size={18} className="text-purple-500" />
                                Activité Récente
                            </h2>
                            <div className="flex flex-col">
                                {RECENT_ACTIVITY.map((activity, idx) => (
                                    <ActivityItem key={idx} {...activity} />
                                ))}
                            </div>
                            <button className="w-full mt-4 py-2.5 text-sm font-semibold text-[rgba(55,53,47,0.5)] hover:bg-[rgba(55,53,47,0.04)] rounded-xl transition-colors">
                                Voir tout l'historique
                            </button>
                        </section>
                    </div>

                    {/* Right Column - Queue and Quick Actions */}
                    <div className="space-y-8">

                        {/* Publishing Queue */}
                        <section className="bg-white p-6 rounded-2xl border border-[rgba(55,53,47,0.08)] shadow-sm">
                            <h2 className="text-lg font-bold text-[#37352F] mb-6 flex items-center gap-2">
                                <CheckSquare size={18} className="text-green-500" />
                                Prochaines Publications
                            </h2>
                            <div className="space-y-1">
                                {PUBLISHING_QUEUE.map((item, idx) => (
                                    <QueueItem key={idx} {...item} />
                                ))}
                            </div>
                            <button
                                onClick={() => navigate('/calendar')}
                                className="w-full mt-6 py-2.5 text-sm font-bold text-white bg-[#37352F] hover:bg-[#2c2a26] rounded-xl transition-all shadow-md active:scale-95"
                            >
                                Ouvrir le Calendrier
                            </button>
                        </section>

                        {/* Quick Actions */}
                        <section>
                            <h2 className="text-sm font-bold text-[rgba(55,53,47,0.4)] uppercase tracking-widest mb-4 px-1">
                                Actions Rapides
                            </h2>
                            <div className="grid grid-cols-1 gap-3">
                                <QuickActionButton
                                    label="Sync Google Drive"
                                    icon={Database}
                                    color="text-blue-500"
                                    onClick={() => toast.success("Synchronisation Google Drive lancée")}
                                />
                                <QuickActionButton
                                    label="Générer Idées d'IA"
                                    icon={Lightbulb}
                                    color="text-orange-500"
                                    onClick={() => navigate('/ideas')}
                                />
                                <QuickActionButton
                                    label="Consulter Top Contenus"
                                    icon={Star}
                                    color="text-yellow-500"
                                    onClick={() => navigate('/library?score=high')}
                                />
                                <QuickActionButton
                                    label="Voir Ressources Prof"
                                    icon={BookOpen}
                                    color="text-cyan-500"
                                    onClick={() => navigate('/resources')}
                                />
                            </div>
                        </section>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Dashboard
