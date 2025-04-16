import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../lib/firebase';
import { Users, LogOut, Home, UserCircle, Calendar, Bell, MessageSquare, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const NavLinks = () => (
    <>
      <Link to="/" className="w-full md:w-auto hover:text-blue-200 flex items-center space-x-1 group p-2 md:p-0">
        <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
        <span>Home</span>
      </Link>
      
      {user ? (
        <>
          <Link to="/events" className="w-full md:w-auto hover:text-blue-200 flex items-center space-x-1 group p-2 md:p-0">
            <Calendar className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span>Events</span>
          </Link>
          <Link to="/notifications" className="w-full md:w-auto hover:text-blue-200 flex items-center space-x-1 group relative p-2 md:p-0">
            <Bell className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span>Notifications</span>
            <div className="absolute top-0 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-xs">3</div>
          </Link>
          <Link
            to={isAdmin ? '/admin' : '/dashboard'}
            className="w-full md:w-auto hover:text-blue-200 flex items-center space-x-1 group p-2 md:p-0"
          >
            <UserCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span>{isAdmin ? 'Admin Panel' : 'Dashboard'}</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full md:w-auto hover:text-blue-200 flex items-center space-x-1 group p-2 md:p-0 text-left"
          >
            <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span>Logout</span>
          </button>
        </>
      ) : (
        <div className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2">
          <Link to="/login" className="w-full md:w-auto hover:text-blue-200 px-4 py-2 rounded-lg border border-blue-400 hover:border-blue-200 transition-colors text-center">
            Login
          </Link>
          <Link to="/register" className="w-full md:w-auto hover:bg-blue-600 px-4 py-2 rounded-lg bg-blue-500 transition-colors text-center">
            Register
          </Link>
        </div>
      )}
    </>
  );

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 md:h-20">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-white p-1.5 md:p-2 rounded-full">
                <Users className="h-6 w-6 md:h-8 md:w-8 text-blue-700" />
              </div>
              <div>
                <span className="font-bold text-lg md:text-2xl">Luton Welfare</span>
                <span className="hidden md:block text-sm text-blue-200">Association</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 -mr-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-blue-600">
            <NavLinks />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;