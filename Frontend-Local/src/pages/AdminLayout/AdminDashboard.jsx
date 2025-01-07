import { Outlet, Link } from "react-router-dom";
import {
  UserCog,
  ChartColumnBig,
  Menu,
  LogOut,
  ShoppingBag,
  Users,
  Activity
} from "lucide-react";
import { useState } from "react";
import { authService } from "../../services/authService";

const MANAGEMENT_ITEMS = [
  { name: "Admin", icon: UserCog, color: "#4B5563", href: "manage-admins" },
  { name: "Doctor", icon: ShoppingBag, color: "#4B5563", href: "manage-doctors" },
  { name: "Receptionist", icon: Users, color: "#4B5563", href: "manage-receptionists" },
];

const REPORT_ITEMS = [
  { name: "Sales", icon: ChartColumnBig, color: "#4B5563", href: "sales" },
  { name: "Activity", icon: Activity, color: "#4B5563", href: "activity" },
];

const AdminDashboard = ({ adminId = 'AD1234', adminName = "admin123" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-screen w-full flex">
      {/* Sidebar */}
      <div
        className={`relative transition-all duration-500 ease-out transform flex-shrink-0 bg-white shadow-lg
          ${isSidebarOpen ? "w-72" : "w-20"}`}
      >
        <div className="h-full flex flex-col bg-gradient-to-b from-gray-50 to-white">
          {/* Logo/Brand Area */}
          <div className="p-4 border-b">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <Menu 
                size={24} 
                className={`text-gray-700 transition-transform duration-500 ease-out
                  ${isSidebarOpen ? "" : "rotate-180"}`}
              />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-3 py-6 space-y-6">
            {/* Management Section */}
            <div>
              {isSidebarOpen && (
                <h3 className="px-3 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3
                  animate-fade-in transition-opacity duration-300 ease-in">
                  Management
                </h3>
              )}
              {MANAGEMENT_ITEMS.map((item, index) => (
                <Link key={item.href} to={item.href}>
                  <div
                    style={{
                      transitionDelay: `${index * 50}ms`
                    }}
                    className={`group flex items-center px-3 py-4 rounded-lg hover:bg-gray-100 
                      transition-all duration-300 ease-out hover:translate-x-1
                      ${isSidebarOpen ? "justify-start" : "justify-center"}`}
                  >
                    <item.icon
                      size={24}
                      className="text-gray-500 group-hover:text-blue-600 transition-colors duration-300
                        transform group-hover:scale-110"
                    />
                    {isSidebarOpen && (
                      <span className="ml-4 text-gray-700 group-hover:text-blue-600 font-medium
                        transition-all duration-300 origin-left">
                        {item.name}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Reports Section */}
            <div>
              {isSidebarOpen && (
                <h3 className="px-3 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3
                  animate-fade-in transition-opacity duration-300 ease-in">
                  Reports
                </h3>
              )}
              {REPORT_ITEMS.map((item, index) => (
                <Link key={item.href} to={item.href}>
                  <div
                    style={{
                      transitionDelay: `${(index + MANAGEMENT_ITEMS.length) * 50}ms`
                    }}
                    className={`group flex items-center px-3 py-4 rounded-lg hover:bg-gray-100 
                      transition-all duration-300 ease-out hover:translate-x-1
                      ${isSidebarOpen ? "justify-start" : "justify-center"}`}
                  >
                    <item.icon
                      size={24}
                      className="text-gray-500 group-hover:text-blue-600 transition-colors duration-300
                        transform group-hover:scale-110"
                    />
                    {isSidebarOpen && (
                      <span className="ml-4 text-gray-700 group-hover:text-blue-600 font-medium
                        transition-all duration-300 origin-left">
                        {item.name}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </nav>

          {/* Bottom Section */}
          <div className="border-t bg-gray-50 p-4 transition-all duration-500 ease-out">
            {/* Admin Info */}
            <div className={`flex items-center mb-4 transition-all duration-300
              ${isSidebarOpen ? "" : "justify-center"}`}>
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center
                transition-transform duration-300 hover:scale-110">
                <span className="text-white font-medium">
                  {adminName.charAt(0)}
                </span>
              </div>
              {isSidebarOpen && (
                <div className="ml-3 transition-all duration-300 ease-out">
                  <p className="text-sm font-medium text-gray-700">{adminName}</p>
                  <p className="text-xs text-gray-500">ID: {adminId}</p>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <Link to="/">
              <div
                className={`group flex items-center px-3 py-3 rounded-lg hover:bg-gray-200 
                  transition-all duration-300 ease-out hover:translate-x-1
                  ${isSidebarOpen ? "justify-start" : "justify-center"}`}
                onClick={() => authService.logout("admin")}
              >
                <LogOut
                  size={20}
                  className="text-gray-500 group-hover:text-red-600 transition-colors duration-300
                    transform group-hover:scale-110"
                />
                {isSidebarOpen && (
                  <span className="ml-3 text-gray-700 group-hover:text-red-600 font-medium
                    transition-all duration-300">
                    Logout
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;