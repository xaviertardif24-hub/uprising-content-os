# Dependency & External Systems Guide

This document lists all technical dependencies and suggested external tools to enhance the Content OS ecosystem.

## Core Project Dependencies

### Frontend (`frontend/`)
| Dependency | Purpose |
| :--- | :--- |
| **Vite + React** | Modern build tool and UI library. |
| **Zustand** | Lightweight and performant state management. |
| **React Router** | Client-side routing for the dashboard. |
| **TailwindCSS** | Utility-first CSS for "Pro Max" aesthetics. |
| **Axios** | Robust HTTP client for API communication. |
| **Recharts** | Interactive charts for the Dashboard. |
| **React Big Calendar** | Full-featured calendar for content scheduling. |
| **Lucide React** | Premium icon set for consistent UI. |
| **Headless UI** | Accessible, unstyled UI components. |

### Backend (`backend/`)
| Dependency | Purpose |
| :--- | :--- |
| **FastAPI** | High-performance asynchronous web framework. |
| **SQLAlchemy** | SQL Toolkit and Object Relational Mapper. |
| **Alembic** | Database migration database tool. |
| **Pydantic** | Data validation and settings management. |
| **OpenAI SDK** | Integration with GPT-4 (scoring/categorization) and Whisper (transcription). |
| **Psycopg2** | PostgreSQL adapter for Python. |
| **JWT (python-jose)** | Secure token-based authentication. |

## External Enhancements (Recommended)

### 1. Automation & Integration
- **[Make.com](https://www.make.com/)**: Connect Google Drive, social media platforms, and Content OS for fully automated content flows.
- **[Zapier](https://zapier.com/)**: Alternative for simple task automation.

### 2. AI & Audio
- **[ElevenLabs](https://elevenlabs.io/)**: World-class AI voice cloning. Can be used to create personalized audio versions of Olivier's content.

### 3. Monitoring & Reliability
- **[Sentry](https://sentry.io/)**: Error monitoring and performance tracking. Essential for production stability.
- **[Better Stack](https://betterstack.com/)**: Uptime monitoring and log management.

### 4. Communication
- **[Resend](https://resend.com/)**: Modern transactional email service to notify Olivier or his assistant about new content/schedules.
