import { Link } from 'react-router-dom';
import '../styles/rocken.css';
import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="landing-footer">
    <div className="footer-content">
      <div className="footer-brand">
        <div className="footer-logo">
          joblet.ai®️
        </div>
        <p className="footer-description">
          The leading platform for talent. Connecting skilled workers with meaningful career opportunities.
        </p>
        <div className="footer-social">
          <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
          <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
          <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
          <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
        </div>
      </div>
  
      <div className="footer-column">
        <h4>For Job Seekers</h4>
        <ul>
          <li><Link to="/jobs">Browse Jobs</Link></li>
          <li><a href="#">Career Resources</a></li>
          <li><a href="#">Skill Training</a></li>
          <li><a href="#">Resume Builder</a></li>
        </ul>
      </div>
  
      <div className="footer-column">
        <h4>For Employers</h4>
        <ul>
          <li><Link to="/contact">Post a Job</Link></li>
          <li><a href="#">Browse Candidates</a></li>
          <li><Link to="/pricing">Pricing Plans</Link></li>
          <li><a href="#">Enterprise Solutions</a></li>
        </ul>
      </div>
  
      <div className="footer-column">
        <h4>Company</h4>
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Blog</a></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </div>
    </div>
  
    <div className="footer-bottom">
      <p>©️ {year} joblet.ai All rights reserved.</p>
      <div className="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Cookie Policy</a>
      </div>
    </div>
  </footer>
  );
}
