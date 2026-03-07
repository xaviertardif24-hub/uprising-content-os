import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, 
    MessageSquarePlus, 
    Columns, 
    Minus, 
    Search, 
    FileEdit, 
    FileDigit, 
    CheckSquare, 
    Plus, 
    Settings, 
    ArrowUp, 
    ChevronDown,
    Info
} from 'lucide-react';

const RoyalAIChat = ({ isOpen, onClose }) => {
    const suggestions = [
        { id: 'search', label: 'Cherchez ce que vous voulez', icon: Search },
        { id: 'write', label: 'Rédiger l\'ordre du jour de la réunion', icon: FileEdit },
        { id: 'analyze', label: 'Analyser des PDF ou des images', icon: FileDigit },
        { id: 'task', label: 'Créer un outil de suivi des tâches', icon: CheckSquare },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 z-[990] bg-black/5" 
                        onClick={onClose}
                    />
                    
                    {/* Chat Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-20 right-6 z-[1000] w-[450px] bg-[#191919] border border-[#2F2F2F] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#EBEBEB]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-[#2F2F2F]">
                            <button className="flex items-center gap-1.5 text-[14px] font-medium hover:bg-[#2F2F2F] px-2 py-1 rounded transition-colors group">
                                Nouvelle discussion avec l'IA
                                <ChevronDown size={14} className="text-[#A4A4A2]" />
                            </button>
                            <div className="flex items-center gap-2 text-[#A4A4A2]">
                                <button className="p-1.5 hover:bg-[#2F2F2F] rounded transition-colors">
                                    <MessageSquarePlus size={18} />
                                </button>
                                <button className="p-1.5 hover:bg-[#2F2F2F] rounded transition-colors">
                                    <Columns size={18} />
                                </button>
                                <button onClick={onClose} className="p-1.5 hover:bg-[#2F2F2F] rounded transition-colors">
                                    <Minus size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="flex-1 p-6 overflow-y-auto min-h-[300px]">
                            <div className="flex flex-col items-start gap-6 mt-4">
                                {/* King Avatar Header */}
                                <div className="w-10 h-10 rounded-full bg-[#37352F] flex items-center justify-center relative border border-[#2F2F2F]">
                                     {/* Simple representation of the crown and face */}
                                     <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-blue-500">
                                         <span className="text-xl">👑</span>
                                     </div>
                                     <span className="text-xl text-white">👨</span>
                                </div>
                                
                                <h2 className="text-xl font-bold text-white pr-8">
                                    De quel service royal avez-vous besoin ?
                                </h2>

                                <div className="w-full space-y-2">
                                    {suggestions.map((item) => (
                                        <button 
                                            key={item.id}
                                            className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#2F2F2F] transition-colors text-left group"
                                        >
                                            <div className="p-1.5 bg-[#2F2F2F] rounded group-hover:bg-[#3F3F3F]">
                                                <item.icon size={16} className="text-[#A4A4A2]" />
                                            </div>
                                            <span className="text-[14px] font-medium">{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer / Input */}
                        <div className="p-4 space-y-4">
                            {/* Free limit info - Updated to 100% Free */}
                            <div className="bg-[#1A2E44]/40 border border-[#2383E2]/30 rounded-xl p-3 flex items-start gap-3">
                                <div className="mt-0.5 pt-0.5">
                                    <Info size={14} className="text-[#2383E2]" />
                                </div>
                                <div className="text-[12px] text-[#A4A4A2] leading-relaxed">
                                    L'Assistant Royal AI est <strong className="text-white">100% gratuit et illimité</strong> pour tous vos besoins de création.
                                </div>
                            </div>

                            {/* Input box */}
                            <div className="p-3 bg-[#242424] border border-[#3A3A3A] rounded-xl focus-within:border-[#2383E2] transition-colors shadow-inner">
                                <div className="text-[14px] text-[#A4A4A2] mb-3 ml-1">Faites ce que vous voulez avec l'IA...</div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <button className="p-1.5 hover:bg-[#3F3F3F] rounded text-[#A4A4A2]">
                                            <Plus size={18} />
                                        </button>
                                        <button className="p-1.5 hover:bg-[#3F3F3F] rounded text-[#A4A4A2]">
                                            <Settings size={18} />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="text-[13px] font-medium text-[#A4A4A2] hover:text-white px-2 py-1 ">
                                            Automatique
                                        </button>
                                        <button className="p-1.5 bg-[#404040] text-[#707070] rounded-lg cursor-not-allowed">
                                            <ArrowUp size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default RoyalAIChat;
