"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Side: Logo */}
          <Link href="/" className="text-xl font-bold text-gray-900">
            SASS
          </Link>

          {/* Right Side: Navigation and Login */}
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation */}
            <nav className="hidden sm:flex items-center space-x-6">
              {/* <Link 
                href="/courses" 
                className="relative px-2 py-1 text-gray-600 hover:text-emerald-500 transition-colors duration-200 group"
              >
                강의
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
              <Link 
                href="/community" 
                className="relative px-2 py-1 text-gray-600 hover:text-emerald-500 transition-colors duration-200 group"
              >
                커뮤니티
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
              <Link 
                href="/membership" 
                className="relative px-2 py-1 text-gray-600 hover:text-emerald-500 transition-colors duration-200 group"
              >
                멤버십
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link> */}
              <Link
                href="/login"
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                로그인
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="sm:hidden p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <Link href="/courses" className="block px-4 py-2 text-gray-600 hover:text-emerald-500 hover:bg-emerald-50 transition-colors duration-200">
                강의
              </Link>
              <Link href="/community" className="block px-4 py-2 text-gray-600 hover:text-emerald-500 hover:bg-emerald-50 transition-colors duration-200">
                커뮤니티
              </Link>
              <Link href="/membership" className="block px-4 py-2 text-gray-600 hover:text-emerald-500 hover:bg-emerald-50 transition-colors duration-200">
                멤버십
              </Link>
              <Link 
                href="/login" 
                className="block px-4 py-2 text-emerald-500 hover:bg-emerald-50 font-medium transition-colors duration-200"
              >
                로그인
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 