import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
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
    <header className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold my-4 text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-300">Space</span>
            <span className="text-slate-500">Estates</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-700  p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch
              className="text-slate-100
            "
            />
          </button>
        </form>

        <ul>
          <li className="inline-block mx-2">
            <Link to="/" className="text-white hover:text-blue-500">
              Home
            </Link>
          </li>
          <li className="inline-block mx-2">
            <Link to="/about" className="text-white hover:text-blue-500">
              About
            </Link>
          </li>

          {currentUser ? (
            <Link to="/profile">
              <img
                key={currentUser.avatar}
                src={currentUser.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full inline-block mx-2"
              />
            </Link>
          ) : (
            <li className="inline-block mx-2">
              <Link to="/sign-in" className="text-white hover:text-blue-500">
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
