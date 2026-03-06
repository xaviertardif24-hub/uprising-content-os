# Next Steps : Content OS Backend & Frontend

Voici les prochaines étapes de développement, basées sur l'état actuel et le plan d'architecture (docs/architecture.md).

## 1. Fondation Backend (FastAPI + Supabase)
- Objectif : Mettre en place la base de données et l'API principale.
- Tâches :
  - Créer le projet Supabase et récupérer les identifiants (DATABASE_URL).
  - Implémenter les modèles SQLAlchemy (User, ContentItem, PublishingQueue, etc.).
  - Configurer Alembic et exécuter la première migration.
  - Implémenter l'authentification JWT (Login/Register).
  - Créer les endpoints CRUD de base pour les content_items.

## 2. Intégration Google Drive
- Objectif : Permettre la synchronisation des fichiers vidéo/audio.
- Tâches :
  - Mettre en place le flux OAuth2 Google Drive.
  - Créer l'endpoint pour lister et récupérer les fichiers d'un dossier cible.
  - Sauvegarder les métadonnées des fichiers synchronisés dans content_items.

## 3. Pipeline IA (Transcription & Analyse)
- Objectif : Automatiser l'extraction et l'analyse du contenu.
- Tâches :
  - Implémenter le service Whisper (OpenAI) pour la transcription audio.
  - Implémenter les appels GPT pour la catégorisation (Piliers) et le Scoring (Hook, Clarity).
  - Mettre en place le système de tâches en arrière-plan (BackgroundTasks ou Celery).

## 4. Frontend : Éditeur et Liaison API
- Objectif : Finaliser l'UI et la connecter au vrai backend.
- Tâches :
  - Connecter la page de Login au vrai endpoint d'authentification.
  - Implémenter le Drag & Drop réel dans le BlockEditor.
  - Fetcher les vraies données depuis l'API pour le Tableau de Bord (Dashboard) et la Librairie (Library).
