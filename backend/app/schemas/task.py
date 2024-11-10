from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from enum import Enum

class TaskType(str, Enum):
    VOLUNTEER = "volunteer"
    SUPPLY = "supply"

class UrgencyLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class TaskItemBase(BaseModel):
    name: str
    quantity: Optional[int] = None
    unit: Optional[str] = None

class TaskItemCreate(TaskItemBase):
    pass

class TaskItem(TaskItemBase):
    id: int
    task_id: int

    class Config:
        orm_mode = True

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    location_name: str
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    type: TaskType
    urgency: UrgencyLevel = UrgencyLevel.MEDIUM

class TaskCreate(TaskBase):
    volunteers_needed: Optional[int] = None
    items: Optional[List[TaskItemCreate]] = None

class Task(TaskBase):
    id: int
    created_at: datetime
    updated_at: datetime
    items: Optional[List[TaskItem]] = None
    volunteers_needed: Optional[int] = None

    class Config:
        orm_mode = True