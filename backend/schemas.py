from pydantic import BaseModel


class ClassBase(BaseModel):
    class_id: str
    class_name: str
    advisor: str


class ClassCreate(ClassBase):
    pass


class Class(ClassBase):
    class Config:
        from_attributes = True


class StudentBase(BaseModel):
    student_id: str
    name: str
    birth_year: int
    major: str
    gpa: float
    class_id: str


class StudentCreate(StudentBase):
    pass


class Student(StudentBase):
    class Config:
        from_attributes = True