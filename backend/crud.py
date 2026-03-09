from sqlalchemy.orm import Session
import models, schemas

def get_students(db: Session):
    return db.query(models.Student).all()

def create_student(db: Session, student: schemas.StudentCreate):
    db_student = models.Student(**student.dict())
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

def update_student(db: Session, student_id: str, student: schemas.StudentCreate):
    db_student = db.query(models.Student).filter(models.Student.student_id == student_id).first()

    db_student.student_id = student.student_id
    db_student.name = student.name
    db_student.birth_year = student.birth_year
    db_student.major = student.major
    db_student.gpa = student.gpa

    db.commit()
    return db_student


def delete_student(db: Session, student_id: str):
    student = db.query(models.Student).filter(models.Student.student_id == student_id).first()
    db.delete(student)
    db.commit()