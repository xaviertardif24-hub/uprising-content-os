import { useState, useRef, useEffect } from 'react';
import { GripVertical, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import SlashMenu from './SlashMenu';

const Block = ({ id, content, type, onUpdate, onAdd, onRemove, onFocusNext, autoFocus, onTypeChange, onMove }) => {
    const inputRef = useRef(null);
    const [slashMenuOpen, setSlashMenuOpen] = useState(false);
    const [slashFilter, setSlashFilter] = useState('');
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
            // Put cursor at the end
            const length = inputRef.current.value.length;
            inputRef.current.setSelectionRange(length, length);
        }
    }, [autoFocus]);

    const handleInput = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
        const val = e.target.value;
        onUpdate(id, val);

        // Detect '/'
        const slashIndex = val.lastIndexOf('/');
        if (slashIndex !== -1 && (slashIndex === 0 || val[slashIndex - 1] === ' ')) {
            // Check if '/' is the last word started
            const textAfterSlash = val.slice(slashIndex + 1);
            if (!textAfterSlash.includes(' ')) {
                setSlashFilter(textAfterSlash);
                if (!slashMenuOpen) {
                    setSlashMenuOpen(true);
                }
                return;
            }
        }
        setSlashMenuOpen(false);
    };

    const handleKeyDown = (e) => {
        if (slashMenuOpen) {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Enter') {
                e.preventDefault();
                return; // Let SlashMenu handle these
            }
            if (e.key === 'Escape') {
                setSlashMenuOpen(false);
            }
        } else {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onAdd(id);
            } else if (e.key === 'Backspace' && content === '') {
                e.preventDefault();
                // Si on a un type spécial, on repasse en texte d'abord
                if (type !== 'text') {
                    onTypeChange(id, 'text');
                } else {
                    onRemove(id);
                }
            } else if (e.key === 'ArrowDown') {
                onFocusNext(id, 'down');
            } else if (e.key === 'ArrowUp') {
                onFocusNext(id, 'up');
            }
        }
    };

    const handleSelectSlashMenuItem = (newType) => {
        setSlashMenuOpen(false);
        // Remove the "/..." trigger from content
        const slashIndex = content.lastIndexOf('/');
        const newContent = content.slice(0, slashIndex);
        onTypeChange(id, newType);
        onUpdate(id, newContent);
    };

    // Styling dynamiques selon le type
    let blockClasses = "w-full bg-transparent resize-none outline-none leading-relaxed overflow-hidden text-[var(--color-notion-text)] placeholder:text-[var(--color-notion-text-meta)]";

    switch (type) {
        case 'h1': blockClasses += " text-3xl font-bold mt-4 mb-1"; break;
        case 'h2': blockClasses += " text-2xl font-semibold mt-3 mb-1"; break;
        case 'h3': blockClasses += " text-xl font-semibold mt-2 mb-1"; break;
        case 'quote':
            blockClasses += " border-l-4 border-[var(--color-notion-text)] pl-4 italic text-[var(--color-notion-text-meta)] text-lg py-1 my-2";
            break;
        default: blockClasses += " text-base"; break;
    }

    // Calcul de l'index pour 'ol' (simplifié, on n'a pas accès à la liste complète ici, on devrait idéalement passer l'index du parent. Pour la V1, on met juste "1." ou "•")
    const renderListPrefix = () => {
        if (type === 'ul') {
            return <div className="absolute left-0 top-[2px] w-6 flex justify-center text-[var(--color-notion-text)]"><span className="text-xl leading-none">•</span></div>;
        }
        if (type === 'ol') {
            return <div className="absolute left-0 top-[2px] w-6 flex justify-center text-[var(--color-notion-text)] text-sm font-medium">1.</div>;
        }
        return null;
    };

    return (
        <div className="group flex items-start gap-1 py-1 -ml-8 pl-1 relative">
            {/* Actions (Arrows & Plus) */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center absolute left-0 top-0 mt-1.5 space-y-0.5">
                <button
                    className="p-0.5 text-notion-text-muted hover:bg-notion-bg-hover hover:text-notion-text rounded cursor-pointer"
                    onClick={() => onAdd(id)}
                    title="Ajouter un bloc en dessous"
                >
                    <Plus size={14} />
                </button>
                <div className="flex bg-notion-bg-hover/60 rounded overflow-hidden">
                    <button
                        className="p-0.5 text-notion-text-muted hover:bg-[#d8d8d8] dark:hover:bg-[#333] hover:text-notion-text cursor-pointer transition-colors"
                        onClick={() => onMove(id, 'up')}
                        title="Décale vers le haut"
                    >
                        <ArrowUp size={12} strokeWidth={2.5} />
                    </button>
                    <button
                        className="p-0.5 text-notion-text-muted hover:bg-[#d8d8d8] dark:hover:bg-[#333] hover:text-notion-text cursor-pointer transition-colors"
                        onClick={() => onMove(id, 'down')}
                        title="Décale vers le bas"
                    >
                        <ArrowDown size={12} strokeWidth={2.5} />
                    </button>
                </div>
            </div>

            {/* Editable Zone */}
            <div className={`flex-1 ml-14 min-h-[24px] relative ${type === 'ul' || type === 'ol' ? 'pl-6' : ''}`}>
                {renderListPrefix()}
                <textarea
                    ref={inputRef}
                    value={content}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    placeholder={type === 'text' ? "Taper '/' pour les commandes" : ''}
                    className={blockClasses}
                    rows={1}
                    style={{ minHeight: '24px' }}
                />
                {slashMenuOpen && (
                    <SlashMenu
                        filterText={slashFilter}
                        onSelect={handleSelectSlashMenuItem}
                        onClose={() => setSlashMenuOpen(false)}
                    />
                )}
            </div>
        </div>
    );
};

const BlockEditor = () => {
    const [blocks, setBlocks] = useState([
        { id: '1', type: 'text', content: '' }
    ]);
    const [focusedBlockId, setFocusedBlockId] = useState('1');

    const handleMoveBlock = (id, direction) => {
        const index = blocks.findIndex(b => b.id === id);
        if (direction === 'up' && index > 0) {
            const newBlocks = [...blocks];
            const temp = newBlocks[index];
            newBlocks[index] = newBlocks[index - 1];
            newBlocks[index - 1] = temp;
            setBlocks(newBlocks);
        } else if (direction === 'down' && index < blocks.length - 1) {
            const newBlocks = [...blocks];
            const temp = newBlocks[index];
            newBlocks[index] = newBlocks[index + 1];
            newBlocks[index + 1] = temp;
            setBlocks(newBlocks);
        }
    };

    const handleUpdateBlock = (id, newContent) => {
        setBlocks(blocks.map(b => b.id === id ? { ...b, content: newContent } : b));
    };

    const handleAddBlock = (afterId) => {
        const index = blocks.findIndex(b => b.id === afterId);
        const currentBlock = blocks[index];

        let newType = 'text';
        // Conserver le type liste si on fait 'Entrée' dans une liste
        if (currentBlock.type === 'ul' || currentBlock.type === 'ol') {
            newType = currentBlock.type;
        }

        const newBlock = { id: Date.now().toString(), type: newType, content: '' };
        const newBlocks = [...blocks];
        newBlocks.splice(index + 1, 0, newBlock);
        setBlocks(newBlocks);
        setFocusedBlockId(newBlock.id);
    };

    const handleRemoveBlock = (id) => {
        if (blocks.length === 1) return; // Garder au moins 1 bloc
        const index = blocks.findIndex(b => b.id === id);
        const newBlocks = blocks.filter(b => b.id !== id);
        setBlocks(newBlocks);

        // Focus le bloc d'avant
        if (index > 0) {
            setFocusedBlockId(newBlocks[index - 1].id);
        } else {
            setFocusedBlockId(newBlocks[0].id);
        }
    };

    const handleFocusNext = (currentId, direction) => {
        const index = blocks.findIndex(b => b.id === currentId);
        if (direction === 'down' && index < blocks.length - 1) {
            setFocusedBlockId(blocks[index + 1].id);
        } else if (direction === 'up' && index > 0) {
            setFocusedBlockId(blocks[index - 1].id);
        }
    };

    const handleTypeChange = (id, newType) => {
        setBlocks(blocks.map(b => b.id === id ? { ...b, type: newType } : b));
    };

    return (
        <div className="max-w-3xl w-full mx-auto pb-32">
            <h1 className="text-4xl font-bold text-[var(--color-notion-text)] mb-8 outline-none" contentEditable suppressContentEditableWarning>Untitled</h1>
            <div className="flex flex-col">
                {blocks.map(block => (
                    <Block
                        key={block.id}
                        id={block.id}
                        content={block.content}
                        type={block.type}
                        onUpdate={handleUpdateBlock}
                        onAdd={handleAddBlock}
                        onRemove={handleRemoveBlock}
                        onFocusNext={handleFocusNext}
                        onTypeChange={handleTypeChange}
                        onMove={handleMoveBlock}
                        autoFocus={focusedBlockId === block.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default BlockEditor;
