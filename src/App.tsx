import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import SymptomCheckerPage from './pages/SymptomChecker';
import ResultsPage from './pages/Results';
import DoctorsPage from './pages/Doctors';
import DoctorProfilePage from './pages/DoctorProfile';
import ShopPage from './pages/Shop';
import ProductDetailPage from './pages/ProductDetail';
import YogaPage from './pages/Yoga';
import LocationsPage from './pages/Locations';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="symptom-checker" element={<SymptomCheckerPage />} />
            <Route path="results" element={<ResultsPage />} />

            {/* Doctor management routes */}
            <Route path="doctors" element={<DoctorsPage />} />
            <Route path="doctors/:id" element={<DoctorProfilePage />} />

            {/* Product management routes */}
            <Route path="shop" element={<ShopPage />} />
            <Route path="shop/:id" element={<ProductDetailPage />} />

            {/* Yoga & Wellness routes */}
            <Route path="yoga" element={<YogaPage />} />

            {/* Location services routes */}
            <Route path="locations" element={<LocationsPage />} />

            {/* Authentication routes */}
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;