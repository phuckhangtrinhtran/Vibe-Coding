from sqlalchemy.orm import Session
from sqlalchemy import func
import models, schemas


# =================
# STUDENT
# =================

def get_students(db: Session):
    return db.query(models.Student).all()


def create_student(db: Session, student: schemas.StudentCreate):
    db_student = models.Student(**student.dict())
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student


def update_student(db: Session, student_id: str, student: schemas.StudentCreate):
    db_student = db.query(models.Student).filter(
        models.Student.student_id == student_id
    ).first()

    if not db_student:
        return None

    for key, value in student.dict().items():
        setattr(db_student, key, value)

    db.commit()
    db.refresh(db_student)
    return db_student


def delete_student(db: Session, student_id: str):
    student = db.query(models.Student).filter(
        models.Student.student_id == student_id
    ).first()

    db.delete(student)
    db.commit()


# =================
# CLASS
# =================

def create_class(db: Session, class_data: schemas.ClassCreate):
    db_class = models.Class(**class_data.dict())
    db.add(db_class)
    db.commit()
    db.refresh(db_class)
    return db_class


def get_classes(db: Session):
    return db.query(models.Class).all()


# =================
# SEARCH
# =================

def search_student(db: Session, name: str):
    return db.query(models.Student).filter(
        models.Student.name.contains(name)
    ).all()


# =================
# STATISTICS
# =================

def get_statistics(db: Session):

    total_students = db.query(models.Student).count()

    avg_gpa = db.query(func.avg(models.Student.gpa)).scalar()

    major_count = (
        db.query(models.Student.major, func.count(models.Student.major))
        .group_by(models.Student.major)
        .all()
    )

    return {
        "total_students": total_students,
        "average_gpa": avg_gpa,
        "students_by_major": major_count
    }