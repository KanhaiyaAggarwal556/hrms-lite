# HRMS Lite - Full Stack Assignment

A lightweight Human Resource Management System designed to manage employee records and track daily attendance efficiently. This project was built as part of a full-stack coding assignment to demonstrate a clean, modular, and production-ready architecture.

## 🚀 Live Demo (Deployment)
* **Frontend (Vercel):** [INSERT_YOUR_FRONTEND_URL_HERE]
* **Backend API (Render):** [INSERT_YOUR_BACKEND_URL_HERE] /docs

---

## 🛠 Tech Stack

### **Backend**
* **Framework:** FastAPI (Python) - Chosen for high performance and automatic documentation.
* **Database:** MongoDB Atlas (NoSQL) - Flexible schema for rapid iteration.
* **Driver:** Motor (Async MongoDB driver).
* **Validation:** Pydantic models.

### **Frontend**
* **Framework:** React + TypeScript (Vite) - For type safety and speed.
* **Styling:** Tailwind CSS - For a clean, professional, and responsive UI.
* **State/Network:** Axios, React Hooks.
* **Icons:** Lucide React.

---

## ✨ Features
1.  **Employee Management:**
    * Add new employees with validation (checks for duplicate Email/IDs).
    * View list of all employees.
    * Delete employee records.
2.  **Attendance System:**
    * Mark attendance (Present/Absent) for specific dates.
    * View attendance history per employee.
    * **Bonus:** "Total Present Days" calculated dynamically via MongoDB Aggregation.
3.  **UI/UX:**
    * Professional, responsive layout.
    * Toast notifications for success/error states.
    * Loading states and empty state handling.

---

## ⚙️ How to Run Locally

### Prerequisites
* Node.js (v16+)
* Python (v3.9+)
* MongoDB Connection String

### 1. Backend Setup
Navigate to the backend folder:
```bash
cd backend