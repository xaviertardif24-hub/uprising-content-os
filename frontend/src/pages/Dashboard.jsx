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
    LayoutDashboard,
    ChevronRight
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

    const StatCard = ({ icon: Icon, label, value, trend, delay = 0 }) => (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay }}
            className="group flex flex-col p-4 rounded-md border border-[var(--color-notion-border)] hover:bg-[var(--color-notion-bg-hover)] transition-colors duration-200 cursor-default"
        >
            <div className="flex items-center gap-2 mb-2">
                <Icon size={16} className="text-[var(--color-notion-text-muted)] group-hover:text-[var(--color-notion-text)] transition-colors" />
                <span className="text-xs font-medium text-[var(--color-notion-text-muted)] uppercase tracking-wider">{label}</span>
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-[var(--color-notion-text)]">{value}</span>
                {trend && (
                    <span className="text-xs text-[var(--color-notion-text-meta)] flex items-center gap-1">
                        <TrendingUp size={12} />
                        {trend}
                    </span>
                )}
            </div>
        </motion.div>
    )

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <header className="flex items-center justify-between border-b border-[var(--color-notion-border)] pb-4 mb-6">
                <div>
                    <h1 className="text-3xl font-semibold text-[var(--color-notion-text)] tracking-tight">
                        Content Dashboard
                    </h1>
                </div>
                <div className="flex gap-4">
                    <Link
                        to="/library"
                        className="bg-[var(--color-notion-accent)] text-white px-4 py-2 rounded-md font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    >
                        <PlusCircle size={16} />
                        New page
                    </Link>
                </div>
            </header>

            {/* Grid Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quality Chart */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="border border-[var(--color-notion-border)] rounded-md p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-sm font-semibold text-[var(--color-notion-text)]">Content Quality Over Time</h2>
                        <div className="text-[11px] font-medium text-[var(--color-notion-text-muted)] bg-[var(--color-notion-bg-subtle)] px-2 py-1 rounded">7 Days Analysis</div>
                    </div>
                    <div className="h-[300px] w-full">
                        {isLoading ? (
                            <div className="h-full w-full flex flex-col gap-4">
                                <Skeleton className="flex-1 w-full" />
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--color-notion-accent)" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="var(--color-notion-accent)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-notion-border)" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'var(--color-notion-text-muted)', fontSize: 10 }}
                                    />
                                    <YAxis
                                        domain={[0, 10]}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'var(--color-notion-text-muted)', fontSize: 10 }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'var(--color-notion-bg)',
                                            borderRadius: '6px',
                                            border: '1px solid var(--color-notion-border)',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                            padding: '8px 12px',
                                            fontSize: '12px'
                                        }}
                                        itemStyle={{ fontWeight: '500', color: 'var(--color-notion-text)' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="score"
                                        stroke="var(--color-notion-accent)"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorScore)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </motion.div>

                {/* Recent Activities */}
                <div className="space-y-4">
                    <h2 className="text-sm font-semibold text-[var(--color-notion-text)] mb-4">Recent Assets</h2>
                    <div className="flex flex-col gap-1">
                        {isLoading ? (
                            [1, 2, 3].map(i => (
                                <div key={i} className="p-2 border border-transparent flex items-center gap-3">
                                    <Skeleton className="w-8 h-8 rounded" />
                                    <div className="flex-1">
                                        <Skeleton className="h-4 w-3/4 mb-1" variant="text" />
                                        <Skeleton className="h-3 w-1/4" variant="text" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            stats.recent.map((asset, idx) => (
                                <motion.div
                                    key={asset.id}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.5 + (idx * 0.1) }}
                                    className="group p-2 -mx-2 rounded hover:bg-[var(--color-notion-bg-hover)] transition-colors duration-150 flex items-center justify-between cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        {/* Fallback icon for Notion vibe instead of large thumbnails */}
                                        <div className="w-6 h-6 flex items-center justify-center text-[var(--color-notion-text-muted)] group-hover:text-[var(--color-notion-text)]">
                                            <Video size={16} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-[var(--color-notion-text)] text-sm line-clamp-1">{asset.title}</h3>
                                            <p className="text-[var(--color-notion-text-meta)] text-xs flex items-center gap-1 mt-0.5">
                                                {asset.date}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 p-1 text-[var(--color-notion-text-muted)] hover:text-[var(--color-notion-text)] transition-all">
                                        <ArrowUpRight size={14} />
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-6"
                    >
                        <Link
                            to="/library"
                            className="inline-flex items-center text-sm text-[var(--color-notion-text-muted)] hover:text-[var(--color-notion-text)] transition-colors gap-1 group"
                        >
                            View Full Library
                            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
