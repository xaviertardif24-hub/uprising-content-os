import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Globe, KeyRound } from 'lucide-react'
import { useToast } from '../components/common/Toaster'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { login, bypassLogin } = useAuth()
    const navigate = useNavigate()
    const { toast } = useToast()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email) return;
        setError('')
        setIsLoading(true)
        // If password is empty but we clicked continue, maybe we expand to ask password
        // For simplicity, we just use the login function which expects email+password
        // In a real app, it sends magic link or asks for SAML
        const result = await login(email, password || 'admin123') // fallback for demo purposes
        setIsLoading(false)
        if (result.success) {
            navigate('/dashboard')
        } else {
            setError('La connexion a échoué. Veuillez réessayer.')
        }
    }

    const handleGoogleApple = async (type) => {
        setIsLoading(true)
        try {
            await bypassLogin()
            toast?.(`Successfully logged in with ${type}!`, 'success')
            navigate('/dashboard')
        } catch (error) {
            toast?.(`Failed to login with ${type}`, 'error')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-white text-[#37352F] antialiased">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2 font-semibold text-lg">
                    <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                        <span className="text-white text-xl leading-none font-serif tracking-tighter">N</span>
                    </div>
                    Content OS
                </div>
                <div className="flex items-center gap-1 text-sm text-[rgba(55,53,47,0.65)] hover:bg-[rgba(55,53,47,0.08)] px-2 py-1 rounded cursor-pointer transition-colors">
                    <Globe size={16} />
                    <span>Français</span>
                    <span className="text-xs ml-1">▼</span>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 mt-[-8vh]">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-[380px] flex flex-col items-center"
                >
                    
                    {/* Introduction */}
                    <div className="text-center mb-8">
                        <h1 className="text-[32px] md:text-[40px] font-bold tracking-tight mb-2">Connexion</h1>
                        <p className="text-[rgba(55,53,47,0.65)] text-sm px-4">
                            L'espace de travail connecté pour rédiger, planifier et partager. Avec l'IA à vos côtés.
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-2 rounded text-sm mb-4 w-full text-center border border-red-100">
                            {error}
                        </div>
                    )}

                    <form className="w-full space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="text-[12px] text-[rgba(55,53,47,0.65)] mb-1 block">Email professionnel</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Entrez votre adresse email..."
                                    className="w-full h-9 bg-white border border-[rgba(55,53,47,0.16)] rounded px-3 py-1 text-[15px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-[rgba(55,53,47,0.4)] shadow-sm"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(55,53,47,0.4)]">
                                    <KeyRound size={14} />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || (password && password.length < 6)}
                            className="w-full h-9 bg-[#2383E2] hover:bg-[#1E71C8] text-white rounded font-medium text-[14px] flex items-center justify-center transition-colors shadow-sm disabled:opacity-50"
                        >
                            {isLoading ? (
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                "Continuer avec l'email"
                            )}
                        </button>
                    </form>

                    <div className="w-full mt-6 mb-4 flex items-center gap-3">
                        <div className="flex-1 h-[1px] bg-[rgba(55,53,47,0.16)]"></div>
                        <span className="text-[11px] text-[rgba(55,53,47,0.65)] bg-white px-2">Ou vous pouvez aussi</span>
                        <div className="flex-1 h-[1px] bg-[rgba(55,53,47,0.16)]"></div>
                    </div>

                    <div className="w-full space-y-2">
                        <button
                            type="button"
                            onClick={() => handleGoogleApple('Google')}
                            className="w-full h-9 bg-white border border-[rgba(55,53,47,0.16)] hover:bg-[rgba(55,53,47,0.04)] text-[#37352F] rounded font-medium text-[14px] flex items-center justify-center gap-2 transition-colors"
                        >
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
                            Continuer avec Google
                        </button>
                        
                        <button
                            type="button"
                            onClick={() => handleGoogleApple('Apple')}
                            className="w-full h-9 bg-white border border-[rgba(55,53,47,0.16)] hover:bg-[rgba(55,53,47,0.04)] text-[#37352F] rounded font-medium text-[14px] flex items-center justify-center gap-2 transition-colors"
                        >
                            <img src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="Apple" className="w-4 h-4" />
                            Continuer avec Apple
                        </button>
                    </div>

                    <p className="mt-8 text-[11px] text-[rgba(55,53,47,0.65)] text-center leading-tight">
                        En cliquant sur "Continuer avec Google/Apple/Email" ci-dessus, vous reconnaissez avoir lu et compris, et acceptez les <a href="#" className="underline hover:text-[rgba(55,53,47,0.85)]">Conditions d'utilisation</a> et la <a href="#" className="underline hover:text-[rgba(55,53,47,0.85)]">Politique de confidentialité</a> de Content OS.
                    </p>

                </motion.div>
            </main>
        </div>
    )
}

export default Login

