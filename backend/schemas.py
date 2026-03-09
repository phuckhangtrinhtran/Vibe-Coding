from pydantic import BaseModel

class StudentBase(BaseModel):
    student_id: str
    name: str
    birth_year: int
    major: str
    gpa: float


class StudentCreate(StudentBase):
    pass


class Student(StudentBase):
    class Config:
        orm_mode = True