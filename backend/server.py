import uvicorn
from fastapi import FastAPI, Response
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi_sqlalchemy import DBSessionMiddleware, db

from config import settings
from models import Task
from schema import SchemaTask

app = FastAPI()
app.add_middleware(DBSessionMiddleware, db_url=settings.database_url)
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/tasks/")
def list_tasks():
    return db.session.query(Task).order_by(Task.is_completed, Task.id.desc()).all()


@app.post("/tasks/", response_model=SchemaTask)
def create_task(task: SchemaTask):
    db_task = Task(title=task.title, is_completed=task.is_completed)
    db.session.add(db_task)
    db.session.commit()
    return db_task


@app.put("/tasks/{task_id}/")
def complete_task(task_id: str, task: SchemaTask):
    update_task_encoded = jsonable_encoder(task)

    db_task = db.session.query(Task).get(task_id)
    for key, value in update_task_encoded.items():
        setattr(db_task, key, value)
    db.session.add(db_task)
    db.session.commit()
    return task

@app.delete("/tasks/{task_id}/", response_class=Response)
def delete_task(task_id: str):
    db_task = db.session.query(Task).get(task_id)
    db.session.delete(db_task)
    db.session.commit()
    return Response(status_code=204)

if __name__ == "__main__":
    uvicorn.run(app, host=settings.backend_host, port=settings.backend_port)
