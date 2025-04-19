"use client";

import { motion } from "motion/react";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import Link from "next/link";

// Types
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  rentPrice: number;
  imageUrl: string;
  category: string;
};

interface ProductProps {
  products: Product[];
}

export default function ProductSection({ products }: ProductProps) {
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const categories = ["all", "tenda", "tidur", "memasak", "ransel", "aksesori"];

  // Simulasikan loading sebentar
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((product) => product.category === filter);

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Peralatan Kemping Kami
          </h2>
          <div className="w-20 md:w-24 h-1 bg-emerald-600 mx-auto mb-6 md:mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 md:mb-10 px-4">
            Temukan berbagai peralatan kemping berkualitas tinggi untuk petualangan outdoor Anda. Tersedia untuk disewa atau dibeli.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
            {categories.map((item) => (
              <motion.button
                key={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(item)}
                className={`px-3 md:px-5 py-2 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                  filter === item
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {item === "all"
                  ? "Semua"
                  : item.charAt(0).toUpperCase() + item.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-48 md:h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-t-4 border-b-4 border-emerald-600"></div>
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <div className="h-6 w-6 md:h-8 md:w-8 bg-gray-50 rounded-full"></div>
              </div>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 md:py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">Tidak Ada Produk</h3>
            <p className="text-gray-500 text-center px-4">Tidak ada produk yang tersedia dalam kategori ini saat ini.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Call-to-Action Button */}
        {filteredProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mt-10 md:mt-16"
          >
            <Link href="/produk">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-6 md:py-3 md:px-8 rounded-lg text-sm md:text-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Lihat Semua Produk
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}