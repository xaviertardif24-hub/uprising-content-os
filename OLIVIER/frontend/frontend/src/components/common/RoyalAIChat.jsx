import React, { useState, useRef, useEffect } from 'react';
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
    Info,
    User
} from 'lucide-react';
import useChatStore from '../../store/chatStore';

const RoyalAIChat = ({ isOpen, onClose }) => {
    const [inputValue, setInputValue] = useState('');
    const { messages, isLoading, sendMessage, clearChat } = useChatStore();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return;
        const msg = inputValue;
        setInputValue('');
        await sendMessage(msg);
    };

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
                        className="fixed bottom-20 right-6 z-[1000] w-[450px] max-h-[70vh] bg-[#191919] border border-[#2F2F2F] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#EBEBEB]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-[#2F2F2F] bg-[#191919] z-20">
                            <button className="flex items-center gap-1.5 text-[14px] font-medium hover:bg-[#2F2F2F] px-2 py-1 rounded transition-colors group">
                                Assistant Royal AI
                                <ChevronDown size={14} className="text-[#A4A4A2]" />
                            </button>
                            <div className="flex items-center gap-2 text-[#A4A4A2]">
                                <button onClick={clearChat} title="Nouvelle discussion" className="p-1.5 hover:bg-[#2F2F2F] rounded transition-colors">
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

                        {/* Body - Messages */}
                        <div className="flex-1 p-4 overflow-y-auto bg-[#191919]">
                            <div className="space-y-6">
                                {messages.map((msg, idx) => (
                                    <motion.div
                                        key={msg.id || idx}
                                        initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border border-[#2F2F2F] flex-shrink-0 ${msg.role === 'user' ? 'bg-[#2F2F2F]' : 'bg-[#37352F]'}`}>
                                            {msg.role === 'user' ? <User size={14} /> : <span>👑</span>}
                                        </div>
                                        <div className={`max-w-[80%] p-3 rounded-2xl text-[14px] leading-relaxed ${msg.role === 'user' ? 'bg-[#2383E2] text-white rounded-tr-none' : 'bg-[#2F2F2F] text-[#EBEBEB] rounded-tl-none'}`}>
                                            {msg.content}
                                        </div>
                                    </motion.div>
                                ))}
                                {isLoading && (
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#37352F] flex items-center justify-center border border-[#2F2F2F] flex-shrink-0">
                                            <span>👑</span>
                                        </div>
                                        <div className="bg-[#2F2F2F] p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-[#A4A4A2] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-1.5 h-1.5 bg-[#A4A4A2] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-1.5 h-1.5 bg-[#A4A4A2] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Suggestions (Only if no messages yet or simple welcome) */}
                            {messages.length <= 1 && (
                                <div className="mt-8 space-y-2">
                                    <p className="text-[12px] text-[#A4A4A2] mb-3 ml-1 font-medium italic">Suggestions de service royal :</p>
                                    {suggestions.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => sendMessage(item.label)}
                                            className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#2F2F2F] transition-colors text-left group"
                                        >
                                            <div className="p-1.5 bg-[#2F2F2F] rounded group-hover:bg-[#3F3F3F]">
                                                <item.icon size={16} className="text-[#A4A4A2]" />
                                            </div>
                                            <span className="text-[14px] font-medium">{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer / Input */}
                        <div className="p-4 bg-[#191919] border-t border-[#2F2F2F] space-y-4">
                            {/* Free limit info */}
                            <div className="bg-[#1A2E44]/40 border border-[#2383E2]/30 rounded-xl p-3 flex items-start gap-3">
                                <div className="mt-0.5 pt-0.5">
                                    <Info size={14} className="text-[#2383E2]" />
                                </div>
                                <div className="text-[12px] text-[#A4A4A2] leading-relaxed">
                                    L'Assistant Royal AI est <strong className="text-white">100% gratuit</strong> pour tous vos besoins de création.
                                </div>
                            </div>

                            {/* Input box */}
                            <div className="p-3 bg-[#242424] border border-[#3A3A3A] rounded-xl focus-within:border-[#2383E2] transition-colors shadow-inner">
                                <textarea
                                    className="w-full bg-transparent text-[14px] text-[#EBEBEB] focus:outline-none resize-none placeholder-[#A4A4A2]"
                                    placeholder="Faites ce que vous voulez avec l'IA..."
                                    rows={1}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                />
                                <div className="flex items-center justify-between mt-2">
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
                                        <button
                                            onClick={handleSend}
                                            disabled={!inputValue.trim() || isLoading}
                                            className={`p-1.5 rounded-lg transition-colors ${!inputValue.trim() || isLoading ? 'bg-[#404040] text-[#707070] cursor-not-allowed' : 'bg-[#2383E2] text-white hover:bg-[#1a6fbf]'}`}
                                        >
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
