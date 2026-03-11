import os
from dotenv import load_dotenv

# CRITICAL: Load environment variables BEFORE importing any app modules
# so that services can access them during initialization.
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.version1 import chat

app = FastAPI(title="Uprising Content OS API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(chat.router, prefix="/api/v1/chat", tags=["chat"])

@app.get("/")
async def root():
    return {"message": "Welcome to Uprising Content OS API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
