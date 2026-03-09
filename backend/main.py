from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import csv

import models, schemas, crud
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Student API running"}


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# =================
# STUDENT
# =================

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


# =================
# CLASS
# =================

@app.post("/classes")
def create_class(class_data: schemas.ClassCreate, db: Session = Depends(get_db)):
    return crud.create_class(db, class_data)


@app.get("/classes")
def get_classes(db: Session = Depends(get_db)):
    return crud.get_classes(db)


# =================
# SEARCH
# =================

@app.get("/students/search")
def search_students(name: str, db: Session = Depends(get_db)):
    return crud.search_student(db, name)


# =================
# STATISTICS
# =================

@app.get("/statistics")
def statistics(db: Session = Depends(get_db)):
    return crud.get_statistics(db)


# =================
# EXPORT CSV
# =================

@app.get("/export/csv")
def export_csv(db: Session = Depends(get_db)):

    students = crud.get_students(db)

    file_path = "students_export.csv"

    with open(file_path, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)

        writer.writerow(["ID", "Name", "Birth Year", "Major", "GPA", "Class"])

        for s in students:
            writer.writerow([
                s.student_id,
                s.name,
                s.birth_year,
                s.major,
                s.gpa,
                s.class_id
            ])

    return FileResponse(file_path, media_type='text/csv', filename="students.csv")