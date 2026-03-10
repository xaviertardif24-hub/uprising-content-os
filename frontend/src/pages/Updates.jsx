import React from 'react';
import { GitCommit, Star, RefreshCw } from 'lucide-react';

const Updates = () => {
    const getRelativeDate = (date) => {
        const diff = new Date() - new Date(date);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (days === 0) return "Aujourd'hui";
        if (days === 1) return "Hier";
        if (days < 30) return `Il y a ${days} jours`;
        return "Mois dernier";
    };

    const changelog = [
        {
            date: new Date().toISOString(),
            version: "v1.8.0",
            title: "Internationalization & Demo Mode",
            changes: [
                "Full Internationalization (i18n) support for English and French",
                "New persistent 'Demo Mode' using LocalStorage (no backend required)",
                "Added 'New Project' and 'Add Task' interactive features",
                "Complete Clipflow linear workflow implementation",
                "High-end Media Review area with persistent feedback",
                "Enhanced Topbar with breadcrumbs and sharing actions"
            ],
            isNew: true
        },
        {
            date: "2026-03-10T12:00:00Z",
            version: "v1.6.0",
            title: "Interface Royale & IA Chatbot",
            changes: [
                "Implémentation du chatbot 'Royal AI' (icône Roi) avec suggestions intelligentes",
                "Conversion de la page Paramètres en une fenêtre modale immersive",
                "Nouvelle vue 'Espaces d'équipe' pour la Bibliothèque (layout en tableau)",
                "Support du mode plein écran via le bouton de réduction de la barre latérale",
                "Ajout de badges de notification ('3') dynamiques dans la navigation",
                "Correction du bug de rotation infinie sur l'invitation des membres"
            ],
            isNew: false
        },
        {
            date: new Date(Date.now() - 86400000).toISOString(),
            version: "v1.5.0",
            title: "Mise à jour de l'interface & Nouveautés",
            changes: [
                "Refonte complète de l'interface utilisateur pour correspondre parfaitement au style minimaliste de l'application",
                "Ajout de la page 'Nouveautés' pour suivre les mises à jour du projet",
                "Ajout de la page 'Recherche' avec un système de saisie et d'historique",
                "Correction du positionnement du menu de commandes (le menu à la barre oblique '/') dans l'éditeur",
                "Traduction complète de l'application en français"
            ],
            isNew: false
        },
        {
            date: new Date(Date.now() - 2592000000).toISOString(),
            version: "v1.0.0",
            title: "Lancement de la version initiale",
            changes: [
                "Initialisation du système Content-OS Uprising",
                "Mise en place du tableau de bord avec compteurs et statistiques",
                "Création du répertoire de création de contenu"
            ],
            isNew: false
        }
    ];

    return (
        <div className="h-full animate-in fade-in duration-500 overflow-y-auto px-8 py-16 lg:px-20 max-w-[900px] mx-auto text-[#37352F]">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-notion-text tracking-tight">Nouveautés</h1>
                    <p className="text-notion-text-muted text-base mt-2">
                        Découvrez les dernières améliorations et fonctionnalités de Content-OS
                    </p>
                </div>
                <div>
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-2 text-sm text-notion-text-muted hover:text-notion-text hover:bg-notion-bg-hover px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-notion-border"
                    >
                        <RefreshCw size={16} /> Vérifier les mises à jour
                    </button>
                </div>
            </div>

            <div className="space-y-12">
                {changelog.map((release, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-6 md:gap-12 group">
                        {/* Version & Date Column */}
                        <div className="md:w-1/4 shrink-0 pt-1">
                            <div className="sticky top-20">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-sm font-bold px-2.5 py-1 bg-[rgba(55,53,47,0.06)] text-[rgba(55,53,47,0.65)] rounded-md">
                                        {release.version}
                                    </span>
                                    {release.isNew && (
                                        <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded-md flex items-center gap-1">
                                            <Star size={12} className="fill-blue-700" />
                                            RÉCENT
                                        </span>
                                    )}
                                </div>
                                <span className="text-sm text-notion-text-meta font-medium">{getRelativeDate(release.date)}</span>
                            </div>
                        </div>

                        {/* Content Column */}
                        <div className="md:w-3/4">
                            <div className="pb-12 border-b border-notion-border group-last:border-0 group-last:pb-0">
                                <h3 className="text-2xl font-semibold text-notion-text mb-6">{release.title}</h3>
                                <ul className="space-y-4">
                                    {release.changes.map((change, i) => (
                                        <li key={i} className="flex items-start gap-4 text-base text-[rgba(55,53,47,0.8)] leading-relaxed">
                                            <div className="mt-2 w-1.5 h-1.5 bg-[#2383E2] rounded-full shrink-0"></div>
                                            <span>{change}</span>
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
