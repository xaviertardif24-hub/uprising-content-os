import React from 'react';
import { GitCommit, Star, RefreshCw } from 'lucide-react';

const Updates = () => {
    const changelog = [
        {
            date: "Aujourd'hui",
            version: "v1.5.0",
            title: "Mise à jour de l'interface & Nouveautés",
            changes: [
                "Refonte complète de l'interface utilisateur pour correspondre parfaitement au style minimaliste de Notion",
                "Ajout de la page 'Nouveautés' pour suivre les mises à jour du projet",
                "Ajout de la page 'Recherche' avec un système de saisie et d'historique",
                "Correction du positionnement du menu de commandes (le menu à la barre oblique '/') dans l'éditeur",
                "Traduction complète de l'application en français",
                "Amélioration de la modale d'invitation avec simulation d'envoi et notifications"
            ],
            isNew: true
        },
        {
            date: "La semaine dernière",
            version: "v1.4.2",
            title: "Améliorations de l'éditeur de contenu",
            changes: [
                "Ajout d'une fonctionnalité pour simuler la sauvegarde et la publication d'articles",
                "Mise en place de toasts de notification pour informer l'utilisateur de l'état de l'action",
                "Redirection depuis la zone Bibliothèque vers l'éditeur maintenant fonctionnelle",
                "Ajout du bouton 'Éditer' dans les détails de contenu permettant de sauter à l'éditeur"
            ],
            isNew: false
        },
        {
            date: "Mois dernier",
            version: "v1.0.0",
            title: "Lancement de la version initiale",
            changes: [
                "Initialisation du système Content-OS Uprising",
                "Mise en place du tableau de bord avec compteurs et statistiques",
                "Création du répertoire de création de contenu",
                "Implémentation du système d'authentification de base"
            ],
            isNew: false
        }
    ];

    return (
        <div className="h-full animate-in fade-in duration-500 overflow-y-auto px-6 py-12 lg:px-12 max-w-[800px] mx-auto">
            <div className="flex items-end justify-between mb-10 pb-4 border-b border-[rgba(55,53,47,0.16)]">
                <div>
                    <h1 className="text-3xl font-semibold text-[var(--color-notion-text)] tracking-tight">Nouveautés</h1>
                    <p className="text-[var(--color-notion-text-muted)] text-sm mt-2">
                        Historique des mises à jour et nouvelles fonctionnalités de Content-OS
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 text-xs text-[var(--color-notion-text-muted)] hover:text-[#37352F] hover:bg-[rgba(55,53,47,0.08)] px-2 py-1 rounded transition-colors">
                        <RefreshCw size={14} /> Vérifier les mises à jour
                    </button>
                </div>
            </div>

            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                {changelog.map((release, index) => (
                    <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        {/* Timeline dot */}
                        <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white bg-[#2383E2] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 z-10">
                            {release.isNew ? <Star size={12} className="fill-white" /> : <GitCommit size={14} />}
                        </div>

                        {/* Content Card */}
                        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] pl-4 md:pl-0 md:group-even:pr-8 md:group-odd:pl-8">
                            <div className="p-5 bg-white border border-[rgba(55,53,47,0.16)] shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-xl transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold px-2 py-0.5 bg-[rgba(55,53,47,0.06)] text-[rgba(55,53,47,0.65)] rounded">
                                            {release.version}
                                        </span>
                                        {release.isNew && (
                                            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-sm uppercase tracking-wider">
                                                RÉCENT
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-xs text-[var(--color-notion-text-meta)]">{release.date}</span>
                                </div>
                                <h3 className="text-base font-bold text-[var(--color-notion-text)] mb-3">{release.title}</h3>
                                <ul className="space-y-2 text-sm text-[rgba(55,53,47,0.8)]">
                                    {release.changes.map((change, i) => (
                                        <li key={i} className="flex items-start gap-2 relative pl-4">
                                            <span className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-[#2383E2] rounded-full opacity-60"></span>
                                            {change}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Updates;
