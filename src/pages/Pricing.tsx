import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../lib/auth-context';
import { useState } from 'react';

export default function PricingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated } = useAuth();

  const jobSeekerPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Basic profile',
        '10 applications/month',
        'Job alerts',
        'Basic search filters',
        'Email support',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Premium',
      price: '$9.99',
      period: 'month',
      description: 'For serious job seekers',
      features: [
        'Unlimited applications',
        'Priority visibility',
        'Advanced analytics',
        'Resume review',
        'Priority support',
        'AI-powered job matching',
      ],
      cta: 'Upgrade Now',
      popular: true,
    },
  ];

  const employerPlans = [
    {
      name: 'Starter',
      price: '$49',
      period: 'month',
      description: 'Perfect for small businesses',
      features: [
        '3 job posts',
        'Basic applicant tracking',
        'Company profile',
        'Email support',
        'Standard listings',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$149',
      period: 'month',
      description: 'For growing companies',
      features: [
        '15 job posts',
        'Advanced filtering',
        'Featured listings',
        'Priority support',
        'Analytics dashboard',
        'Candidate matching',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations',
      features: [
        'Unlimited job posts',
        'Dedicated support',
        'API access',
        'Custom integrations',
        'White-label options',
        'Dedicated account manager',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for you. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Employer Plans */}
        <div>
          <h2 className="text-2xl font-semibold text-center mb-8 text-primary">For Employers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {employerPlans.map((plan) => (
              <div
                key={plan.name}
                className={`card relative ${plan.popular ? 'ring-2 ring-accent' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-primary mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-600">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.name === 'Enterprise' ? (
                  <Link
                    to="/contact"
                    className={`w-full btn ${plan.popular ? 'btn-primary' : 'btn-outline-primary'} block text-center`}
                  >
                    {plan.cta}
                  </Link>
                ) : !isAuthenticated ? (
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className={`w-full btn ${plan.popular ? 'btn-primary' : 'btn-outline-primary'}`}
                  >
                    {plan.cta}
                  </button>
                ) : (
                  <button
                    className={`w-full btn ${plan.popular ? 'btn-primary' : 'btn-outline-primary'}`}
                  >
                    {plan.cta}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="register"
      />
    </div>
  );
}

