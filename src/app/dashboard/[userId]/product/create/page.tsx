
"use client";

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Camera, 
  Image as ImageIcon, 
  Tag, 
  DollarSign, 
  ShoppingBag, 
  FileText, 
  Check,
  X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type Category = "Tenda" | "Sleeping Gear" | "Dapur" | "Tas" | "Aksesoris" | "Lainnya";

export default function CreateProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    rentPrice: '',
    price: '',
    category: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    imageUrl: '',
    rentPrice: '',
    price: '',
    category: '',
  });

  const categories: Category[] = [
    "Tenda", "Sleeping Gear", "Dapur", "Tas", "Aksesoris", "Lainnya"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      name: '',
      description: '',
      imageUrl: '',
      rentPrice: '',
      price: '',
      category: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Nama produk wajib diisi';
      valid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi produk wajib diisi';
      valid = false;
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'URL gambar wajib diisi';
      valid = false;
    }

    if (!formData.rentPrice) {
      newErrors.rentPrice = 'Harga sewa wajib diisi';
      valid = false;
    } else if (isNaN(Number(formData.rentPrice))) {
      newErrors.rentPrice = 'Harga sewa harus berupa angka';
      valid = false;
    }

    if (!formData.price) {
      newErrors.price = 'Harga jual wajib diisi';
      valid = false;
    } else if (isNaN(Number(formData.price))) {
      newErrors.price = 'Harga jual harus berupa angka';
      valid = false;
    }

    if (!formData.category) {
      newErrors.category = 'Kategori wajib dipilih';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setShowSuccess(true);
      
      // Reset form or redirect after timeout
      setTimeout(() => {
        setShowSuccess(false);
        // Router.push('/products');
      }, 2000);
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = () => {
    // Simulasi upload gambar
    setFormData(prev => ({
      ...prev,
      imageUrl: 'https://example.com/image.jpg'
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Header */}
      <header className="bg-white p-4 flex justify-between items-center shadow-sm sticky top-0 z-10">
        <div className="flex items-center">
          <button 
            className="p-1 mr-3" 
            onClick={() => router.back()}
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="font-bold text-lg">Tambah Produk Baru</h1>
        </div>
      </header>

      {/* Success notification */}
      {showSuccess && (
        <div className="fixed top-16 left-0 right-0 bg-green-500 text-white p-4 flex items-center justify-center z-50">
          <Check size={18} className="mr-2" />
          <span>Produk berhasil ditambahkan!</span>
        </div>
      )}

      {/* Main Form */}
      <main className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center">
                <Camera size={18} className="mr-2 text-gray-500" />
                Gambar Produk
              </div>
            </label>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center h-48 cursor-pointer"
              onClick={handleImageUpload}
            >
              {formData.imageUrl ? (
                <div className="relative w-full h-full">
                  <Image 
                    width={150}
                    height={150}
                    src="/api/placeholder/150/150" 
                    alt="Preview"
                    fill 
                    className="w-full h-full object-contain"
                  />
                  <button 
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFormData(prev => ({ ...prev, imageUrl: '' }));
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <ImageIcon size={32} className="text-gray-400 mb-2" />
                  <p className="text-gray-500 text-sm text-center">Klik untuk mengunggah gambar</p>
                  <p className="text-gray-400 text-xs mt-1">Format: JPG, PNG (Max 5MB)</p>
                </>
              )}
            </div>
            {errors.imageUrl && <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>}
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="font-medium text-lg mb-4">Informasi Dasar</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <ShoppingBag size={18} className="mr-2 text-gray-500" />
                  Nama Produk
                </div>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama produk"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <FileText size={18} className="mr-2 text-gray-500" />
                  Deskripsi
                </div>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Masukkan deskripsi produk"
                rows={4}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <Tag size={18} className="mr-2 text-gray-500" />
                  Kategori
                </div>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Pilih Kategori</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>
          </div>

          {/* Pricing Information */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="font-medium text-lg mb-4">Informasi Harga</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <DollarSign size={18} className="mr-2 text-gray-500" />
                  Harga Sewa (per hari)
                </div>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">Rp</span>
                </div>
                <input
                  type="text"
                  name="rentPrice"
                  value={formData.rentPrice}
                  onChange={handleChange}
                  placeholder="0"
                  className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.rentPrice ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>
              {errors.rentPrice && <p className="text-red-500 text-xs mt-1">{errors.rentPrice}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <DollarSign size={18} className="mr-2 text-gray-500" />
                  Harga Jual
                </div>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">Rp</span>
                </div>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white rounded-lg py-3 font-medium flex items-center justify-center ${loading ? 'opacity-70' : 'hover:bg-blue-700'}`}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Memproses...</span>
                </div>
              ) : (
                <span>Simpan Produk</span>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}