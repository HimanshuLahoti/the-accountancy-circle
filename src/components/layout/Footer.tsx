
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-primary-900 mb-4">The Accountancy Circle</h3>
            <p className="text-gray-600 text-sm">
              Empowering CA, CS, and CMA students in India with a collaborative learning platform.
            </p>
          </div>
          
          <div>
            <h4 className="text-gray-900 font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/resources" className="text-gray-600 hover:text-primary-700 text-sm">Study Materials</Link></li>
              <li><Link to="/resources" className="text-gray-600 hover:text-primary-700 text-sm">Mock Tests</Link></li>
              <li><Link to="/resources" className="text-gray-600 hover:text-primary-700 text-sm">Previous Papers</Link></li>
              <li><Link to="/resources" className="text-gray-600 hover:text-primary-700 text-sm">Syllabus</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-gray-900 font-medium mb-4">Community</h4>
            <ul className="space-y-2">
              <li><Link to="/community" className="text-gray-600 hover:text-primary-700 text-sm">Discussion Forum</Link></li>
              <li><Link to="/community" className="text-gray-600 hover:text-primary-700 text-sm">Ask Questions</Link></li>
              <li><Link to="/community" className="text-gray-600 hover:text-primary-700 text-sm">Meet Faculty</Link></li>
              <li><Link to="/community" className="text-gray-600 hover:text-primary-700 text-sm">Study Groups</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-gray-900 font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-primary-700 text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary-700 text-sm">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-primary-700 text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-primary-700 text-sm">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 py-6">
          <p className="text-sm text-center text-gray-500">
            © {new Date().getFullYear()} The Accountancy Circle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
