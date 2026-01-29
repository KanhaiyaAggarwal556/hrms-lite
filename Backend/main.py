from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import employees, attendance

app = FastAPI()

origins = [
    "http://localhost:5173",  
    "http://localhost:5174",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(employees.router, tags=["Employees"], prefix="/api/employees")
app.include_router(attendance.router, tags=["Attendance"], prefix="/api/attendance")

@app.get("/")
def read_root():
    return {"message": "HRMS Lite API is running with MongoDB"}