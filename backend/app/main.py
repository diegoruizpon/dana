# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

app = FastAPI(title="API de Ayuda en Inundaciones")

# Configuración CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos básicos
class TareaRecurso(BaseModel):
    id: Optional[int] = None
    tipo: str  # 'suministros' o 'equipamiento'
    titulo: str
    ubicacion: str
    urgencia: str  # 'alta', 'media', 'baja'
    descripcion: str
    elementos: List[str]
    fecha_creacion: Optional[datetime] = None

# Almacenamiento en memoria para desarrollo
tareas_db = []
contador_tareas = 1

@app.get("/")
async def leer_raiz():
    return {"estado": "ok", "mensaje": "API de Ayuda en Inundaciones"}

@app.get("/api/tareas", response_model=List[TareaRecurso])
async def obtener_tareas():
    return tareas_db

@app.post("/api/tareas", response_model=TareaRecurso)
async def crear_tarea(tarea: TareaRecurso):
    global contador_tareas
    
    nueva_tarea = tarea.dict()
    nueva_tarea["id"] = contador_tareas
    nueva_tarea["fecha_creacion"] = datetime.now()
    
    tareas_db.append(nueva_tarea)
    contador_tareas += 1
    
    return nueva_tarea

@app.get("/api/tareas/{id_tarea}", response_model=Optional[TareaRecurso])
async def obtener_tarea(id_tarea: int):
    for tarea in tareas_db:
        if tarea["id"] == id_tarea:
            return tarea
    return None