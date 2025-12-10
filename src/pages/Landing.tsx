import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Briefcase, Users, ArrowRight, Building2, Shield, Zap, Clock, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import AuthModal from '../components/AuthModal';

import { useAuth } from '../lib/auth-context';
import { motion } from 'framer-motion';
import '../styles/rocken.css';
import SlidingBrands from './SlidingBrands';

// Define the type for categorized suggestions
interface CategoryGroup {
  category: string;
  roles: string[];
}

export default function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Search functionality for role suggestions
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<CategoryGroup[]>([]);
  const searchBarRef = useRef<HTMLDivElement>(null);
  
  const roleCategories: CategoryGroup[] = [
    {
      category: "Technical Roles",
      roles: [
        "Software Engineer", 
        "Frontend Developer", 
        "Backend Developer", 
        "Full Stack Developer",
        "DevOps Engineer", 
        "QA Engineer", 
        "Cloud Architect", 
        "Cybersecurity Analyst",
        "AI/ML Engineer",
        "Data Scientist",
        "Mobile Developer",
        "Systems Administrator"
      ]
    },
    {
      category: "Business & Management",
      roles: [
        "Product Manager",
        "Project Manager",
        "Business Analyst",
        "Operations Manager",
        "Sales Manager",
        "Account Executive",
        "Marketing Manager",
        "HR Manager"
      ]
    },
    {
      category: "Design & Creative",
      roles: [
        "UI/UX Designer",
        "Graphic Designer",
        "Product Designer",
        "Visual Designer",
        "Motion Graphics Designer",
        "Content Designer"
      ]
    },
    {
      category: "Data & Analytics",
      roles: [
        "Data Analyst",
        "Data Engineer",
        "Business Intelligence Analyst",
        "Data Scientist",
        "Machine Learning Engineer",
        "Data Architect"
      ]
    },
    {
      category: "Customer Service",
      roles: [
        "Customer Support Specialist",
        "Client Service Representative",
        "Technical Support Engineer",
        "Customer Success Manager",
        "Account Manager"
      ]
    }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }
  
    const filteredCategories = roleCategories.map(category => ({
      category: category.category,
      roles: category.roles.filter(role => 
        role.toLowerCase().includes(value.toLowerCase())
      )
    })).filter(category => category.roles.length > 0);
  
    setSuggestions(filteredCategories);
  };
  
  const handleSearchFocus = () => {
    // Show all categories with their roles when focused
    setSuggestions(roleCategories);
  };
  
  const handleRoleSelect = (role: string) => {
    setSearchTerm(role);
    setSuggestions([]);
    navigate(`/jobs?keyword=${encodeURIComponent(role)}`);
  };
  
  const handleClickOutside = (event: MouseEvent) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
      setSuggestions([]);
    }
  };
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFindJob = () => {
    if (searchTerm) {
      navigate(`/jobs?keyword=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate("/jobs");
    }
  };

  // Create smooth wave path - same for all layers
  const createWavePath = (index: number, totalBars: number) => {
    const progress = index / totalBars;
    // Smoother S-curve with more spread at the beginning
    const waveX = Math.sin(progress * Math.PI * 1.8) * 220 + (progress < 0.3 ? (1 - progress / 0.3) * 120 : 0);
    const yPos = index * 65;
    const rotation = -52 + Math.sin(progress * Math.PI * 1.5) * 18;
    
    return { waveX, yPos, rotation };
  };

  return (
    <>
    
      <div className="isolate">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col">
        {/* NEW HERO SECTION */}
        <section className="relative min-h-[100vh] flex items-center px-6 md:px-8 pt-32 md:pt-40 pb-40">
          <div className="max-w-7xl mx-auto w-full relative">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 max-w-2xl"
            >
              <h1 className="mb-8">
                <span className="block text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">The Leading Platform</span>
                <span className="block text-4xl md:text-5xl lg:text-5xl font-bold text-gray-600 leading-tight tracking-tight">for Your Next Career Move</span>
              </h1>
              
              <p className="text-gray-600 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
                Connecting <span className="font-semibold text-blue-600">talented professionals</span> with career opportunities across industries.
              </p>

              {/* Search Bar with Suggestions */}
              <div className="relative max-w-xl mb-20" ref={searchBarRef}>
                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-6 py-4 shadow-sm hover:shadow-md transition-shadow">
                  <Search className="size-6 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search roles..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={handleSearchFocus}
                    className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder:text-gray-400 text-lg"
                  />
                  <button
                    onClick={handleFindJob}
                    className="bg-blue-600 hover:bg-blue-700 rounded-full p-2 shrink-0 transition-colors"
                  >
                    <ArrowRight className="size-6 text-white" />
                  </button>
                </div>
                
                {/* Suggestions Dropdown */}
                {suggestions.length > 0 && (
                  <div 
                    className="absolute top-full left-0 bg-white border border-gray-200 rounded-xl shadow-xl mt-2 z-50 custom-scrollbar"
                    style={{ width: '100%', maxHeight: '400px', overflowY: 'auto' }}
                  >
                    {suggestions.map((categoryGroup) => (
                      <div key={categoryGroup.category}>
                        <div className="px-6 py-4 bg-gray-100 sticky top-0">
                          <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
                            {categoryGroup.category}
                          </h3>
                        </div>
                        
                        <div className="pb-2">
                          {categoryGroup.roles.map((role) => (
                            <div
                              key={role}
                              className="px-6 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                              onClick={() => handleRoleSelect(role)}
                            >
                              <span className="text-gray-700 text-base">{role}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Wavy Blue Glass Bars Structure - Right side */}
            <div className="absolute w-250px h-[1000px] pointer-events-none hidden lg:block" style={{ right: '-200px', top: '-100px' }}>
              {/* Layer 1 - Back darker bars */}
              {Array.from({ length: 18 }).map((_, i) => {
                const { waveX, yPos, rotation } = createWavePath(i, 18);
                
                return (
                  <motion.div
                    key={`layer1-${i}`}
                    className="absolute"
                    initial={{ 
                      opacity: 0,
                      scale: 0.8,
                      rotateZ: rotation - 15
                    }}
                    animate={{ 
                      opacity: 1,
                      scale: 1,
                      rotateZ: rotation,
                      x: [0, -3, 0],
                      y: [0, 2, 0]
                    }}
                    transition={{
                      duration: 1.2,
                      delay: i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      top: `${yPos}px`,
                      right: `${waveX}px`,
                      width: '450px',
                      height: '70px',
                      background: 'linear-gradient(to right, rgba(59, 130, 246, 0.75), rgba(96, 165, 250, 0.65))',
                      borderRadius: '10px',
                      border: '1px solid rgba(59, 130, 246, 0.4)',
                      boxShadow: `
                        inset 0 2px 20px rgba(255, 255, 255, 0.25),
                        0 4px 20px rgba(59, 130, 246, 0.3),
                        0 8px 35px rgba(59, 130, 246, 0.2)
                      `,
                    }}
                  >
                    <div 
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%)'
                      }}
                    />
                  </motion.div>
                );
              })}

              {/* Layer 2 - Middle lighter bars */}
              {Array.from({ length: 18 }).map((_, i) => {
                const { waveX, yPos, rotation } = createWavePath(i, 18);
                
                return (
                  <motion.div
                    key={`layer2-${i}`}
                    className="absolute"
                    initial={{ 
                      opacity: 0,
                      scale: 0.8,
                      rotateZ: rotation - 15
                    }}
                    animate={{ 
                      opacity: 1,
                      scale: 1,
                      rotateZ: rotation,
                      x: [0, -4, 0],
                      y: [0, -2, 0]
                    }}
                    transition={{
                      duration: 1.2,
                      delay: 0.15 + i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      top: `${yPos + 12}px`,
                      right: `${waveX + 50}px`,
                      width: '430px',
                      height: '68px',
                      background: 'linear-gradient(to right, rgba(96, 165, 250, 0.82), rgba(147, 197, 253, 0.72))',
                      borderRadius: '10px',
                      border: '1px solid rgba(96, 165, 250, 0.5)',
                      boxShadow: `
                        inset 0 2px 22px rgba(255, 255, 255, 0.35),
                        0 4px 22px rgba(96, 165, 250, 0.38),
                        0 8px 40px rgba(96, 165, 250, 0.25)
                      `,
                    }}
                  >
                    <div 
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, transparent 55%)'
                      }}
                    />
                  </motion.div>
                );
              })}

              {/* Layer 3 - Front lightest bars */}
              {Array.from({ length: 18 }).map((_, i) => {
                const { waveX, yPos, rotation } = createWavePath(i, 18);
                
                return (
                  <motion.div
                    key={`layer3-${i}`}
                    className="absolute"
                    initial={{ 
                      opacity: 0,
                      scale: 0.8,
                      rotateZ: rotation - 15
                    }}
                    animate={{ 
                      opacity: 1,
                      scale: 1,
                      rotateZ: rotation,
                      x: [0, -5, 0],
                      y: [0, 3, 0]
                    }}
                    transition={{
                      duration: 1.2,
                      delay: 0.3 + i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      top: `${yPos + 24}px`,
                      right: `${waveX + 100}px`,
                      width: '410px',
                      height: '66px',
                      background: 'linear-gradient(to right, rgba(147, 197, 253, 0.88), rgba(191, 219, 254, 0.78))',
                      borderRadius: '10px',
                      border: '1px solid rgba(147, 197, 253, 0.6)',
                      boxShadow: `
                        inset 0 2px 25px rgba(255, 255, 255, 0.45),
                        0 4px 25px rgba(147, 197, 253, 0.48),
                        0 8px 45px rgba(147, 197, 253, 0.3)
                      `,
                    }}
                  >
                    <div 
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 65%)'
                      }}
                    />
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-4 rounded-b-lg"
                      style={{
                        background: 'linear-gradient(to top, rgba(59, 130, 246, 0.3), transparent)'
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        
        {/* Brands Slider Section */}
        <SlidingBrands small="Trusted by" title="Industry Leaders" />

        {/* Blue & White Collar Categories Section */}
        <section className="relative py-24 px-8"> {/* Removed bg-gradient */}
  <div className="max-w-6xl mx-auto">
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {/* Blue Collar Card - Keep as is */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="group cursor-pointer"
        onClick={() => navigate("/jobs?category=Manufacturing")}
      >
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
          <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-600 to-blue-400">
            <div className="absolute inset-0 flex items-center justify-center">
              <Briefcase className="size-32 text-white/30" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>
          
          <div className="p-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <h3 className="text-3xl font-bold text-gray-900">Blue Collar</h3>
              </div>
            
              <div className="flex flex-wrap gap-2 mb-6 justify-center">
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Construction</span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Manufacturing</span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Logistics</span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Maintenance</span>
              </div>
              
              <div className="flex items-center justify-center text-gray-800 font-semibold group-hover:gap-3 gap-2 transition-all">
                Explore Roles
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* White Collar Card - Keep as is */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="group cursor-pointer"
        onClick={() => navigate("/jobs?category=Technology")}
      >
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
          <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-600">
            <div className="absolute inset-0 flex items-center justify-center">
              <Building2 className="size-32 text-white/30" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>
          
          <div className="p-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-3xl font-bold text-gray-700">White Collar</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6 justify-center">
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Technology</span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Finance</span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Management</span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Creative</span>
              </div>
              
              <div className="flex items-center justify-center text-gray-900 font-semibold group-hover:gap-3 gap-2 transition-all">
                Explore Roles
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>

        {/* Features Section */}
        <section id="features" className="features-section">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive solutions for both job seekers and employers
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Everything you need to find your next opportunity or build your team
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Briefcase className="text-white size-7" />
              </div>
              <h3 className="feature-title">Verified Job Listings</h3>
              <p className="feature-description">All jobs are verified and vetted to ensure genuine opportunities for workers.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Users className="text-white size-7" />
              </div>
              <h3 className="feature-title">Skilled Workforce</h3>
              <p className="feature-description">Access to millions of pre-verified skilled workers across various trades.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Building2 className="text-white size-7" />
              </div>
              <h3 className="feature-title">Top Companies</h3>
              <p className="feature-description">Partner with leading companies looking for reliable talent.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Shield className="text-white size-7" />
              </div>
              <h3 className="feature-title">Safe & Secure</h3>
              <p className="feature-description">Your data is protected with enterprise-grade security measures.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Zap className="text-white size-7" />
              </div>
              <h3 className="feature-title">AI-Powered Matching</h3>
              <p className="feature-description">Smart algorithms match candidates with the most suitable job opportunities.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Clock className="text-white size-7" />
              </div>
              <h3 className="feature-title">Quick Hiring</h3>
              <p className="feature-description">Streamlined process enables faster hiring and onboarding of workers.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to find your dream job?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of job seekers and employers on joblet today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="px-8 py-3 bg-white text-gray-700 hover:bg-gray-300 rounded-lg font-semibold transition-colors"
                  >
                    Sign Up Free
                  </button>
                  <Link to="/jobs" className="px-8 py-3 border-2 border-white text-white hover:bg-white/10 rounded-lg font-semibold transition-colors">
                    Browse Jobs
                  </Link>
                </>
              ) : (
                <Link to="/jobs" className="px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-semibold transition-colors">
                  Browse Jobs
                </Link>
              )}
            </div>
          </div>
        </section>

        
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode="register"
        />
      </div>
    </>
  );
}