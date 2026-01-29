import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddEmployee from './pages/AddEmployee';
import AttendancePage from './pages/AttendancePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/attendance/:id" element={<AttendancePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;