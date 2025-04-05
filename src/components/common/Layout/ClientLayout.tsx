"use client";

import React from "react";
import Footer from "../Footer";

interface ClientLayoutProps {
  children: React.ReactNode;
  paddingTop?: boolean;
}

export default function ClientLayout({
  children,
  paddingTop = true,
}: ClientLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col">
      <main
        className={`flex-grow mx-auto w-full px-4 sm:px-6 lg:px-8 ${
          paddingTop ? "pt-[72px] sm:pt-[88px]" : ""
        }`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
