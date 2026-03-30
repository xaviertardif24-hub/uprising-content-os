from sqlalchemy import Column, Integer, String, Float, Text, DateTime, Boolean
from sqlalchemy.sql import func
from app.db.session import Base

class Idea(Base):
    __tablename__ = "ideas_bank"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(500), nullable=False)
    description = Column(Text, nullable=True)
    score = Column(Float, default=0.0)
    reasoning = Column(Text, nullable=True)
    status = Column(String(50), default="New") # New, Draft, Reviewing, Promoted
    pillar = Column(String(100), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Track if this idea was converted to a real content item
    is_promoted = Column(Boolean, default=False)
    content_item_id = Column(Integer, nullable=True)
