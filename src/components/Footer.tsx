
import { Flower } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Flower className="h-6 w-6" />
            <span className="ml-2 text-lg font-semibold">Ayur Vaidya Pro</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8">
            <a href="#" className="hover:underline mb-2 md:mb-0">About Us</a>
            <a href="#" className="hover:underline mb-2 md:mb-0">Privacy Policy</a>
            <a href="#" className="hover:underline mb-2 md:mb-0">Terms of Service</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm">
          <p>&copy; {year} Ayur Vaidya Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
