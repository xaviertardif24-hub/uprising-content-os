import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, 
    User, 
    Settings, 
    Bell, 
    Share2, 
    Monitor, 
    Users, 
    Download, 
    Sparkles, 
    Globe, 
    Smile, 
    WifiOff,
    Link as LinkIcon,
    Shield,
    Fingerprint,
    ArrowUpCircle
} from 'lucide-react';

const SettingsModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('Préférences');

    const menuItems = [
        { section: 'Compte', items: [
            { id: 'Compte', label: 'Uprising Studio', icon: User },
            { id: 'Préférences', label: 'Préférences', icon: Settings },
        ]},
        { section: 'Espace de travail', items: [
            { id: 'Personnes', label: 'Personnes', icon: Users },
        ]},
        { section: 'Fonctionnalités', items: [
            { id: 'IA', label: 'Intelligence Artificielle', icon: Sparkles },
            { id: 'Pages publiques', label: 'Pages publiques', icon: Globe },
            { id: 'Émoji', label: 'Émoji', icon: Smile },
            { id: 'Hors ligne', label: 'Hors ligne', icon: WifiOff },
        ]},
        { section: 'Administrateur', items: [
            { id: 'Espaces d\'équipe', label: 'Espaces d\'équipe', icon: Monitor },
            { id: 'Identité', label: 'Identité', icon: Fingerprint },
        ]}
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 bg-black/40 backdrop-blur-sm">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#191919] text-[#EBEBEB] w-full max-w-[1000px] h-[85vh] rounded-lg shadow-2xl flex overflow-hidden border border-[#2F2F2F]"
            >
                {/* Sidebar */}
                <div className="w-[240px] bg-[#202020] border-r border-[#2F2F2F] flex flex-col p-4 overflow-y-auto">
                    <div className="space-y-6">
                        {menuItems.map((section) => (
                            <div key={section.section}>
                                <h3 className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider mb-2 px-2">
                                    {section.section}
                                </h3>
                                <div className="space-y-0.5">
                                    {section.items.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-[14px] transition-colors ${
                                                activeTab === item.id 
                                                ? 'bg-[#2F2F2F] text-white font-medium' 
                                                : 'hover:bg-[#2F2F2F]/60 text-[#A4A4A2]'
                                            }`}
                                        >
                                            <item.icon size={16} />
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-auto pt-6 border-t border-[#2F2F2F]">
                        <button className="flex items-center gap-2 px-2 py-1.5 text-[14px] text-[#2383E2] hover:bg-[#2383E2]/10 rounded transition-colors w-full">
                            <ArrowUpCircle size={16} />
                            Passer à un forfait supérieur
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col min-w-0 bg-[#191919]">
                    <div className="flex items-center justify-end p-4 border-b border-[#2F2F2F]">
                         <button onClick={onClose} className="p-1 hover:bg-[#2F2F2F] rounded text-[#A4A4A2]">
                            <X size={20} />
                         </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-12">
                        {activeTab === 'Préférences' && (
                            <div className="max-w-[600px]">
                                <p className="text-[12px] font-medium text-[#91918E] mb-2 uppercase">Compte</p>
                                <h1 className="text-3xl font-bold mb-2">Préférences</h1>
                                <p className="text-[14px] text-[#A4A4A2] mb-8">Choisissez l'apparence et le comportement de Notion</p>

                                <div className="space-y-10">
                                    {/* Thème */}
                                    <section>
                                        <h3 className="text-[14px] font-bold mb-4 border-b border-[#2F2F2F] pb-2">Préférences</h3>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="text-[14px] font-medium mb-1">Thème</h4>
                                                <p className="text-[12px] text-[#91918E]">Choisissez un thème pour Notion sur cet appareil</p>
                                            </div>
                                            <select className="bg-[#2F2F2F] border border-[#3A3A3A] px-3 py-1.5 rounded text-[14px] focus:outline-none min-w-[120px]">
                                                <option>Sombre</option>
                                                <option>Clair</option>
                                                <option>Système</option>
                                            </select>
                                        </div>
                                    </section>

                                    {/* Langue et heure */}
                                    <section>
                                        <h3 className="text-[14px] font-bold mb-4">Langue et heure</h3>
                                        <div className="flex items-center justify-between mb-8">
                                            <div>
                                                <h4 className="text-[14px] font-medium mb-1">Langue</h4>
                                                <p className="text-[12px] text-[#91918E]">Choisissez la langue dans laquelle vous souhaitez utiliser Notion</p>
                                            </div>
                                            <select className="bg-[#2F2F2F] border border-[#3A3A3A] px-3 py-1.5 rounded text-[14px] focus:outline-none min-w-[180px]">
                                                <option>Français (France)</option>
                                                <option>English (United States)</option>
                                            </select>
                                        </div>

                                        <div className="flex items-start justify-between mb-8">
                                            <div className="max-w-[80%]">
                                                <h4 className="text-[14px] font-medium mb-1">Toujours afficher les commandes de direction du texte</h4>
                                                <p className="text-[12px] text-[#91918E]">
                                                    Affichez l'option permettant de modifier la direction du texte (de gauche à droite ou de droite à gauche)
                                                    dans l'éditeur, quelle que soit la langue que vous utilisez.
                                                </p>
                                            </div>
                                            <Toggle active={false} />
                                        </div>

                                        <div className="flex items-center justify-between mb-8">
                                            <div>
                                                <h4 className="text-[14px] font-medium mb-1">Langues du correcteur orthographique</h4>
                                                <p className="text-[12px] text-[#91918E]">Modifiez les langues utilisées par le correcteur orthographique.</p>
                                            </div>
                                            <button className="text-[14px] hover:bg-[#2F2F2F] px-2 py-1 rounded transition-colors text-[#A4A4A2]">
                                                français ↓
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mb-8">
                                            <div>
                                                <h4 className="text-[14px] font-medium mb-1">Commencer la semaine le lundi</h4>
                                                <p className="text-[12px] text-[#91918E]">Cela affectera l'apparence de vos calendriers dans Notion</p>
                                            </div>
                                            <Toggle active={false} />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="text-[14px] font-medium mb-1">Format de date</h4>
                                                <p className="text-[12px] text-[#91918E]">Définir le format par défaut pour les nouvelles mentions @date</p>
                                            </div>
                                            <select className="bg-[#2F2F2F] border border-[#3A3A3A] px-3 py-1.5 rounded text-[14px] focus:outline-none">
                                                <option>Relatif</option>
                                                <option>Complet</option>
                                            </select>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'Personnes' && (
                            <div className="max-w-[700px]">
                                <h1 className="text-3xl font-bold mb-2">Personnes</h1>
                                <p className="text-[14px] text-[#A4A4A2] mb-8">Gérez l'accès et le rôle de chaque membre de l'espace de travail.</p>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="relative w-64">
                                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#A4A4A2]" size={14} />
                                            <input 
                                                type="text" 
                                                placeholder="Filtrer par nom ou email..." 
                                                className="w-full bg-[#2F2F2F] border border-[#3A3A3A] rounded pl-8 pr-3 py-1.5 text-[13px] focus:outline-none focus:border-[#2383E2] transition-colors"
                                            />
                                        </div>
                                        <button className="bg-[#2383E2] text-white px-3 py-1.5 rounded text-[13px] font-medium hover:opacity-90 transition-opacity">
                                            Ajouter des membres
                                        </button>
                                    </div>

                                    <div className="border border-[#2F2F2F] rounded-lg">
                                        <div className="grid grid-cols-[2fr_1fr_1fr_auto] gap-4 p-3 border-b border-[#2F2F2F] text-[12px] font-medium text-[#91918E]">
                                            <div>Membre</div>
                                            <div>Autorisation</div>
                                            <div>Groupes</div>
                                            <div className="w-8"></div>
                                        </div>
                                        <div className="divide-y divide-[#2F2F2F]">
                                            {/* Member 1 */}
                                            <div className="grid grid-cols-[2fr_1fr_1fr_auto] gap-4 p-3 items-center hover:bg-[#2F2F2F]/30 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-linear-to-br from-blue-500 to-purple-600 flex justify-center items-center font-semibold text-white text-xs">J</div>
                                                    <div>
                                                        <div className="text-[14px] font-medium">Jane Smith <span className="bg-[#2F2F2F] text-[#A4A4A2] text-[10px] px-1.5 py-0.5 rounded ml-2">Vous</span></div>
                                                        <div className="text-[12px] text-[#A4A4A2]">jane.smith@example.com</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <select className="bg-transparent border-none text-[13px] text-[#EBEBEB] focus:outline-none cursor-pointer p-0">
                                                        <option>Propriétaire</option>
                                                        <option>Membre</option>
                                                        <option>Invité</option>
                                                    </select>
                                                </div>
                                                <div className="text-[13px] text-[#A4A4A2]">Marketing</div>
                                                <button className="p-1 hover:bg-[#3A3A3A] rounded text-[#A4A4A2]"><MoreHorizontal size={16} /></button>
                                            </div>
                                            {/* Member 2 */}
                                            <div className="grid grid-cols-[2fr_1fr_1fr_auto] gap-4 p-3 items-center hover:bg-[#2F2F2F]/30 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <img src="https://i.pravatar.cc/100?img=11" alt="Alex" className="w-8 h-8 rounded" />
                                                    <div>
                                                        <div className="text-[14px] font-medium">Alexandre Dupont</div>
                                                        <div className="text-[12px] text-[#A4A4A2]">alex@example.com</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <select className="bg-transparent border-none text-[13px] text-[#A4A4A2] focus:outline-none cursor-pointer p-0" defaultValue="Membre">
                                                        <option value="Propriétaire">Propriétaire</option>
                                                        <option value="Membre">Membre</option>
                                                        <option value="Invité">Invité</option>
                                                    </select>
                                                </div>
                                                <div className="text-[13px] text-[#A4A4A2]">Design, Marketing</div>
                                                <button className="p-1 hover:bg-[#3A3A3A] rounded text-[#A4A4A2]"><MoreHorizontal size={16} /></button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-[#2F2F2F]/30 border border-[#2F2F2F] rounded-lg p-4 flex gap-3">
                                        <div className="mt-0.5"><Info size={16} className="text-[#A4A4A2]" /></div>
                                        <div>
                                            <h4 className="text-[14px] font-medium mb-1">Travailler avec les invités</h4>
                                            <p className="text-[13px] text-[#A4A4A2]">Vous pouvez partager des pages spécifiques avec des personnes extérieures à votre espace de travail sans avoir à les inviter en tant que membres.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab !== 'Préférences' && activeTab !== 'Personnes' && (
                            <div className="flex flex-col items-center justify-center h-full text-[#91918E]">
                                <Settings size={48} className="mb-4 opacity-20" />
                                <p>Le réglage "{activeTab}" sera bientôt implémenté.</p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Toggle = ({ active }) => (
    <div className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${active ? 'bg-[#2383E2]' : 'bg-[#404040]'}`}>
        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${active ? 'translate-x-4' : 'translate-x-0'}`}></div>
    </div>
);

export default SettingsModal;
