import React from 'react';
import { FaSearch, FaShoppingCart, FaUserCircle, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-gray-800 font-bold text-xl"></div>
        <ul className="flex text-sm space-x-6 text-gray-600 font-medium">
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
        </ul>
        <div className="flex items-center space-x-5">
          <FaLinkedin className="text-gray-500 text-2xl" /> {/* Add text-lg for larger size */}
          <FaTwitter className="text-gray-500 text-2xl" /> {/* Add text-lg for larger size */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
