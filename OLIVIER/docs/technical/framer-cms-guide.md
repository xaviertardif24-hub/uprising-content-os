# ⚙️ Guide de Gestion CMS Framer - Expert

Ce guide technique explique comment alimenter et synchroniser le contenu entre la base de données (Content OS) et l'interface Framer.

## 1. Structure de la Collection CMS
Dans Framer, assurez-vous que la collection (ex: "Articles" ou "Réalisations") possède scrupuleusement les champs suivants correspondant à notre mapping :

1.  **Title** (Text) : Le titre principal pour l'affichage (H1).
2.  **Slug** (Text) : L'URL de la page (ex: `ma-nouvelle-idee`).
3.  **Hero Image** (Image) : Image haute résolution (min 1920px).
4.  **Publish Date** (Date) : Pour le tri chronologique.
5.  **Summary** (Text) : Courte description pour les cartes (SEO).
6.  **Body Content** (Formatted Text) : Le contenu riche via l'éditeur de texte.

---

## 2. Procédure de Publication

Pour ajouter un nouveau contenu :
1.  **Saisie** : Sélectionnez la collection cible dans le menu "CMS" à gauche de Framer.
2.  **Remplissage** : Collez le contenu depuis votre éditeur (ou via sync automatique).
3.  **Optimisation SEO** : Remplissez les champs `Summary` et `Slug` avec des mots-clés pertinents.
4.  **Mise en Ligne** : Cliquez sur le bouton "Update" ou "Publish" en haut à droite.

---

## 3. Synchronisation Automatique
Si vous utilisez notre script de bridging (`framer_integration_script.js`), suivez cette procédure :

1.  **Initialisation** : Lancez le script via l'API Content OS.
2.  **Validation** : Vérifiez que les données apparaissent dans l'onglet "CMS" de Framer sans erreurs de mapping.
3.  **Logs** : En cas d'erreur de types (ex: String au lieu de Date), consultez le `sync-log.json` généré.

---
> [!IMPORTANT]
> Ne modifiez jamais le nom des variables (Slug, Title) directement dans Framer sans mettre à jour le `field-mapping.json`, sous peine de rompre la synchronisation.
