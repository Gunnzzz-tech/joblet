
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/Home'
import SymptomCheckerPage from './pages/SymptomChecker'
import ResultsPage from './pages/Results'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="symptom-checker" element={<SymptomCheckerPage />} />
        <Route path="results" element={<ResultsPage />} />
      </Route>
    </Routes>
  )
}
