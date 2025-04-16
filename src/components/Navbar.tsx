import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../lib/firebase';
import { Users, LogOut, Home, UserCircle, Calendar, Bell, MessageSquare, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <Link to="/" className="hover:text-blue-200 flex items-center space-x-1 group">
        <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
        <span>Home</span>
      </Link>
      
      {user ? (
        <>
          <Link to="/events" className="hover:text-blue-200 flex items-center space-x-1 group">
            <Calendar className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span>Events</span>
          </Link>
          <Link to="/notifications" className="hover:text-blue-200 flex items-center space-x-1 group relative">
            <Bell className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-xs">3</div>
          </Link>
          <Link
            to={isAdmin ? '/admin' : '/dashboard'}
            className="hover:text-blue-200 flex items-center space-x-1 group"
          >
            <UserCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span>{isAdmin ? 'Admin Panel' : 'Dashboard'}</span>
          </Link>
          <button
            onClick={handleLogout}
            className="hover:text-blue-200 flex items-center space-x-1 group"
          >
            <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span>Logout</span>
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="hover:text-blue-200 px-4 py-2 rounded-lg border border-blue-400 hover:border-blue-200 transition-colors">
            Login
          </Link>
          <Link to="/register" className="hover:bg-blue-600 px-4 py-2 rounded-lg bg-blue-500 transition-colors">
            Register
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-full">
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
              className="text-white p-2"
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
          <div className="md:hidden py-4 space-y-4">
            <NavLinks />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;