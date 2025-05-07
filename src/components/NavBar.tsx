"use client";

import React, { useState } from "react";
import {
  Menu,
  X,
  LogIn,
  UserPlus,
  Search,
  Briefcase,
  Compass,
  FileText,
  Mail,
  PersonStanding,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContexts";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth() || { user: null };
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out");
    }
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <div className="flex-shrink-0 flex items-center">
                <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">
                  Rozgaar
                </div>
              </div>
            </Link>
            {/* Desktop Menu Items */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="relative">
                <Link
                  href="/"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
                >
                  <span className="relative">
                    Home
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </div>
              <div className="relative">
                <a
                  href="/jobs"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 group flex items-center gap-1"
                >
                  <Briefcase size={16} />
                  <span className="relative">
                    Jobs
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </div>
              <div className="relative">
                <a
                  href="/explore"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 group flex items-center gap-1"
                >
                  <Compass size={16} />
                  <span className="relative">
                    Explore
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </div>
              <div className="relative">
                <a
                  href="/blog"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 group flex items-center gap-1"
                >
                  <FileText size={16} />
                  <span className="relative">
                    Blog
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </div>
              <div className="relative">
                <a
                  href="/contact"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 group flex items-center gap-1"
                >
                  <Mail size={16} />
                  <span className="relative">
                    Contact
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </div>

              <div className="relative">
                <Link
                  href="/admin"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 group flex items-center gap-1"
                >
                  <PersonStanding size={16} />
                  <span className="relative">
                    Admin
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </div>
            </div>

            {/* Search and Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-gray-700">{user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-all duration-200 shadow-sm"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <button className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-all duration-200 shadow-sm">
                      <LogIn size={16} />
                      <span>Login</span>
                    </button>
                  </Link>
                  <Link href="/register">
                    <button className="flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md">
                      <UserPlus size={16} />
                      <span>Register</span>
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <X size={24} className="text-blue-600" />
                ) : (
                  <Menu size={24} className="text-blue-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50  items-center gap-2"
              >
                <Briefcase size={16} />
                Home
              </a>
              <a
                href="/jobs"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 items-center gap-2"
              >
                <Briefcase size={16} />
                Jobs
              </a>
              <a
                href="/explore"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 items-center gap-2"
              >
                <Compass size={16} />
                Explore
              </a>
              <a
                href="/blog"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50  items-center gap-2"
              >
                <FileText size={16} />
                Blog
              </a>
              <a
                href="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50  items-center gap-2"
              >
                <Mail size={16} />
                Contact
              </a>
              <div className="pt-4 pb-2 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  {user ? (
                    <>
                      <span className="text-gray-700">{user.email}</span>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login">
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50">
                          <LogIn size={16} />
                          Login
                        </button>
                      </Link>
                      <Link href="/register">
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:from-blue-700 hover:to-indigo-700">
                          <UserPlus size={16} />
                          Register
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
