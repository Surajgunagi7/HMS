import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { LogOut, User, Calendar, UserPlus, Search, PhoneCall } from "lucide-react";
import { authService } from '../../services/authService';

const ReceptionistDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout('receptionist');
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
            Receptionist Dashboard
          </h2>
          <div className="flex items-center gap-6">
            <Link 
              to="/receptionist-dashboard/manage-appointments" 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:scale-105 transform transition-all duration-200 ease-out group relative"
            >
              <Calendar size={20} className="group-hover:rotate-12 transition-transform duration-200" />
              <span>Manage Appointments</span>
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
            </Link>
            <Link 
              to="/receptionist-dashboard/create-appointment" 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:scale-105 transform transition-all duration-200 ease-out group relative"
            >
              <UserPlus size={20} className="group-hover:rotate-12 transition-transform duration-200" />
              <span>Create Appointment</span>
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
            </Link>
            <Link 
              to="/receptionist-dashboard/search-patient" 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:scale-105 transform transition-all duration-200 ease-out group relative"
            >
              <Search size={20} className="group-hover:rotate-12 transition-transform duration-200" />
              <span>Search Patient</span>
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
            </Link>
            <Link 
              to="/receptionist-dashboard/requested-calls" 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:scale-105 transform transition-all duration-200 ease-out group relative"
            >
              <PhoneCall size={20} className="group-hover:rotate-12 transition-transform duration-200" />
              <span>Requested Calls</span>
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:scale-105 transform transition-all duration-200 ease-out group px-4 py-2 rounded-lg hover:bg-red-50"
            >
              <LogOut size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300 animate-fadeIn">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};



export default ReceptionistDashboard;