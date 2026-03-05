#PRODUCT REQUIREMENTS DOCUMENT (PRD)
Content OS - Système de Gestion de Contenu IA
Version: 1.0
Date: 5 Mars 2026
Équipe: Uprising Studio (Kael Belceus, Xavier Tardif)
Client: Olivier Grenon
Status: Approved for Development

1. EXECUTIVE SUMMARY
1.1 Vision du Produit
Content OS est un système de gestion de contenu intelligent qui transforme 20,000+ vidéos non organisées en une machine de production de contenu automatisée. Le système utilise l'IA pour catégoriser, scorer, adapter et planifier du contenu cross-platform, réduisant le temps de production de 70% tout en maintenant la qualité et la voix de marque.

1.2 Problème Résolu
Problème actuel d'Olivier:

20,000+ vidéos stockées de manière chaotique dans Google Drive
Aucun système de catégorisation ou recherche efficace
Création manuelle de captions pour 5+ plateformes = 2-3h par contenu
Impossibilité d'extraire de la valeur des transcripts d'appels clients
20-30 meetings/semaine génèrent du contenu potentiel inexploité
Google Sheets manuel = goulot d'étranglement opérationnel
Solution Content OS: Système centralisé qui automatise 80% du workflow de production de contenu, de l'upload initial jusqu'à la génération de captions prêtes à publier, tout en préservant la voix unique de la marque.

1.3 Utilisateurs Cibles
Utilisateur Principal: Olivier Grenon (créateur de contenu, coach business)
Utilisateur Secondaire: Assistante anglophone (gestion quotidienne)
Volume: 50-100 nouveaux contenus/semaine à terme
2. OBJECTIFS BUSINESS
2.1 Objectifs Primaires (v1 - 3 semaines)
Réduction du temps de production: 70% de temps économisé sur création de captions
Organisation instantanée: 100% des nouveaux contenus catégorisés automatiquement
Scalabilité: Capacité de gérer 100 contenus/semaine vs 10-20 actuellement
Qualité consistente: 90%+ des captions générées utilisables sans édition majeure
2.2 Métriques de Succès
Temps de catégorisation: <5 secondes par contenu (vs 5-10 min manuel)
Accuracy catégorisation IA: >90%
Temps génération multi-platform captions: <30 secondes (vs 2-3h manuel)
Brand voice match: >85% (validation humaine)
Adoption utilisateur: Utilisation quotidienne dans les 7 jours post-formation
2.3 ROI Attendu
Temps économisé: 15-20h/semaine
Valeur économique: $1,500-2,000/semaine (basé sur taux horaire consultant)
Augmentation output: 3-5x plus de contenu publié
3. USER PERSONAS
Persona 1: Olivier (Power User)
Rôle: Créateur de contenu, stratège
Fréquence d'utilisation: 5-10x/semaine
Cas d'usage principaux:

Review contenus scorés "premium" (>7/10)
Valider idées extraites des calls clients
Ajuster calendrier de publication
Rechercher contenus spécifiques pour repurposing
Pain points:

Manque de temps (20-30 meetings/semaine)
Besoin de délégation maximale
Exigence de qualité élevée (marque = réputation)
Goals:

Publier 50+ contenus/semaine sans augmenter temps investi
Exploiter valeur cachée dans transcripts d'appels
Maintenir voix de marque consistente
Persona 2: Assistante (Daily Operator)
Rôle: Gestionnaire opérationnel quotidien
Fréquence d'utilisation: Quotidienne (1-2h/jour)
Cas d'usage principaux:

Upload nouveaux contenus
Trigger génération de captions
Scheduler publications
Monitoring queue de publication
Pain points:

Barrière linguistique (anglophone, contenu français)
Besoin d'interface simple et claire
Workflows répétitifs à automatiser
Goals:

Workflow clair avec minimal décisions subjectives
Interface rapide et responsive
Notifications claires pour actions requises
4. FEATURES DÉTAILLÉES
4.1 FEATURE: Content Library (Priorité: P0 - Critical)
Description:
Hub central affichant tous les contenus avec capacités de recherche, filtrage et tri avancés.

User Stories:

En tant qu'Olivier, je veux voir tous mes contenus en un coup d'œil pour évaluer mon inventory
En tant qu'assistante, je veux filtrer par statut "Ready to Post" pour savoir quoi publier aujourd'hui
En tant qu'Olivier, je veux rechercher par mot-clé pour trouver un ancien contenu sur un sujet spécifique
Spécifications Techniques:

Vue par défaut: Grid view (3-4 colonnes desktop, 1-2 mobile)
Éléments affichés par carte:
Thumbnail (screenshot première frame si vidéo)
Titre
Pilier (badge coloré)
Score composite (1-10 avec étoiles)
Status (Draft/Ready/Published)
Date d'upload
Plateforme source
Filtres disponibles:
Pilier (Sales, Leadership, Systems, Discipline, Community)
Status (All, Draft, Ready to Post, Published)
Score (>7 premium, 5-7 good, <5 needs work)
Date range
Plateforme source
Search: Full-text search sur titre + transcript
Tri: Date (newest/oldest), Score (high/low), Alphabétique
Bulk actions: Select multiple → Generate captions, Change status, Delete
Acceptance Criteria:

 Library charge <2 secondes pour 200 items
 Search retourne résultats <500ms
 Filtres peuvent se combiner (ex: Pilier=Sales AND Score>7)
 Mobile responsive (utilisable sur iPhone)
 Pagination (50 items/page)
4.2 FEATURE: Auto-Categorization IA (Priorité: P0 - Critical)
Description:
Système IA qui analyse automatiquement chaque nouveau contenu et l'assigne à un pilier de marque.

User Stories:

En tant qu'assistante, quand j'uploade une vidéo, elle est automatiquement catégorisée sans mon intervention
En tant qu'Olivier, je veux voir la confiance du système (1-10) pour pouvoir review les cas ambigus
En tant qu'Olivier, je peux overrider la catégorisation IA si elle est incorrecte
Spécifications Techniques:

Piliers disponibles:
Sales (vente, closing, prospection, objections)
Leadership (gestion équipe, culture, décisions difficiles)
Systems (processus, automatisation, scaling, SOPs)
Discipline (mindset, routines, accountability, performance)
Community (Separation Sunday, events, culture communautaire)
Input: Transcript vidéo (généré via Whisper API)
Output:
Pilier principal (string)
Confidence score (1-10)
Reasoning (1 phrase expliquant pourquoi)
Fallback: Si confidence <5 → flag "Needs Review"
Human override: Dropdown pour changer manuellement + sauvegarde preference
Prompt IA (testé en prototype):

Analyse ce transcript et catégorise-le selon un des 5 piliers.
[Prompt complet dans prototypes/google-ai-studio/prompts/categorization.txt]
Acceptance Criteria:

 Accuracy >90% sur test set de 50 transcripts variés
 Processing time <5 secondes par contenu
 Reasoning fourni pour chaque décision
 UI permet override facile (1 click)
 Historique des overrides sauvegardé
4.3 FEATURE: Content Scoring System (Priorité: P0 - Critical)
Description:
Système de scoring automatique évaluant la qualité du contenu selon 3 critères: Hook Strength, Clarity, CTA.

User Stories:

En tant qu'Olivier, je veux voir rapidement quels contenus sont "premium" (>7/10) pour prioriser leur publication
En tant qu'assistante, je veux filtrer par score pour publier d'abord le meilleur contenu
En tant qu'Olivier, je veux comprendre pourquoi un contenu a un score faible pour améliorer mes futurs contenus
Spécifications Techniques:

Critères de scoring:
Hook Strength (1-10): Analyse premiers 10 mots du transcript
Évalue: question provocante, stat choc, hot take, pattern interrupt
Clarity (1-10): Message clair et actionnable?
Évalue: structure, focus, takeaways concrets
Has CTA (boolean): Appel à l'action présent?
Recherche: "visit", "link in bio", "DM me", "join", "register", etc.
Score composite: (Hook + Clarity) / 2, bonus +0.5 si CTA présent
Classification:
Premium: 7-10 (priorité publication)
Good: 5-7 (utilisable)
Needs work: <5 (éditer ou archiver)
Prompt IA (testé en prototype):

Score ce contenu vidéo selon Hook Strength, Clarity, et CTA.
[Prompt complet dans prototypes/google-ai-studio/prompts/scoring.txt]
UI Display:

Score total: Étoiles colorées (1-10)
Breakdown: Mini-bars pour Hook/Clarity
CTA badge: Checkmark vert ou X rouge
Reasoning: Expandable tooltip
Acceptance Criteria:

 Correlation >80% avec jugement humain (test sur 30 contenus)
 Scoring complété en <5 secondes
 Scores sauvegardés et triables dans Library
 Re-scoring possible (si contenu édité)
 Export score data en CSV pour analytics
4.4 FEATURE: Multi-Platform Caption Generator (Priorité: P0 - Critical)
Description:
Génération automatique de captions optimisées pour chaque plateforme (Instagram, TikTok, LinkedIn, YouTube, Facebook).

User Stories:

En tant qu'assistante, je clique "Generate Captions" et obtiens 5 versions adaptées en 30 secondes
En tant qu'Olivier, je veux que les captions matchent ma voix de marque (direct, no BS, data-driven)
En tant qu'assistante, je veux copier-coller directement sans édition majeure
Spécifications Techniques:

Plateformes supportées:

Instagram:
Longueur: 1500-2000 caractères
Structure: Hook (1 ligne) + Body (3-4 bullets) + CTA + Hashtags (5-8)
Ton: Direct, actionnable, emojis modérés
TikTok:
Longueur: 150 caractères (caption courte)
Structure: Hook question + CTA ultra-court
Ton: Casual, urgent, jeune
LinkedIn:
Longueur: 1200-1500 caractères
Structure: Insight professionnel + 2-3 takeaways + Question finale
Ton: Professionnel mais conversationnel, pas de hashtags
YouTube (Shorts):
Titre: 60 caractères max, SEO-optimized
Description: 200 caractères + hashtags
Facebook:
Similaire Instagram mais longueur max 1000 caractères
Workflow Génération:

User sélectionne contenu dans Library
Click "Generate Captions" button
Modal s'ouvre avec 5 tabs (une par plateforme)
Génération simultanée via API (parallel processing)
Preview + édition inline si nécessaire
"Copy" button par plateforme
Option "Save to Publishing Queue" pour scheduling
Brand Voice Guidelines (encodées dans prompts):

Direct, pas de fluff
Données concrètes et chiffres quand disponibles
Frameworks actionnables
CTA clairs et spécifiques
Ton: field-tested, opérateur, no BS
Vocabulaire: sales, systems, operators, scaling, discipline
Acceptance Criteria:

 Génération complète (5 plateformes) en <30 secondes
 Brand voice match >85% (validation sur 20 exemples)
 Longueur respectée pour chaque plateforme
 Édition inline fonctionnelle
 Copy to clipboard en 1 click
 Re-génération possible (bouton "Regenerate")
4.5 FEATURE: Ideas Bank Generator (Priorité: P1 - High)
Description:
Extraction automatique d'idées de contenu depuis les transcripts d'appels clients/coaching d'Olivier.

User Stories:

En tant qu'Olivier, après un call client, je veux que le système extraie 10 idées de contenu potentielles
En tant qu'Olivier, je veux prioriser les idées par impact potentiel
En tant qu'assistante, je veux transformer une idée en contenu planifié en 1 click
Spécifications Techniques:

Input: Transcript d'appel (upload manuel OU auto depuis Zoom/Google Meet si intégration)
Processing IA: Analyse transcript → Extrait insights clés → Génère idées formatées
Output par idée:
Titre accrocheur (5-8 mots)
Pilier suggéré
Hook line (première phrase)
Plateforme recommandée
Reasoning (pourquoi cette idée a du potentiel)
Priority score (1-10)
UI Ideas Bank:

Liste d'idées triables par priority score
Filtres: Pilier, Platform, Used/Unused
Actions par idée:
"Add to Queue" → Crée draft dans Publishing Calendar
"Mark as Used"
"Dismiss"
Search dans idées existantes
Workflow:

Upload transcript (ou sélection depuis Content Library si déjà transcrit)
Click "Generate Ideas"
IA process (~10-15 secondes)
10 idées affichées, triées par priority
Review + sélection des meilleures
Add to Publishing Queue pour création éventuelle
Acceptance Criteria:

 10 idées générées en <15 secondes
 >70% des idées jugées "actionables" par Olivier
 Priority scoring corrélé avec jugement humain (>75%)
 Intégration fluide vers Publishing Queue
 Historique des idées searchable
4.6 FEATURE: Publishing Calendar (Priorité: P1 - High)
Description:
Vue calendrier pour planifier et visualiser les publications cross-platform.

User Stories:

En tant qu'assistante, je veux voir visuellement quels contenus sont planifiés cette semaine
En tant qu'Olivier, je veux drag-and-drop pour réorganiser le calendrier facilement
En tant qu'assistante, je veux filtrer par plateforme pour voir uniquement mes posts Instagram
Spécifications Techniques:

Vues disponibles:
Month view (vue globale)
Week view (détaillée, par défaut)
Day view (ultra-détaillée)
Éléments affichés par slot:
Thumbnail contenu
Plateforme (icon badge)
Titre court
Status (Scheduled/Posted)
Heure planifiée
Interactions:
Drag-and-drop entre dates/heures
Click → Modal détails (preview caption, edit, reschedule, delete)
Add content button → Sélection depuis Library
Filtres:
Plateforme (IG, TikTok, LinkedIn, etc.)
Status (Scheduled, Posted, All)
Pilier
Workflow Scheduling:

Depuis Content Library OU Ideas Bank
Click "Schedule" button
Modal calendrier s'ouvre
Sélection date/heure + plateforme(s)
Preview caption générée
Confirm → Ajouté au calendrier
Notification confirmation
Acceptance Criteria:

 Drag-and-drop fluide sans lag
 Calendar charge <1 seconde (30 jours de données)
 Mobile responsive avec touch gestures
 Filtres temps réel (<200ms)
 Bulk scheduling (select multiple contenus)
4.7 FEATURE: Google Drive Integration (Priorité: P0 - Critical)
Description:
Synchronisation automatique avec la structure Google Drive existante d'Olivier.

User Stories:

En tant qu'assistante, quand j'uploade une vidéo dans Google Drive, elle apparaît automatiquement dans Content OS
En tant qu'Olivier, je veux que le système respecte ma structure de dossiers existante
En tant qu'assistante, je veux voir le statut de sync en temps réel
Spécifications Techniques:

Structure Drive à respecter:

00_RAW_CONTENT/
  ├── 00_INBOX_DROP/        → Auto-import prioritaire
  ├── 01_SW_Content/        → Tag "Student Works"
  ├── 02_SEPARATION_SUNDAY/ → Tag "Separation Sunday"
  ├── 03_LIFE/              → Tag "Lifestyle"
  ├── 04_Testimonials/      → Tag "Testimonials"
  ├── 05_Pictures/          → Import images
  ├── 06_PODCASTS/          → Tag "Podcast"
  ├── 07_Public_Speaking/   → Tag "Speaking"
  └── 08_Retreats/          → Tag "Retreats"
Sync Logic:

Trigger: Webhook Google Drive (nouveau fichier détecté)
Action:
Fetch file metadata (nom, path, taille, date)
Déterminer folder source → Tag approprié
Créer record dans Content OS database
Si vidéo: Queue pour transcription
Trigger auto-categorization
Notification user "New content added"
Settings Panel:

Google Drive account connection (OAuth)
Folder mapping configuration
Sync frequency (real-time via webhook OU scheduled)
Exclude patterns (ignore certain file types)
Manual Sync:

"Sync Now" button pour forcer refresh
Progress bar avec count (X/Y files processed)
Error log si fichiers problématiques
Acceptance Criteria:

 Webhook setup fonctionnel (nouveau fichier détecté en <60 secondes)
 Metadata sync accurate (100% des champs)
 Folder tags assignés correctement (>95%)
 Manual sync complète 200 files en <5 minutes
 Error handling robuste (fichiers corrompus, permissions, etc.)
 Connection persiste après redémarrage système
4.8 FEATURE: Dashboard Overview (Priorité: P1 - High)
Description:
Page d'accueil avec métriques clés et actions rapides.

User Stories:

En tant qu'Olivier, au login, je veux voir immédiatement l'état de ma production de contenu
En tant qu'assistante, je veux voir combien de contenus sont "Ready to Post" aujourd'hui
En tant qu'Olivier, je veux suivre ma distribution de contenu par pilier
Widgets Dashboard:

Stats Overview (4 cards):
Total contenus dans système
Ready to Post (ce mois)
Published (ce mois)
Avg. Score (trending up/down)
Content by Pillar (Pie Chart):
Distribution % par pilier
Click slice → Filter library
Publishing Queue (List):
5 prochains contenus schedulés
Date/heure + plateforme
Quick action: "Post Now" / "Reschedule"
Recent Activity (Timeline):
10 dernières actions
"New content added: [titre]"
"Captions generated for [titre]"
"Published on Instagram: [titre]"
Quick Actions (Buttons):
"Sync Google Drive"
"Generate Ideas from Transcript"
"View Premium Content (>7)"
"Upload New Content"
Acceptance Criteria:

 Dashboard charge <1.5 secondes
 Stats update en temps réel (WebSocket OU polling 30s)
 Responsive design (desktop + mobile)
 Quick actions fonctionnelles (1 click)
 Charts interactive (hover tooltips, click filters)
5. ARCHITECTURE TECHNIQUE
5.1 Stack Technique
Frontend:

Framework: React 18 + Vite
Styling: TailwindCSS
State Management: Zustand (simple, performant)
Routing: React Router v6
UI Components: Headless UI + custom components
Charts: Recharts
Calendar: React Big Calendar
HTTP Client: Axios
Backend:

Framework: FastAPI (Python 3.11+)
ORM: SQLAlchemy
Migrations: Alembic
Authentication: JWT tokens
Background Jobs: Celery (optionnel) OU simple async tasks
Validation: Pydantic models
Database:

Primary: PostgreSQL 15 (via Supabase free tier)
Schema: Voir section 5.2
Intégrations:

IA: OpenAI API (GPT-4 Turbo)
Transcription: Whisper API (OpenAI)
Storage: Google Drive API
Authentication externe: Google OAuth 2.0
Infrastructure:

Backend Hosting: Railway.app OU Render.com (free tier)
Frontend Hosting: Vercel (gratuit)
Database: Supabase (PostgreSQL managed, free tier)
CDN: Vercel Edge Network (automatique)
5.2 Database Schema
sql
-- Users (authentification)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    full_name VARCHAR(255),
    role VARCHAR(50), -- admin, editor
    created_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP
);

-- Content Items (cœur du système)
CREATE TABLE content_items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500),
    description TEXT,
    
    -- Drive metadata
    drive_file_id VARCHAR(255) UNIQUE,
    file_path TEXT,
    file_size BIGINT,
    mime_type VARCHAR(100),
    
    -- Classification
    pillar VARCHAR(100), -- Sales, Leadership, Systems, etc.
    platform_source VARCHAR(50), -- Instagram, TikTok, etc.
    content_type VARCHAR(50), -- video, image, audio
    folder_tag VARCHAR(100), -- SW_Content, Separation_Sunday, etc.
    
    -- AI Processing
    raw_transcript TEXT,
    transcript_language VARCHAR(10),
    
    -- Scoring
    hook_score INTEGER, -- 1-10
    clarity_score INTEGER, -- 1-10
    has_cta BOOLEAN,
    composite_score DECIMAL(3,1),
    score_reasoning TEXT,
    
    -- Status
    status VARCHAR(50), -- draft, ready, published, archived
    processing_status VARCHAR(50), -- pending, processing, completed, failed
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by INTEGER REFERENCES users(id)
);

-- Publishing Queue
CREATE TABLE publishing_queue (
    id SERIAL PRIMARY KEY,
    content_id INTEGER REFERENCES content_items(id) ON DELETE CASCADE,
    
    platform VARCHAR(50) NOT NULL,
    scheduled_date TIMESTAMP,
    scheduled_time TIME,
    
    caption TEXT,
    caption_generated_at TIMESTAMP,
    
    status VARCHAR(50), -- scheduled, posted, failed, cancelled
    posted_at TIMESTAMP,
    post_url TEXT,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Ideas Bank
CREATE TABLE ideas_bank (
    id SERIAL PRIMARY KEY,
    
    source_content_id INTEGER REFERENCES content_items(id),
    source_transcript TEXT,
    
    title VARCHAR(500),
    suggested_pillar VARCHAR(100),
    hook_line TEXT,
    platform_recommended VARCHAR(50),
    reasoning TEXT,
    priority_score INTEGER, -- 1-10
    
    used BOOLEAN DEFAULT FALSE,
    used_in_content_id INTEGER REFERENCES content_items(id),
    
    created_at TIMESTAMP DEFAULT NOW()
);

-- Platform Templates (pour caption generation)
CREATE TABLE platform_templates (
    id SERIAL PRIMARY KEY,
    platform VARCHAR(50) UNIQUE NOT NULL,
    template_text TEXT,
    variables JSONB,
    max_length INTEGER,
    instructions TEXT,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Activity Log
CREATE TABLE activity_log (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action_type VARCHAR(100), -- content_added, caption_generated, etc.
    entity_type VARCHAR(50), -- content_item, publishing_queue, etc.
    entity_id INTEGER,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes pour performance
CREATE INDEX idx_content_pillar ON content_items(pillar);
CREATE INDEX idx_content_status ON content_items(status);
CREATE INDEX idx_content_score ON content_items(composite_score);
CREATE INDEX idx_content_created ON content_items(created_at);
CREATE INDEX idx_publishing_scheduled ON publishing_queue(scheduled_date);
CREATE INDEX idx_publishing_platform ON publishing_queue(platform);
CREATE INDEX idx_ideas_priority ON ideas_bank(priority_score);
5.3 API Endpoints Structure
Authentication:
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

Content Management:
GET    /api/content-items              # List avec filters
GET    /api/content-items/:id          # Détails
POST   /api/content-items              # Create manuel
PUT    /api/content-items/:id          # Update
DELETE /api/content-items/:id          # Delete
GET    /api/content-items/stats        # Pour dashboard

Google Drive:
POST   /api/drive/connect              # OAuth flow
GET    /api/drive/status               # Connection status
POST   /api/drive/sync                 # Trigger manual sync
GET    /api/drive/sync-history         # Logs

AI Processing:
POST   /api/ai/categorize/:id          # Auto-categorize
POST   /api/ai/score/:id               # Score content
POST   /api/ai/generate-captions/:id   # Multi-platform captions
POST   /api/ai/generate-ideas          # From transcript upload
POST   /api/ai/transcribe/:id          # Transcription vidéo

Publishing:
GET    /api/publishing-queue           # List scheduled
POST   /api/publishing-queue           # Schedule content
PUT    /api/publishing-queue/:id       # Update schedule
DELETE /api/publishing-queue/:id       # Cancel
POST   /api/publishing-queue/:id/post  # Manual post trigger

Ideas:
GET    /api/ideas-bank                 # List ideas
POST   /api/ideas-bank                 # Create idea
PUT    /api/ideas-bank/:id             # Update
DELETE /api/ideas-bank/:id             # Delete
POST   /api/ideas-bank/:id/use         # Mark as used

Dashboard:
GET    /api/dashboard/overview         # Stats overview
GET    /api/dashboard/recent-activity  # Activity feed
GET    /api/dashboard/quick-stats      # Real-time stats
5.4 IA Prompts Architecture
Fichier: backend/app/ai/prompts.py

Structure:

python
# Base system context
SYSTEM_CONTEXT = """
Tu es un système IA spécialisé dans la gestion de contenu pour un coach business.
Brand: Olivier Grenon - Service business growth coach.
Voice: Direct, no BS, data-driven, field-tested frameworks.
Pillars: Sales • Leadership • Systems • Discipline • Community
"""

# Prompts par fonction
CATEGORIZATION_PROMPT = f"{SYSTEM_CONTEXT}\\n[Prompt testé]"
SCORING_PROMPT = f"{SYSTEM_CONTEXT}\\n[Prompt testé]"
CAPTION_TEMPLATES = {
    "instagram": f"{SYSTEM_CONTEXT}\\n[Template IG]",
    "tiktok": f"{SYSTEM_CONTEXT}\\n[Template TikTok]",
    "linkedin": f"{SYSTEM_CONTEXT}\\n[Template LinkedIn]",
    # etc.
}
IDEAS_EXTRACTION_PROMPT = f"{SYSTEM_CONTEXT}\\n[Prompt extraction]"
Gestion des prompts:

Versionnés dans Git
Testés en prototyping phase avant intégration
Modifiables via settings UI (stretch goal)
Logs de performance (accuracy, temps response)
6. CONTRAINTES & LIMITATIONS
6.1 Contraintes Techniques
Budget: $0 infrastructure (free tiers uniquement)
API Costs: OpenAI <$50 pour développement, clé client pour prod
Timeline: 3 semaines dev (18 jours ouvrables)
Équipe: 2 développeurs juniors (Kael 17 ans, Xavier 16 ans)
Performance: Doit fonctionner sur connexion moyenne (pas de fibre requise)
6.2 Limitations v1
Pas de posting automatique: Génération captions seulement, posting manuel
Scaling limité: 200 contenus max pour migration initiale (pas 20k)
Single tenant: Système pour Olivier uniquement (pas multi-client)
Transcription limites: Budget Whisper API OU local processing
Mobile app: Web responsive uniquement, pas d'app native
Offline mode: Requiert connexion internet
6.3 Dépendances Externes
Google Drive API (rate limits: 1000 req/100sec)
OpenAI API (rate limits: 10k tokens/min sur free tier)
Whisper API (25MB max file size)
Supabase free tier (500MB storage, 2GB bandwidth/mois)
7. CRITÈRES D'ACCEPTATION GLOBAUX
7.1 Fonctionnels
 100% des features P0 implémentées et fonctionnelles
 80%+ des features P1 implémentées
 Workflow complet testable: Upload → Categorize → Score → Generate Captions → Schedule
 Migration 100 premiers contenus complétée avec succès
 Accuracy IA >85% sur test set de 30 contenus
7.2 Non-Fonctionnels
 Interface responsive (desktop + mobile)
 Performance: Page load <2s, API calls <500ms
 Disponibilité: Uptime >95% (post-déploiement)
 Security: Authentification fonctionnelle, données protégées
 Usabilité: Olivier + assistante peuvent utiliser sans documentation après 1h de formation
7.3 Livrables
 Application déployée en production (URLs fournies)
 Documentation utilisateur (PDF 5 pages)
 Vidéo tutoriel (5 min screencast)
 Session de formation complétée (2h)
 Code source versionnné sur GitHub (privé)
 Credentials + accès transférés à Olivier
8. ROADMAP & PHASES
Phase 1: MVP Core (Semaine 1-3) - EN COURS
Objectif: Système fonctionnel basique
Features: P0 + 50% P1
Status: In Development

Phase 2: Optimization (Post-livraison) - POTENTIEL PAYANT
Objectif: Performance + Scale
Features:

Migration complète 20k contenus
Thumbnail auto-generation
Analytics dashboard avancé
Auto-posting intégrations (Buffer, Hootsuite) Timeline: 2-4 semaines
Pricing: À définir
Phase 3: Enterprise (Long-terme) - POTENTIEL PAYANT
Objectif: Multi-tenant SaaS
Features:

Multi-client support
Team collaboration
Advanced permissions
White-label
API publique Timeline: 2-3 mois
Pricing: À définir
9. RISQUES & MITIGATION
Risque	Probabilité	Impact	Mitigation
Scope creep d'Olivier	Élevé	Élevé	Accord écrit signé, communication ferme sur v1 vs v2
Dépassement timeline	Moyen	Élevé	Daily standups, cut features non-critiques si retard
OpenAI API costs	Moyen	Moyen	Utiliser clé client, monitoring usage quotidien
Accuracy IA insuffisante	Faible	Élevé	Phase prototyping extensive (4 jours), iteration sur prompts
Google Drive rate limits	Faible	Moyen	Batch processing, exponential backoff, queue system
Manque d'expérience équipe	Moyen	Moyen	Skills modulaires, utiliser frameworks connus, support communauté
Bugs critiques en prod	Moyen	Élevé	Testing systématique, error logging (Sentry), rollback plan
10. DÉFINITION OF DONE
Un feature est "Done" quand:

✅ Code implémenté et testé localement
✅ Merged dans branch dev
✅ Testé par l'autre membre de l'équipe
✅ Responsive design vérifié (desktop + mobile)
✅ Error handling implémenté
✅ Déployé en production sans erreurs
✅ Documenté (si complexe)
Le projet est "Done" quand:

✅ Tous critères d'acceptation globaux validés
✅ Olivier + assistante formés et autonomes
✅ Migration 100 contenus complétée
✅ Témoignage vidéo obtenu
✅ Système en production stable 7 jours
✅ Handoff complet (credentials, docs, code)
Version Control: v1.0
Approuvé par: Kael Belceus, Xavier Tardif
Date: 5 Mars 2026

Prochaine étape: MVP Task Breakdown

