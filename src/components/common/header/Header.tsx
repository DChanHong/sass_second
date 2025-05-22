"use client";

import Link from "next/link";
import {useState} from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="relative flex items-center justify-center h-16">
                    {/* Center: Logo */}
                    <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-xl font-bold text-gray-900">
                        MBTI 닷컴
                    </Link>

                    {/* Right Side: Mobile Menu Button */}
                    <div className="absolute right-0 flex items-center space-x-6">
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
            </div>
        </header>
    );
}
