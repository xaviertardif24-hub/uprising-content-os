from fastapi import APIRouter, HTTPException
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import chat_service

router = APIRouter()

@router.post("", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        response_text = await chat_service.generate_response(request.messages)
        return ChatResponse(response=response_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
