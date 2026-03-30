# 🏗️ Configuration de l'Espace Client Notion

Ce guide explique comment structurer l'espace Notion pour Olivier afin de garantir une collaboration fluide.

## 1. Structure de l'Espace
L'espace doit être divisé en 4 piliers principaux :

### 📂 Phase 1 : Stratégie & Assets
- **Brand Book** : [brand-book.md](../strategy/brand-book.md) (Couleurs, polices, logos).
- **Cible & Persona** : Détails sur l'audience visée (À venir).
- **Inspirations** : Galerie de références design sur Framer.

### 📝 Phase 2 : Contenu & CMS
- **Task Database** : [task-database.md](./task-database.md) (Liste à copier dans Notion).
- **Banque d'idées** : Liste des contenus à venir.
- **Calendrier Editorial** : Dates de publication prévues.
- **Database CMS Mapping** : [field-mapping.json](../technical/field-mapping.json) (Vue synchronisée avec Framer).

### ⚙️ Phase 3 : Technique & Feedback
- **Framer CMS Guide** : [framer-cms-guide.md](../technical/framer-cms-guide.md).
- **Journal des updates** : Historique des modifications techniques.
- **Gestionnaire de Bugs** : Espace pour remonter des problèmes.
- **Accès Rapides** : Liens vers Framer, Analytics, etc.

### ⚖️ Phase 4 : Legal & Admin
- **Contrats (T&C)** : [terms-and-conditions.md](../legal/terms-and-conditions.md).
- **Privacy Policy** : [privacy.md](../legal/privacy.md).
- **Facturation** : Historique des factures émises.

## 2. Paramétrage des Droits
1.  **Partage** : Cliquez sur "Share" en haut à droite.
2.  **Inviter** : Ajoutez l'email d'Olivier en mode "Full Access" sur son espace dédié.
3.  **Verrouillage** : Une fois la structure validée, verrouillez les pages de base pour éviter les modifications accidentelles.

---

## 3. Outils IA par Phase

Chaque phase de l'espace Notion est assistée par des outils IA spécifiques :

| Phase Notion | Outil IA recommandé | Usage concret |
|---|---|---|
| **Stratégie & Assets** | Claude + Canva IA | Rédiger le Brand Book, générer des visuels de référence |
| **Contenu & CMS** | Claude + Notion AI | Rédiger les contenus, planifier le calendrier éditorial |
| **Technique & Feedback** | Cursor + v0 by Vercel | Coder les composants Framer, débugger les intégrations CMS |
| **Legal & Admin** | Claude | Rédiger et personnaliser les contrats, CGV, Privacy Policy |

> Pour le suivi global du projet : **NotebookLM** (centralise tous les docs client) + **Make** (automatise les rappels et mails).

---

> [!TIP]
> Utilisez les templates "Project Management" de Notion pour gagner du temps sur les bases de données. Activez **Notion AI** sur la workspace pour générer du contenu directement depuis les pages.

> [!NOTE]
> Stack IA complet documenté dans [guide.md](./guide.md).
