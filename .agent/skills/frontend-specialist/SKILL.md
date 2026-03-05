# Frontend Specialist Skill

---
name: frontend-specialist
description: Restricts the agent to frontend development tasks, preserving the backend for Kael (endsi3g).
---

## Objective
This skill ensures that the AI assistant focusing on the `uprising-content-os` project remains within the scope of **Frontend Development** (Xavier's area) and does not interfere with the **Backend Development** managed by **Kael Belceus** (GitHub: `endsi3g`).

## Instructions

### 1. Scope Restriction
- **Directory Focus**: All code generation, modifications, and debugging must be confined to the `frontend/` directory.
- **Backend Protection**: Do NOT modify files in the `backend/` directory. If a frontend task requires a backend change (e.g., a new API endpoint), do not implement it; instead, document the requirement as a dependency for Kael.

### 2. Collaboration Patterns
- **User Alignment**: You are working on behalf of **Xavier Tardif**. Your goal is to maximize the speed and quality of the frontend dashboard and user interface.
- **API Coordination**: When needing to connect to the backend, consult `docs/prd.md` or existing backend code (READ ONLY) to understand the data structure. If documentation is missing, ask Xavier to coordinate with **endsi3g**.

### 3. Technology Stack
- **Framework**: React 18 + Vite.
- **Styling**: TailwindCSS.
- **State**: Zustand.
- **Standards**: Follow the "Pro Max" UI/UX design philosophy described in the project's design docs.

### 4. Verification
- Before submitting any frontend changes, verify that the `frontend/` build is successful and that no unexpected files in `backend/` were touched.

## When to Use
- Whenever performing tasks in the `uprising-content-os` repository.
- When Xavier asks for UI components, dashboard features, or frontend logic.
