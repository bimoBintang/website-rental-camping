// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Camping Gear Logo"
              width={40}
              height={40}
              className="mr-3"
            />
            <span
              className={`font-bold text-2xl ${
                isScrolled ? "text-emerald-600" : "text-white"
              }`}
            >
              CampGear
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium hover:text-emerald-500 transition-colors ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              Beranda
            </Link>
            <Link
              href="/products"
              className={`font-medium hover:text-emerald-500 transition-colors ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              Produk
            </Link>
            <Link
              href="/rental"
              className={`font-medium hover:text-emerald-500 transition-colors ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              Sewa
            </Link>
            <Link
              href="/about"
              className={`font-medium hover:text-emerald-500 transition-colors ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              Tentang Kami
            </Link>
            <Link
              href="/contact"
              className={`font-medium hover:text-emerald-500 transition-colors ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              Kontak
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${
                isScrolled
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-emerald-600"
              } px-4 py-2 rounded-lg font-medium transition-colors hover:bg-opacity-90`}
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${
                isScrolled
                  ? "bg-white text-emerald-600 border border-emerald-600"
                  : "bg-emerald-600 text-white"
              } px-4 py-2 rounded-lg font-medium transition-colors hover:bg-opacity-90`}
            >
              Daftar
            </motion.button>
          </div>

          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${isScrolled ? "text-gray-800" : "text-white"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${isScrolled ? "text-gray-800" : "text-white"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-800 font-medium hover:text-emerald-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link
                href="/products"
                className="text-gray-800 font-medium hover:text-emerald-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Produk
              </Link>
              <Link
                href="/rental"
                className="text-gray-800 font-medium hover:text-emerald-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sewa
              </Link>
              <Link
                href="/about"
                className="text-gray-800 font-medium hover:text-emerald-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tentang Kami
              </Link>
              <Link
                href="/contact"
                className="text-gray-800 font-medium hover:text-emerald-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Kontak
              </Link>
              <div className="flex space-x-3 pt-3">
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium w-full">
                  Login
                </button>
                <button className="bg-white text-emerald-600 border border-emerald-600 px-4 py-2 rounded-lg font-medium w-full">
                  Daftar
                </button>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;