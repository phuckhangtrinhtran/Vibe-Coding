from pydantic import BaseModel

class StudentBase(BaseModel):
    name: str
    birth_year: int
    major: str
    gpa: float


class StudentCreate(BaseModel):
    student_id: str
    name: str
    birth_year: int
    major: str
    gpa: float


class Student(BaseModel):
    student_id: str
    name: str
    birth_year: int
    major: str
    gpa: float

    class Config:
        orm_mode = True