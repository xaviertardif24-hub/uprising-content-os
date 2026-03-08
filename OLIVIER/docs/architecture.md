# BACKEND ARCHITECTURE & IMPLEMENTATION PLAN
## Content OS - Complete Backend Build Guide

**Version:** 1.0  
**Date:** 5 Mars 2026  
**Owner:** Kael Belceus (Backend Lead)  
**Tech Stack:** Python 3.11+ | FastAPI | PostgreSQL | Supabase

---

## TABLE OF CONTENTS

1. [System Architecture Overview](#1-system-architecture-overview)
2. [Database Design](#2-database-design)
3. [API Architecture](#3-api-architecture)
4. [User Flows](#4-user-flows)
5. [External Integrations](#5-external-integrations)
6. [Background Processing](#6-background-processing)
7. [Security & Authentication](#7-security--authentication)
8. [Error Handling & Logging](#8-error-handling--logging)
9. [File Structure](#9-file-structure)
10. [Implementation Roadmap](#10-implementation-roadmap)
11. [Testing Strategy](#11-testing-strategy)
12. [Deployment](#12-deployment)

---

## 1. SYSTEM ARCHITECTURE OVERVIEW

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                      │
│                    Hosted on Vercel                          │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTPS/JSON
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                   FASTAPI BACKEND                            │
│                 Railway/Render.com                           │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │   Auth     │  │   Content  │  │  AI/ML     │            │
│  │  Service   │  │  Service   │  │  Service   │            │
│  └────────────┘  └────────────┘  └────────────┘            │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │   Drive    │  │ Publishing │  │   Ideas    │            │
│  │  Service   │  │  Service   │  │  Service   │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└─────────────────────┬──────────────┬────────────────────────┘
                      │              │
                      ▼              ▼
        ┌──────────────────┐  ┌──────────────────┐
        │   PostgreSQL     │  │  External APIs   │
        │   (Supabase)     │  │  - OpenAI        │
        │                  │  │  - Google Drive  │
        └──────────────────┘  │  - Whisper       │
                              └──────────────────┘
```

### 1.2 Core Components

**1. API Layer (FastAPI)**
- RESTful endpoints
- Request validation (Pydantic)
- Automatic OpenAPI docs
- CORS configuration
- Rate limiting

**2. Service Layer**
- Business logic separation
- Reusable components
- Transaction management
- Error handling

**3. Data Layer**
- SQLAlchemy ORM
- Database migrations (Alembic)
- Connection pooling
- Query optimization

**4. Integration Layer**
- External API clients
- Webhook handlers
- Background job queue
- File processing

### 1.3 Technology Choices

| Component | Technology | Why |
|-----------|-----------|-----|
| Framework | FastAPI | Modern, async, automatic docs, fast |
| Database | PostgreSQL 15 | Reliable, JSONB support, free tier (Supabase) |
| ORM | SQLAlchemy 2.0 | Mature, powerful, async support |
| Migrations | Alembic | Standard for SQLAlchemy |
| Validation | Pydantic V2 | Built into FastAPI, type-safe |
| Auth | JWT + bcrypt | Stateless, secure, standard |
| Background Jobs | FastAPI BackgroundTasks | Simple, built-in (or Celery if needed) |
| Testing | Pytest | Standard Python testing |
| Deployment | Railway/Render | Free tier, easy setup |

---

## 2. DATABASE DESIGN

### 2.1 Complete Schema with Relations

```sql
-- ============================================================================
-- USERS & AUTHENTICATION
-- ============================================================================

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'editor', -- admin, editor
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active);

-- ============================================================================
-- CONTENT MANAGEMENT
-- ============================================================================

CREATE TABLE content_items (
    id SERIAL PRIMARY KEY,
    
    -- Basic Info
    title VARCHAR(500),
    description TEXT,
    
    -- Google Drive Metadata
    drive_file_id VARCHAR(255) UNIQUE,
    file_path TEXT,
    file_name VARCHAR(500),
    file_size BIGINT,
    mime_type VARCHAR(100),
    drive_thumbnail_url TEXT,
    
    -- Classification
    pillar VARCHAR(100), -- Sales, Leadership, Systems, Discipline, Community
    platform_source VARCHAR(50), -- Instagram, TikTok, YouTube, etc.
    content_type VARCHAR(50), -- video, image, audio, document
    folder_tag VARCHAR(100), -- SW_Content, Separation_Sunday, LIFE, etc.
    
    -- AI Processing
    raw_transcript TEXT,
    transcript_language VARCHAR(10) DEFAULT 'fr',
    transcript_word_count INTEGER,
    
    -- AI Scoring
    hook_score INTEGER CHECK (hook_score >= 1 AND hook_score <= 10),
    clarity_score INTEGER CHECK (clarity_score >= 1 AND clarity_score <= 10),
    has_cta BOOLEAN DEFAULT FALSE,
    composite_score DECIMAL(3,1),
    score_reasoning TEXT,
    
    -- AI Categorization
    ai_pillar_confidence INTEGER CHECK (ai_pillar_confidence >= 1 AND ai_pillar_confidence <= 10),
    ai_categorization_reasoning TEXT,
    pillar_overridden BOOLEAN DEFAULT FALSE, -- User manually changed pillar
    original_ai_pillar VARCHAR(100), -- Track original AI suggestion
    
    -- Status & Processing
    status VARCHAR(50) DEFAULT 'draft', -- draft, ready, published, archived
    processing_status VARCHAR(50) DEFAULT 'pending', -- pending, processing, completed, failed
    processing_error TEXT,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    
    -- Soft Delete
    deleted_at TIMESTAMP,
    deleted_by INTEGER REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes for Performance
CREATE INDEX idx_content_pillar ON content_items(pillar) WHERE deleted_at IS NULL;
CREATE INDEX idx_content_status ON content_items(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_content_score ON content_items(composite_score DESC) WHERE deleted_at IS NULL;
CREATE INDEX idx_content_created ON content_items(created_at DESC);
CREATE INDEX idx_content_drive_id ON content_items(drive_file_id);
CREATE INDEX idx_content_processing ON content_items(processing_status) WHERE processing_status != 'completed';
CREATE INDEX idx_content_folder_tag ON content_items(folder_tag) WHERE deleted_at IS NULL;

-- Full-text search on title and transcript
CREATE INDEX idx_content_search ON content_items USING GIN(to_tsvector('french', COALESCE(title, '') || ' ' || COALESCE(raw_transcript, '')));

-- ============================================================================
-- PUBLISHING QUEUE
-- ============================================================================

CREATE TABLE publishing_queue (
    id SERIAL PRIMARY KEY,
    content_id INTEGER NOT NULL REFERENCES content_items(id) ON DELETE CASCADE,
    
    -- Platform & Scheduling
    platform VARCHAR(50) NOT NULL, -- instagram, tiktok, linkedin, youtube, facebook
    scheduled_date DATE NOT NULL,
    scheduled_time TIME,
    timezone VARCHAR(50) DEFAULT 'America/Montreal',
    
    -- Caption & Content
    caption TEXT,
    caption_generated_at TIMESTAMP,
    caption_edited BOOLEAN DEFAULT FALSE, -- User modified generated caption
    hashtags TEXT[], -- Array of hashtags
    
    -- Media
    thumbnail_url TEXT,
    video_url TEXT,
    
    -- Status
    status VARCHAR(50) DEFAULT 'scheduled', -- scheduled, posted, failed, cancelled
    posted_at TIMESTAMP,
    post_url TEXT,
    post_id VARCHAR(255), -- Platform-specific post ID
    
    -- Error Handling
    failure_reason TEXT,
    retry_count INTEGER DEFAULT 0,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX idx_publishing_scheduled ON publishing_queue(scheduled_date, scheduled_time) WHERE status = 'scheduled';
CREATE INDEX idx_publishing_platform ON publishing_queue(platform);
CREATE INDEX idx_publishing_status ON publishing_queue(status);
CREATE INDEX idx_publishing_content ON publishing_queue(content_id);
CREATE UNIQUE INDEX idx_publishing_unique ON publishing_queue(content_id, platform, scheduled_date) WHERE status != 'cancelled';

-- ============================================================================
-- IDEAS BANK
-- ============================================================================

CREATE TABLE ideas_bank (
    id SERIAL PRIMARY KEY,
    
    -- Source
    source_content_id INTEGER REFERENCES content_items(id) ON DELETE SET NULL,
    source_transcript TEXT,
    source_type VARCHAR(50), -- call, video, manual
    
    -- Idea Details
    title VARCHAR(500) NOT NULL,
    description TEXT,
    suggested_pillar VARCHAR(100),
    hook_line TEXT,
    platform_recommended VARCHAR(50),
    reasoning TEXT,
    priority_score INTEGER CHECK (priority_score >= 1 AND priority_score <= 10),
    
    -- Usage
    used BOOLEAN DEFAULT FALSE,
    used_at TIMESTAMP,
    used_in_content_id INTEGER REFERENCES content_items(id) ON DELETE SET NULL,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    
    -- Soft Delete
    deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_ideas_priority ON ideas_bank(priority_score DESC) WHERE NOT used AND deleted_at IS NULL;
CREATE INDEX idx_ideas_pillar ON ideas_bank(suggested_pillar) WHERE deleted_at IS NULL;
CREATE INDEX idx_ideas_used ON ideas_bank(used);
CREATE INDEX idx_ideas_source ON ideas_bank(source_content_id);

-- ============================================================================
-- PLATFORM TEMPLATES (For Caption Generation)
-- ============================================================================

CREATE TABLE platform_templates (
    id SERIAL PRIMARY KEY,
    platform VARCHAR(50) UNIQUE NOT NULL,
    template_name VARCHAR(255),
    template_text TEXT NOT NULL,
    system_prompt TEXT, -- AI system instructions specific to platform
    variables JSONB, -- Dynamic variables like {hook}, {cta}, etc.
    max_length INTEGER,
    formatting_rules TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Seed data for templates
INSERT INTO platform_templates (platform, template_name, max_length) VALUES
('instagram', 'Instagram Caption Template', 2200),
('tiktok', 'TikTok Caption Template', 150),
('linkedin', 'LinkedIn Post Template', 3000),
('youtube', 'YouTube Description Template', 5000),
('facebook', 'Facebook Post Template', 63206);

-- ============================================================================
-- ACTIVITY LOG (Audit Trail)
-- ============================================================================

CREATE TABLE activity_log (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    action_type VARCHAR(100) NOT NULL, -- content_added, caption_generated, etc.
    entity_type VARCHAR(50) NOT NULL, -- content_item, publishing_queue, etc.
    entity_id INTEGER,
    description TEXT,
    metadata JSONB, -- Additional context (old_value, new_value, etc.)
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_activity_user ON activity_log(user_id);
CREATE INDEX idx_activity_type ON activity_log(action_type);
CREATE INDEX idx_activity_created ON activity_log(created_at DESC);
CREATE INDEX idx_activity_entity ON activity_log(entity_type, entity_id);

-- ============================================================================
-- GOOGLE DRIVE SYNC STATE
-- ============================================================================

CREATE TABLE drive_sync_state (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    folder_id VARCHAR(255), -- Google Drive folder ID being synced
    folder_path TEXT,
    last_sync_at TIMESTAMP,
    next_sync_at TIMESTAMP,
    sync_status VARCHAR(50), -- idle, running, failed
    files_synced INTEGER DEFAULT 0,
    files_failed INTEGER DEFAULT 0,
    error_message TEXT,
    page_token VARCHAR(500), -- For incremental sync
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_drive_sync_user ON drive_sync_state(user_id);
CREATE INDEX idx_drive_sync_status ON drive_sync_state(sync_status);

-- ============================================================================
-- AI PROCESSING QUEUE (Optional - for tracking background jobs)
-- ============================================================================

CREATE TABLE ai_processing_queue (
    id SERIAL PRIMARY KEY,
    content_id INTEGER REFERENCES content_items(id) ON DELETE CASCADE,
    task_type VARCHAR(50) NOT NULL, -- transcribe, categorize, score, generate_captions
    status VARCHAR(50) DEFAULT 'pending', -- pending, processing, completed, failed
    priority INTEGER DEFAULT 5, -- 1 (high) to 10 (low)
    attempts INTEGER DEFAULT 0,
    max_attempts INTEGER DEFAULT 3,
    error_message TEXT,
    result JSONB, -- Store processing result
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ai_queue_status ON ai_processing_queue(status, priority) WHERE status IN ('pending', 'failed');
CREATE INDEX idx_ai_queue_content ON ai_processing_queue(content_id);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_content_items_updated_at BEFORE UPDATE ON content_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_publishing_queue_updated_at BEFORE UPDATE ON publishing_queue
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_platform_templates_updated_at BEFORE UPDATE ON platform_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_drive_sync_state_updated_at BEFORE UPDATE ON drive_sync_state
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 2.2 Database Relationships Diagram

```
users (1) ─────────── (∞) content_items
                       │
                       ├─── (∞) publishing_queue
                       │
                       └─── (∞) ideas_bank (source)
                       
content_items (1) ───── (∞) publishing_queue
content_items (1) ───── (∞) ideas_bank (used_in)

users (1) ─────────── (∞) activity_log
users (1) ─────────── (∞) drive_sync_state
content_items (1) ───── (∞) ai_processing_queue
```

### 2.3 Data Constraints & Validation

**Business Rules Enforced at DB Level:**
1. Content can't be published without a caption
2. Publishing date can't be in the past (trigger)
3. Scores must be 1-10
4. One scheduled post per content per platform per day
5. Soft deletes preserve data integrity

---

## 3. API ARCHITECTURE

### 3.1 API Endpoint Structure

**Base URL:** `https://api.content-os.com/v1` (or Railway URL)

**Authentication:** Bearer token (JWT) in `Authorization` header

### 3.2 Complete Endpoint List

```
# ============================================================================
# AUTHENTICATION
# ============================================================================

POST   /auth/register          # Create new user account
POST   /auth/login             # Login and get JWT token
POST   /auth/logout            # Logout (invalidate token)
GET    /auth/me                # Get current user info
POST   /auth/refresh           # Refresh JWT token
POST   /auth/change-password   # Change user password

# ============================================================================
# CONTENT MANAGEMENT
# ============================================================================

GET    /content-items                    # List all content (with filters)
GET    /content-items/:id                # Get single content details
POST   /content-items                    # Create content manually
PUT    /content-items/:id                # Update content
DELETE /content-items/:id                # Soft delete content
PATCH  /content-items/:id/restore        # Restore soft-deleted content

# Filtering & Search
GET    /content-items?pillar=Sales                    # Filter by pillar
GET    /content-items?status=ready                    # Filter by status
GET    /content-items?score_min=7                     # Filter by min score
GET    /content-items?platform_source=Instagram       # Filter by platform
GET    /content-items?search=marketing                # Full-text search
GET    /content-items?folder_tag=SW_Content           # Filter by folder
GET    /content-items?sort=score&order=desc           # Sort options

# Bulk Operations
POST   /content-items/bulk-update        # Update multiple items
POST   /content-items/bulk-delete        # Delete multiple items
GET    /content-items/export             # Export as CSV/JSON

# Statistics
GET    /content-items/stats              # Dashboard stats
GET    /content-items/stats/by-pillar    # Content distribution by pillar
GET    /content-items/stats/by-platform  # Content by platform

# ============================================================================
# GOOGLE DRIVE INTEGRATION
# ============================================================================

POST   /drive/connect             # OAuth2 flow - get authorization URL
POST   /drive/callback            # OAuth2 callback handler
GET    /drive/status              # Check connection status
POST   /drive/disconnect          # Disconnect Google Drive
GET    /drive/folders             # List available folders
POST   /drive/sync                # Trigger manual sync
GET    /drive/sync-history        # Get sync logs
GET    /drive/sync-status         # Current sync progress

# Webhook
POST   /drive/webhook             # Google Drive webhook receiver

# ============================================================================
# AI PROCESSING
# ============================================================================

# Transcription
POST   /ai/transcribe/:content_id          # Transcribe video/audio
GET    /ai/transcribe/:content_id/status   # Check transcription status

# Categorization
POST   /ai/categorize/:content_id          # Auto-categorize by pillar
POST   /ai/categorize/batch                # Batch categorize multiple items

# Scoring
POST   /ai/score/:content_id               # Score content quality
POST   /ai/score/batch                     # Batch score multiple items

# Caption Generation
POST   /ai/generate-captions/:content_id                      # Generate all platforms
POST   /ai/generate-captions/:content_id/:platform           # Generate specific platform
POST   /ai/regenerate-caption/:content_id/:platform          # Regenerate if not satisfied

# Ideas Extraction
POST   /ai/generate-ideas                  # Generate ideas from transcript upload
POST   /ai/generate-ideas/:content_id      # Generate ideas from existing content

# Processing Queue
GET    /ai/queue                           # View AI processing queue
DELETE /ai/queue/:id                       # Cancel queued task

# ============================================================================
# PUBLISHING QUEUE
# ============================================================================

GET    /publishing-queue                   # List scheduled posts
GET    /publishing-queue/:id               # Get scheduled post details
POST   /publishing-queue                   # Schedule new post
PUT    /publishing-queue/:id               # Update scheduled post
DELETE /publishing-queue/:id               # Cancel scheduled post

# Filtering
GET    /publishing-queue?platform=instagram           # Filter by platform
GET    /publishing-queue?status=scheduled             # Filter by status
GET    /publishing-queue?date_from=2026-03-10         # Filter by date range

# Bulk Operations
POST   /publishing-queue/bulk-schedule     # Schedule multiple posts
POST   /publishing-queue/bulk-cancel       # Cancel multiple posts

# Manual Actions
POST   /publishing-queue/:id/post-now      # Post immediately (manual trigger)
POST   /publishing-queue/:id/retry         # Retry failed post

# ============================================================================
# IDEAS BANK
# ============================================================================

GET    /ideas-bank                         # List all ideas
GET    /ideas-bank/:id                     # Get idea details
POST   /ideas-bank                         # Create idea manually
PUT    /ideas-bank/:id                     # Update idea
DELETE /ideas-bank/:id                     # Soft delete idea

# Filtering
GET    /ideas-bank?used=false              # Only unused ideas
GET    /ideas-bank?pillar=Sales            # Filter by pillar
GET    /ideas-bank?platform=Instagram      # Filter by platform
GET    /ideas-bank?priority_min=7          # Filter by priority

# Actions
POST   /ideas-bank/:id/mark-used           # Mark idea as used
POST   /ideas-bank/:id/create-content      # Create content from idea
POST   /ideas-bank/:id/schedule            # Schedule idea directly

# ============================================================================
# PLATFORM TEMPLATES
# ============================================================================

GET    /templates                          # List all platform templates
GET    /templates/:platform                # Get template for specific platform
PUT    /templates/:platform                # Update template
POST   /templates/:platform/test           # Test template with sample data

# ============================================================================
# DASHBOARD & ANALYTICS
# ============================================================================

GET    /dashboard/overview                 # Main dashboard stats
GET    /dashboard/recent-activity          # Recent activity feed (activity_log)
GET    /dashboard/quick-stats              # Real-time quick stats
GET    /dashboard/content-trends           # Content trends over time

# ============================================================================
# ACTIVITY LOG
# ============================================================================

GET    /activity-log                       # List activity (admin only)
GET    /activity-log/:id                   # Get activity details
GET    /activity-log/user/:user_id         # Activity by user
GET    /activity-log/entity/:type/:id      # Activity for specific entity

# ============================================================================
# USER MANAGEMENT (Admin Only)
# ============================================================================

GET    /users                              # List all users
GET    /users/:id                          # Get user details
POST   /users                              # Create new user
PUT    /users/:id                          # Update user
DELETE /users/:id                          # Deactivate user
POST   /users/:id/activate                 # Reactivate user

# ============================================================================
# HEALTH & SYSTEM
# ============================================================================

GET    /health                             # Health check endpoint
GET    /health/db                          # Database connection check
GET    /health/external                    # External services check
GET    /version                            # API version info
```

### 3.3 Request/Response Examples

**Example: Generate Captions**

```http
POST /ai/generate-captions/42
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "platforms": ["instagram", "tiktok", "linkedin"],
  "tone": "professional", // optional override
  "include_hashtags": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "content_id": 42,
  "captions": {
    "instagram": {
      "text": "Hook line goes here...\n\nMain points:\n• Point 1\n• Point 2\n• Point 3\n\nCTA: Link in bio!\n\n#sales #leadership #business",
      "length": 187,
      "hashtags": ["sales", "leadership", "business"],
      "generated_at": "2026-03-06T10:23:45Z"
    },
    "tiktok": {
      "text": "Quick hook for TikTok! Check comments for details 👇",
      "length": 52,
      "generated_at": "2026-03-06T10:23:45Z"
    },
    "linkedin": {
      "text": "Professional hook...\n\nInsight 1\nInsight 2\n\nWhat's your take on this?",
      "length": 234,
      "generated_at": "2026-03-06T10:23:45Z"
    }
  },
  "processing_time_ms": 2341
}
```

**Example: List Content with Filters**

```http
GET /content-items?pillar=Sales&score_min=7&status=ready&limit=20&offset=0
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "total": 47,
  "limit": 20,
  "offset": 0,
  "items": [
    {
      "id": 123,
      "title": "Closing Techniques That Actually Work",
      "pillar": "Sales",
      "platform_source": "Instagram",
      "folder_tag": "SW_Content",
      "composite_score": 8.5,
      "hook_score": 9,
      "clarity_score": 8,
      "has_cta": true,
      "status": "ready",
      "drive_file_id": "1xYz...",
      "thumbnail_url": "https://...",
      "created_at": "2026-03-01T14:30:00Z",
      "updated_at": "2026-03-05T09:15:00Z"
    },
    // ... more items
  ],
  "filters_applied": {
    "pillar": "Sales",
    "score_min": 7,
    "status": "ready"
  }
}
```

### 3.4 Error Response Format

**Standard Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters",
    "details": [
      {
        "field": "platforms",
        "message": "platforms is required"
      }
    ]
  },
  "request_id": "req_abc123xyz"
}
```

**Error Codes:**
- `VALIDATION_ERROR` - Invalid input (400)
- `UNAUTHORIZED` - Authentication failed (401)
- `FORBIDDEN` - Insufficient permissions (403)
- `NOT_FOUND` - Resource not found (404)
- `CONFLICT` - Resource conflict (409)
- `RATE_LIMIT_EXCEEDED` - Too many requests (429)
- `INTERNAL_ERROR` - Server error (500)
- `EXTERNAL_SERVICE_ERROR` - External API failed (502)

---

## 4. USER FLOWS

### 4.1 Authentication Flow

```
User Registration:
1. POST /auth/register {email, password, full_name}
2. Server validates input
3. Hash password (bcrypt)
4. Create user in database
5. Return JWT token + user info
6. Frontend stores token in localStorage
7. Redirect to dashboard

User Login:
1. POST /auth/login {email, password}
2. Server validates credentials
3. Check password hash
4. Generate JWT token (expires 24h)
5. Update last_login timestamp
6. Log activity (activity_log)
7. Return token + user info

Protected Request:
1. Frontend includes "Authorization: Bearer {token}" header
2. Server middleware validates JWT
3. Extract user_id from token
4. Load user from database
5. Check if user is_active
6. Proceed with request OR return 401
```

### 4.2 Content Upload & Processing Flow

```
New Content Upload (Manual):
1. POST /content-items {title, drive_file_id, ...}
2. Validate input
3. Create content_item record (status: draft, processing_status: pending)
4. Return created content
5. Trigger background jobs:
   a. Queue transcription task
   b. Queue categorization task
   c. Queue scoring task
6. Frontend polls or uses WebSocket for updates

Google Drive Auto-Sync:
1. Google Drive webhook → POST /drive/webhook
2. Extract file metadata from webhook
3. Check if file already exists (drive_file_id)
4. If new: Create content_item
5. Map folder path → folder_tag (SW_Content, LIFE, etc.)
6. Queue background processing
7. Update drive_sync_state table

Transcription Flow:
1. Backend picks task from ai_processing_queue
2. Download file from Google Drive (if needed)
3. Call Whisper API with audio/video
4. Store transcript in content_items.raw_transcript
5. Update processing_status = 'completed'
6. Trigger next task (categorization)

Categorization Flow:
1. Load content_items.raw_transcript
2. Call OpenAI with categorization prompt
3. Parse response (pillar, confidence, reasoning)
4. Update content_items:
   - pillar = result
   - ai_pillar_confidence = confidence
   - ai_categorization_reasoning = reasoning
5. If confidence < 5: flag for manual review

Scoring Flow:
1. Load content_items.raw_transcript
2. Call OpenAI with scoring prompt
3. Parse scores (hook, clarity, has_cta)
4. Calculate composite_score
5. Update content_items with scores
6. If composite_score >= 7: auto-set status = 'ready'
```

### 4.3 Caption Generation Flow

```
Generate Captions (User Triggered):
1. POST /ai/generate-captions/:content_id
   Body: {platforms: ['instagram', 'tiktok', 'linkedin']}
2. Server validates content exists
3. Load content_items.raw_transcript
4. Load platform_templates for each requested platform
5. For each platform (parallel processing):
   a. Build prompt with template + transcript
   b. Call OpenAI API
   c. Parse generated caption
   d. Validate length constraints
6. Return all captions to frontend
7. Frontend displays in modal with Copy buttons
8. User can edit inline before saving

Save to Publishing Queue:
1. User clicks "Schedule" from caption modal
2. POST /publishing-queue
   Body: {
     content_id, 
     platform, 
     caption, 
     scheduled_date, 
     scheduled_time
   }
3. Server validates:
   - No duplicate (same content+platform+date)
   - Date not in past
   - Caption not empty
4. Create publishing_queue record
5. Return success
6. Frontend updates calendar view
```

### 4.4 Ideas Generation Flow

```
Generate Ideas from Transcript:
1. User uploads transcript OR selects existing content
2. POST /ai/generate-ideas
   Body: {transcript: "...", source_type: "call"}
   OR
   POST /ai/generate-ideas/:content_id
3. Server calls OpenAI with ideas extraction prompt
4. Parse response (10 ideas with title, pillar, hook, etc.)
5. Bulk insert into ideas_bank table
6. Return created ideas
7. Frontend displays ideas list with priority scores

Use Idea to Create Content:
1. User clicks "Add to Queue" on an idea
2. POST /ideas-bank/:id/create-content
3. Server creates draft content_item from idea:
   - title = idea.title
   - description = idea.description
   - pillar = idea.suggested_pillar
4. Mark idea as used (used = true, used_at = NOW())
5. Return new content_item
6. Frontend redirects to content details
```

### 4.5 Publishing Workflow

```
Schedule Content for Publishing:
1. User selects content from library
2. Clicks "Schedule" button
3. Modal shows:
   - Date/time picker
   - Platform selector
   - Caption preview (auto-generated or manual)
4. POST /publishing-queue
5. Server creates record with status = 'scheduled'
6. Calendar updates with new event

View Calendar:
1. GET /publishing-queue?date_from=2026-03-01&date_to=2026-03-31
2. Server returns all scheduled posts in date range
3. Frontend renders on calendar (React Big Calendar)
4. User can drag-and-drop to reschedule
5. On drop: PUT /publishing-queue/:id {scheduled_date, scheduled_time}

Manual Post:
1. User clicks "Post Now" button
2. POST /publishing-queue/:id/post-now
3. Server:
   - Validates content ready
   - (Future: Call platform API to post)
   - Update status = 'posted', posted_at = NOW()
   - Log activity
4. Return success
5. Frontend shows confirmation
```

---

## 5. EXTERNAL INTEGRATIONS

### 5.1 Google Drive API Integration

**Setup:**
```python
# backend/app/integrations/google_drive.py

from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
import os

class GoogleDriveClient:
    def __init__(self, credentials_json):
        self.creds = Credentials.from_authorized_user_info(credentials_json)
        self.service = build('drive', 'v3', credentials=self.creds)
    
    def list_files(self, folder_id=None, page_token=None):
        """List files in a folder"""
        query = f"'{folder_id}' in parents" if folder_id else None
        
        results = self.service.files().list(
            q=query,
            pageSize=100,
            pageToken=page_token,
            fields="nextPageToken, files(id, name, mimeType, size, createdTime, parents, thumbnailLink)"
        ).execute()
        
        return results.get('files', []), results.get('nextPageToken')
    
    def get_file_metadata(self, file_id):
        """Get metadata for specific file"""
        return self.service.files().get(
            fileId=file_id,
            fields="id, name, mimeType, size, createdTime, modifiedTime, parents, thumbnailLink"
        ).execute()
    
    def download_file(self, file_id, destination_path):
        """Download file content"""
        request = self.service.files().get_media(fileId=file_id)
        # ... implementation for downloading
    
    def setup_webhook(self, folder_id, webhook_url):
        """Setup push notifications for folder changes"""
        body = {
            'id': 'unique-channel-id',
            'type': 'web_hook',
            'address': webhook_url
        }
        return self.service.files().watch(
            fileId=folder_id,
            body=body
        ).execute()
```

**OAuth Flow:**
```python
# backend/app/routers/drive.py

from fastapi import APIRouter, Depends
from google_auth_oauthlib.flow import Flow

router = APIRouter(prefix="/drive", tags=["Google Drive"])

@router.post("/connect")
async def connect_drive(current_user: User = Depends(get_current_user)):
    """Initiate OAuth2 flow"""
    flow = Flow.from_client_secrets_file(
        'client_secrets.json',
        scopes=['https://www.googleapis.com/auth/drive.readonly'],
        redirect_uri='https://api.content-os.com/v1/drive/callback'
    )
    
    authorization_url, state = flow.authorization_url(
        access_type='offline',
        include_granted_scopes='true'
    )
    
    # Store state in session or database for verification
    return {"authorization_url": authorization_url, "state": state}

@router.post("/callback")
async def drive_callback(code: str, state: str, current_user: User = Depends(get_current_user)):
    """Handle OAuth2 callback"""
    flow = Flow.from_client_secrets_file(
        'client_secrets.json',
        scopes=['https://www.googleapis.com/auth/drive.readonly'],
        redirect_uri='https://api.content-os.com/v1/drive/callback'
    )
    
    flow.fetch_token(code=code)
    credentials = flow.credentials
    
    # Store credentials encrypted in database
    # ... save to user or separate table
    
    return {"success": True, "message": "Google Drive connected"}
```

**Sync Logic:**
```python
# backend/app/services/drive_sync.py

async def sync_drive_folder(user_id: int, folder_id: str):
    """Sync all files from Google Drive folder"""
    # Load user's Drive credentials
    drive_client = GoogleDriveClient(user_credentials)
    
    page_token = None
    new_files = 0
    
    while True:
        files, page_token = drive_client.list_files(folder_id, page_token)
        
        for file in files:
            # Check if already exists
            existing = db.query(ContentItem).filter_by(drive_file_id=file['id']).first()
            
            if not existing:
                # Determine folder tag from parents path
                folder_tag = map_folder_to_tag(file.get('parents'))
                
                # Create content item
                content = ContentItem(
                    title=file['name'],
                    drive_file_id=file['id'],
                    file_path=get_full_path(file),
                    file_size=file.get('size'),
                    mime_type=file.get('mimeType'),
                    drive_thumbnail_url=file.get('thumbnailLink'),
                    folder_tag=folder_tag,
                    content_type=determine_content_type(file['mimeType']),
                    status='draft',
                    processing_status='pending',
                    created_by=user_id
                )
                
                db.add(content)
                new_files += 1
                
                # Queue for processing
                queue_ai_processing(content.id, ['transcribe', 'categorize', 'score'])
        
        if not page_token:
            break
    
    db.commit()
    return new_files
```

### 5.2 OpenAI API Integration

**Client Setup:**
```python
# backend/app/integrations/openai_client.py

from openai import AsyncOpenAI
from app.config import settings

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

async def call_gpt(prompt: str, system_prompt: str = None, model: str = "gpt-4-turbo"):
    """Generic OpenAI API call"""
    messages = []
    
    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})
    
    messages.append({"role": "user", "content": prompt})
    
    response = await client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=0.7,
        max_tokens=1000
    )
    
    return response.choices[0].message.content
```

**AI Service Functions:**
```python
# backend/app/services/ai_service.py

from app.integrations.openai_client import call_gpt
from app.ai.prompts import (
    CATEGORIZATION_PROMPT,
    SCORING_PROMPT,
    CAPTION_TEMPLATES,
    IDEAS_EXTRACTION_PROMPT
)
import json

async def categorize_content(transcript: str) -> dict:
    """Auto-categorize content by pillar"""
    prompt = CATEGORIZATION_PROMPT.format(transcript=transcript)
    
    response = await call_gpt(prompt)
    
    # Parse response (expecting JSON)
    try:
        result = json.loads(response)
        return {
            "pillar": result['pillar'],
            "confidence": result['confidence'],
            "reasoning": result['reasoning']
        }
    except:
        # Fallback parsing if not JSON
        return parse_categorization_text(response)

async def score_content(transcript: str) -> dict:
    """Score content quality"""
    prompt = SCORING_PROMPT.format(transcript=transcript)
    
    response = await call_gpt(prompt)
    
    result = json.loads(response)
    return {
        "hook_score": result['hook_score'],
        "clarity_score": result['clarity_score'],
        "has_cta": result['has_cta'],
        "composite_score": (result['hook_score'] + result['clarity_score']) / 2 + (0.5 if result['has_cta'] else 0),
        "reasoning": result['reasoning']
    }

async def generate_caption(transcript: str, platform: str) -> str:
    """Generate platform-specific caption"""
    template = CAPTION_TEMPLATES.get(platform)
    
    prompt = template.format(transcript=transcript)
    
    caption = await call_gpt(prompt, system_prompt=f"You are a social media expert for {platform}")
    
    # Validate length
    max_length = PLATFORM_MAX_LENGTHS.get(platform, 2000)
    if len(caption) > max_length:
        caption = caption[:max_length]
    
    return caption

async def generate_ideas(transcript: str) -> list[dict]:
    """Extract content ideas from transcript"""
    prompt = IDEAS_EXTRACTION_PROMPT.format(transcript=transcript)
    
    response = await call_gpt(prompt)
    
    ideas = json.loads(response)
    return ideas  # List of {title, pillar, hook, platform, reasoning, priority}
```

### 5.3 Whisper API Integration

```python
# backend/app/services/transcription_service.py

from openai import AsyncOpenAI
from app.config import settings

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

async def transcribe_audio(file_path: str, language: str = "fr") -> dict:
    """Transcribe audio/video file using Whisper"""
    
    with open(file_path, "rb") as audio_file:
        transcript = await client.audio.transcriptions.create(
            model="whisper-1",
            file=audio_file,
            language=language,
            response_format="verbose_json"
        )
    
    return {
        "text": transcript.text,
        "language": transcript.language,
        "duration": transcript.duration,
        "words": transcript.words  # Word-level timestamps if needed
    }

async def transcribe_content_item(content_id: int):
    """Transcribe a content item"""
    content = db.query(ContentItem).get(content_id)
    
    if not content:
        raise ValueError(f"Content {content_id} not found")
    
    # Download file from Google Drive if needed
    file_path = await download_drive_file(content.drive_file_id)
    
    # Transcribe
    result = await transcribe_audio(file_path, language="fr")
    
    # Update content item
    content.raw_transcript = result['text']
    content.transcript_language = result['language']
    content.transcript_word_count = len(result['text'].split())
    content.processing_status = 'completed'
    
    db.commit()
    
    # Queue next tasks (categorization, scoring)
    await queue_ai_processing(content_id, ['categorize', 'score'])
    
    return result
```

---

## 6. BACKGROUND PROCESSING

### 6.1 Background Jobs Architecture

**Option 1: FastAPI BackgroundTasks (Simple, Recommended for MVP)**

```python
# backend/app/routers/content.py

from fastapi import BackgroundTasks

@router.post("/content-items")
async def create_content(
    content: ContentCreate,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_user)
):
    # Create content item
    new_content = ContentItem(**content.dict(), created_by=current_user.id)
    db.add(new_content)
    db.commit()
    
    # Queue background processing
    background_tasks.add_task(process_new_content, new_content.id)
    
    return new_content

async def process_new_content(content_id: int):
    """Background task to process new content"""
    try:
        # Step 1: Transcribe
        await transcribe_content_item(content_id)
        
        # Step 2: Categorize
        await categorize_content_item(content_id)
        
        # Step 3: Score
        await score_content_item(content_id)
        
    except Exception as e:
        # Log error
        logger.error(f"Error processing content {content_id}: {e}")
        
        # Update content status
        content = db.query(ContentItem).get(content_id)
        content.processing_status = 'failed'
        content.processing_error = str(e)
        db.commit()
```

**Option 2: Celery (Advanced, for Production)**

```python
# backend/app/celery_app.py

from celery import Celery

celery_app = Celery(
    "content_os",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0"
)

@celery_app.task
def transcribe_task(content_id: int):
    """Celery task for transcription"""
    # ... transcription logic
    return {"content_id": content_id, "status": "completed"}

@celery_app.task
def categorize_task(content_id: int):
    """Celery task for categorization"""
    # ... categorization logic
    return {"content_id": content_id, "pillar": "Sales"}

# Chain tasks
from celery import chain

chain(
    transcribe_task.s(content_id),
    categorize_task.s(),
    score_task.s()
).apply_async()
```

### 6.2 Processing Queue System

```python
# backend/app/services/processing_queue.py

from app.models import AIProcessingQueue, ContentItem
from sqlalchemy.orm import Session

async def queue_ai_processing(
    content_id: int,
    tasks: list[str],  # ['transcribe', 'categorize', 'score', 'generate_captions']
    priority: int = 5
):
    """Add AI processing tasks to queue"""
    for i, task_type in enumerate(tasks):
        task = AIProcessingQueue(
            content_id=content_id,
            task_type=task_type,
            priority=priority,
            status='pending'
        )
        db.add(task)
    
    db.commit()

async def process_queue():
    """Process pending AI tasks (run as background worker)"""
    while True:
        # Get next pending task (highest priority first)
        task = db.query(AIProcessingQueue).filter(
            AIProcessingQueue.status == 'pending',
            AIProcessingQueue.attempts < AIProcessingQueue.max_attempts
        ).order_by(
            AIProcessingQueue.priority.asc(),
            AIProcessingQueue.created_at.asc()
        ).first()
        
        if not task:
            await asyncio.sleep(5)  # Wait 5 seconds before checking again
            continue
        
        # Mark as processing
        task.status = 'processing'
        task.started_at = datetime.now()
        task.attempts += 1
        db.commit()
        
        try:
            # Execute task based on type
            if task.task_type == 'transcribe':
                result = await transcribe_content_item(task.content_id)
            elif task.task_type == 'categorize':
                result = await categorize_content_item(task.content_id)
            elif task.task_type == 'score':
                result = await score_content_item(task.content_id)
            # ... other task types
            
            # Mark as completed
            task.status = 'completed'
            task.completed_at = datetime.now()
            task.result = result
            db.commit()
            
        except Exception as e:
            logger.error(f"Task {task.id} failed: {e}")
            
            # Mark as failed
            task.status = 'failed'
            task.error_message = str(e)
            db.commit()
```

---

## 7. SECURITY & AUTHENTICATION

### 7.1 JWT Authentication Implementation

```python
# backend/app/auth/jwt.py

from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from app.config import settings

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # 24 hours

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            return None
        return user_id
    except JWTError:
        return None
```

**Authentication Dependency:**
```python
# backend/app/auth/dependencies.py

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.auth.jwt import decode_access_token
from app.models import User

security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> User:
    """Get current authenticated user from JWT token"""
    token = credentials.credentials
    
    user_id = decode_access_token(token)
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    
    user = db.query(User).filter(User.id == user_id, User.is_active == True).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive"
        )
    
    # Update last activity
    user.last_login = datetime.now()
    db.commit()
    
    return user

async def get_current_admin(current_user: User = Depends(get_current_user)) -> User:
    """Require admin role"""
    if current_user.role != 'admin':
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return current_user
```

**Login Endpoint:**
```python
# backend/app/routers/auth.py

from fastapi import APIRouter, Depends, HTTPException, status
from app.auth.jwt import verify_password, create_access_token
from app.models import User
from pydantic import BaseModel

router = APIRouter(prefix="/auth", tags=["Authentication"])

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
async def login(request: LoginRequest):
    """Authenticate user and return JWT token"""
    user = db.query(User).filter(User.email == request.email).first()
    
    if not user or not verify_password(request.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is deactivated"
        )
    
    # Create access token
    access_token = create_access_token(data={"sub": user.id})
    
    # Log activity
    log_activity(
        user_id=user.id,
        action_type="user_login",
        entity_type="user",
        entity_id=user.id,
        description=f"User {user.email} logged in"
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role
        }
    }
```

### 7.2 Security Best Practices

**1. CORS Configuration:**
```python
# backend/app/main.py

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://content-os.vercel.app"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**2. Rate Limiting:**
```python
# backend/app/middleware/rate_limit.py

from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

# Apply to app
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Use in routes
@router.post("/ai/generate-captions/{content_id}")
@limiter.limit("10/minute")  # Max 10 requests per minute
async def generate_captions(request: Request, content_id: int):
    # ... endpoint logic
```

**3. Input Validation:**
```python
# backend/app/schemas/content.py

from pydantic import BaseModel, validator, Field

class ContentCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=500)
    drive_file_id: str = Field(..., min_length=10, max_length=255)
    platform_source: str = Field(None, regex="^(instagram|tiktok|youtube|linkedin|facebook)$")
    
    @validator('title')
    def title_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('Title cannot be empty')
        return v.strip()
```

**4. SQL Injection Protection:**
- Use SQLAlchemy ORM (auto-escapes queries)
- Never concatenate SQL strings manually
- Use parameterized queries

**5. Secrets Management:**
```python
# backend/app/config.py

from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    OPENAI_API_KEY: str
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str
    
    class Config:
        env_file = ".env"

settings = Settings()
```

---

## 8. ERROR HANDLING & LOGGING

### 8.1 Global Exception Handler

```python
# backend/app/middleware/error_handler.py

from fastapi import Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
import traceback
import uuid

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Handle all unhandled exceptions"""
    request_id = str(uuid.uuid4())
    
    # Log error
    logger.error(
        f"Request ID: {request_id} | "
        f"Path: {request.url.path} | "
        f"Error: {str(exc)} | "
        f"Traceback: {traceback.format_exc()}"
    )
    
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "error": {
                "code": "INTERNAL_ERROR",
                "message": "An internal error occurred",
                "request_id": request_id
            }
        }
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handle validation errors"""
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "success": False,
            "error": {
                "code": "VALIDATION_ERROR",
                "message": "Invalid input parameters",
                "details": exc.errors()
            }
        }
    )
```

### 8.2 Logging Configuration

```python
# backend/app/logging_config.py

import logging
from logging.handlers import RotatingFileHandler
import sys

def setup_logging():
    """Configure application logging"""
    
    # Create logger
    logger = logging.getLogger("content_os")
    logger.setLevel(logging.INFO)
    
    # Console handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(logging.INFO)
    console_format = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    console_handler.setFormatter(console_format)
    
    # File handler (rotating)
    file_handler = RotatingFileHandler(
        'logs/app.log',
        maxBytes=10485760,  # 10MB
        backupCount=5
    )
    file_handler.setLevel(logging.INFO)
    file_format = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(pathname)s:%(lineno)d - %(message)s'
    )
    file_handler.setFormatter(file_format)
    
    # Add handlers
    logger.addHandler(console_handler)
    logger.addHandler(file_handler)
    
    return logger

logger = setup_logging()
```

### 8.3 Activity Logging

```python
# backend/app/services/activity_logger.py

from app.models import ActivityLog

def log_activity(
    user_id: int,
    action_type: str,
    entity_type: str,
    entity_id: int,
    description: str,
    metadata: dict = None,
    request: Request = None
):
    """Log user activity to database"""
    activity = ActivityLog(
        user_id=user_id,
        action_type=action_type,
        entity_type=entity_type,
        entity_id=entity_id,
        description=description,
        metadata=metadata,
        ip_address=request.client.host if request else None,
        user_agent=request.headers.get('user-agent') if request else None
    )
    
    db.add(activity)
    db.commit()

# Usage in endpoints
@router.put("/content-items/{content_id}")
async def update_content(
    content_id: int,
    update: ContentUpdate,
    request: Request,
    current_user: User = Depends(get_current_user)
):
    # ... update logic
    
    log_activity(
        user_id=current_user.id,
        action_type="content_updated",
        entity_type="content_item",
        entity_id=content_id,
        description=f"Updated content '{content.title}'",
        metadata={"updated_fields": list(update.dict(exclude_unset=True).keys())},
        request=request
    )
```

---

## 9. FILE STRUCTURE

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                    # FastAPI app initialization
│   ├── config.py                  # Settings & environment variables
│   ├── database.py                # Database connection & session
│   ├── logging_config.py          # Logging setup
│   │
│   ├── models/                    # SQLAlchemy models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── content_item.py
│   │   ├── publishing_queue.py
│   │   ├── ideas_bank.py
│   │   ├── platform_template.py
│   │   ├── activity_log.py
│   │   └── ai_processing_queue.py
│   │
│   ├── schemas/                   # Pydantic schemas (request/response)
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── content.py
│   │   ├── publishing.py
│   │   ├── ideas.py
│   │   └── auth.py
│   │
│   ├── routers/                   # API endpoints
│   │   ├── __init__.py
│   │   ├── auth.py                # /auth/*
│   │   ├── content.py             # /content-items/*
│   │   ├── drive.py               # /drive/*
│   │   ├── ai.py                  # /ai/*
│   │   ├── publishing.py          # /publishing-queue/*
│   │   ├── ideas.py               # /ideas-bank/*
│   │   ├── templates.py           # /templates/*
│   │   ├── dashboard.py           # /dashboard/*
│   │   ├── users.py               # /users/*
│   │   └── health.py              # /health
│   │
│   ├── services/                  # Business logic
│   │   ├── __init__.py
│   │   ├── ai_service.py          # AI processing logic
│   │   ├── drive_sync.py          # Google Drive sync
│   │   ├── transcription_service.py
│   │   ├── processing_queue.py    # Background task queue
│   │   └── activity_logger.py     # Activity logging
│   │
│   ├── integrations/              # External API clients
│   │   ├── __init__.py
│   │   ├── google_drive.py        # Google Drive client
│   │   ├── openai_client.py       # OpenAI client
│   │   └── whisper_client.py      # Whisper API client
│   │
│   ├── auth/                      # Authentication logic
│   │   ├── __init__.py
│   │   ├── jwt.py                 # JWT functions
│   │   └── dependencies.py        # Auth dependencies
│   │
│   ├── middleware/                # Middleware
│   │   ├── __init__.py
│   │   ├── error_handler.py       # Global error handling
│   │   └── rate_limit.py          # Rate limiting
│   │
│   ├── ai/                        # AI prompts & templates
│   │   ├── __init__.py
│   │   ├── prompts.py             # All AI prompts
│   │   └── prompt_templates.py    # Prompt formatting
│   │
│   └── utils/                     # Utility functions
│       ├── __init__.py
│       ├── validators.py          # Custom validators
│       ├── formatters.py          # Data formatters
│       └── helpers.py             # Helper functions
│
├── alembic/                       # Database migrations
│   ├── versions/
│   │   ├── 001_initial_migration.py
│   │   ├── 002_add_content_items.py
│   │   └── ...
│   ├── env.py
│   └── alembic.ini
│
├── tests/                         # Tests
│   ├── __init__.py
│   ├── conftest.py                # Test fixtures
│   ├── test_auth.py
│   ├── test_content.py
│   ├── test_ai_service.py
│   └── ...
│
├── logs/                          # Log files
│   └── app.log
│
├── .env                           # Environment variables (not in git)
├── .env.example                   # Example env file
├── .gitignore
├── requirements.txt               # Python dependencies
├── Dockerfile                     # Docker configuration
├── docker-compose.yml
└── README.md                      # Backend documentation
```

---

## 10. IMPLEMENTATION ROADMAP

### Phase 1: Foundation (Days 1-3)

**Day 1 - Setup:**
- [ ] Initialize FastAPI project
- [ ] Setup Supabase PostgreSQL database
- [ ] Create database schema with Alembic migrations
- [ ] Implement basic auth (login, JWT)
- [ ] Setup logging & error handling

**Day 2 - Core Models:**
- [ ] Complete all SQLAlchemy models
- [ ] Create Pydantic schemas
- [ ] CRUD endpoints for content_items
- [ ] Test database operations

**Day 3 - Google Drive Integration:**
- [ ] OAuth2 flow for Google Drive
- [ ] List files endpoint
- [ ] Basic sync functionality
- [ ] Webhook setup (optional)

### Phase 2: AI Integration (Days 4-7)

**Day 4 - OpenAI Setup:**
- [ ] OpenAI client integration
- [ ] Categorization endpoint
- [ ] Scoring endpoint
- [ ] Test with sample transcripts

**Day 5 - Transcription:**
- [ ] Whisper API integration
- [ ] Transcription endpoint
- [ ] Background task for auto-transcription
- [ ] Queue system setup

**Day 6 - Caption Generation:**
- [ ] Caption generation logic
- [ ] Multi-platform templates
- [ ] Batch generation endpoint
- [ ] Test caption quality

**Day 7 - Ideas Extraction:**
- [ ] Ideas generation endpoint
- [ ] Ideas bank CRUD
- [ ] Priority scoring logic

### Phase 3: Publishing & Polish (Days 8-10)

**Day 8 - Publishing Queue:**
- [ ] Publishing queue CRUD
- [ ] Scheduling logic
- [ ] Calendar filtering endpoints

**Day 9 - Dashboard & Stats:**
- [ ] Dashboard overview endpoint
- [ ] Stats aggregation queries
- [ ] Activity log endpoints

**Day 10 - Testing & Deployment:**
- [ ] Integration testing
- [ ] Performance optimization
- [ ] Deploy to Railway/Render
- [ ] Environment setup production

---

## 11. TESTING STRATEGY

### 11.1 Unit Tests

```python
# tests/test_ai_service.py

import pytest
from app.services.ai_service import categorize_content, score_content

@pytest.mark.asyncio
async def test_categorize_content():
    """Test content categorization"""
    transcript = "Today I want to talk about closing techniques that actually work..."
    
    result = await categorize_content(transcript)
    
    assert result['pillar'] in ['Sales', 'Leadership', 'Systems', 'Discipline', 'Community']
    assert 1 <= result['confidence'] <= 10
    assert isinstance(result['reasoning'], str)

@pytest.mark.asyncio
async def test_score_content():
    """Test content scoring"""
    transcript = "Hook question here? Clear message with actionable steps. Link in bio!"
    
    result = await score_content(transcript)
    
    assert 1 <= result['hook_score'] <= 10
    assert 1 <= result['clarity_score'] <= 10
    assert isinstance(result['has_cta'], bool)
    assert result['composite_score'] >= 1
```

### 11.2 Integration Tests

```python
# tests/test_content_endpoints.py

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_content_requires_auth():
    """Test that creating content requires authentication"""
    response = client.post("/content-items", json={
        "title": "Test Content",
        "drive_file_id": "abc123"
    })
    
    assert response.status_code == 401

def test_create_content_success():
    """Test successful content creation"""
    # Login first
    login_response = client.post("/auth/login", json={
        "email": "test@example.com",
        "password": "testpass"
    })
    token = login_response.json()['access_token']
    
    # Create content
    response = client.post(
        "/content-items",
        json={"title": "Test Content", "drive_file_id": "abc123"},
        headers={"Authorization": f"Bearer {token}"}
    )
    
    assert response.status_code == 201
    assert response.json()['title'] == "Test Content"
```

---

## 12. DEPLOYMENT

### 12.1 Railway Deployment

**railway.json:**
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn app.main:app --host 0.0.0.0 --port $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

**Environment Variables on Railway:**
```
DATABASE_URL=postgresql://...
SECRET_KEY=your-secret-key
OPENAI_API_KEY=sk-...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
ENVIRONMENT=production
```

### 12.2 Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY ./app ./app
COPY ./alembic ./alembic
COPY alembic.ini .

# Run migrations on startup
CMD alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
```

### 12.3 Database Migrations

**Run migrations:**
```bash
# Create new migration
alembic revision --autogenerate -m "Description"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

---

## APPENDIX A: Quick Reference Commands

**Setup Development Environment:**
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup database
alembic upgrade head

# Run development server
uvicorn app.main:app --reload --port 8000
```

**Testing:**
```bash
# Run all tests
pytest

# Run specific test file
pytest tests/test_content.py

# Run with coverage
pytest --cov=app tests/
```

**Database:**
```bash
# Create migration
alembic revision --autogenerate -m "Add new field"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1

# Reset database (DEV ONLY)
alembic downgrade base
alembic upgrade head
```

---

**END OF BACKEND ARCHITECTURE PLAN**

**Version:** 1.0  
**Last Updated:** 5 Mars 2026  
**Owner:** Kael Belceus

This document is your complete guide to building the Content OS backend. Follow it step-by-step, and you'll have a production-ready system in 3 weeks. 🚀
