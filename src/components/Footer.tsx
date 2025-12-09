import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <Briefcase className="h-6 w-6 mr-2" />
              <span className="text-lg font-semibold">Taskify</span>
            </div>
            <p className="text-gray-300 text-sm">
              Connecting job seekers with employers through an intuitive, modern platform.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/jobs" className="hover:text-white">Browse Jobs</Link></li>
              <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><a href="#" className="hover:text-white">Career Resources</a></li>
              <li><a href="#" className="hover:text-white">Resume Builder</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/pricing" className="hover:text-white">Post a Job</Link></li>
              <li><a href="#" className="hover:text-white">Browse Candidates</a></li>
              <li><a href="#" className="hover:text-white">Pricing Plans</a></li>
              <li><a href="#" className="hover:text-white">Success Stories</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-300">
          <p>&copy; {year} Taskify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
