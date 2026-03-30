# SYSTEM_AUDIT.md

## 1. Project Overview
The "Antigravity" ecosystem, primarily known as **Content OS**, is a content management and AI automation suite designed for Olivier Grenon. It aims to organize thousands of videos, automate content categorization/scoring, and generate cross-platform captions.

## 2. Components Discovery

### A. Sophie (AI Receptionist)
- **Status**: Identified as "Assistant Royal AI" in the codebase.
- **Backend**: `OLIVIER/backend` (Python/FastAPI).
- **Core Logic**: `OLIVIER/backend/app/services/chat_service.py` (Powered by Gemini 2.5 Flash).
- **Frontend Integration**: `OLIVIER/framer_integration_script.js` (Chat widget for Framer).
- **Missing Elements**: Twilio (Call management) and ElevenLabs (Voice) logic have not been localized in the current repository. They may be handled via external platforms (n8n, Vapi, etc.) with webhooks not yet discovered.

### B. CRM (Content OS Dashboard)
- **Status**: Localized within the the `OLIVIER` and `UPRISING-STUDIO` clusters. 
- **Models**: `content_items`, `ideas_bank`, `publishing_queue` (defined in `OLIVIER/docs/architecture.md`).
- **Backend**: `UPRISING-STUDIO/chatbot-platform/apps/backend` (Express/Prisma) seems to be a related/newer version of the platform.
- **Frontend**: `OLIVIER/frontend/frontend` (React/Vite).

### C. Web Chatbot
- **Status**: Localized.
- **Widget**: `OLIVIER/framer_integration_script.js`.
- **Backend**: Shares the same backend as Sophie (`OLIVIER/backend`).

### D. Main Website
- **Status**: Identified.
- **Platform**: Built with **Framer**.
- **Integration**: Uses custom scripts (`framer_integration_script.js`) to embed the AI assistant.

## 3. Repository Structure & Inventory

| Directory | Role | Tech Stack |
| :--- | :--- | :--- |
| `OLIVIER/backend` | AI & Content Logic | Python, FastAPI, Gemini |
| `OLIVIER/frontend` | Content OS Dashboard | React, Vite, Tailwind |
| `UPRISING-STUDIO/chatbot-platform` | Chatbot & CRM Platform | Node.js, Express, Prisma, Next.js |
| `ETERA` | Documentation & Mapping | Markdown |
| `AETHERA` | Automation for Framer | (Empty/Placeholder) |

## 4. Dependencies & Interactions
- **AI Engine**: Gemini 2.5 Flash (via `OLIVIER/backend`).
- **Database**: PostgreSQL/Supabase (as per docs).
- **Website <-> Backend**: Framer site calls `OLIVIER/backend/api/v1/chat`.
- **CRM <-> AI**: Backend services perform categorization and scoring using prompts.

## 5. Observations
- The cluster `OLIVIER` contains the "MVP" logic.
- `UPRISING-STUDIO/chatbot-platform` seems to be a more modular version of the chatbot system.
- Discrepancy between PRD (OpenAI/Whisper) and implementation (Gemini).
- "Sophie" name is colloquial and not found as a hardcoded string in the code.
