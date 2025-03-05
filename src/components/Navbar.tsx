
import { Link } from 'react-router-dom'
import { Menu, X, Leaf } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-semibold text-primary">Ayur Vaidya Pro</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md hover:bg-primary-light/10">Home</Link>
              <Link to="/symptom-checker" className="px-3 py-2 rounded-md hover:bg-primary-light/10">Symptom Checker</Link>
              <Link to="#" className="btn btn-primary">Login</Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary-dark focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md hover:bg-primary-light/10">Home</Link>
            <Link to="/symptom-checker" className="block px-3 py-2 rounded-md hover:bg-primary-light/10">Symptom Checker</Link>
            <Link to="#" className="block px-3 py-2 rounded-md bg-primary text-white">Login</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
