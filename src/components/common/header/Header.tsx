"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface HeaderProps {
  isLoggedIn: boolean;
}

export default function Header({ isLoggedIn }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

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
              {isLoggedIn ? (
                <>
                  <Link
                    href="/mypage"
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    마이페이지
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-emerald-600 hover:text-white hover:bg-emerald-600 rounded-lg transition-all duration-200 border border-emerald-600 hover:shadow-md hover:cursor-pointer "
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  로그인
                </Link>
              )}
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
              {isLoggedIn ? (
                <>
                  <Link
                    href="/mypage"
                    className="block px-4 py-2 text-emerald-500 hover:bg-emerald-50 font-medium transition-colors duration-200"
                  >
                    마이페이지
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-emerald-500 hover:text-white hover:bg-emerald-500 font-medium transition-all duration-200 text-left rounded-lg"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block px-4 py-2 text-emerald-500 hover:bg-emerald-50 font-medium transition-colors duration-200"
                >
                  로그인
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
