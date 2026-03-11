# 🗺️ Mapping Technique : Content OS ↔ Framer (Aethera)

Ce document définit la structure de synchronisation entre le moteur d'IA (Content OS) et l'interface utilisateur (Framer CMS).

## 1. Schéma de Données (Collection : Articles)

| Champ Framer CMS | Source Content OS (JSON) | Type de Donnée | Description / Règle |
| :--- | :--- | :--- | :--- |
| **Title** | `post_title` | Texte | Titre optimisé H1. |
| **Slug** | `post_slug` | Texte (URL-safe) | Généré à partir du titre, sans accents. |
| **Pillar** | `category_pillar` | Option (CMS) | Stratégie, Technologie, Innovation, etc. |
| **Main Image** | `featured_image_url` | Image / URL | Image générée par IA ou sélectionnée. |
| **Content Body** | `formatted_content` | Rich Text (HTML) | Corps de l'article avec balises H2/H3. |
| **Video Link** | `video_embed_url` | URL (Optionnel) | Lien YouTube/Vimeo si disponible. |
| **Aethera Score** | `ai_relevance_score` | Nombre (1-100) | Score calculé de pertinence SEO/Branche. |

## 2. Règles de Validation
- **Images** : Ratio 16:9 recommandé, format WebP pour la performance.
- **Contenu** : Minimum 300 mots pour le SEO technique.
- **Score** : Tout article avec un score < 70 doit être revu manuellement avant publication.

## 3. Workflow d'Automatisation
1. L'IA génère le JSON structuré.
2. Le script d'intégration (via API Framer) injecte l'item dans la collection.
3. L'article est placé en statut "Draft" (Brouillon) pour validation finale.

---
*Référence : [FRAMER-SETUP.md](file:///c:/Users/xavie/OneDrive/Desktop/Contrat%20Olivier/Document%20Olivier/AETHERA/FRAMER-SETUP.md)*
