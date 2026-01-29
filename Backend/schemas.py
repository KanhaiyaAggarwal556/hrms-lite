# backend/schemas.py
from pydantic import BaseModel, Field, EmailStr, BeforeValidator
from typing import Optional, List
from datetime import date
from typing_extensions import Annotated

PyObjectId = Annotated[str, BeforeValidator(str)]

class EmployeeBase(BaseModel):
    employee_id: str = Field(..., description="Unique Employee ID (e.g., EMP001)")
    full_name: str
    email: EmailStr
    department: str

class AttendanceBase(BaseModel):
    date: str
    status: str  

class EmployeeCreate(EmployeeBase):
    pass

class AttendanceCreate(AttendanceBase):
    employee_id: str


class AttendanceResponse(AttendanceBase):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    employee_id: str

    class Config:
        populate_by_name = True

class EmployeeResponse(EmployeeBase):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    total_present: Optional[int] = 0  # <--- ADD THIS LINE

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "employee_id": "EMP001",
                "full_name": "John Doe",
                "email": "john@example.com",
                "department": "Engineering",
                "total_present": 15
            }
        }