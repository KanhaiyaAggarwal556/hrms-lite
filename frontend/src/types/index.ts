export interface Employee {
  _id: string;
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
  total_present?: number;
}

export interface Attendance {
  _id: string;
  employee_id: string;
  date: string;
  status: 'Present' | 'Absent';
}