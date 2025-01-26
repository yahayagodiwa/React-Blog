import { useState } from "react";
import { Link } from "react-router-dom"


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-900">Prodigy Blog</h1>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="block md:hidden text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Navigation */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-white shadow-md md:static md:w-auto md:shadow-none md:flex md:items-center md:space-x-4`}
        >
          <a
            href="/"
            className="block py-2 px-4 text-gray-700 hover:text-gray-900"
          >
            Home
          </a>
          <Link
            to="/login"
            className="block py-2 px-4 text-gray-700 hover:text-gray-900"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block py-2 px-4 text-gray-700 hover:text-gray-900"
          >
            Sign Up
          </Link>
          <a
            href="#"
            className="block py-2 px-4 text-gray-700 hover:text-gray-900"
          >
            About
          </a>
        </nav>
      </div>
    </header>
  );
  
}

export default Navbar