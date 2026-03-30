import { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { X, Copy, RefreshCw, Check, Wand2 } from 'lucide-react'
import { useToast } from '../common/Toaster'

const PLATFORMS = ['Instagram', 'TikTok', 'LinkedIn', 'YouTube', 'Facebook']

const PLATFORM_ICONS = {
    Instagram: '📸',
    TikTok: '🎵',
    LinkedIn: '💼',
    YouTube: '▶️',
    Facebook: '👥',
}

const PLATFORM_COLORS = {
    Instagram: 'from-pink-500 to-orange-400',
    TikTok: 'from-slate-900 to-slate-700',
    LinkedIn: 'from-blue-600 to-blue-800',
    YouTube: 'from-red-600 to-red-800',
    Facebook: 'from-blue-500 to-blue-700',
}

// Generate platform-specific mock captions based on the content item
const generateMockCaptions = (item) => {
    if (!item) return {}
    const pillarTag = item.pillar?.toLowerCase() ?? 'business'
    const title = item.title ?? ''

    return {
        Instagram: `🔥 ${title}\n\nVoici ce que personne ne vous dit :\n\n→ Arrêtez de pitcher avant d'écouter\n→ La rareté authentique (pas le fake urgency)\n→ Fermez par le silence\n\nCes 3 piliers ont transformé mon business. Appliquez-les dès demain.\n\nVous voulez aller plus loin ? Commentez "OUI" 👇\n\n#${pillarTag} #business #entrepreneuriat #coaching #uprisingstudio`,

        TikTok: `Pourquoi vos résultats stagnent ? 🤔 (la vraie raison) #${pillarTag} #business #entrepreneur #uprisingstudio`,

        LinkedIn: `Après avoir coaché des centaines d'entrepreneurs, j'ai identifié les 3 blocages qui freinent la croissance.\n\n${title}\n\n📌 Blocage #1 : Parler avant d'écouter\nLa majorité présente une solution avant de comprendre le vrai problème.\n\n📌 Blocage #2 : Créer une fausse urgence\nLes clients le sentent. Ça détruit la confiance instantanément.\n\n📌 Blocage #3 : Ignorer le silence\nAprès votre closing, taisez-vous. Le premier qui parle perd.\n\nQuel blocage vous coûte le plus cher en ce moment ?\n\n♻️ Repostez si ça parle à votre réseau.`,

        YouTube: `${title} (Méthode Terrain - Résultats en 30 Jours)`,

        Facebook: `Tu veux des résultats concrets ce mois-ci ? 🎯\n\n${title}\n\nJ'ai condensé 10 ans d'expérience terrain en 3 techniques simples :\n\n✅ Écouter AVANT de pitcher\n✅ Créer une rareté authentique\n✅ Maîtriser le closing par le silence\n\nQuelle technique tu vas tester en premier ? Dis-moi en commentaire 👇`,
    }
}

const CopyButton = ({ text }) => {
    const [copied, setCopied] = useState(false)
    const { toast } = useToast()

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            toast('Caption copied!', 'success')
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            toast('Failed to copy to clipboard', 'error')
        }
    }

    return (
        <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${copied
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                : 'bg-[var(--color-notion-bg-subtle)] text-[var(--color-notion-text-muted)] hover:bg-[var(--color-notion-bg-hover)] hover:text-[var(--color-notion-text)] border border-[var(--color-notion-border)]'
                }`}
        >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy'}
        </button>
    )
}

const CaptionModal = ({ item, isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('Instagram')
    const [isRegenerating, setIsRegenerating] = useState(false)
    const [captions, setCaptions] = useState({})
    const [generated, setGenerated] = useState(false)

    const handleGenerate = () => {
        setIsRegenerating(true)
        // Simulate AI generation delay
        setTimeout(() => {
            setCaptions(generateMockCaptions(item))
            setGenerated(true)
            setIsRegenerating(false)
        }, 1800)
    }

    const handleClose = () => {
        onClose()
        // Reset state after animation
        setTimeout(() => {
            setGenerated(false)
            setCaptions({})
            setActiveTab('Instagram')
        }, 300)
    }

    return (
        <Dialog open={isOpen} onClose={handleClose} className="relative z-[60]">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition duration-300 data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel
                    transition
                    className="w-full max-w-2xl bg-[var(--color-notion-bg)] rounded-xl border border-[var(--color-notion-border)] shadow-2xl overflow-hidden transform transition duration-300 data-[closed]:opacity-0 data-[closed]:scale-95"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-notion-border)]">
                        <div className="flex items-center gap-2">
                            <Wand2 size={16} className="text-[var(--color-notion-accent)]" />
                            <DialogTitle className="text-sm font-semibold text-[var(--color-notion-text)]">
                                Caption Generator
                            </DialogTitle>
                            {item && (
                                <span className="text-xs text-[var(--color-notion-text-muted)] truncate max-w-[200px]">
                                    — {item.title}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={handleClose}
                            className="p-1.5 rounded-md hover:bg-[var(--color-notion-bg-hover)] text-[var(--color-notion-text-muted)] hover:text-[var(--color-notion-text)] transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                        {!generated ? (
                            /* Pre-generate state */
                            <div className="flex flex-col items-center justify-center py-12 gap-6">
                                <div className="flex gap-2">
                                    {PLATFORMS.map(p => (
                                        <span key={p} className="text-2xl">{PLATFORM_ICONS[p]}</span>
                                    ))}
                                </div>
                                <div className="text-center">
                                    <h3 className="text-base font-semibold text-[var(--color-notion-text)] mb-1">
                                        Generate 5 platform captions at once
                                    </h3>
                                    <p className="text-xs text-[var(--color-notion-text-muted)] max-w-sm">
                                        AI will create tailored captions for Instagram, TikTok, LinkedIn, YouTube & Facebook — matching Olivier's brand voice.
                                    </p>
                                </div>
                                <button
                                    onClick={handleGenerate}
                                    disabled={isRegenerating}
                                    className="flex items-center gap-2 bg-[var(--color-notion-accent)] text-white px-6 py-2.5 rounded-md font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition-all"
                                >
                                    {isRegenerating ? (
                                        <>
                                            <RefreshCw size={16} className="animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Wand2 size={16} />
                                            Generate Captions
                                        </>
                                    )}
                                </button>
                            </div>
                        ) : (
                            /* Generated state — tabs */
                            <div className="space-y-4">
                                {/* Platform Tabs */}
                                <div className="flex gap-1 overflow-x-auto pb-1">
                                    {PLATFORMS.map(platform => (
                                        <button
                                            key={platform}
                                            onClick={() => setActiveTab(platform)}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${activeTab === platform
                                                ? 'bg-[var(--color-notion-bg-active)] text-[var(--color-notion-text)]'
                                                : 'text-[var(--color-notion-text-muted)] hover:bg-[var(--color-notion-bg-hover)]'
                                                }`}
                                        >
                                            <span>{PLATFORM_ICONS[platform]}</span>
                                            {platform}
                                        </button>
                                    ))}
                                </div>

                                {/* Caption Display */}
                                <div className="relative">
                                    {/* Platform color accent bar */}
                                    <div className={`h-1 rounded-full bg-gradient-to-r ${PLATFORM_COLORS[activeTab]} mb-3`} />

                                    <div className="relative bg-[var(--color-notion-bg-subtle)] rounded-lg border border-[var(--color-notion-border)] p-4">
                                        <textarea
                                            readOnly
                                            value={captions[activeTab] ?? ''}
                                            className="w-full bg-transparent text-sm text-[var(--color-notion-text)] leading-relaxed resize-none outline-none min-h-[180px]"
                                            rows={10}
                                        />
                                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--color-notion-border)]">
                                            <span className="text-xs text-[var(--color-notion-text-muted)]">
                                                {captions[activeTab]?.length ?? 0} chars
                                            </span>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={handleGenerate}
                                                    disabled={isRegenerating}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[var(--color-notion-text-muted)] hover:text-[var(--color-notion-text)] hover:bg-[var(--color-notion-bg-hover)] border border-[var(--color-notion-border)] transition-all disabled:opacity-50"
                                                >
                                                    <RefreshCw size={12} className={isRegenerating ? 'animate-spin' : ''} />
                                                    Regenerate
                                                </button>
                                                <CopyButton text={captions[activeTab] ?? ''} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Copy all hint */}
                                <p className="text-[11px] text-[var(--color-notion-text-muted)] text-center">
                                    Switch tabs to view & copy each platform's caption individually.
                                </p>
                            </div>
                        )}
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default CaptionModal
