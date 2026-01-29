// src/pages/AddEmployee.tsx
import { useState, type FormEvent,type  ChangeEvent } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Save, X } from 'lucide-react';

interface FormData {
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
}

const AddEmployee = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  
  const [formData, setFormData] = useState<FormData>({
    employee_id: '',
    full_name: '',
    email: '',
    department: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/employees/', formData);
      toast.success('Employee added successfully!');
      navigate('/');
    } catch (error: any) {
      const errorMsg = error.response?.data?.detail || 'Failed to add employee';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Add New Employee</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Employee ID</label>
            <input
              type="text"
              name="employee_id"
              placeholder="e.g., EMP001"
              required
              value={formData.employee_id}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="full_name"
              placeholder="e.g., John Doe"
              required
              value={formData.full_name}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Department</label>
            <select
              name="department"
              required
              value={formData.department}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
            >
              <X className="w-4 h-4 mr-2" /> Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition shadow-sm"
            >
              <Save className="w-4 h-4 mr-2" /> 
              {loading ? 'Saving...' : 'Save Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;