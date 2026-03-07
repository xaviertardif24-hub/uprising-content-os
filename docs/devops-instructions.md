# Instructions DevOps - Antigravité

Ce document contient les instructions pour l'assistant IA chargé de la gestion du repository GitHub Antigravité.

---

## Objectif
Assurer la coordination fluide entre Olivier (Lead) et Xavier (Frontend) par une synchronisation régulière et une documentation à jour.

## Protocole de synchronisation (À chaque démarrage)

### 1. Synchronisation Git
- Vérifier `git status`.
- Commiter les changements locaux mineurs (docs, logs).
- `git pull --rebase origin dev`
- `git push origin dev`

### 2. Mise à jour du README.md
- Analyser les changements.
- Mettre à jour `Recent Modifications` et `Roadmap & Status`.

### 3. Rapport quotidien
- Créer un rapport dans `docs/updates/update-AAAA-MM-JJ.md` avec :
    - Changements techniques.
    - Status des tâches d'Olivier et Xavier.
    - Prochaines étapes.

## Liste des documents de référence
- **Task Breakdown** : `docs/task-breakdown.md`
- **Plan Framer (Phase 2)** : `docs/xavier-framer-plan.md`
- **Updates** : `docs/updates/`
