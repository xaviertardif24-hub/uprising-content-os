import { useRef, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LayoutDashboard,
    Library,
    Calendar,
    Lightbulb,
    Search,
    Bell,
    User,
    LogOut,
    ChevronRight,
    Settings as SettingsIcon,
    Moon,
    Sun,
    BookOpen
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useThemeStore } from '../../store/themeStore'

const MainLayout = () => {
    const { logout } = useAuth()
    const { isDarkMode, toggleTheme } = useThemeStore()
    const location = useLocation()
    const searchInputRef = useRef(null)

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Library, label: 'Library', path: '/library' },
        { icon: Calendar, label: 'Calendar', path: '/calendar' },
        { icon: Lightbulb, label: 'Ideas Bank', path: '/ideas' },
        { icon: BookOpen, label: 'Ressources', path: '/resources' },
        { icon: SettingsIcon, label: 'Settings', path: '/settings' },
    ]

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDarkMode])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                searchInputRef.current?.focus()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-blue-100 selection:text-blue-900 transition-colors duration-300">
            {/* Sidebar */}
            <aside className="w-80 bg-slate-900 dark:bg-black text-white flex flex-col shadow-2xl z-20 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] pointer-events-none" />

                <div className="p-10 flex items-center gap-4 border-b border-white/5 relative">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/50"
                    >
                        <LayoutDashboard size={28} className="text-white" />
                    </motion.div>
                    <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h1 className="text-2xl font-black tracking-tighter">Content OS</h1>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-blue-400 opacity-80">Intelligence V1.0</p>
                    </motion.div>
                </div>

                <nav className="flex-1 p-6 space-y-3 mt-4 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item, idx) => {
                        const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/')
                        return (
                            <motion.div
                                key={item.label}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 + idx * 0.05 }}
                            >
                                <Link
                                    to={item.path}
                                    className={`
                                        group flex items-center justify-between p-4 rounded-2xl transition-all duration-300
                                        ${isActive
                                            ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/50'
                                            : 'text-slate-400 hover:bg-white/5 hover:text-white'}
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-white/20' : 'bg-transparent group-hover:bg-white/5'}`}>
                                            <item.icon size={20} />
                                        </div>
                                        <span className="font-bold text-sm tracking-tight">{item.label}</span>
                                    </div>
                                    {isActive && (
                                        <motion.div layoutId="active-arrow">
                                            <ChevronRight size={16} className="opacity-50" />
                                        </motion.div>
                                    )}
                                </Link>
                            </motion.div>
                        )
                    })}
                </nav>

                <div className="p-8 border-t border-white/5 bg-black/20">
                    <button
                        onClick={logout}
                        className="flex items-center gap-4 p-4 w-full rounded-2xl bg-white/5 hover:bg-red-500/10 hover:text-red-400 transition-all text-slate-400 font-bold text-sm group"
                    >
                        <div className="p-2 rounded-xl bg-white/5 group-hover:bg-red-500/20 transition-colors">
                            <LogOut size={20} />
                        </div>
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
                {/* Top Header */}
                <header className="h-24 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-10 z-10 sticky top-0 transition-colors">
                    <div className="relative w-full max-w-xl group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Universal Search (Videos, Transcripts, Ideas...)"
                            className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm font-medium focus:ring-4 focus:ring-blue-500/5 transition-all outline-none text-slate-900 placeholder:text-slate-300"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-1 rounded-lg pointer-events-none">
                            {window.navigator.platform?.includes('Mac') ? '⌘' : 'Ctrl'} K
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button
                            onClick={toggleTheme}
                            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-blue-600 transition-all hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button className="relative w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-blue-600 transition-all hover:bg-blue-50 dark:hover:bg-blue-900/20">
                            <Bell size={20} />
                            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                        </button>
                        <div className="w-1 h-8 bg-slate-100 rounded-full"></div>
                        <button className="flex items-center gap-4 hover:bg-slate-50 p-2 rounded-2xl transition-all group">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black text-slate-900 leading-tight">Olivier R.</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Uprising Studio</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
                                <User size={24} />
                            </div>
                        </button>
                    </div>
                </header>

                {/* Content View */}
                <main className="flex-1 overflow-y-auto p-10 custom-scrollbar scroll-smooth">
                    <div className="max-w-[1600px] mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={location.pathname}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Outlet />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default MainLayout
