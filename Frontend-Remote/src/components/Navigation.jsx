import { Link } from 'react-router-dom';
import { Building2, Calendar, Search, PhoneIcon, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-transparent fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-800">HMS</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/appointment"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment</span>
            </Link>
            <Link
              to="/doctors"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Find Doctor</span>
            </Link>
            <Link
              to="/request-call"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <PhoneIcon className="h-4 w-4" />
              <span>Request Call</span>
            </Link>
          </div>

          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-2">
            <Link
              to="/appointment"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Book Appointment
            </Link>
            <Link
              to="/doctors"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Find Doctor
            </Link>
            <Link
              to="/request-call"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Request Call
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}