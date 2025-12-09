import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, TrendingUp, Users, CheckCircle } from 'lucide-react';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../lib/auth-context';

export default function LandingPage() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchKeyword) params.set('keyword', searchKeyword);
    if (searchLocation) params.set('location', searchLocation);
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Connect with top employers and discover opportunities that match your skills and aspirations.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="bg-white rounded-lg p-2 shadow-xl flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Job title, keywords, or company"
                  className="w-full pl-10 pr-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="Location or Remote"
                  className="w-full pl-10 pr-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <button type="submit" className="btn btn-accent px-8 py-3">
                Search Jobs
              </button>
            </form>

            {/* Quick Filters */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Link
                to="/jobs?workSchedule=FULL_TIME"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm font-medium transition-colors"
              >
                Full-time
              </Link>
              <Link
                to="/jobs?employment=REMOTE"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm font-medium transition-colors"
              >
                Remote
              </Link>
              <Link
                to="/jobs?category=Technology"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm font-medium transition-colors"
              >
                Tech
              </Link>
              <Link
                to="/jobs?category=Design"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm font-medium transition-colors"
              >
                Design
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600 mb-8 font-medium">Trusted by Companies</p>
          <div className="relative">
            <style>{`
              @keyframes scroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              .animate-scroll {
                animation: scroll 25s linear infinite;
              }
              .animate-scroll:hover {
                animation-play-state: paused;
              }
            `}</style>
            <div className="flex animate-scroll whitespace-nowrap">
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex items-center gap-16 shrink-0">
                  <div className="w-32 h-16 flex items-center justify-center">
                    <img src="/src/images/uber.png" alt="Uber" className="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all" />
                  </div>
                  <div className="w-32 h-16 flex items-center justify-center">
                    <img src="/src/images/jet.png" alt="Jet" className="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all" />
                  </div>
                  <div className="w-32 h-16 flex items-center justify-center">
                    <img src="/src/images/mercor.png" alt="Mercor" className="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all" />
                  </div>
                  <div className="w-32 h-16 flex items-center justify-center">
                    <img src="/src/images/scale.png" alt="Scale" className="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all" />
                  </div>
                  <div className="w-32 h-16 flex items-center justify-center">
                    <img src="/src/images/wf.png" alt="WF" className="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all" />
                  </div>
                  <div className="w-32 h-16 flex items-center justify-center">
                    <img src="/src/images/download.jpeg" alt="Company" className="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-accent/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Search Jobs</h3>
              <p className="text-gray-600">
                Use advanced filters to find jobs that match your skills, location, and preferences.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-accent/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Apply Easily</h3>
              <p className="text-gray-600">
                Submit your application with a cover letter and resume in just a few clicks.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-accent/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Grow Your Career</h3>
              <p className="text-gray-600">
                Track your applications and get matched with opportunities that fit your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Everything you need to find your next opportunity
              </h2>
              <div className="space-y-4">
                {[
                  'Advanced search and filtering',
                  'Real-time job matching',
                  'Easy application process',
                  'Application tracking',
                  'Company profiles and reviews',
                  'Email notifications',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              {!isAuthenticated && (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="mt-6 btn btn-primary"
                >
                  Get Started Free
                </button>
              )}
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg p-8">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg"></div>
                    <div>
                      <div className="font-semibold">Senior UI/UX Designer</div>
                      <div className="text-sm text-gray-600">TechCorp • San Francisco</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Remote</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Full-time</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg"></div>
                    <div>
                      <div className="font-semibold">Full Stack Developer</div>
                      <div className="text-sm text-gray-600">StartupHub • New York</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Hybrid</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Full-time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to find your dream job?</h2>
          <p className="text-xl mb-8 text-gray-200">
            Join thousands of job seekers and employers on Taskify today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="btn bg-white text-primary hover:bg-gray-100"
                >
                  Sign Up Free
                </button>
                <Link to="/jobs" className="btn btn-outline-primary border-white text-white hover:bg-white/10">
                  Browse Jobs
                </Link>
              </>
            ) : (
              <Link to="/jobs" className="btn bg-white text-primary hover:bg-gray-100">
                Browse Jobs
              </Link>
            )}
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="register"
      />
    </div>
  );
}

