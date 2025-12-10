import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../lib/auth-context';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showJobsDropdown, setShowJobsDropdown] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // Close modal when user becomes authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setShowAuthModal(false);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="bg-white shadow top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16">
      {/* Logo on the left */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <span className="text-primary font-bold text-xl">Taskify</span>
        </Link>
      </div>

      {/* Centered Navigation */}
      <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
  <nav className="flex space-x-8 py-3 items-center">
    {/* Jobs Dropdown */}
    <div 
      className="relative"
      onMouseEnter={() => setShowJobsDropdown(true)}
      onMouseLeave={() => setShowJobsDropdown(false)}
    >
      <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary">
        Jobs
        
      </button>
      
      {/* Dropdown Menu */}
      <div 
        className={`absolute left-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 transition-all duration-200 ${
          showJobsDropdown ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="py-1">
          <Link
            to="/jobs"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
            onClick={() => setShowJobsDropdown(false)}
          >
            Find Jobs
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
            onClick={() => setShowJobsDropdown(false)}
          >
            Post a Job
          </Link>
        </div>
      </div>
    </div>
    
    <Link
      to="/pricing"
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary"
    >
      Pricing
    </Link>
    <Link
      to="/refer"
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700"
    >
      Blogs
    </Link>
    <Link
      to="/contact"
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary"
    >
      Contact
    </Link>
    {isAuthenticated && user?.role === 'EMPLOYER' && (
      <Link
        to="/employer/dashboard"
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary"
      >
        Dashboard
      </Link>
    )}
  </nav>
</div>

      {/* Auth buttons on the right */}
      <div className="hidden md:flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-700">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
            <button onClick={handleLogout} className="btn btn-outline-primary">
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setShowAuthModal(true)}
              className="btn btn-outline-primary"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setShowAuthModal(true);
              }}
              className="btn btn-primary"
            >
              Get Started
            </button>
          </>
        )}
      </div>

      {/* Mobile menu button */}
      <div className="flex items-center md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
    </div>
  </div>

  {/* Mobile menu remains the same */}
  {/* ... */}
</nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />
    </>
  );
}