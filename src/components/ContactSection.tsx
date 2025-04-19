"use client"

import Link from "next/link";
import { motion } from "motion/react";
import React from "react";

interface ContactSectionProps {
  children: React.ReactNode;
}

export default function ContactSection({ children }: ContactSectionProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Main Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-lg shadow-md mb-16"
        >
          {children}
        </motion.div>
        
        {/* Footer with Contact Information */}
        <div className="pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Hubungi Kami
              </h2>
              <div className="w-16 h-1 bg-emerald-600 mb-8"></div>
              <p className="text-gray-600 mb-8">
                Punya pertanyaan tentang layanan sewa atau pembelian peralatan kemping kami? 
                Jangan ragu untuk menghubungi kami. Tim kami siap membantu Anda 
                merencanakan petualangan outdoor terbaik!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-start mb-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Alamat</h3>
                  </div>
                  <p className="text-gray-600 ml-12">
                    Jl. Petualangan No. 123<br />
                    Kota Outdoor, 12345<br />
                    Indonesia
                  </p>
                </div>
                
                <div>
                  <div className="flex items-start mb-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Telepon</h3>
                  </div>
                  <p className="text-gray-600 ml-12">
                    +62 123 4567 890<br />
                    +62 098 7654 321
                  </p>
                </div>
                
                <div>
                  <div className="flex items-start mb-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                  </div>
                  <p className="text-gray-600 ml-12">
                    info@campinggear.id<br />
                    support@campinggear.id
                  </p>
                </div>
              </div>
            </div>
            
            {/* Quick Links and Copyright */}
            <div className="md:pl-8 md:border-l border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Link Cepat</h3>
              <ul className="space-y-2 mb-8">
                <li>
                  <Link 
                    href="/" 
                    className="text-emerald-600 hover:text-emerald-800 transition duration-300"
                  >
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/produk" 
                    className="text-emerald-600 hover:text-emerald-800 transition duration-300"
                  >
                    Produk
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/auth/sign-in" 
                    className="text-emerald-600 hover:text-emerald-800 transition duration-300"
                  >
                    Panel Admin
                  </Link>
                </li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Ikuti Kami</h3>
              <div className="flex space-x-4 mb-8">
                <Link href="#" className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </Link>
                <Link href="#" className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </Link>
                <Link href="#" className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="mt-12 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} CampingGear Indonesia. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}