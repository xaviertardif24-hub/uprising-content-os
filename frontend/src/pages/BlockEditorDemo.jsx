import React from 'react';
import BlockEditor from '../components/editor/BlockEditor';
import { Info, Save, UploadCloud } from 'lucide-react';
import { useToast } from '../components/common/Toaster';

const BlockEditorDemo = () => {
    const { toast } = useToast();

    const handleSaveDraft = () => {
        toast("Draft saved successfully!");
    };

    const handlePublish = () => {
        toast("Content published successfully!");
    };

    return (
        <div className="h-full animate-in fade-in duration-500 overflow-y-auto pt-12 pb-32 px-12 max-w-[900px] mx-auto text-[#37352F] relative">
            
            {/* Action Bar */}
            <div className="absolute top-4 right-12 flex items-center gap-2">
                <button
                    onClick={handleSaveDraft}
                    className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded hover:bg-[rgba(55,53,47,0.08)] transition-colors text-[rgba(55,53,47,0.65)]"
                >
                    <Save size={16} />
                    Save Draft
                </button>
                <button
                    onClick={handlePublish}
                    className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded bg-[#2383E2] text-white hover:bg-[#0077D4] transition-colors shadow-sm"
                >
                    <UploadCloud size={16} />
                    Publish
                </button>
            </div>

            <div className="mb-10 group">
                {/* Explication Contextuelle pour Content-OS */}
                <div className="flex items-start gap-3 p-4 mb-8 bg-[#F7F7F5] border border-[rgba(55,53,47,0.16)] rounded-lg text-sm text-[rgba(55,53,47,0.85)]">
                    <Info size={20} className="text-[#2383E2] shrink-0 mt-0.5" />
                    <div className="space-y-2">
                        <p><strong>Bienvenue dans l'Éditeur de Blocs de Content-OS !</strong></p>
                        <p>Cet éditeur de type "Notion" est conçu pour vous aider à structurer vos idées, brouillons de vidéos, ou articles de blog pour votre écosystème de contenu. Tapez simplement <code>/</code> pour insérer des listes, titres, ou mettre en forme votre texte.</p>
                    </div>
                </div>

                <h1 
                    className="text-[40px] font-bold tracking-tight outline-none placeholder:text-[rgba(55,53,47,0.2)] mb-4 mt-8"
                    contentEditable
                    suppressContentEditableWarning
                    data-placeholder="Titre de la page"
                >
                    Script YouTube : L'IA dans l'Éducation
                </h1>
                
                <div className="text-[15px] pb-4 mb-6 border-b border-[rgba(55,53,47,0.16)] text-[rgba(55,53,47,0.65)]">
                    Un script pour ma prochaine vidéo d'Uprising Studio.
                </div>
            </div>

            <BlockEditor />

            <style dangerouslySetInnerHTML={{
                __html: `
                [contentEditable]:empty:before {
                    content: attr(data-placeholder);
                    color: rgba(55,53,47,0.2);
                    cursor: text;
                }
                `
            }} />
        </div>
    );
};

export default BlockEditorDemo;
