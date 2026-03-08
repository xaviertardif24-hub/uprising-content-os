#PLAN GITHUB + WORKFLOW ÉQUIPE
Phase 1: Setup Initial (Jour 1 - 2h)
Repository Structure:
uprising-content-os/
├── README.md
├── .gitignore
├── docs/
│   ├── architecture.md
│   ├── api-spec.md
│   └── ai-prompts.md
├── prototypes/
│   ├── google-ai-studio/
│   │   ├── prompts/
│   │   │   ├── categorization.txt
│   │   │   ├── scoring.txt
│   │   │   ├── caption-generation.txt
│   │   │   └── ideas-extraction.txt
│   │   └── test-results/
│   │       ├── test-transcript-1.md
│   │       └── results-log.md
├── backend/
│   ├── app/
│   ├── tests/
│   ├── requirements.txt
│   └── README.md
└── frontend/
    ├── src/
    ├── public/
    ├── package.json
    └── README.md

Kael crée le repo:
# Sur GitHub
1. Créer repo "uprising-content-os" (privé)
2. Ajouter Xavier comme collaborateur
3. Créer branches de base

# Localement
git clone https://github.com/uprising-studio/uprising-content-os.git
cd uprising-content-os


WORKFLOW GIT SIMPLIFIÉ (2 PERSONNES)
Stratégie de Branches
Main branches:
main - Production ready (déployé)
dev - Development (testing)
Feature branches:
feature/kael-[nom] - Kael travaille ici
feature/xavier-[nom] - Xavier travaille ici
Workflow Quotidien
Matin (start of work):
# 1. Pull latest changes
git checkout dev
git pull origin dev

# 2. Créer ta feature branch
git checkout -b feature/kael-google-drive-api
# OU
git checkout -b feature/xavier-content-library-ui

Pendant le travail:
# Commit souvent (toutes les 30-60 min)
git add .
git commit -m "feat: add Google Drive file listing"

# Push régulièrement vers GitHub
git push origin feature/kael-google-drive-api

Fin de journée (merge):
# 1. S'assurer que tout est commité
git status

# 2. Pull dev au cas où l'autre a mergé
git checkout dev
git pull origin dev

# 3. Merger ta feature dans dev
git checkout feature/kael-google-drive-api
git merge dev  # Résoudre conflicts si nécessaire
git checkout dev
git merge feature/kael-google-drive-api

# 4. Push dev
git push origin dev

# 5. Supprimer feature branch (optionnel)
git branch -d feature/kael-google-drive-api

Convention de Commits
Format:
type: description courte

[optionnel] body plus détaillé

Types:
feat: - Nouvelle feature
fix: - Bug fix
refactor: - Refactoring code
docs: - Documentation
test: - Tests
style: - Formatting, pas de changement code
Exemples:
feat: add content categorization endpoint
fix: Google Drive sync timeout error
refactor: optimize AI prompt for speed
docs: update API documentation


PHASE PROTOTYPAGE GOOGLE AI STUDIO
Objectif Phase Prototype (Jours 1-4)
Tester et perfectionner tous les prompts IA avant de coder. Économise du temps de dev.
Workflow Prototype
Jour 1-2: Setup & Test Categorization (8h)
Les deux ensemble:
Google AI Studio setup:


Aller sur aistudio.google.com
Créer nouveau projet "Content OS Prompts"
Obtenir exemples de contenu d'Olivier:


Demander 10 transcripts variés (coaching, lifestyle, sales, etc.)
Sauvegarder dans prototypes/google-ai-studio/test-results/
Tester prompt categorization:


prototypes/google-ai-studio/prompts/categorization.txt:

---
SYSTÈME: Tu es un système de catégorisation de contenu pour un coach business.

PILIERS DISPONIBLES:
- Sales (vente, closing, prospection, négociation)
- Leadership (gestion équipe, culture, décisions)
- Systems (processus, automatisation, scaling)
- Discipline (mindset, routines, accountability)
- Community (Separation Sunday, events, culture)

TÂCHE: Analyse ce transcript et retourne UNIQUEMENT le nom du pilier principal.

TRANSCRIPT:
{transcript_here}

OUTPUT FORMAT:
Pilier: [nom]
Confiance: [1-10]
Raison: [1 phrase]
---

Itérer sur Google AI Studio:
Tester avec 10 transcripts différents
Noter accuracy dans test-results/results-log.md
Ajuster prompt jusqu'à 90%+ accuracy
Sauvegarder version finale
Jour 2-3: Scoring System (6h)
prototypes/google-ai-studio/prompts/scoring.txt:

---
SYSTÈME: Tu scores du contenu vidéo selon 3 critères.

CRITÈRES:
1. Hook Strength (1-10): Premiers 10 mots captivent-ils?
2. Clarity (1-10): Message clair et actionnable?
3. Has CTA (oui/non): Appel à l'action présent?

TRANSCRIPT:
{transcript_here}

OUTPUT FORMAT (JSON):
{
  "hook_score": 8,
  "clarity_score": 7,
  "has_cta": true,
  "composite_score": 7.5,
  "reasoning": "Hook fort avec question provocante. Message clair sur X. CTA direct vers Y."
}
---

Tester → Itérer → Sauvegarder
Jour 3-4: Multi-Platform Captions (8h)
prototypes/google-ai-studio/prompts/caption-instagram.txt:

---
SYSTÈME: Génère des captions Instagram optimisées pour un coach business.

BRAND VOICE:
- Direct, pas de fluff
- Données concrètes et chiffres
- Frameworks actionnables
- Call-out à l'action précis
- Ton: field-tested, opérateur, no BS

CONTENU SOURCE:
{transcript_here}

STRUCTURE CAPTION:
1. Hook (question OU stat choc OU hot take) - 1 ligne
2. Body (3-4 bullet points avec takeaways concrets)
3. CTA clair (appel à action spécifique)
4. 5-8 hashtags pertinents

EXEMPLE OUTPUT:
[voir exemple dans prompt]

GÉNÈRE:
---

Répéter pour TikTok, LinkedIn, YouTube.
Jour 4: Ideas Extraction (4h)
prototypes/google-ai-studio/prompts/ideas-extraction.txt:

---
SYSTÈME: Extrait 10 idées de contenu depuis un transcript de call client.

TRANSCRIPT CALL:
{transcript_here}

Pour chaque idée extraite, fournis:
1. Titre accrocheur (5-8 mots)
2. Pilier (Sales/Leadership/Systems/Discipline/Community)
3. Hook line (première phrase captivante)
4. Platform recommandée (IG/TikTok/LinkedIn/YouTube)
5. Pourquoi cette idée (1 phrase)

OUTPUT FORMAT (JSON array):
[
  {
    "title": "...",
    "pillar": "...",
    "hook": "...",
    "platform": "...",
    "reasoning": "..."
  }
]
---

Documentation Phase Prototype
Créer dans prototypes/google-ai-studio/test-results/results-log.md:
# Prototype Testing Log

## Categorization Prompt
- **Version**: v3
- **Tests**: 10 transcripts
- **Accuracy**: 9/10 (90%)
- **Échecs**: 1 confusion Sales/Leadership sur contenu mixte
- **Status**: ✅ PRÊT POUR PROD

## Scoring Prompt
- **Version**: v2
- **Tests**: 10 transcripts
- **Correlation avec jugement humain**: 85%
- **Notes**: Tend à scorer clarity +1 point trop haut
- **Status**: ✅ PRÊT POUR PROD

## Caption Generation - Instagram
- **Version**: v4
- **Tests**: 5 transcripts
- **Brand voice match**: 8/10
- **Notes**: Parfois trop long (>2000 chars)
- **Status**: ⚠️ AJUSTER longueur max

[etc...]


PASSAGE PROTOTYPE → CODE
Jour 5: Migration des Prompts
Kael crée fichier backend:
# backend/app/ai/prompts.py

CATEGORIZATION_PROMPT = """
SYSTÈME: Tu es un système de catégorisation de contenu pour un coach business.
[... copier prompt testé ...]
"""

SCORING_PROMPT = """
[... copier prompt testé ...]
"""

CAPTION_TEMPLATES = {
    "instagram": """[... copier prompt testé ...]""",
    "tiktok": """[...]""",
    "linkedin": """[...]""",
}

IDEAS_EXTRACTION_PROMPT = """
[...]
"""

Version contrôle:
git checkout dev
git checkout -b feature/kael-ai-prompts
git add backend/app/ai/prompts.py
git commit -m "feat: add tested AI prompts from prototype phase"
git push origin feature/kael-ai-prompts


COLLABORATION QUOTIDIENNE
Daily Standup (15 min chaque matin)
Format rapide:
Kael: "Hier j'ai fait X, aujourd'hui je fais Y, bloqué sur Z"
Xavier: Pareil
Sync sur: conflicts potentiels, décisions à prendre
Outils:
Standup: Discord/WhatsApp call
Code review: GitHub Pull Requests (optionnel si rush)
Questions rapides: Messages
Éviter les Merge Conflicts
Règle simple:
Kael touche PAS au dossier frontend/
Xavier touche PAS au dossier backend/
Si besoin de toucher les deux: coordination avant
Si conflict arrive:
# Voir les fichiers en conflict
git status

# Ouvrir fichier, chercher:
<<<<<<< HEAD
ton code
=======
code de l'autre
>>>>>>> branch-name

# Garder la bonne version, supprimer markers
# Puis:
git add fichier-resolu.py
git commit -m "fix: resolve merge conflict in fichier-resolu"


CHECKPOINT GITHUB (Fin Semaine 1, 2, 3)
Fin Semaine 1:
git checkout dev
git tag v0.1-prototype-tested
git push origin v0.1-prototype-tested

Fin Semaine 2:
git tag v0.2-mvp-core
git push origin v0.2-mvp-core

Fin Semaine 3:
git checkout main
git merge dev
git tag v1.0-delivery
git push origin main --tags


RÉSUMÉ WORKFLOW
Phase Prototype (Jours 1-4):
Tous les prompts testés sur Google AI Studio
Résultats documentés dans prototypes/
Commits réguliers des prompts + test results
Branch: feature/prototype-ai-prompts
Phase Dev (Jours 5-21):
Kael: backend features → branch feature/kael-[nom]
Xavier: frontend features → branch feature/xavier-[nom]
Merge dans dev fin de chaque jour
Test ensemble sur dev branch
Deploy main seulement quand stable
Outils de suivi:
GitHub Issues pour tracker tasks (optionnel mais utile)
GitHub Projects board (Kanban simple) si vous voulez
README.md mis à jour avec setup instructions


