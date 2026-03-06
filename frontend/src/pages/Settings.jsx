import { useState } from 'react'
import { User, Shield, Key, Bell, Save, Plus, X, Globe } from 'lucide-react'
import { useToast } from '../components/common/Toaster'

const Settings = () => {
    const { toast } = useToast()
    const [pillars, setPillars] = useState(['Sales', 'Leadership', 'Systems', 'Discipline', 'Community'])
    const [newPillar, setNewPillar] = useState('')
    const [showApiKey, setShowApiKey] = useState(false)

    const handleSave = () => {
        toast('Settings saved successfully!', 'success')
    }

    const addPillar = (e) => {
        e.preventDefault()
        if (newPillar && !pillars.includes(newPillar)) {
            setPillars([...pillars, newPillar])
            setNewPillar('')
        }
    }

    const removePillar = (pillarToRemove) => {
        setPillars(pillars.filter(p => p !== pillarToRemove))
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Settings</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1 text-lg">Manage your profile, content strategy, and API integrations.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Column: Profile & Security */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Profile Section */}
                    <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600">
                                <User size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Profile Information</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
                                <input
                                    type="text"
                                    defaultValue="Olivier R."
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-400 uppercase tracking-widest pl-1">Agency Name</label>
                                <input
                                    type="text"
                                    defaultValue="Uprising Studio"
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Content Pillars Section */}
                    <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-purple-600">
                                <Globe size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Content Pillars</h2>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 pl-1">Define the main categories the AI uses to classify your content.</p>

                        <div className="flex flex-wrap gap-3 mb-6">
                            {pillars.map(pillar => (
                                <div key={pillar} className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-xl font-bold border border-slate-200 dark:border-slate-700 group">
                                    {pillar}
                                    <button onClick={() => removePillar(pillar)} className="text-slate-400 hover:text-red-500 transition-colors">
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={addPillar} className="flex gap-3">
                            <input
                                type="text"
                                value={newPillar}
                                onChange={(e) => setNewPillar(e.target.value)}
                                placeholder="Add new pillar..."
                                className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                            />
                            <button className="bg-slate-900 dark:bg-blue-600 text-white px-6 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-xl">
                                <Plus size={24} />
                            </button>
                        </form>
                    </section>

                    {/* API Keys Section */}
                    <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-600">
                                <Key size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white">API Integrations</h2>
                        </div>
                        <div className="space-y-6">
                            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-700">
                                            <span className="font-black text-blue-600">G</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white">Google AI API Key</p>
                                            <p className="text-xs text-slate-400 font-bold">Used for Gemini models</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowApiKey(!showApiKey)}
                                        className="text-sm font-black text-blue-600 hover:text-blue-700 underline underline-offset-4"
                                    >
                                        {showApiKey ? 'Hide' : 'Reveal'}
                                    </button>
                                </div>
                                <input
                                    type={showApiKey ? 'text' : 'password'}
                                    defaultValue="sk-ant-api03-xxxxxxxxxxxxxxxxxxxx"
                                    readOnly
                                    className="w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-3 text-slate-400 font-mono text-sm outline-none"
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Mini Actions */}
                <div className="space-y-8">
                    <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl pointer-events-none" />
                        <h3 className="text-xl font-black mb-4 relative z-10">Save Changes</h3>
                        <p className="text-blue-100 text-sm mb-8 opacity-80 leading-relaxed relative z-10">
                            Apply your profile updates and pillar configuration across the entire Content OS.
                        </p>
                        <button
                            onClick={handleSave}
                            className="w-full bg-white text-blue-600 py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-900/20"
                        >
                            <Save size={20} />
                            Save Configuration
                        </button>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400">
                                <Shield size={20} />
                            </div>
                            <h3 className="text-lg font-black text-slate-900 dark:text-white">Platform Security</h3>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-bold">
                            Your API keys are encrypted and stored locally. Never share your credentials.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
