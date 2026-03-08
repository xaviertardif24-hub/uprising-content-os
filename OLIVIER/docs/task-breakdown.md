#MVP TASK BREAKDOWN - CONTENT OS
Répartition Complète Kael / Xavier - 3 Semaines
Période: 5 Mars - 25 Mars 2026 (18 jours ouvrables)
Équipe: Kael (Backend 70%) + Xavier (Frontend 70%)
Heures estimées: 120h total (60h chacun)

LÉGENDE
Priorités:

🔴 P0 - Critical (Must Have)
🟡 P1 - High (Should Have)
🟢 P2 - Nice to Have (Could Have)
Status:

⬜ Not Started
🟦 In Progress
✅ Done
❌ Blocked
Estimation:

XS = 1-2h
S = 2-4h
M = 4-8h
L = 8-12h
XL = 12-16h
SEMAINE 1: FOUNDATION & PROTOTYPING
Objectif: Infrastructure + Prompts IA testés + Première démo

JOUR 1: SETUP & PROTOTYPING START (8h)
🔴 KAEL - Backend Setup (4h)
Task	Priority	Est.	Status
Créer repo GitHub "uprising-content-os"	🔴 P0	XS	⬜
Setup structure de dossiers (backend/, frontend/, docs/, prototypes/)	🔴 P0	XS	⬜
Initialiser projet FastAPI avec structure de base	🔴 P0	S	⬜
Setup Supabase PostgreSQL database	🔴 P0	S	⬜
Créer premier schema migration (users table)	🔴 P0	S	⬜
Configurer environment variables (.env template)	🔴 P0	XS	⬜
Livrables Jour 1 Kael:

✅ Repo GitHub accessible à Xavier
✅ Backend FastAPI qui démarre sans erreur
✅ Database Supabase connectée
✅ README.md avec instructions setup
🔴 XAVIER - Frontend Setup (4h)
Task	Priority	Est.	Status
Clone repo GitHub	🔴 P0	XS	⬜
Initialiser projet React + Vite	🔴 P0	S	⬜
Setup TailwindCSS configuration	🔴 P0	S	⬜
Créer structure routing (React Router)	🔴 P0	S	⬜
Design system de base (couleurs, fonts, composants utilitaires)	🔴 P0	M	⬜
Créer page Login simple	🔴 P0	S	⬜
Livrables Jour 1 Xavier:

✅ Frontend React qui démarre sans erreur
✅ TailwindCSS fonctionnel
✅ Routing de base (/login, /dashboard, /library)
✅ Design tokens définis (couleurs, spacing)
JOUR 2: PROTOTYPING IA + AUTH (8h)
🔴 KAEL & XAVIER - Prototyping IA Ensemble (4h matin)
Task	Priority	Est.	Status	Owner
Setup Google AI Studio project	🔴 P0	XS	⬜	Les deux
Obtenir 10 exemples transcripts d'Olivier	🔴 P0	XS	⬜	Les deux
Tester prompt categorization (itération)	🔴 P0	M	⬜	Les deux
Tester prompt scoring (itération)	🔴 P0	S	⬜	Les deux
Documenter résultats dans prototypes/test-results/	🔴 P0	XS	⬜	Les deux
Livrables Matin Jour 2:

✅ Prompt categorization avec >85% accuracy
✅ Prompt scoring testé sur 5 exemples
✅ Fichiers prompts sauvegardés dans repo
🔴 KAEL - Authentication Backend (4h après-midi)
Task	Priority	Est.	Status
Implémenter JWT authentication	🔴 P0	M	⬜
Endpoints: /auth/login, /auth/logout, /auth/me	🔴 P0	S	⬜
Password hashing (bcrypt)	🔴 P0	XS	⬜
Créer premier user admin dans DB	🔴 P0	XS	⬜
Tester auth avec Postman/Thunder Client	🔴 P0	S	⬜
🔴 XAVIER - Auth Frontend (4h après-midi)
Task	Priority	Est.	Status
Créer Auth Context (React Context API)	🔴 P0	S	⬜
Form Login fonctionnel avec validation	🔴 P0	S	⬜
Intégration API /auth/login	🔴 P0	S	⬜
Protected routes (redirect si non-logged)	🔴 P0	S	⬜
Logout button + clear token	🔴 P0	XS	⬜
Livrables Jour 2:

✅ Authentification backend + frontend fonctionnelle
✅ Login flow complet testable
JOUR 3: DATABASE + GOOGLE AI STUDIO (8h)
🔴 KAEL - Database Schema (6h)
Task	Priority	Est.	Status
Migration: content_items table	🔴 P0	S	⬜
Migration: publishing_queue table	🔴 P0	S	⬜
Migration: ideas_bank table	🔴 P0	S	⬜
Migration: platform_templates table	🔴 P0	S	⬜
Créer indexes pour performance	🔴 P0	S	⬜
Seeds: insérer 5 contenus test manuellement	🔴 P0	S	⬜
Endpoints CRUD content_items (GET, POST, PUT, DELETE)	🔴 P0	M	⬜
🔴 XAVIER - Prototyping IA Captions (6h)
Task	Priority	Est.	Status
Tester prompt caption Instagram	🔴 P0	S	⬜
Tester prompt caption TikTok	🔴 P0	S	⬜
Tester prompt caption LinkedIn	🔴 P0	S	⬜
Tester prompt caption YouTube	🟡 P1	S	⬜
Itérer jusqu'à brand voice match >85%	🔴 P0	M	⬜
Documenter templates finaux	🔴 P0	XS	⬜
Livrables Jour 3:

✅ Database schema complet avec migrations
✅ API endpoints content_items fonctionnels
✅ Prompts captions testés et documentés
JOUR 4: INTEGRATION IA + CONTENT LIBRARY START (8h)
🔴 KAEL - OpenAI Integration (6h)
Task	Priority	Est.	Status
Setup OpenAI API client	🔴 P0	S	⬜
Créer fichier prompts.py avec prompts testés	🔴 P0	S	⬜
Fonction categorize_content(transcript) → pilier	🔴 P0	M	⬜
Fonction score_content(transcript) → scores	🔴 P0	M	⬜
Endpoint POST /ai/categorize/:id	🔴 P0	S	⬜
Endpoint POST /ai/score/:id	🔴 P0	S	⬜
Tester avec contenus seeds	🔴 P0	S	⬜
🔴 XAVIER - Content Library UI (6h)
Task	Priority	Est.	Status
Page /library avec layout de base	🔴 P0	S	⬜
Component ContentCard (thumbnail, titre, pilier, score)	🔴 P0	M	⬜
Grid view responsive	🔴 P0	S	⬜
Fetch API GET /content-items	🔴 P0	S	⬜
Loading states + error handling	🔴 P0	S	⬜
Empty state ("No content yet")	🔴 P0	XS	⬜
Livrables Jour 4:

✅ IA categorization + scoring fonctionnels
✅ Content Library affiche contenus test
JOUR 5-7: GOOGLE DRIVE + FILTERS + DÉMO 1 (24h)
🔴 KAEL - Google Drive Integration (12h sur 3 jours)
Jour 5 (4h):

Task	Priority	Est.	Status
Setup Google Drive API credentials	🔴 P0	S	⬜
OAuth flow pour connexion Drive	🔴 P0	M	⬜
Endpoint POST /drive/connect	🔴 P0	S	⬜
Jour 6 (4h):

Task	Priority	Est.	Status
Script list_files() pour scanner dossier Drive	🔴 P0	M	⬜
Mapping folder path → tag (SW_Content, etc.)	🔴 P0	S	⬜
Fonction import_metadata() vers DB	🔴 P0	M	⬜
Jour 7 (4h):

Task	Priority	Est.	Status
Endpoint POST /drive/sync (manual sync)	🔴 P0	S	⬜
Webhook setup (optionnel si temps)	🟡 P1	M	⬜
Tester import 10 fichiers réels d'Olivier	🔴 P0	S	⬜
🔴 XAVIER - Filters + Search + Démo Polish (12h sur 3 jours)
Jour 5 (4h):

Task	Priority	Est.	Status
Filters sidebar (Pilier, Status, Score)	🔴 P0	M	⬜
Search bar avec API call	🔴 P0	S	⬜
State management filters (Zustand setup)	🔴 P0	S	⬜
Jour 6 (4h):

Task	Priority	Est.	Status
Sort options (Date, Score, Alphabétique)	🔴 P0	S	⬜
Pagination (50 items/page)	🟡 P1	M	⬜
View toggle (Grid / List)	🟢 P2	S	⬜
Jour 7 (4h):

Task	Priority	Est.	Status
Polish UI/UX Content Library	🔴 P0	M	⬜
Dashboard page placeholder avec stats mocké	🔴 P0	S	⬜
Préparer démo visuelle pour Olivier	🔴 P0	S	⬜
🎯 CHECKPOINT SEMAINE 1 (Fin Jour 7):

✅ Auth fonctionnel
✅ Content Library avec filters
✅ IA categorization + scoring
✅ Google Drive import metadata
✅ Démo visuelle présentable à Olivier
✅ Git tag: v0.1-week1-demo
SEMAINE 2: INTELLIGENCE LAYER
Objectif: Caption generation + Ideas Bank + Calendar

JOUR 8-9: CAPTION GENERATION (16h)
🔴 KAEL - Caption Generator Backend (8h)
Jour 8 (4h):

Task	Priority	Est.	Status
Fonction generate_caption(content, platform)	🔴 P0	M	⬜
Templates par plateforme (Instagram, TikTok, LinkedIn)	🔴 P0	S	⬜
Endpoint POST /ai/generate-captions/:id	🔴 P0	S	⬜
Jour 9 (4h):

Task	Priority	Est.	Status
Batch generation (5 plateformes en parallèle)	🔴 P0	M	⬜
Storage captions en DB (publishing_queue?)	🔴 P0	S	⬜
Endpoint GET /captions/:content_id	🔴 P0	XS	⬜
Error handling IA (retry, fallback)	🔴 P0	S	⬜
🔴 XAVIER - Caption Generator UI (8h)
Jour 8 (4h):

Task	Priority	Est.	Status
Modal "Generate Captions" avec tabs par plateforme	🔴 P0	M	⬜
Trigger depuis Content Library (button par item)	🔴 P0	S	⬜
Loading state pendant génération	🔴 P0	XS	⬜
Jour 9 (4h):

Task	Priority	Est.	Status
Affichage captions générées (5 tabs)	🔴 P0	M	⬜
Copy to clipboard button par caption	🔴 P0	S	⬜
Édition inline (textarea editable)	🟡 P1	S	⬜
Button "Regenerate" pour re-call IA	🟡 P1	S	⬜
JOUR 10-11: IDEAS BANK + TRANSCRIPTION (16h)
🔴 KAEL - Transcription + Ideas Extraction (8h)
Jour 10 (4h):

Task	Priority	Est.	Status
Setup Whisper API (OpenAI)	🔴 P0	S	⬜
Fonction transcribe_video(file_path)	🔴 P0	M	⬜
Endpoint POST /ai/transcribe/:id	🔴 P0	S	⬜
Auto-trigger transcription pour nouveaux uploads	🔴 P0	S	⬜
Jour 11 (4h):

Task	Priority	Est.	Status
Fonction generate_ideas(transcript) → 10 idées	🔴 P0	M	⬜
Endpoint POST /ai/generate-ideas (body: transcript)	🔴 P0	S	⬜
CRUD ideas_bank table	🔴 P0	S	⬜
Endpoint GET /ideas-bank avec filters	🔴 P0	S	⬜
🔴 XAVIER - Ideas Bank UI (8h)
Jour 10 (4h):

Task	Priority	Est.	Status
Page /ideas avec layout	🔴 P0	S	⬜
Upload transcript form (textarea OU file)	🔴 P0	M	⬜
Trigger "Generate Ideas" button	🔴 P0	S	⬜
Loading + progress indicator	🔴 P0	S	⬜
Jour 11 (4h):

Task	Priority	Est.	Status
List view des idées générées	🔴 P0	M	⬜
Filters: Pilier, Platform, Used/Unused	🟡 P1	S	⬜
Actions: "Add to Queue", "Mark Used", "Dismiss"	🔴 P0	S	⬜
Search dans ideas existantes	🟡 P1	S	⬜
JOUR 12-14: PUBLISHING CALENDAR (24h)
🔴 KAEL - Calendar Backend (8h sur 3 jours)
Jour 12 (4h):

Task	Priority	Est.	Status
CRUD publishing_queue endpoints complets	🔴 P0	M	⬜
Endpoint GET /publishing-queue?start_date&end_date	🔴 P0	S	⬜
Fonction schedule_content(content_id, date, platform)	🔴 P0	S	⬜
Jour 13 (2h):

Task	Priority	Est.	Status
Endpoint PUT /publishing-queue/:id (reschedule)	🔴 P0	S	⬜
Endpoint DELETE /publishing-queue/:id (cancel)	🔴 P0	XS	⬜
Jour 14 (2h):

Task	Priority	Est.	Status
Validation: pas de double-booking même slot	🟡 P1	S	⬜
Notifications (optionnel, simple email?)	🟢 P2	M	⬜
🔴 XAVIER - Calendar UI (16h sur 3 jours)
Jour 12 (6h):

Task	Priority	Est.	Status
Installer React Big Calendar	🔴 P0	XS	⬜
Page /calendar avec calendar view	🔴 P0	M	⬜
Fetch scheduled content depuis API	🔴 P0	S	⬜
Display events sur calendrier	🔴 P0	M	⬜
Jour 13 (6h):

Task	Priority	Est.	Status
Click event → Modal détails (preview, edit, delete)	🔴 P0	M	⬜
Drag-and-drop pour reschedule	🟡 P1	M	⬜
View toggles: Month / Week / Day	🟡 P1	S	⬜
Jour 14 (4h):

Task	Priority	Est.	Status
Filters: Platform, Status	🔴 P0	S	⬜
"Schedule" button depuis Content Library	🔴 P0	M	⬜
Modal scheduling avec date/time picker	🔴 P0	M	⬜
🎯 CHECKPOINT SEMAINE 2 (Fin Jour 14):

✅ Caption generation multi-platform
✅ Ideas Bank fonctionnel
✅ Publishing Calendar avec scheduling
✅ Transcription automatique
✅ Git tag: v0.2-week2-mvp
SEMAINE 3: POLISH & DEPLOYMENT
Objectif: Dashboard + Migration + Testing + Déploiement

JOUR 15-16: DASHBOARD + BULK IMPORT (16h)
🔴 KAEL - Bulk Import Script (8h)
Jour 15 (4h):

Task	Priority	Est.	Status
Script Python standalone bulk_import.py	🔴 P0	M	⬜
Scan Google Drive structure complète	🔴 P0	M	⬜
Limite: 100-200 premiers contenus	🔴 P0	XS	⬜
Jour 16 (4h):

Task	Priority	Est.	Status
Progress tracking (X/Y imported)	🔴 P0	S	⬜
Error handling robuste (skip corrupted files)	🔴 P0	M	⬜
Logging détaillé (import_log.txt)	🔴 P0	S	⬜
Tester import réel avec Drive d'Olivier	🔴 P0	M	⬜
🔴 XAVIER - Dashboard + Stats (8h)
Jour 15 (4h):

Task	Priority	Est.	Status
Page /dashboard layout	🔴 P0	S	⬜
4 stat cards (Total, Ready, Published, Avg Score)	🔴 P0	M	⬜
Pie chart Content by Pillar (Recharts)	🔴 P0	M	⬜
Jour 16 (4h):

Task	Priority	Est.	Status
Publishing Queue widget (5 prochains)	🔴 P0	M	⬜
Recent Activity timeline (10 derniers)	🟡 P1	M	⬜
Quick Actions buttons	🔴 P0	S	⬜
API endpoints pour stats dashboard	🔴 P0	S	⬜
JOUR 17-18: UI POLISH + DOCUMENTATION (16h)
🔴 KAEL - Backend Polish + Docs (8h)
Jour 17 (4h):

Task	Priority	Est.	Status
Error logging setup (Sentry free tier OU logs)	🔴 P0	S	⬜
Rate limiting API endpoints	🟡 P1	S	⬜
Health check endpoint /health	🔴 P0	XS	⬜
Optimize slow queries (indexes)	🟡 P1	M	⬜
Jour 18 (4h):

Task	Priority	Est.	Status
README backend avec setup instructions	🔴 P0	M	⬜
API documentation (Swagger auto-generated)	🟡 P1	S	⬜
Environment variables documentation	🔴 P0	S	⬜
🔴 XAVIER - UI Polish + User Docs (8h)
Jour 17 (4h):

Task	Priority	Est.	Status
Design pass complet (spacing, colors, consistency)	🔴 P0	M	⬜
Mobile responsive check toutes pages	🔴 P0	M	⬜
Loading states partout	🔴 P0	S	⬜
Error messages user-friendly	🔴 P0	S	⬜
Jour 18 (4h):

Task	Priority	Est.	Status
User Guide PDF (5 pages)	🔴 P0	M	⬜
Screenshot guide + annotations	🔴 P0	M	⬜
Tooltips inline pour features clés	🟡 P1	S	⬜
JOUR 19: DEPLOYMENT (8h)
🔴 KAEL - Backend Deployment (4h)
Task	Priority	Est.	Status
Setup Railway.app OU Render.com account	🔴 P0	XS	⬜
Deploy backend avec env variables	🔴 P0	M	⬜
Database migrations en prod	🔴 P0	S	⬜
Test endpoints production	🔴 P0	S	⬜
SSL certificate setup	🔴 P0	XS	⬜
🔴 XAVIER - Frontend Deployment (4h)
Task	Priority	Est.	Status
Update API URLs vers backend prod	🔴 P0	XS	⬜
Deploy frontend sur Vercel	🔴 P0	S	⬜
Test production complète	🔴 P0	M	⬜
Custom domain setup (si Olivier fournit)	🟡 P1	S	⬜
JOUR 20-21: TESTING + TRAINING + HANDOFF (16h)
🔴 LES DEUX - Testing Final (Jour 20 - 4h ensemble)
Task	Priority	Est.	Status
Test workflow complet end-to-end	🔴 P0	M	⬜
Test bulk import avec 100 contenus réels	🔴 P0	M	⬜
Fix bugs critiques trouvés	🔴 P0	M	⬜
Performance testing (load 200 items)	🟡 P1	S	⬜
🔴 LES DEUX - Formation Olivier (Jour 21 - 2h)
Task	Priority	Est.	Status
Préparer présentation démo	🔴 P0	S	⬜
Session Zoom avec Olivier + assistante	🔴 P0	2h	⬜
Live walkthrough toutes features	🔴 P0	-	⬜
Q&A	🔴 P0	-	⬜
OBTENIR TÉMOIGNAGE VIDÉO	🔴 P0	-	⬜
🔴 KAEL - Handoff Technique (Jour 21 - 2h)
Task	Priority	Est.	Status
Transfer credentials (DB, APIs, deployment)	🔴 P0	S	⬜
Documentation maintenance basique	🔴 P0	S	⬜
Setup monitoring alerts	🟡 P1	S	⬜
🔴 XAVIER - Handoff UI (Jour 21 - 2h)
Task	Priority	Est.	Status
Video tutorial screencast (5 min)	🔴 P0	M	⬜
Quick Start checklist PDF	🔴 P0	S	⬜
Email récap avec tous les liens	🔴 P0	XS	⬜
🎯 FINAL CHECKPOINT (Fin Jour 21):

✅ Application déployée en production
✅ 100 contenus importés
✅ Formation complétée
✅ Documentation livrée
✅ Témoignage obtenu
✅ Git tag: v1.0-delivery
DAILY STANDUP FORMAT
Chaque matin 9h (15 min max):

Kael:

✅ Hier: [ce que j'ai complété]
🎯 Aujourd'hui: [ce que je vais faire]
🚧 Blocages: [si bloqué sur quelque chose]
Xavier:

✅ Hier: [ce que j'ai complété]
🎯 Aujourd'hui: [ce que je vais faire]
🚧 Blocages: [si bloqué sur quelque chose]
Sync rapide:

Décisions à prendre ensemble?
Conflits Git potentiels?
Points critiques à aligner?
PROGRESSION TRACKING
Semaine 1 Progress (7 jours)
 Jour 1: Setup complet
 Jour 2: Auth + Prototyping IA
 Jour 3: Database + Prompts captions
 Jour 4: IA Integration + Library UI
 Jour 5: Drive API + Filters
 Jour 6: Drive Sync + Search
 Jour 7: Démo 1 prête
Objectif Semaine 1: 35-40% du MVP

Semaine 2 Progress (7 jours)
 Jour 8: Caption Generator backend
 Jour 9: Caption Generator UI
 Jour 10: Transcription + Ideas backend
 Jour 11: Ideas Bank UI
 Jour 12: Calendar backend
 Jour 13: Calendar UI
 Jour 14: Calendar polish
Objectif Semaine 2: 75-80% du MVP

Semaine 3 Progress (4 jours)
 Jour 15: Dashboard + Import script
 Jour 16: Stats + Import test
 Jour 17: UI Polish + Docs
 Jour 18: More Polish + Deployment prep
 Jour 19: Deployment
 Jour 20: Testing final
 Jour 21: Training + Handoff
Objectif Semaine 3: 100% MVP livré

RISK MITIGATION CHECKPOINTS
Si retard détecté Jour 10:

Cut features P2 (Nice to Have)
Simplifier UI (moins de polish)
Skip pagination, view toggles
Si retard détecté Jour 15:

Cut Ideas Bank (move to Phase 2)
Simplifier Dashboard (stats basiques seulement)
Focus: Library + Caption Gen + Calendar minimum
Absolute Must-Haves pour livraison:

✅ Auth
✅ Content Library avec search/filter
✅ IA Categorization + Scoring
✅ Caption Generation (IG + LinkedIn minimum)
✅ Publishing Calendar basique
✅ Google Drive sync metadata
COMMUNICATION PROTOCOL
GitHub:

Commit minimum 2x/jour
Push à la fin de chaque journée
Merge dans dev chaque soir
Messages:

Questions bloquantes: WhatsApp/Discord immédiat
Updates: Slack/texte fin de journée
Decisions majeures: Call 15 min
Code Review:

Optionnel si rush
Mandatory pour features critiques (Auth, IA, Payment si applicable)
TOTAL ESTIMÉ:

Kael: ~60h sur 3 semaines
Xavier: ~60h sur 3 semaines
Total équipe: 120h
BUFFER TIME: 10-15h (pour bugs imprévus, itérations, polish)

Version: 1.0
Créé: 5 Mars 2026
Owners: Kael Belceus (Backend Lead) + Xavier Tardif (Frontend Lead)

