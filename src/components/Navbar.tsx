import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Stethoscope, User, ShoppingBag, Activity, MapPin, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-primary font-bold text-xl">Ayur Vaidya Pro</Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                <Home className="mr-1 h-4 w-4" />
                Home
              </Link>
              <Link to="/symptom-checker" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                <Stethoscope className="mr-1 h-4 w-4" />
                Symptom Checker
              </Link>
              <Link to="/doctors" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                <User className="mr-1 h-4 w-4" />
                Doctors
              </Link>
              <Link to="/shop" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                <ShoppingBag className="mr-1 h-4 w-4" />
                Shop
              </Link>
              <Link to="/yoga" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                <Activity className="mr-1 h-4 w-4" />
                Yoga & Wellness
              </Link>
              <Link to="/locations" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                <MapPin className="mr-1 h-4 w-4" />
                Locations
              </Link>
            </div>
          </div>

          <div className="hidden md:ml-6 md:flex md:items-center space-x-2">
            <Link to="/cart" className="relative p-1 rounded-full text-gray-500 hover:text-gray-900">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute top-0 right-0 bg-primary text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">0</span>
            </Link>
            <Link to="/login" className="btn btn-outline-primary">Login</Link>
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
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
            <Link to="/" className="block pl-3 pr-4 py-2 border-l-4 border-primary text-base font-medium text-primary bg-primary-50">
              Home
            </Link>
            <Link to="/symptom-checker" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
              Symptom Checker
            </Link>
            <Link to="/doctors" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
              Doctors
            </Link>
            <Link to="/shop" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
              Shop
            </Link>
            <Link to="/yoga" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
              Yoga & Wellness
            </Link>
            <Link to="/locations" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
              Locations
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4 space-x-2">
              <Link to="/login" className="btn btn-outline-primary w-full">Login</Link>
              <Link to="/register" className="btn btn-primary w-full">Sign Up</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}