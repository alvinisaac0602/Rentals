import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <h1 className="font-bold text-lg sm:text-xl flex items-center">
            <span className="text-slate-300">Space</span>
            <span className="text-slate-500 ml-1">Estates</span>
          </h1>
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Nav Links - Hidden on small screens */}
        <ul className="hidden sm:flex items-center space-x-6">
          <li>
            <Link to="/" className="hover:text-blue-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-400">
              About
            </Link>
          </li>
          <li>
            <form
              onSubmit={handleSubmit}
              className="flex items-center bg-gray-700 px-2 py-1 rounded-lg"
            >
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent focus:outline-none text-sm w-24 sm:w-40"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">
                <FaSearch className="ml-1" />
              </button>
            </form>
          </li>
          <li>
            {currentUser ? (
              <Link to="/profile">
                <img
                  src={currentUser.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
              </Link>
            ) : (
              <Link to="/sign-in" className="hover:text-blue-400">
                Sign In
              </Link>
            )}
          </li>
        </ul>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="sm:hidden px-6 pb-4">
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                to="/"
                className="block hover:text-blue-400"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block hover:text-blue-400"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <form
                onSubmit={handleSubmit}
                className="flex items-center bg-gray-700 px-2 py-1 rounded-lg"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent focus:outline-none text-sm w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">
                  <FaSearch className="ml-1" />
                </button>
              </form>
            </li>
            <li>
              {currentUser ? (
                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                  <img
                    src={currentUser.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </Link>
              ) : (
                <Link
                  to="/sign-in"
                  className="hover:text-blue-400"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
