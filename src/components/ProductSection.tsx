"use client";

import { motion } from "framer-motion"; // perbaikan: 'motion/react' -> 'framer-motion'
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

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

  // Simulasikan loading sebentar, atau bisa dihapus kalau tidak perlu
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500); // simulasi loading
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((product) => product.category === filter);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Peralatan Kemping Kami
          </h2>
          <div className="w-16 h-1 bg-emerald-600 mx-auto mb-8"></div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["all", "tenda", "tidur", "memasak", "ransel", "aksesori"].map(
              (item) => (
                <motion.button
                  key={item}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(item)}
                  className={`px-4 py-2 rounded-full ${
                    filter === item
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {item === "all"
                    ? "Semua"
                    : item.charAt(0).toUpperCase() + item.slice(1)}
                </motion.button>
              )
            )}
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all"
          >
            Lihat Semua Produk
          </motion.button>
        </div>
      </div>
    </section>
  );
}
