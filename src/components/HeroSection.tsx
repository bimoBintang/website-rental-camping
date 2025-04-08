"use client"
import { motion } from "motion/react";
import Image from "next/image";

type HeroSectionProps = {
  title: string;
  description: string;
  iconUrl: string;
};

interface HeroProps {
  banner: HeroSectionProps;
}

export default function HeroSection({banner}: HeroProps) {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={banner.iconUrl} 
            alt={banner.title} 
            fill 
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {banner.title}
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              {banner.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all"
              >
                Sewa Sekarang
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent hover:bg-white/10 text-white border-2 border-white font-bold py-3 px-8 rounded-lg text-lg transition-all"
              >
                Lihat Katalog
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    )
}