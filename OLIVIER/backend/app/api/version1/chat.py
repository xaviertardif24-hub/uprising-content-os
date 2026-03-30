from fastapi import APIRouter, HTTPException
from app.schemas.chat import ChatRequest, ChatResponse, IdeaScoreRequest, IdeaScoreResponse
from app.services.chat_service import chat_service

router = APIRouter()

@router.post("", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        response_text = await chat_service.get_response([{"role": m.role, "content": m.content} for m in request.messages])
        return ChatResponse(response=response_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/score", response_model=IdeaScoreResponse)
async def score_endpoint(request: IdeaScoreRequest):
    try:
        result = await chat_service.score_idea(request.title, request.description or "")
        return IdeaScoreResponse(score=result.get("score", 5.0), reasoning=result.get("reasoning", ""))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
