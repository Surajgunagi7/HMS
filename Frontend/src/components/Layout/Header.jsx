import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, X, Phone, Heart } from 'lucide-react';
import { toggleMobileMenu, closeMobileMenu, setScrolled } from '../../store/slices/uiSlice';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { mobileMenuOpen, scrolled } = useSelector((state) => state.ui);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      dispatch(setScrolled(window.scrollY > 50));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

  useEffect(() => {
    dispatch(closeMobileMenu());
  }, [location, dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => setHeaderVisible(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Book Appointment', path: '/appointment' },
    { name: 'Request Call', path: '/request-call' },
  ];

  return (
    <header
      className={`fixed top-4 left-4 right-4 z-50 smooth-transition ${
        headerVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
      } ${
        scrolled 
          ? 'liquid-glass-strong rounded-2xl' 
          : 'liquid-glass rounded-2xl'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-xl">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">MediCare</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium smooth-transition hover:text-blue-600 ${
                  location.pathname === item.path
                    ? 'text-blue-600'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Emergency Call Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+1234567890"
              className="btn-liquid text-white px-4 py-2 rounded-xl flex items-center space-x-2"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">Emergency</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => dispatch(toggleMobileMenu())}
            className="md:hidden p-2 rounded-xl liquid-glass text-gray-700 hover:text-blue-600 smooth-transition"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden smooth-transition md:hidden liquid-glass-strong border-t border-white/20 ${
          mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className={`px-6 py-4 space-y-4 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block text-base font-medium smooth-transition hover:text-blue-600 ${
                location.pathname === item.path
                  ? 'text-blue-600'
                  : 'text-gray-700'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <a
            href="tel:+1234567890"
            className="btn-liquid text-white px-4 py-2 rounded-xl flex items-center space-x-2 w-fit"
          >
            <Phone className="h-4 w-4" />
            <span className="text-sm font-medium">Emergency</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;