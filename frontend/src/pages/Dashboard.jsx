import { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts'
import {
    Video,
    Star,
    Lightbulb,
    TrendingUp,
    PlusCircle,
    ArrowUpRight,
    Clock,
    LayoutDashboard
} from 'lucide-react'
import { MOCK_CONTENT } from '../data/mockContent'
import { Link } from 'react-router-dom'
import Skeleton from '../components/common/Skeleton'

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000)
        return () => clearTimeout(timer)
    }, [])

    const stats = useMemo(() => {
        const total = MOCK_CONTENT.length
        const avgScore = (MOCK_CONTENT.reduce((acc, curr) => acc + curr.score, 0) / total).toFixed(1)
        const recent = MOCK_CONTENT.slice(0, 3)

        // Data for charts
        const chartData = MOCK_CONTENT.map(item => ({
            name: item.title.substring(0, 10) + '...',
            score: item.score,
            fullTitle: item.title
        }))

        return { total, avgScore, recent, chartData }
    }, [])

    const StatCard = ({ icon: Icon, label, value, trend, colorClass, delay = 0 }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:bg-slate-800/50 transition-all duration-300 group"
        >
            <div className="flex items-start justify-between">
                <div className={`p-4 rounded-2xl ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} />
                </div>
                {trend && (
                    <div className="flex items-center gap-1 text-emerald-500 font-black text-sm bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                        <TrendingUp size={14} />
                        {trend}
                    </div>
                )}
            </div>
            <div className="mt-6">
                <p className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest">{label}</p>
                <p className="text-4xl font-black text-slate-900 dark:text-white mt-2">{value}</p>
            </div>
        </motion.div>
    )

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-4">
                        <LayoutDashboard className="text-blue-600" size={48} />
                        Content Dashboard
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-xl font-medium">L'aperçu global de votre écosystème de contenu.</p>
                </div>
                <div className="flex gap-4">
                    <Link
                        to="/library"
                        className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 hover:scale-105 active:scale-95"
                    >
                        <PlusCircle size={20} />
                        Import Content
                    </Link>
                </div>
            </header>

            {/* Grid Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {isLoading ? (
                    [1, 2, 3].map((n) => (
                        <div key={n} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none">
                            <div className="flex justify-between mb-6">
                                <Skeleton className="w-16 h-16 rounded-2xl" />
                                <Skeleton className="w-20 h-8 rounded-full" />
                            </div>
                            <Skeleton className="h-4 w-1/3 mb-4" variant="text" />
                            <Skeleton className="h-10 w-1/2" variant="text" />
                        </div>
                    ))
                ) : (
                    <>
                        <StatCard
                            icon={Video}
                            label="Total Assets"
                            value={stats.total}
                            trend="+12%"
                            colorClass="bg-blue-50 text-blue-600"
                            delay={0.1}
                        />
                        <StatCard
                            icon={Star}
                            label="Avg AI Score"
                            value={`${stats.avgScore}/10`}
                            trend="+0.4"
                            colorClass="bg-amber-50 text-amber-600"
                            delay={0.2}
                        />
                        <StatCard
                            icon={Lightbulb}
                            label="Pending Ideas"
                            value="8"
                            trend="New"
                            colorClass="bg-purple-50 text-purple-600"
                            delay={0.3}
                        />
                    </>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Quality Chart */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-100/50 dark:shadow-none"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Content Quality Over Time</h2>
                        <div className="text-sm font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl border border-blue-100 dark:border-blue-900/30">7 Days Analysis</div>
                    </div>
                    <div className="h-[350px] w-full">
                        {isLoading ? (
                            <div className="h-full w-full flex flex-col gap-4">
                                <Skeleton className="flex-1 w-full" />
                                <div className="flex justify-between">
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <Skeleton key={i} className="h-4 w-12" variant="text" />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={document.documentElement.classList.contains('dark') ? '#1e293b' : '#f1f5f9'} />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }}
                                    />
                                    <YAxis
                                        domain={[0, 10]}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff',
                                            borderRadius: '1.5rem',
                                            border: 'none',
                                            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                                            padding: '1rem'
                                        }}
                                        itemStyle={{ fontWeight: 'black', color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#0f172a' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#3b82f6"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorScore)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </motion.div>

                {/* Recent Activities */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-black text-slate-900">Recent Assets</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {isLoading ? (
                            [1, 2, 3].map(i => (
                                <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-5">
                                    <Skeleton className="w-16 h-16 rounded-2xl" />
                                    <div className="flex-1">
                                        <Skeleton className="h-6 w-3/4 mb-2" variant="text" />
                                        <Skeleton className="h-4 w-1/4" variant="text" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            stats.recent.map((asset, idx) => (
                                <motion.div
                                    key={asset.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.5 + (idx * 0.1) }}
                                    className="group bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-inner bg-slate-100 dark:bg-slate-800">
                                            <img src={asset.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-blue-600 transition-colors line-clamp-1">{asset.title}</h3>
                                            <p className="text-slate-400 dark:text-slate-500 text-sm font-bold flex items-center gap-2 mt-1">
                                                <Clock size={14} />
                                                {asset.date}
                                            </p>
                                        </div>
                                    </div>
                                    <Link to="/library" className="p-3 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors">
                                        <ArrowUpRight size={24} />
                                    </Link>
                                </motion.div>
                            ))
                        )}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <Link
                                to="/library"
                                className="flex items-center justify-center p-6 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[2rem] text-slate-400 dark:text-slate-600 font-black hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-slate-200 dark:hover:border-slate-700 transition-all gap-2 group"
                            >
                                View Full Library
                                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
