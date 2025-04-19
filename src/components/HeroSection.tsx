"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";

type HeroSectionProps = {
  title: string;
  description: string;
  iconUrl: string;
}[];

interface HeroProps {
  banner: HeroSectionProps;
}

export default function HeroSection({ banner }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll carousel with no manual controls
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banner.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [banner.length]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-emerald-50 py-20">
      <div className="container mx-auto px-1">
        {/* Abstract shapes for background styling */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-emerald-300 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-blue-300 blur-3xl"></div>
        </div>

        <div className="flex flex-col items-center text-center relative z-10">
          {/* Carousel container with improved styling */}
          <div className="w-full max-w-5xl relative overflow-hidden rounded-2xl ">
            {/* Carousel slides */}
            <div className="relative overflow-hidden h-[500px]">
              <AnimatePresence mode="wait">
                {banner.map((item, index) => (
                  index === currentIndex && (
                    <motion.div
                      key={index}
                      className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.7, ease: "easeIn" }}
                    >
                      {item.iconUrl && (
                        <motion.div 
                          className="mb-6 overflow-hidden rounded-xl shadow-lg"
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <Image
                            src={item.iconUrl}
                            alt={item.title}
                            width={150}
                            height={150}
                            className="mx-auto w-80 h-64 object-cover"
                            priority
                          />
                        </motion.div>
                      )}
                      <motion.h1 
                        className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        {item.title}
                      </motion.h1>
                      <motion.p 
                        className="text-xl text-gray-600 mb-8 max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        {item.description}
                      </motion.p>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Improved action buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mt-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open("https://wa.me/6281210347732?text=Hi,%20saya%20tertarik%20dengan%20layanan%20anda!", "_blank")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all shadow-lg"
            >
              Sewa Sekarang
            </motion.button>
            <Link href="/produk">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border-2 border-emerald-600 hover:bg-gray-50 text-emerald-600 font-bold py-4 px-10 rounded-xl text-lg transition-all shadow-md"
              >
                Lihat produk
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}