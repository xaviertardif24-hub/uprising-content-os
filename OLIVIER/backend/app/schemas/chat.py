from pydantic import BaseModel
from typing import List, Optional

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

class ChatResponse(BaseModel):
    response: str

class IdeaScoreRequest(BaseModel):
    title: str
    description: Optional[str] = None

class IdeaScoreResponse(BaseModel):
    score: float
    reasoning: str
