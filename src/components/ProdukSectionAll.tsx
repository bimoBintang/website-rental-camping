"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";

// Tipe data untuk produk
type Produk = {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    rentPrice: number;
};

// Interface untuk props
interface ProdukProps {
    produk: Produk[]
}

export default function ProdukSectionAll({ produk }: ProdukProps) {
  // Using initial products directly without setter since it's not being used
  const products = produk;
  const [filteredProducts, setFilteredProducts] = useState<Produk[]>(produk);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [view, setView] = useState("grid");
  
  // Removed isLoading state since it's never updated

  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const categories = [
    { id: "all", name: "Semua" },
    { id: "tenda", name: "Tenda" },
    { id: "tidur", name: "Tidur" },
    { id: "memasak", name: "Memasak" },
    { id: "ransel", name: "Ransel" },
    { id: "aksesori", name: "Aksesori" }
  ];

  // Filter dan search
  useEffect(() => {
    let result = products;
    
    // Filter berdasarkan kategori
    if (filter !== "all") {
      result = result.filter(product => product.category === filter);
    }
    
    // Filter berdasarkan search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term)
      );
    }
    
    // Pengurutan
    if (sortOption === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortOption === "name-asc") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "name-desc") {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    }
    
    setFilteredProducts(result);
  }, [filter, searchTerm, sortOption, products]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-emerald-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            >
              Katalog Produk Kami
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-emerald-100 text-lg md:text-xl mb-8"
            >
              Temukan peralatan kemping berkualitas tinggi untuk petualangan outdoor Anda. Tersedia untuk disewa atau dibeli.
            </motion.p>
            
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative max-w-xl mx-auto"
            >
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 px-5 pl-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-lg"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Filter and Products */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Kategori</h3>
              <ul className="space-y-2 mb-8">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => setFilter(category.id)}
                      className={`w-full text-left py-2 px-3 rounded-md transition-colors ${
                        filter === category.id 
                          ? "bg-emerald-100 text-emerald-700 font-medium" 
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Urutkan</h3>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="default">Urutan Default</option>
                <option value="price-low">Harga: Rendah ke Tinggi</option>
                <option value="price-high">Harga: Tinggi ke Rendah</option>
                <option value="name-asc">Nama: A-Z</option>
                <option value="name-desc">Nama: Z-A</option>
              </select>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tampilan</h3>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setView("grid")}
                    className={`p-2 rounded ${
                      view === "grid" 
                        ? "bg-emerald-100 text-emerald-700" 
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-2 rounded ${
                      view === "list" 
                        ? "bg-emerald-100 text-emerald-700" 
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Container */}
          <div className="flex-1">
            {/* Results Info */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {filteredProducts.length} Produk Ditemukan
              </h2>
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-gray-600">Tampilkan:</span>
                <div className="flex border border-gray-300 rounded-md overflow-hidden">
                  <button
                    onClick={() => setView("grid")}
                    className={`px-3 py-1.5 ${
                      view === "grid" 
                        ? "bg-emerald-600 text-white" 
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`px-3 py-1.5 ${
                      view === "list" 
                        ? "bg-emerald-600 text-white" 
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>
            </div>
            
            {/* Products Display - Modified to remove isLoading state checks */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidak Ada Produk Ditemukan</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Maaf, tidak ada produk yang sesuai dengan kriteria pencarian Anda. Coba ubah filter atau kata kunci pencarian.
                </p>
                <button 
                  onClick={() => {setFilter("all"); setSearchTerm("");}} 
                  className="mt-6 bg-emerald-600 text-white px-5 py-2 rounded-md hover:bg-emerald-700 transition-colors"
                >
                  Reset Pencarian
                </button>
              </div>
            ) : view === "grid" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
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
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row"
                  >
                    <div className="w-full md:w-48 h-48 bg-gray-200 flex-shrink-0">
                      <Image 
                        src={product.imageUrl || "/api/placeholder/400/320"} 
                        alt={product.name}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-auto">
                        <div className="flex flex-col">
                          <span className="text-gray-500 text-sm">Harga Beli</span>
                          <span className="text-emerald-700 font-bold">
                          {typeof window !== 'undefined' && `Rp ${formatPrice(product.price)}`}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-500 text-sm">Harga Sewa</span>
                          <span className="text-emerald-700 font-bold">
                            {typeof window !== 'undefined' && `Rp ${formatPrice(product.rentPrice)} / hari`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}