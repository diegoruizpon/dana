from sqlalchemy import Column, Integer, String, Float, Enum, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import enum

Base = declarative_base()

class TaskType(enum.Enum):
    VOLUNTEER = "volunteer"
    SUPPLY = "supply"

class UrgencyLevel(enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(Enum(TaskType), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String)
    location_name = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    urgency = Column(Enum(UrgencyLevel), default=UrgencyLevel.MEDIUM)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # For volunteer tasks
    volunteers_needed = Column(Integer)
    
    # For supply tasks
    items = relationship("TaskItem", back_populates="task")

class TaskItem(Base):
    __tablename__ = "task_items"

    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey("tasks.id"))
    name = Column(String, nullable=False)
    quantity = Column(Integer)
    unit = Column(String)

    task = relationship("Task", back_populates="items")