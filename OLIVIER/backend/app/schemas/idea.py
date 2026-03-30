from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class IdeaBase(BaseModel):
    title: str
    description: Optional[str] = None
    pillar: Optional[str] = None

class IdeaCreate(IdeaBase):
    pass

class IdeaUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    pillar: Optional[str] = None
    score: Optional[float] = None
    reasoning: Optional[str] = None
    is_promoted: Optional[bool] = None

class IdeaInDB(IdeaBase):
    id: int
    score: float
    reasoning: Optional[str] = None
    status: str
    is_promoted: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
