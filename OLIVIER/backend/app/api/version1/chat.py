from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    stream: Optional[bool] = False

from app.services.chat_service import chat_service

@router.post("")
async def royal_chat(request: ChatRequest):
    """
    Royal AI Chat Endpoint.
    Uses ChatService to generate specialized responses.
    """
    response_content = await chat_service.generate_response(request.messages)

    return {
        "role": "assistant",
        "content": response_content
    }
