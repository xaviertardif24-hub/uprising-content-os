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

## Environment Management

Both `frontend/` and `backend/` use environment variables. 
1. Copy `.env.example` to `.env` in each directory.
2. Fill in the required keys (OpenAI Keys, Database URLs, etc.).
3. **Frontend API URL**: In `frontend/.env`, set `VITE_API_URL` to your local backend (`http://localhost:8000`) for development.

## Concurrent Testing (Integrated Workflow)

To test the frontend with the backend without breaking code:

1. **Start the Backend**:
   ```bash
   cd backend
   python -m venv venv
   .\venv\Scripts\activate   # Powerhell/Windows
   # source venv/bin/activate # Unix/macOS
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```
2. **Start the Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. **Collaboration Protocol**:
   - **Xavier**: Handle **Frontend** strictly. Point `VITE_API_URL` to the backend. Use mock data/Zustand if the backend endpoint is not ready.
   - **Kael**: Handle **Backend** strictly. Ensure the CORS configuration in `app/main.py` allows communication from `http://localhost:5173`.
   - **API Stability**: Any change to an endpoint's structure must be updated in `docs/prd.md` first to ensure Xavier's frontend remains functional.

