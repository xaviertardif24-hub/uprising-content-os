from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.session import get_db
from app.models.idea import Idea
from app.schemas.idea import IdeaCreate, IdeaUpdate, IdeaInDB
from app.services.chat_service import chat_service
from app.services.framer_service import framer_service

router = APIRouter()

@router.get("", response_model=List[IdeaInDB])
def read_ideas(
    skip: int = 0, 
    limit: int = 100, 
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Idea)
    if status:
        query = query.filter(Idea.status == status)
    return query.order_by(Idea.created_at.desc()).offset(skip).limit(limit).all()

@router.post("", response_model=IdeaInDB)
async def create_idea(idea_in: IdeaCreate, db: Session = Depends(get_db)):
    # Create the idea
    new_idea = Idea(**idea_in.model_dump())
    
    # Auto-score with AI
    ai_result = await chat_service.score_idea(new_idea.title, new_idea.description or "")
    new_idea.score = ai_result.get("score", 5.0)
    new_idea.reasoning = ai_result.get("reasoning", "")
    
    db.add(new_idea)
    db.commit()
    db.refresh(new_idea)
    return new_idea

@router.put("/{idea_id}", response_model=IdeaInDB)
def update_idea(idea_id: int, idea_update: IdeaUpdate, db: Session = Depends(get_db)):
    idea = db.query(Idea).filter(Idea.id == idea_id).first()
    if not idea:
        raise HTTPException(status_code=404, detail="Idea not found")
    
    update_data = idea_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(idea, key, value)
    
    db.commit()
    db.refresh(idea)
    return idea

@router.delete("/{idea_id}")
def delete_idea(idea_id: int, db: Session = Depends(get_db)):
    idea = db.query(Idea).filter(Idea.id == idea_id).first()
    if not idea:
        raise HTTPException(status_code=404, detail="Idea not found")
    
    db.delete(idea)
    db.commit()
    return {"status": "success"}

@router.post("/{idea_id}/promote")
async def promote_idea(idea_id: int, db: Session = Depends(get_db)):
    idea = db.query(Idea).filter(Idea.id == idea_id).first()
    if not idea:
        raise HTTPException(status_code=404, detail="Idea not found")
    
    # 1. Update backend status
    idea.is_promoted = True
    idea.status = "Promoted"
    db.commit()
    
    # 2. Trigger Framer Sync
    # Convert idea to a dictionary for the service
    idea_data = {
        "id": idea.id,
        "title": idea.title,
        "description": idea.description,
        "score": idea.score,
        "status": idea.status
    }
    
    sync_result = await framer_service.sync_idea_to_framer(idea_data)
    
    return {
        "status": "promoted", 
        "idea_id": idea_id, 
        "sync_status": sync_result.get("status"),
        "sync_details": sync_result
    }
