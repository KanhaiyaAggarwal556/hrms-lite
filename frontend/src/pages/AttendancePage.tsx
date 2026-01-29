import { useEffect, useState, type FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { type Employee, type Attendance } from '../types';
import { toast } from 'react-toastify';
import { ArrowLeft, CheckCircle, XCircle, Calendar } from 'lucide-react';

const AttendancePage = () => {
  const { id } = useParams<{ id: string }>(); 
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [history, setHistory] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]); 
  const [status, setStatus] = useState<'Present' | 'Absent'>('Present');
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try{
        const empRes = await api.get<Employee[]>('/employees/');
        const currentEmp = empRes.data.find(e => e.employee_id === id);
        
        if (currentEmp) {
            setEmployee(currentEmp);
            const attRes = await api.get<Attendance[]>(`/attendance/${id}`);
            const sortedHistory = attRes.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setHistory(sortedHistory);
        } else {
            toast.error("Employee not found");
        }
    } catch (error) {
        toast.error("Error loading data");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleMarkAttendance = async (e: FormEvent) => {
    e.preventDefault();
    if (!employee) return;
    setSubmitting(true);

    try {
        await api.post('/attendance/', {
            employee_id: employee.employee_id,
            date: date,
            status: status
        });
        toast.success(`Marked as ${status}`);
        fetchData();
    } catch (error: any) {
        const msg = error.response?.data?.detail || "Failed to mark attendance";
        toast.error(msg);
    } finally {
        setSubmitting(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!employee) return <div className="p-10 text-center">Employee not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="text-gray-500 hover:text-blue-600 flex items-center mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">{employee.full_name}</h1>
        <p className="text-gray-600">{employee.department} • {employee.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" /> Mark Attendance
                </h3>
                <form onSubmit={handleMarkAttendance} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Date</label>
                        <input 
                            type="date" 
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Status</label>
                        <div className="flex space-x-2">
                            <button
                                type="button"
                                onClick={() => setStatus('Present')}
                                className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                                    status === 'Present' 
                                    ? 'bg-green-100 text-green-800 border-2 border-green-500' 
                                    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                                }`}
                            >
                                Present
                            </button>
                            <button
                                type="button"
                                onClick={() => setStatus('Absent')}
                                className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                                    status === 'Absent' 
                                    ? 'bg-red-100 text-red-800 border-2 border-red-500' 
                                    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                                }`}
                            >
                                Absent
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={submitting}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-blue-300"
                    >
                        {submitting ? 'Saving...' : 'Save Record'}
                    </button>
                </form>
            </div>
        </div>

        <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">Attendance History</h3>
                    <span className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                        Total: {history.length}
                    </span>
                </div>
                
                <div className="max-h-[400px] overflow-y-auto">
                    {history.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 text-sm">No records found.</div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-100">
                            <tbody className="divide-y divide-gray-100">
                                {history.map((record) => (
                                    <tr key={record._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-3 text-sm text-gray-900 font-medium">
                                            {record.date}
                                        </td>
                                        <td className="px-6 py-3 text-sm text-right">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                record.status === 'Present' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                                {record.status === 'Present' ? <CheckCircle className="w-3 h-3 mr-1"/> : <XCircle className="w-3 h-3 mr-1"/>}
                                                {record.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AttendancePage;