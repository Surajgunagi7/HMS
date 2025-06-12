import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  UserCog,
  ChartColumnBig,
  Menu,
  LogOut,
  ShoppingBag,
  Users,
  Activity,
  X
} from "lucide-react";
import { authService } from "../../services/authService";
import { adminService, doctorService, receptionistService } from "../../services/adminDashboardService";
import { useDispatch, useSelector } from 'react-redux';
import { addUser as addAdmin } from '../../store/authSlice';
import { addAdmin as addAdminList } from "../../store/adminSlice";
import { addDoctor as addDoctorList } from "../../store/doctorSlice";
import { addReceptionist as addReceptionistList } from "../../store/receptionistSlice";
import { GlassCard, LoadingOverlay } from "../../components/common";
import toast from 'react-hot-toast';

const MANAGEMENT_ITEMS = [
  { name: "Admin", icon: UserCog, color: "#667eea", href: "manage-admins" },
  { name: "Doctor", icon: ShoppingBag, color: "#06beb6", href: "manage-doctors" },
  { name: "Receptionist", icon: Users, color: "#56ab2f", href: "manage-receptionists" },
];

const REPORT_ITEMS = [
  { name: "Revenues", icon: ChartColumnBig, color: "#667eea", href: "sales" },
  { name: "Activity", icon: Activity, color: "#667eea", href: "activity" },
];

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const res = await authService.getUserProfile();
        dispatch(addAdmin(res.data));

        const [responseAdmin, responseDoctor, responseReceptionist] = await Promise.all([
          adminService.getAdminList('admin'),
          doctorService.getDoctorList('doctor'),
          receptionistService.getReceptionistList('receptionist')
        ]);

        dispatch(addAdminList(responseAdmin.data));
        dispatch(addDoctorList(responseDoctor.data));
        dispatch(addReceptionistList(responseReceptionist.data));
        
        toast.success('Dashboard loaded successfully');
      } catch (err) {
        console.error('Error fetching user:', err);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  const handleLogout = () => {
    authService.logout("admin");
    toast.success('Logged out successfully');
  };

  const isActive = (href) => location.pathname.includes(href);

  const NavItem = ({ item, index }) => (
    <Link key={item.href} to={item.href}>
      <div
        style={{ transitionDelay: `${index * 50}ms` }}
        className={`group flex items-center px-4 py-3 rounded-xl transition-all duration-300 hover-lift
          ${isActive(item.href) 
            ? 'glass text-white shadow-lg' 
            : 'hover:glass-dark hover:text-white hover:border hover:border-gray-800/20'
          }
          ${isSidebarOpen ? "justify-start" : "justify-center"} border border-transparent  `}
      >
        <div className={`p-2 rounded-lg transition-colors duration-300 ${
          isActive(item.href) ? 'bg-white/20' : 'group-hover:bg-white/10'
        }`}>
          <item.icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
        </div>
        {isSidebarOpen && (
          <span className="ml-3 font-medium transition-all duration-300">
            {item.name}
          </span>
        )}
      </div>
    </Link>
  );

  return (
    <div className="h-screen w-full flex bg-gray-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-admin opacity-5"></div>
      
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
        fixed lg:relative h-full admin-colors
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
                  <h2 className="text-xl font-bold">Admin Panel</h2>
                  <p className="text-white/70 text-sm">Hospital Management</p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
              {/* Management Section */}
              <div className="space-y-2">
                {isSidebarOpen && (
                  <h3 className="px-4 text-xs font-bold text-white/60 uppercase tracking-wider mb-4 animate-fadeInUp">
                    Management
                  </h3>
                )}
                {MANAGEMENT_ITEMS.map((item, index) => (
                  <NavItem key={item.href} item={item} index={index} />
                ))}
              </div>

              {/* Reports Section */}
              <div className="space-y-2">
                {isSidebarOpen && (
                  <h3 className="px-4 text-xs font-bold text-white/60 uppercase tracking-wider mb-4 animate-fadeInUp">
                    Reports
                  </h3>
                )}
                {REPORT_ITEMS.map((item, index) => (
                  <NavItem key={item.href} item={item} index={index + MANAGEMENT_ITEMS.length} />
                ))}
              </div>
            </nav>

            {/* Bottom Section */}
            <div className="border-t border-white/10 p-4">
              {/* Admin Info */}
              <div className={`flex items-center mb-4 transition-all duration-300 ${
                isSidebarOpen ? "" : "justify-center"
              }`}>
                <div className="w-10 h-10 rounded-xl gradient-admin flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                {isSidebarOpen && (
                  <div className="ml-3 animate-fadeInUp">
                    <p className="text-sm font-medium">{user?.name || 'Admin'}</p>
                    <p className="text-xs text-white/60">ID: {user?.loginId || 'Loading...'}</p>
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <Link to="/">
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
              </Link>
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

export default AdminDashboard;