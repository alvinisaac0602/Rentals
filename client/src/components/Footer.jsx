import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10 mt-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand & Description */}
        <div>
          <h3 className="text-2xl font-bold text-white">Space Estates</h3>
          <p className="mt-2 text-sm">
            Your trusted partner for space rentals and real estate solutions.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-white">Quick Links</h4>
          <ul className="text-sm space-y-1">
            <li>
              <a href="/about" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="text-lg font-semibold text-white">Connect with us</h4>
          <p className="text-sm mt-2">Email: kiizaisaacalvin256@gmail.com</p>
          <p className="text-sm">Phone: +256 789 186 476</p>

          <div className="flex mt-4 space-x-4 text-lg">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Space Estates. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
