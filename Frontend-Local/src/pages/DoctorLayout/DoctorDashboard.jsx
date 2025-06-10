import React from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { authService } from "../../services/authService";
import { 
  UserCircle, 
  Calendar, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { appointmentService } from "../../services/appointmentsService";

import { useDispatch } from "react-redux";
import { setAppointments } from "../../store/appointmentSlice";
import { addDoctor } from "../../store/doctorSlice";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {  
      const fetchAppointments = async () => {
        try {
          const res = await appointmentService.getAppointments();
          dispatch(setAppointments(res.data || []));

          const resP = await authService.getUserProfile();
          dispatch(addDoctor(resP.data));
        } catch (err) {
          console.error("Error fetching appointments:", err);
        }
      };
      fetchAppointments();
  }, [dispatch]);
  
  const handleLogout = () => {
    authService.logout('doctor');
    navigate("/");
  };

  const navLinks = [
    {
      to: "/doctor-dashboard/profile",
      icon: UserCircle,
      label: "Profile"
    },
    {
      to: "/doctor-dashboard/appointments",
      icon: Calendar,
      label: "Appointments"
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Doctor Dashboard</h1>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              {navLinks.map(({ to, icon: Icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 
                    ${isActive(to)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  <Icon size={18} className="mr-2" />
                  {label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 rounded-lg text-sm font-medium
                         text-red-600 hover:bg-red-50 transition-colors duration-150"
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </button>
            </nav>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map(({ to, icon: Icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium
                    ${isActive(to)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon size={18} className="mr-2" />
                  {label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium
                         text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DoctorDashboard;