import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Copy, Globe, Users, Check, X } from 'lucide-react';
import { useToast } from './Toaster';

const ShareDropdown = ({ isOpen, onClose, onOpenInvite }) => {
    const { toast } = useToast();
    const [isPublic, setIsPublic] = useState(false);
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const handleCopy = async () => {
        const url = window.location.href;
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            toast("Lien copié ! 🔗", "success");
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast("Échec de la copie.", "error");
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-[320px] bg-white dark:bg-[#191919] rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#efefef] dark:border-[#2F2F2F] z-[100] overflow-hidden"
            >
                {/* Header / Email Invite Trigger */}
                <div className="p-3 border-b border-[#efefef] dark:border-[#2F2F2F]">
                    <div className="flex items-center gap-2 mb-3">
                        <Users size={16} className="text-[#91918E]" />
                        <span className="text-[13px] font-medium">Partager avec l'équipe</span>
                    </div>
                    <button
                        onClick={() => {
                            onOpenInvite();
                            onClose();
                        }}
                        className="w-full bg-[#2383E2] hover:bg-[#0077D4] text-white text-[13px] font-medium py-1.5 rounded transition-colors"
                    >
                        Inviter par e-mail
                    </button>
                </div>

                {/* Public Access Toggle */}
                <div className="p-3 border-b border-[#efefef] dark:border-[#2F2F2F]">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                            <Globe size={16} className={isPublic ? "text-green-500" : "text-[#91918E]"} />
                            <span className="text-[13px] font-medium">Publier sur le Web</span>
                        </div>
                        <div
                            onClick={() => setIsPublic(!isPublic)}
                            className={`w-8 h-4.5 rounded-full p-0.5 cursor-pointer transition-colors ${isPublic ? 'bg-blue-500' : 'bg-[#D3D3D3] dark:bg-[#373737]'}`}
                        >
                            <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform ${isPublic ? 'translate-x-3.5' : 'translate-x-0'}`}></div>
                        </div>
                    </div>
                    <p className="text-[11px] text-[#91918E] leading-relaxed">
                        Toute personne disposant du lien peut consulter ce document.
                    </p>
                </div>

                {/* Link Copy Section */}
                <div className="p-3">
                    <div className="flex items-center gap-2 bg-[#F7F7F5] dark:bg-[#2F2F2F]/50 p-1.5 rounded-md border border-[#efefef] dark:border-[#2F2F2F]">
                        <input
                            type="text"
                            readOnly
                            value={window.location.href}
                            className="bg-transparent text-[12px] flex-1 outline-none text-[#91918E] truncate"
                        />
                        <button
                            onClick={handleCopy}
                            className="p-1 hover:bg-[#efefef] dark:hover:bg-[#373737] rounded transition-colors text-blue-500"
                            title="Copier le lien"
                        >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                    </div>
                </div>

                <div className="p-2.5 bg-[#F7F7F5] dark:bg-[#191919] border-t border-[#efefef] dark:border-[#2F2F2F] text-center">
                    <button className="text-[11px] text-[#91918E] hover:text-black dark:hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto">
                        <Link size={12} />
                        Gérer les accès avancés
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ShareDropdown;
