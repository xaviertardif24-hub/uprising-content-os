import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { MoreHorizontal, ArrowUpRight, ArrowDownRight } from 'lucide-react'

export const StatCard = ({ title, value, change, trend, icon: Icon, color }) => {
    const isUp = trend === 'up'

    return (
        <motion.div
            whileHover={{ y: -2 }}
            className="bg-white p-5 rounded-xl border border-[rgba(55,53,47,0.08)] shadow-sm flex flex-col justify-between"
        >
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
                    <Icon className={color} size={20} />
                </div>
                <button className="text-[rgba(55,53,47,0.4)] hover:text-[rgba(55,53,47,0.8)] transition-colors">
                    <MoreHorizontal size={18} />
                </button>
            </div>
            <div>
                <h3 className="text-sm font-medium text-[rgba(55,53,47,0.5)] mb-1">{title}</h3>
                <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-[#37352F]">{value}</span>
                    <div className={`flex items-center text-xs font-semibold mb-1 ${isUp ? 'text-green-600' : 'text-red-500'}`}>
                        {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        <span>{change}%</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

const PILLAR_COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981']

export const PillarPieChart = ({ data }) => {
    return (
        <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PILLAR_COLORS[index % PILLAR_COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            fontSize: '12px'
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export const QueueItem = ({ title, platform, date, time, status, icon: Icon }) => (
    <div className="flex items-center justify-between p-3 hover:bg-[rgba(55,53,47,0.04)] rounded-lg transition-colors cursor-pointer group">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center text-gray-500 overflow-hidden">
                <Icon size={18} />
            </div>
            <div>
                <h4 className="text-sm font-medium text-[#37352F] group-hover:text-blue-600 transition-colors uppercase tracking-tight">{title}</h4>
                <p className="text-xs text-[rgba(55,53,47,0.6)]">{platform} • {date} à {time}</p>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${status === 'Scheduled' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-gray-100 text-gray-600'
                }`}>
                {status}
            </span>
            <button className="text-[rgba(55,53,47,0.3)] hover:text-[rgba(55,53,47,0.6)]">
                <MoreHorizontal size={14} />
            </button>
        </div>
    </div>
)

export const ActivityItem = ({ user, action, target, time, icon: Icon, color }) => (
    <div className="flex gap-4 p-3 relative">
        <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-white z-10 shadow-sm border-2 border-white`}>
                <Icon size={14} />
            </div>
            <div className="w-px flex-1 bg-[rgba(55,53,47,0.1)] mt-2"></div>
        </div>
        <div className="pt-0.5 pb-2">
            <p className="text-sm text-[#37352F]">
                <span className="font-bold">{user}</span> {action} <span className="font-medium text-blue-600 cursor-pointer hover:underline">{target}</span>
            </p>
            <p className="text-xs text-[rgba(55,53,47,0.5)] mt-1">{time}</p>
        </div>
    </div>
)

export const QuickActionButton = ({ label, icon: Icon, onClick, color }) => (
    <motion.button
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(55,53,47,0.06)' }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="flex items-center gap-3 w-full p-3 rounded-xl border border-[rgba(55,53,47,0.1)] text-left transition-all hover:shadow-md bg-white"
    >
        <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
            <Icon className={color} size={18} />
        </div>
        <span className="text-sm font-semibold text-[#37352F]">{label}</span>
    </motion.button>
)
