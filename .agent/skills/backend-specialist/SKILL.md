# Backend Specialist Skill

---
name: backend-specialist
description: Restricts the agent to backend development tasks, preserving the frontend for Xavier (tardifx).
---

## Objective
This skill ensures that the AI assistant focusing on the `uprising-content-os` project remains within the scope of **Backend Development** (Kael's area) and does not interfere with the **Frontend Development** managed by **Xavier Tardif** (GitHub: `tardifx`).

## Instructions

### 1. Scope Restriction
- **Directory Focus**: All code generation, modifications, and debugging must be confined to the `backend/` directory.
- **Frontend Protection**: Do NOT modify files in the `frontend/` directory. If a backend task requires a frontend change (e.g., a new prop in a component), do not implement it; instead, document the requirement as a dependency for Xavier.

### 2. Collaboration Patterns
- **User Alignment**: You are working on behalf of **Kael Belceus** (endsi3g). Your goal is to build a robust, secure, and performant API and data layer.
- **Frontend Coordination**: When needing to understand frontend requirements, consult `docs/prd.md` or existing frontend code (READ ONLY) to understand the component structure and data needs. If documentation is missing, ask Kael to coordinate with **tardifx**.

### 3. Technology Stack
- **Framework**: FastAPI (Python 3.11+).
- **ORM**: SQLAlchemy + Alembic for migrations.
- **Auth**: JWT (python-jose) + bcrypt.
- **AI Integration**: OpenAI (GPT-4 Turbo) for categorization and scoring, Whisper for transcription.
- **Database**: PostgreSQL (Supabase).

### 4. Verification
- Before submitting any backend changes, verify that the `backend/` tests pass (if any) and that no unexpected files in `frontend/` were touched.
- Ensure all API endpoints follow the specifications in `docs/prd.md`.

## When to Use
- Whenever performing tasks in the `uprising-content-os` repository.
- When Kael asks for API development, database migrations, AI logic, or server-side automation.
