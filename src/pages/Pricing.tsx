import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Check, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../lib/auth-context';

export default function PricingPage() {
  const navigate = useNavigate();
  const [isJobsOpen, setIsJobsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col">
    
      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-6" style={{ paddingTop: '80px' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Choose the plan that works best for you. No hidden fees.</p>
          </div>

          {/* For Employers */}
          <div className="mb-20">
            <h3 className="text-2xl font-semibold text-center mb-12 text-gray-900">For Employers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Starter Plan */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 relative">
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Starter Plan</h4>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-3xl font-bold text-gray-900">$99</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <p className="text-gray-600">Perfect for small businesses</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Post limited jobs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Access candidate profiles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Basic applicant tools</span>
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                  onClick={() => !isAuthenticated ? setShowAuthModal(true) : null}
                >
                  Get Started
                </Button>
              </div>

              {/* Professional Plan */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-600 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Professional Plan</h4>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-3xl font-bold text-gray-900">$299</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <p className="text-gray-600">For growing companies</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Unlimited job posts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Advanced hiring tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Team access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Priority support</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => !isAuthenticated ? setShowAuthModal(true) : null}
                >
                  Get Started
                </Button>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-800 relative">
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-white mb-2">Enterprise Plan</h4>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-white">Custom pricing</span>
                  </div>
                  <p className="text-gray-400">For large organizations</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Everything in Professional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Custom integrations & features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">White-label options</span>
                  </li>
                </ul>
                <Link
                  to="/contact"
                  className="w-full block text-center bg-black hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />
    </div>
  );
}