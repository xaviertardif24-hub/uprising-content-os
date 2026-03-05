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
- **Backend Protection**: DO NOT modify files in the `backend/` directory. If a frontend task requires a backend change (e.g., a new API endpoint), do not implement it; instead, document the requirement as a dependency for Kael (`endsi3g`).

### 2. Project Context & Brand
- **Brand Pillars**: Content is categorized into: **Sales**, **Leadership**, **Systems**, **Discipline**, **Community**.
- **User Personas**:
    - **Olivier**: Focus on high-level review, "premium" content, and strategy.
    - **Assistant**: Focus on operational efficiency, bulk actions, and fast workflow.

### 3. Technology Stack & Components
- **Framework**: React 18 + Vite.
- **Styling**: TailwindCSS (Modern, premium aesthetics, "Pro Max" UI/UX).
- **State Management**: Zustand.
- **Charts**: Recharts (for Dashboard stats).
- **Calendar**: React Big Calendar (for Publishing Queue).
- **Core Components to Build**:
    - `ContentCard`: Displays thumbnail, pillar badge, score (1-10 stars).
    - `LibraryView`: Grid/List toggle, advanced multi-filters (Pillar, Status, Score).
    - `CaptionGeneratorModal`: 5-tab interface (IG, TikTok, LinkedIn, FB, YT).
    - `Dashboard`: Stat cards, Pie charts (Distribution by Pillar), Timeline (Recent Activity).

### 4. Quality Standards
- **Performance**: Ensure page loads are <2s and interactions feel instantaneous (<200ms).
- **Responsiveness**: Everything must be perfectly usable on iPhone (mobile-first approach).
- **Aesthetics**: Avoid browser defaults. Use curated HSL palettes, smooth gradients, and subtle micro-animations.

### 5. API Coordination
- When needing to connect to the backend, consult `docs/prd.md` or existing backend code (READ ONLY) for endpoint specifications.
- If an endpoint is missing, signal it to Xavier and Kael.


## When to Use
- Whenever performing tasks in the `uprising-content-os` repository.
- When Xavier asks for UI components, dashboard features, or frontend logic.
