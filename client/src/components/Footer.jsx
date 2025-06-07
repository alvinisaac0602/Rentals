import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-xl font-semibold">Space Estates</h3>
          <p className="text-sm mt-1">Your trusted space rental partner</p>
        </div>

        <div className="flex space-x-4 text-sm">
          <a href="/about" className="hover:underline">
            About
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
        </div>

        <div className="text-sm mt-4 md:mt-0 text-center md:text-right">
          &copy; {new Date().getFullYear()} Space Estates. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
