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
    const { login, bypassLogin } = useAuth()
    const navigate = useNavigate()

    const handleBypass = () => {
        bypassLogin()
        navigate('/dashboard')
    }

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
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-notion-bg)] p-6">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[400px] flex flex-col items-center"
            >
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-12 h-12 bg-[var(--color-notion-accent)] rounded-lg flex items-center justify-center shadow-sm mb-4">
                        <Sparkles size={24} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-[var(--color-notion-text)] tracking-tight">Content OS</h1>
                    <p className="text-[var(--color-notion-text-meta)] text-sm font-medium">Uprising Studio Intelligence</p>
                </div>

                {/* Form Card */}
                <div className="w-full space-y-6">
                    <div className="text-center mb-8">
                        <h2 className="text-lg font-semibold text-[var(--color-notion-text)]">Bon retour 👋</h2>
                        <p className="text-xs text-[var(--color-notion-text-meta)] mt-1">Connectez-vous à votre espace de travail</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded text-xs text-center font-medium">
                            {error}
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-[var(--color-notion-text-meta)] uppercase tracking-wider pl-0.5">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-notion-text-muted)]" size={14} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent border border-[var(--color-notion-border)] rounded-md py-2 pl-9 pr-3 text-sm text-[var(--color-notion-text)] focus:bg-[var(--color-notion-bg)] hover:bg-[var(--color-notion-bg-hover)] outline-none transition-colors placeholder:text-[var(--color-notion-text-muted)]"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-[var(--color-notion-text-meta)] uppercase tracking-wider pl-0.5">Mot de passe</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-notion-text-muted)]" size={14} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-transparent border border-[var(--color-notion-border)] rounded-md py-2 pl-9 pr-10 text-sm text-[var(--color-notion-text)] focus:bg-[var(--color-notion-bg)] hover:bg-[var(--color-notion-bg-hover)] outline-none transition-colors placeholder:text-[var(--color-notion-text-muted)]"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-notion-text-muted)] hover:text-[var(--color-notion-text)] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[var(--color-notion-accent)] hover:bg-opacity-90 disabled:opacity-50 text-white py-2 rounded-md font-semibold text-sm flex items-center justify-center gap-2 transition-all mt-6 shadow-sm"
                        >
                            {isLoading ? (
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <LogIn size={16} />
                                    Accéder à l'Espace
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={handleBypass}
                            className="w-full bg-transparent border border-[var(--color-notion-border)] hover:bg-[var(--color-notion-bg-hover)] text-[var(--color-notion-text-muted)] py-2 rounded-md font-medium text-xs flex items-center justify-center gap-2 transition-all mt-2"
                        >
                            Skip Login (Developer Access)
                        </button>
                    </form>

                    <div className="pt-6 border-t border-[var(--color-notion-border)] mt-6">
                        <p className="text-center text-[var(--color-notion-text-meta)] text-[10px] font-medium uppercase tracking-widest">
                            Uprising Studio © 2026
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Login
