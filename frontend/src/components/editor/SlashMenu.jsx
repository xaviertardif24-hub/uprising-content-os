import React, { useEffect, useState, useRef } from 'react';
import { Type, Heading1, Heading2, Heading3, List, ListOrdered, Quote } from 'lucide-react';

const MENU_ITEMS = [
    { id: 'text', label: 'Texte', icon: Type, description: 'Commencez à écrire avec du texte normal.' },
    { id: 'h1', label: 'Titre 1', icon: Heading1, description: 'Titre de grande taille de section.' },
    { id: 'h2', label: 'Titre 2', icon: Heading2, description: 'Titre de taille moyenne de section.' },
    { id: 'h3', label: 'Titre 3', icon: Heading3, description: 'Titre de petite taille de section.' },
    { id: 'ul', label: 'Liste à puces', icon: List, description: 'Créez une liste à puces simple.' },
    { id: 'ol', label: 'Liste numérotée', icon: ListOrdered, description: 'Créez une liste avec une numérotation.' },
    { id: 'quote', label: 'Citation', icon: Quote, description: 'Capturez une citation.' },
];

const SlashMenu = ({ x, y, filterText, onSelect, onClose }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const menuRef = useRef(null);

    const filteredItems = MENU_ITEMS.filter(item =>
        item.label.toLowerCase().includes(filterText.toLowerCase()) ||
        item.id.toLowerCase().includes(filterText.toLowerCase())
    );

    useEffect(() => {
        setSelectedIndex(0);
    }, [filterText]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredItems.length > 0) {
                    onSelect(filteredItems[selectedIndex].id);
                }
            } else if (e.key === 'Escape') {
                onClose();
            }
        };

        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [filteredItems, selectedIndex, onSelect, onClose]);

    if (filteredItems.length === 0) return null;

    return (
        <div
            ref={menuRef}
            className="fixed z-[100] w-72 bg-white rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.1),0_1px_4px_rgba(0,0,0,0.05)] border border-[var(--color-notion-border)] py-2 text-[var(--color-notion-text)] overflow-hidden"
            style={{
                top: y,
                left: x,
                // Assurer que le menu ne sorte pas de l'écran (basique)
                maxHeight: '300px',
                overflowY: 'auto'
            }}
        >
            <div className="px-3 pb-2 text-[11px] font-semibold text-[var(--color-notion-text-meta)] uppercase tracking-wider">
                Blocs de base
            </div>
            {filteredItems.map((item, index) => (
                <button
                    key={item.id}
                    onClick={() => onSelect(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-1.5 text-left transition-colors ${index === selectedIndex ? 'bg-[var(--color-notion-bg-active)]' : 'hover:bg-[var(--color-notion-bg-hover)]'
                        }`}
                >
                    <div className="w-10 h-10 bg-white border border-[var(--color-notion-border-strong)] rounded flex items-center justify-center shrink-0 shadow-sm">
                        <item.icon size={20} className="text-[var(--color-notion-text)]" strokeWidth={1.5} />
                    </div>
                    <div>
                        <div className="text-sm font-medium">{item.label}</div>
                        <div className="text-xs text-[var(--color-notion-text-muted)] line-clamp-1">{item.description}</div>
                    </div>
                </button>
            ))}
        </div>
    );
};

export default SlashMenu;
