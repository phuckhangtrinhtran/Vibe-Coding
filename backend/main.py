from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import models, schemas, crud
from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   # cho phép React
    allow_credentials=True,
    allow_methods=["*"],     # cho phép GET POST PUT DELETE
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Student API is running"}

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/students", response_model=schemas.Student)
def add_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    return crud.create_student(db, student)

@app.get("/students", response_model=list[schemas.Student])
def list_students(db: Session = Depends(get_db)):
    return crud.get_students(db)

@app.put("/students/{student_id}")
def edit_student(student_id: str, student: schemas.StudentCreate, db: Session = Depends(get_db)):
    return crud.update_student(db, student_id, student)

@app.delete("/students/{student_id}")
def delete_student(student_id: str, db: Session = Depends(get_db)):
    crud.delete_student(db, student_id)
    return {"message": "deleted"}