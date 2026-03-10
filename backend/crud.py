from sqlalchemy.orm import Session
from sqlalchemy import func
import models, schemas


# =================
# STUDENT
# =================

def get_students(db: Session):

    students = db.query(models.Student).all()

    result = []

    for s in students:

        advisor = None

        if s.classroom:
            advisor = s.classroom.advisor

        result.append({
            "student_id": s.student_id,
            "name": s.name,
            "birth_year": s.birth_year,
            "major": s.major,
            "gpa": s.gpa,
            "class_id": s.class_id,
            "advisor": advisor
        })

    return result


def create_student(db: Session, student: schemas.StudentCreate):

    # validate class exists
    db_class = db.query(models.Class).filter(
        models.Class.class_id == student.class_id
    ).first()

    if not db_class:
        raise ValueError("Class ID does not exist")

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

    # validate class exists
    db_class = db.query(models.Class).filter(
        models.Class.class_id == student.class_id
    ).first()

    if not db_class:
        raise ValueError("Class ID does not exist")

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

def update_class(db: Session, class_id: str, class_data: schemas.ClassCreate):

    db_class = db.query(models.Class).filter(
        models.Class.class_id == class_id
    ).first()

    if not db_class:
        return None

    db_class.class_name = class_data.class_name
    db_class.advisor = class_data.advisor

    db.commit()
    db.refresh(db_class)

    return db_class

def delete_class(db: Session, class_id: str):

    db_class = db.query(models.Class).filter(
        models.Class.class_id == class_id
    ).first()

    if not db_class:
        return None

    # check students
    student_count = db.query(models.Student).filter(
        models.Student.class_id == class_id
    ).count()

    db.query(models.Student).filter(
    models.Student.class_id == class_id
    ).delete()

    db.delete(db_class)
    db.commit()

    return True
# =================
# SEARCH
# =================

def search_student(db: Session, name: str):

    students = db.query(models.Student).filter(
        func.lower(models.Student.name).like(f"%{name.lower()}%")
    ).all()

    result = []

    for s in students:

        advisor = None

        if s.classroom:
            advisor = s.classroom.advisor

        result.append({
            "student_id": s.student_id,
            "name": s.name,
            "birth_year": s.birth_year,
            "major": s.major,
            "gpa": s.gpa,
            "class_id": s.class_id,
            "advisor": advisor
        })

    return result

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

    major_result = []

    for major, count in major_count:
        major_result.append({
            "major": major,
            "count": count
        })

    return {
        "total_students": total_students,
        "average_gpa": float(avg_gpa) if avg_gpa else 0,
        "students_by_major": major_result
    }