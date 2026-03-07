import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, X } from 'lucide-react';
import { useToast } from './Toaster';

const InviteModal = ({ isOpen, onClose }) => {
    const [emails, setEmails] = useState(['', '']);
    const [isInviting, setIsInviting] = useState(false);
    const { toast } = useToast();

    if (!isOpen) return null;

    const handleInvite = () => {
        setIsInviting(true);
        setTimeout(() => {
            setIsInviting(false);
            toast("Invitations envoyées avec succès !");
            onClose();
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white">
                    <div className="absolute top-4 right-4 cursor-pointer p-2 hover:bg-[rgba(55,53,47,0.08)] rounded-md transition-colors" onClick={onClose}>
                        <span className="text-sm font-medium text-[#37352F]">Annuler</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="w-full max-w-[460px] bg-white text-[#37352F] flex flex-col items-center p-6 pt-12"
                    >
                        <div className="text-center w-full mb-8">
                            <h2 className="text-2xl font-bold tracking-tight mb-2">Inviter des collaborateurs</h2>
                            <p className="text-[15px] text-[rgba(55,53,47,0.65)]">
                                Tirez le meilleur parti de Content OS en invitant votre équipe.
                            </p>
                        </div>

                        <div className="w-full space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-[rgba(55,53,47,0.65)]">Envoyer des invitations</label>
                                <button className="flex items-center gap-1 text-sm font-medium text-[#2383E2] hover:underline">
                                    <Link size={14} />
                                    Obtenir le lien de partage
                                </button>
                            </div>

                            <div className="space-y-2">
                                <input
                                    type="email"
                                    defaultValue="jonsmith.mobbin@gmail.com"
                                    className="w-full h-9 bg-white border border-[rgba(55,53,47,0.16)] rounded px-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all font-medium"
                                />
                                {emails.map((val, i) => (
                                    <input
                                        key={i}
                                        type="email"
                                        placeholder="Adresse e-mail"
                                        className="w-full h-9 bg-white border border-[rgba(55,53,47,0.16)] rounded px-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-[rgba(55,53,47,0.4)]"
                                    />
                                ))}
                            </div>

                            <button className="flex items-center gap-1.5 text-sm text-[rgba(55,53,47,0.65)] hover:text-[#37352F] hover:bg-[rgba(55,53,47,0.08)] px-1.5 py-1 rounded transition-colors -ml-1.5" onClick={() => setEmails([...emails, ''])}>
                                <span className="text-lg leading-none mb-0.5">+</span> Ajouter ou inviter en masse
                            </button>

                            <div className="border-t border-[rgba(55,53,47,0.16)] my-6 w-full"></div>

                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-blue-600 rounded border-[rgba(55,53,47,0.16)] focus:ring-blue-500" />
                                <span className="text-sm text-[rgba(55,53,47,0.65)] group-hover:text-[#37352F] transition-colors leading-snug">
                                    Permettre à tous ceux qui ont un email <strong>@content-uprising.com</strong> de rejoindre cet espace de travail
                                </span>
                            </label>

                            <div className="pt-6 w-full flex justify-center">
                                <button 
                                    onClick={handleInvite}
                                    disabled={isInviting}
                                    className={`w-48 h-9 bg-[#2383E2] hover:bg-[#0077D4] transition-colors text-white rounded font-medium flex items-center justify-center ${isInviting ? 'pointer-events-none opacity-80' : ''}`}
                                >
                                    {isInviting ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        "Envoyer l'invitation"
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default InviteModal;
