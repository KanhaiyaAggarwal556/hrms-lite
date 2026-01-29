// src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import { Users, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 transition">
              <Users className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl tracking-tight">HRMS Lite</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="flex items-center text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              <LayoutDashboard className="w-4 h-4 mr-1" />
              Dashboard
            </Link>
            <Link 
              to="/add" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 shadow-sm transition"
            >
              + Add Employee
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;