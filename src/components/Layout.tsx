"use client";

import React, { Fragment } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
  paddingTop?: boolean;
}

export default function Layout({ children, paddingTop = true }: LayoutProps) {
  return (
    <Fragment>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col">
        <main
          className={`flex-grow mx-auto w-full px-4 sm:px-6 lg:px-8 ${
            paddingTop ? "pt-[72px] sm:pt-[88px]" : ""
          }`}
        >
          {children}
        </main>
      </div>
      <Footer />
    </Fragment>
  );
}
