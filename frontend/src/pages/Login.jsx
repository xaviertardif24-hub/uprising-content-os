import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    Lock, Mail, LogIn, Eye, EyeOff,
    BarChart3, FolderOpen, CalendarDays, Lightbulb, Sparkles, Star
} from 'lucide-react'

const FEATURES = [
    {
        icon: BarChart3,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        title: 'Content Dashboard',
        desc: 'Vue d\'ensemble de tous vos KPIs et scores IA en temps réel.',
    },
    {
        icon: FolderOpen,
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        title: 'Content Library',
        desc: 'Transcriptions organisées, filtrées par pilier ou score IA.',
    },
    {
        icon: CalendarDays,
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        title: 'Publishing Calendar',
        desc: 'Planifiez et glissez-déposez vos publications de contenu.',
    },
    {
        icon: Lightbulb,
        color: 'text-amber-400',
        bg: 'bg-amber-500/10',
        title: 'Ideas Bank',
        desc: 'Soumettez vos idées et obtenez un score IA instantané.',
    },
]

const STATS = [
    { value: '9.2', label: 'Avg AI Score' },
    { value: '6', label: 'Assets actifs' },
    { value: '4', label: 'Piliers contenu' },
]

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)
        const result = await login(email, password)
        setIsLoading(false)
        if (result.success) {
            navigate('/dashboard')
        } else {
            setError(result.error)
        }
    }

    return (
        <div className="min-h-screen flex bg-slate-950 overflow-hidden">

            {/* ── Left Panel — Branding ── */}
            <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-14 overflow-hidden">
                {/* Glows */}
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/15 blur-[150px] rounded-full -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />

                {/* Logo */}
                <div className="relative z-10 flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/50">
                        <Sparkles size={22} className="text-white" />
                    </div>
                    <div>
                        <p className="text-white font-black text-xl leading-tight">Content OS</p>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Intelligence V1.0</p>
                    </div>
                </div>

                {/* Main pitch */}
                <div className="relative z-10 space-y-10">
                    <div className="space-y-4">
                        <p className="text-blue-400 font-black text-sm uppercase tracking-widest">Uprising Studio</p>
                        <h1 className="text-5xl font-black text-white leading-[1.1] tracking-tight">
                            Votre machine<br />
                            à contenu,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">pilotée par l'IA.</span>
                        </h1>
                        <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-sm">
                            Transcriptions, scoring, calendrier editorial — tout centralisé en un seul espace.
                        </p>
                    </div>

                    {/* Stats Row */}
                    <div className="flex gap-8">
                        {STATS.map(({ value, label }) => (
                            <div key={label}>
                                <p className="text-3xl font-black text-white">{value}</p>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-0.5">{label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Feature List */}
                    <div className="grid grid-cols-2 gap-4">
                        {FEATURES.map(({ icon: Icon, color, bg, title, desc }) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: FEATURES.indexOf({ icon: Icon, color, bg, title, desc }) * 0.08 }}
                                className="bg-white/5 border border-white/5 rounded-2xl p-4 hover:bg-white/10 transition-colors"
                            >
                                <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                                    <Icon size={18} className={color} />
                                </div>
                                <p className="text-white font-bold text-sm">{title}</p>
                                <p className="text-slate-500 text-xs mt-1 leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Testimonial / social proof */}
                <div className="relative z-10 flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl p-4">
                    <div className="flex -space-x-2 shrink-0">
                        {['bg-blue-500', 'bg-purple-500', 'bg-emerald-500'].map((c, i) => (
                            <div key={i} className={`w-8 h-8 ${c} rounded-full border-2 border-slate-950`} />
                        ))}
                    </div>
                    <div>
                        <div className="flex gap-0.5 mb-1">
                            {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}
                        </div>
                        <p className="text-slate-400 text-xs font-medium">"Le meilleur outil que j'ai jamais utilisé pour gérer mon contenu."</p>
                    </div>
                </div>
            </div>

            {/* ── Right Panel — Form ── */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 relative">
                {/* Mobile glow */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none lg:hidden" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md relative z-10"
                >
                    {/* Mobile logo */}
                    <div className="flex items-center gap-3 mb-10 lg:hidden">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/50">
                            <Sparkles size={18} className="text-white" />
                        </div>
                        <p className="text-white font-black text-lg">Content OS</p>
                    </div>

                    <h2 className="text-3xl font-black text-white">Bon retour 👋</h2>
                    <p className="text-slate-400 mt-1 mb-8 font-medium">Connexion à votre espace Uprising Studio</p>

                    {error && (
                        <div className="bg-red-900/20 border border-red-800/50 text-red-400 p-4 rounded-2xl text-sm mb-6 text-center font-bold">
                            {error}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-medium focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
                                    placeholder="olivier@uprisingstudio.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Mot de passe</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-14 text-white font-medium focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-2xl shadow-blue-900/30 hover:scale-[1.02] active:scale-[0.98] mt-2"
                        >
                            {isLoading ? (
                                <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <LogIn size={20} />
                                    Accéder à Content OS
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-slate-600 text-xs font-bold mt-10">
                        Accès protégé — Uprising Studio © 2026
                    </p>
                </motion.div>
            </div>
        </div>
    )
}

export default Login
