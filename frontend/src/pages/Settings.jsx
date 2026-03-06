import { useState } from 'react'
import { User, Shield, Key, Save, Plus, X, Globe } from 'lucide-react'
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
        <div className="space-y-10 animate-in fade-in duration-500 max-w-3xl">
            <div className="border-b border-[var(--color-notion-border)] pb-4 mb-6">
                <h1 className="text-3xl font-semibold text-[var(--color-notion-text)] tracking-tight">Settings</h1>
            </div>

            <div className="space-y-10">
                {/* Profile Section */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <User size={18} className="text-[var(--color-notion-text-muted)]" />
                        <h2 className="text-lg font-semibold text-[var(--color-notion-text)]">Profile Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-[var(--color-notion-text-muted)]">Full Name</label>
                            <input
                                type="text"
                                defaultValue="Olivier R."
                                className="w-full bg-transparent border border-[var(--color-notion-border)] rounded-md px-3 py-2 text-[var(--color-notion-text)] text-sm focus:bg-[var(--color-notion-bg)] hover:bg-[var(--color-notion-bg-hover)] outline-none transition-colors"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-[var(--color-notion-text-muted)]">Agency Name</label>
                            <input
                                type="text"
                                defaultValue="Uprising Studio"
                                className="w-full bg-transparent border border-[var(--color-notion-border)] rounded-md px-3 py-2 text-[var(--color-notion-text)] text-sm focus:bg-[var(--color-notion-bg)] hover:bg-[var(--color-notion-bg-hover)] outline-none transition-colors"
                            />
                        </div>
                    </div>
                </section>

                <hr className="border-[var(--color-notion-border)]" />

                {/* Content Pillars Section */}
                <section>
                    <div className="flex items-center gap-2 mb-2">
                        <Globe size={18} className="text-[var(--color-notion-text-muted)]" />
                        <h2 className="text-lg font-semibold text-[var(--color-notion-text)]">Content Pillars</h2>
                    </div>
                    <p className="text-[var(--color-notion-text-meta)] text-sm mb-4">Define the main categories the AI uses to classify your content.</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {pillars.map(pillar => (
                            <div key={pillar} className="flex items-center gap-1.5 bg-[var(--color-notion-bg-subtle)] text-[var(--color-notion-text)] px-2 py-1 rounded border border-[var(--color-notion-border)] text-sm group">
                                {pillar}
                                <button onClick={() => removePillar(pillar)} className="text-[var(--color-notion-text-muted)] hover:text-red-500 transition-colors">
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={addPillar} className="flex gap-2 max-w-sm">
                        <input
                            type="text"
                            value={newPillar}
                            onChange={(e) => setNewPillar(e.target.value)}
                            placeholder="Add new pillar..."
                            className="flex-1 bg-transparent border border-[var(--color-notion-border)] rounded-md px-3 py-1.5 text-[var(--color-notion-text)] text-sm focus:bg-[var(--color-notion-bg)] hover:bg-[var(--color-notion-bg-hover)] outline-none transition-colors"
                        />
                        <button className="bg-[var(--color-notion-bg-subtle)] border border-[var(--color-notion-border)] text-[var(--color-notion-text)] px-3 py-1.5 rounded-md text-sm font-medium hover:bg-[var(--color-notion-bg-hover)] transition-colors flex items-center justify-center">
                            <Plus size={16} />
                        </button>
                    </form>
                </section>

                <hr className="border-[var(--color-notion-border)]" />

                {/* API Keys Section */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <Key size={18} className="text-[var(--color-notion-text-muted)]" />
                        <h2 className="text-lg font-semibold text-[var(--color-notion-text)]">API Integrations</h2>
                    </div>

                    <div className="border border-[var(--color-notion-border)] rounded-md p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-[var(--color-notion-bg-subtle)] border border-[var(--color-notion-border)] rounded flex items-center justify-center">
                                    <span className="font-semibold text-[var(--color-notion-text)] text-sm">G</span>
                                </div>
                                <div>
                                    <p className="font-medium text-[var(--color-notion-text)] text-sm">Google AI API Key</p>
                                    <p className="text-xs text-[var(--color-notion-text-meta)]">Used for Gemini models</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowApiKey(!showApiKey)}
                                className="text-xs font-medium text-[var(--color-notion-accent)] hover:underline"
                            >
                                {showApiKey ? 'Hide' : 'Reveal'}
                            </button>
                        </div>
                        <input
                            type={showApiKey ? 'text' : 'password'}
                            defaultValue="sk-ant-api03-xxxxxxxxxxxxxxxxxxxx"
                            readOnly
                            className="w-full bg-[var(--color-notion-bg-subtle)] border border-[var(--color-notion-border)] rounded px-3 py-2 text-[var(--color-notion-text-muted)] font-mono text-sm outline-none"
                        />
                    </div>
                </section>

                {/* Save Action */}
                <div className="pt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[var(--color-notion-text-meta)] text-xs">
                        <Shield size={14} />
                        <span>Settings are saved securely in your Workspace.</span>
                    </div>
                    <button
                        onClick={handleSave}
                        className="bg-[var(--color-notion-accent)] text-white px-5 py-2 rounded-md font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    >
                        <Save size={16} />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Settings
