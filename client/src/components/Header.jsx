import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold my-4 text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-300">Space</span>
          <span className="text-slate-500">Estates</span>
        </h1>
        <form>
          <input
            type="text"
            placeholder="Search for properties..."
            className="bg-transparent w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
