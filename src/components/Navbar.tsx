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
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="flex items-center">
                  <img src="/src/images/image.png" alt="Taskify Logo" className="h-10 w-auto mr-2" />
                  <span className="text-primary font-bold text-xl">Taskify</span>
                </Link>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-4 md:items-center">
                {/* Jobs Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setShowJobsDropdown(true)}
                  onMouseLeave={() => setShowJobsDropdown(false)}
                >
                  <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary">
                    Jobs
                    <ChevronDown className="ml-1 h-4 w-4" />
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
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Refer & Earn
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
              </div>
            </div>

            <div className="hidden md:ml-6 md:flex md:items-center space-x-4">
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

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {/* Mobile Jobs Submenu */}
              <div className="px-3 py-2">
                <div className="text-base font-medium text-gray-700 mb-1">Jobs</div>
                <Link
                  to="/jobs"
                  className="block pl-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Find Jobs
                </Link>
                <Link
                  to="/contact"
                  className="block pl-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Post a Job
                </Link>
              </div>
              
              <Link
                to="/pricing"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {isAuthenticated && user?.role === 'EMPLOYER' && (
                <Link
                  to="/employer/dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Dashboard
                </Link>
              )}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              {isAuthenticated ? (
                <div className="px-4 space-y-2">
                  <div className="text-sm text-gray-700 px-3 py-2">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <button onClick={handleLogout} className="w-full btn btn-outline-primary">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center px-4 space-x-2">
                  <button
                    onClick={() => {
                      setShowAuthModal(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex-1 btn btn-outline-primary"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setShowAuthModal(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex-1 btn btn-primary"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />
    </>
  );
}