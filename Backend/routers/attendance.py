# backend/routers/attendance.py
from fastapi import APIRouter, Body, HTTPException
from fastapi.encoders import jsonable_encoder
from typing import List

from database import attendance_collection, employee_collection
from schemas import AttendanceCreate, AttendanceResponse

router = APIRouter()

@router.post("/", response_description="Mark attendance", response_model=AttendanceResponse)
async def mark_attendance(attendance: AttendanceCreate = Body(...)):
    employee = await employee_collection.find_one({"employee_id": attendance.employee_id})
    if not employee:
        raise HTTPException(status_code=404, detail="Employee ID not found")
    existing_record = await attendance_collection.find_one({
        "employee_id": attendance.employee_id,
        "date": attendance.date
    })
    if existing_record:
        raise HTTPException(status_code=400, detail="Attendance already marked for this date")

    attendance_dict = jsonable_encoder(attendance)
    new_attendance = await attendance_collection.insert_one(attendance_dict)
    created_attendance = await attendance_collection.find_one({"_id": new_attendance.inserted_id})
    return created_attendance

@router.get("/{employee_id}", response_model=List[AttendanceResponse])
async def get_attendance(employee_id: str):
    records = await attendance_collection.find({"employee_id": employee_id}).to_list(1000)
    return records