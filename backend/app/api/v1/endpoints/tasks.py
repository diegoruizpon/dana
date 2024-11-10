from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ....database import get_db
from ....schemas.task import Task, TaskCreate
from ....models import models

router = APIRouter()

@router.post("/", response_model=Task)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    db_task = models.Task(
        type=task.type,
        title=task.title,
        description=task.description,
        location_name=task.location_name,
        latitude=task.latitude,
        longitude=task.longitude,
        urgency=task.urgency,
        volunteers_needed=task.volunteers_needed
    )
    db.add(db_task)
    
    if task.items:
        for item in task.items:
            db_item = models.TaskItem(**item.dict(), task_id=db_task.id)
            db.add(db_item)
    
    db.commit()
    db.refresh(db_task)
    return db_task

@router.get("/", response_model=List[Task])
def get_tasks(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    tasks = db.query(models.Task).offset(skip).limit(limit).all()
    return tasks

@router.get("/{task_id}", response_model=Task)
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task