import React from "react";
import { Menu, LogIn, UserPlus } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow-lg py-4 px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-3xl font-extrabold text-blue-700 tracking-wide">
          Rozgar
        </div>

        {/* Menu Items */}
        <div className="hidden md:flex gap-10 text-lg font-medium text-gray-700">
          <a
            href="/"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="/jobs"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Job
          </a>
          <a
            href="/explore"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Explore
          </a>
          <a
            href="/blog"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Blog
          </a>
          <a
            href="/contact"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Contact
          </a>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-3 items-center">
          <button className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-100 transition-all">
            <LogIn size={18} /> Login
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all">
            <UserPlus size={18} /> Register
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <Menu size={24} className="text-blue-600" />
        </div>
      </div>
    </nav>
  );
}
