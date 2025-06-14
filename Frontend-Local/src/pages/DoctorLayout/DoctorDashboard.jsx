import React from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { authService } from "../../services/authService";
import { 
  UserCircle, 
  Calendar, 
  LogOut,
  Menu,
  X,
  Stethoscope
} from "lucide-react";
import { appointmentService } from "../../services/appointmentsService";
import { useDispatch, useSelector } from "react-redux";
import { setAppointments } from "../../store/appointmentSlice";
import { addDoctor } from "../../store/doctorSlice";
import {addUser} from "../../store/authSlice";
import { GlassCard, LoadingOverlay } from "../../components/common";
import toast from 'react-hot-toast';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  React.useEffect(() => {  
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [appointmentsRes, profileRes] = await Promise.all([
          appointmentService.getAppointments(),
          authService.getUserProfile()
        ]);
        
        dispatch(setAppointments(appointmentsRes.data || []));
        dispatch(addDoctor(profileRes.data));
        dispatch(addUser(profileRes.data));
        toast.success('Dashboard loaded successfully');
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);
  
  const handleLogout = () => {
    authService.logout('doctor');
    toast.success('Logged out successfully');
    navigate("/");
  };

  const navLinks = [
    {
      to: "/doctor-dashboard/appointments",
      icon: Calendar,
      label: "Appointments",
      color: "#06beb6"
    },
    {
      to: "/doctor-dashboard/profile",
      icon: UserCircle,
      label: "Profile",
      color: "#48b1bf"
    },
  ];

  const isActive = (path) => location.pathname === path;

  const NavItem = ({ item, index }) => (
    <Link key={item.to} to={item.to}>
      <div
        style={{ transitionDelay: `${index * 50}ms` }}
        className={`group flex items-center px-4 py-3 rounded-xl transition-all duration-300 hover-lift
          ${isActive(item.to) 
            ? 'glass text-white shadow-lg' 
            : 'hover:glass-dark hover:text-white hover:border hover:border-gray-800/20'
          }
          ${isSidebarOpen ? "justify-start" : "justify-center"} border border-transparent`}
      >
        <div className={`p-2 rounded-lg transition-colors duration-300 ${
          isActive(item.to) ? 'bg-white/20' : 'group-hover:bg-white/10'
        }`}>
          <item.icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
        </div>
        {isSidebarOpen && (
          <span className="ml-3 font-medium transition-all duration-300">
            {item.label}
          </span>
        )}
      </div>
    </Link>
  );

  return (
    <div className="h-screen w-full flex bg-gray-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-doctor opacity-5"></div>
      
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        relative transition-all duration-500 ease-out flex-shrink-0 z-50
        ${isSidebarOpen ? "w-72" : "w-20"}
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        fixed lg:relative h-full gradient-doctor
      `}>
        <GlassCard className="h-full rounded-none lg:rounded-r-3xl" background="glass-dark" padding="p-0">
          <div className="h-full flex flex-col text-white">
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <Menu size={24} className={`transition-transform duration-500 ${
                    isSidebarOpen ? "" : "rotate-180"
                  }`} />
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl hover:bg-white/10 transition-all duration-300 lg:hidden"
                >
                  <X size={24} />
                </button>
              </div>
              {isSidebarOpen && (
                <div className="mt-4 animate-fadeInUp">
                  <h2 className="text-xl font-bold">Doctor Panel</h2>
                  <p className="text-white/70 text-sm">Medical Dashboard</p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
              {navLinks.map((item, index) => (
                <NavItem key={item.to} item={item} index={index} />
              ))}
            </nav>

            {/* Bottom Section */}
            <div className="border-t border-white/10 p-4">
              {/* Doctor Info */}
              <div className={`flex items-center mb-4 transition-all duration-300 ${
                isSidebarOpen ? "" : "justify-center"
              }`}>
                <div className="w-10 h-10 rounded-xl gradient-doctor flex items-center justify-center shadow-lg">
                  <Stethoscope className="text-white" size={20} />
                </div>
                {isSidebarOpen && (
                  <div className="ml-3 animate-fadeInUp">
                    <p className="text-sm font-medium">{user?.name || 'Doctor'}</p>
                    <p className="text-xs text-white/60">ID: {user?.loginId || 'Loading...'}</p>
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <div
                className={`group flex items-center px-4 py-3 rounded-xl hover:bg-red-500/80 
                  transition-all duration-300 hover-lift cursor-pointer
                  ${isSidebarOpen ? "justify-start" : "justify-center"}`}
                onClick={handleLogout}
              >
                <LogOut size={20} className="text-red-600 group-hover:text-white transition-colors duration-300" />
                {isSidebarOpen && (
                  <span className="ml-3 text-red-600 group-hover:text-white font-medium transition-colors duration-300">
                    Logout
                  </span>
                )}
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-4 left-4 z-30 p-3 glass-dark rounded-xl text-white lg:hidden hover:scale-105 transition-transform duration-300"
      >
        <Menu size={24} />
      </button>

      {/* Main Content */}
      <div className="flex-1 relative z-10">
        <LoadingOverlay isLoading={isLoading} message="Loading dashboard...">
          <div className="h-full overflow-auto">
            <Outlet />
          </div>
        </LoadingOverlay>
      </div>
    </div>
  );
};

export default DoctorDashboard;