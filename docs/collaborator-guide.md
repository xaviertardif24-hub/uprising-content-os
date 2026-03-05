# Collaborator & Development Guide

Welcome to the `uprising-content-os` project. This guide outlines the workflow and standards for all contributors.

## Repository Structure

- `docs/`: Project documentation (PRD, Task Breakdown, etc.)
- `prototypes/`: AI prompt engineering and test results.
- `backend/`: FastAPI + Python logic.
- `frontend/`: React + Vite + Tailwind dashboard.

## Branch Strategy

- `main`: Production-ready code.
- `dev`: Active development and integration branch.
- `feature/[name]`: Individual feature development.

### Workflow
1. Pull the latest `dev` branch.
2. Create a new `feature/` branch.
3. Commit often using standard commit prefixes (`feat:`, `fix:`, `docs:`, `refactor:`).
4. Push to GitHub frequently.
5. Create a Pull Request (PR) to merge into `dev`.

## AI Agent Guidelines

For AI assistants working on this project:
- **Scope Restriction**: The AI is currently tasked with assisting **Xavier Tardif** on **Frontend** tasks. 
- **Code Access**: AI should primarily focus on the `frontend/` directory.
- **Backend Protection**: Do not modify `backend/` logic unless explicitly requested and coordinated with Kael Belceus.

## Setting Up Locally

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```
