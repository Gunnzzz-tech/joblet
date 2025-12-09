import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/Landing';
import JobListing from './components/JobListing';
import JobDetails from './components/JobDetails';
import PricingPage from './pages/Pricing';
import ContactPage from './pages/Contact';
import EmployerDashboard from './pages/EmployerDashboard';
import ReferAndEarn from './pages/ReferAndEarn';
import AuthCallback from './components/AuthCallback';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './lib/auth-context';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="jobs" element={<JobListing />} />
              <Route path="jobs/:slug" element={<JobDetails />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="refer" element={<ReferAndEarn />} />
              <Route path="employer/dashboard" element={<EmployerDashboard />} />
            </Route>
            <Route path="/auth/callback" element={<AuthCallback />} />
          </Routes>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;