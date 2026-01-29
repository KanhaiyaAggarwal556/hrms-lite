# backend/routers/employees.py
from fastapi import APIRouter, Body, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List

from database import employee_collection
from schemas import EmployeeCreate, EmployeeResponse

router = APIRouter()

@router.post("/", response_description="Add new employee", response_model=EmployeeResponse)
async def create_employee(employee: EmployeeCreate = Body(...)):
    existing_user = await employee_collection.find_one({
        "$or": [{"email": employee.email}, {"employee_id": employee.employee_id}]
    })
    
    if existing_user:
        raise HTTPException(
            status_code=400, 
            detail="Employee with this Email or ID already exists"
        )

    employee_dict = jsonable_encoder(employee)
    new_employee = await employee_collection.insert_one(employee_dict)
    
    created_employee = await employee_collection.find_one({"_id": new_employee.inserted_id})
    return created_employee

@router.delete("/{id}", response_description="Delete an employee")
async def delete_employee(id: str):
    # We delete by the custom 'employee_id' (EMP001), not the Mongo Object ID, for simplicity
    delete_result = await employee_collection.delete_one({"employee_id": id})

    if delete_result.deleted_count == 1:
        return {"message": f"Employee {id} deleted successfully"}

    raise HTTPException(status_code=404, detail=f"Employee {id} not found")


@router.get("/", response_description="List all employees", response_model=List[EmployeeResponse])
async def get_employees():
    pipeline = [
        {
            "$lookup": {
                "from": "attendance",
                "localField": "employee_id",
                "foreignField": "employee_id",
                "as": "attendance_logs"
            }
        },
        {
            "$addFields": {
                "total_present": {
                    "$size": {
                        "$filter": {
                            "input": "$attendance_logs",
                            "as": "log",
                            "cond": { "$eq": ["$$log.status", "Present"] }
                        }
                    }
                }
            }
        },
        {
            "$project": {
                "attendance_logs": 0 
            }
        }
    ]
    
    employees = await employee_collection.aggregate(pipeline).to_list(1000)
    return employees