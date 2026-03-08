# Next Steps & Future Implementations

Ce document liste les fonctionnalités qui ont été planifiées mais temporairement masquées du MVP (Minimum Viable Product) afin de garantir une expérience utilisateur (UX) claire et sans confusion. Elles devront être implémentées dans les futures versions.

## Fonctionnalités Frontend à implémenter
1. **Notifications (Menu & Settings)** : 
   - Centre de notifications complet (pour l'instant, le bouton avec le badge '3' a été masqué ou simplifié).
   - Préférences de notifications dans les paramètres.
2. **Menu "Partager" (Top Bar)** :
   - Fonctionnalité de génération de lien public ou d'invitation directe à un document spécifique.
3. **Paramètres "Général" et "Sécurité"** :
   - Gestion avancée de l'espace de travail (renommage, icône de l'espace, domaine personnalisé).
   - Accès administrateur (SAML, SSO, logs d'audit).
4. **Intégrations / Connexions** :
   - Connexion avec d'autres outils (Google Drive, Slack, GitHub, etc.).
5. **Import / Export** :
   - Outil d'importation depuis Notion, Evernote, Confluence, HTML, Markdown.
   - Export CSV, PDF, Markdown.
6. **Raccourcis Clavier Avancés** :
   - Support de Cmd+S (Save), Cmd+Enter (Publish), etc.
7. **Barre de Progression de Chargement** : 
   - Indication visuelle globale en haut de la page lors du chargement ou de la sauvegarde d'un contenu.
8. **Dark Mode Toggle Rapide** : 
   - Raccourci dans la barre supérieure pour changer le mode.

## Spécifications Backend à implémenter
1. **API de Notifications / Webhooks** :
   - Pour les événements importants (mention, tâche assignée).
2. **Rate Limiting** :
   - Implémentation d'une protection contre les abus de requêtes API (ex: création d'idées, IA).
3. **Audit Log Complet** :
   - Tracer les accès, les suppressions et les modifications.
4. **Système de Caching Avancé** :
   - Utilisation de Redis pour le dashboard et les listes (Ideas, Library).
5. **Documentation d'API Publique** :
   - Fournir un Swagger/OpenAPI pour les intégrations tierces.
