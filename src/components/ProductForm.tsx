"use client";

import React, { useState, useRef } from "react";
import { X } from "lucide-react";
import Image from "next/image";

// Define more specific types
type ProductData = {
  id?: string;
  name: string;
  description: string;
  imageUrl: string;
  rentPrice: number;
  price: number;
  category: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type ProductFormProps = {
  product?: ProductData;
  onSubmit: (data: ProductData) => void;
  onCancel: () => void;
};

const ProductForm = ({ 
    product, 
    onCancel, 
    onSubmit,
}: ProductFormProps) => {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
  const [rentPrice, setRentPrice] = useState(product?.rentPrice || 0);
  const [price, setPrice] = useState(product?.price || 0);
  const [category, setCategory] = useState(product?.category || "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validasi input
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!imageUrl.trim()) newErrors.imageUrl = "Image URL is required";
    if (!category.trim()) newErrors.category = "Category is required";
    if (price <= 0) newErrors.price = "Price is required and must be greater than 0";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Create a complete product object with all required fields
    const productData: ProductData = {
      ...(product?.id && { id: product.id }),
      name,
      description,
      imageUrl,
      rentPrice,
      price,
      category,
      userId: product?.userId || "", // Use existing or empty string
      createdAt: product?.createdAt || new Date(), // Use existing or current date
      updatedAt: new Date(), // Always use current date for updatedAt
    };

    try {
      await onSubmit(productData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors({...errors, imageUrl: 'Please upload an image file'});
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors({...errors, imageUrl: 'Image must be less than 5MB'});
      return;
    }

    // Create a preview URL
    const filePreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(filePreviewUrl);
    
    // Upload the file
    try {
      setIsUploading(true);
      
      // Create form data for upload
      const formData = new FormData();
      formData.append('file', file);
      
      // Upload to your API endpoint
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      
      const data = await response.json();
      setImageUrl(data.url); // Set the returned URL from your server
      setErrors((prev) => ({...prev, imageUrl: ''})); // Clear any errors
    } catch (err) {
      console.error('Upload error:', err);
      setErrors((prev) => ({...prev, imageUrl: 'Failed to upload image'}));
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-medium">{product?.id ? "Edit Product" : "Add New Product"}</h3>
        <button type="button" onClick={onCancel} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-2 border rounded-md ${errors.name ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter product name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={`w-full p-2 border rounded-md ${errors.description ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter product description"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
          
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
          
          <button 
            type="button"
            onClick={triggerFileInput}
            className={`w-full p-2 border-2 border-dashed rounded-md flex items-center justify-center ${
              errors.imageUrl ? "border-red-500" : "border-gray-300"
            } hover:bg-gray-50`}
          >
            {isUploading ? "Uploading..." : "Upload Image"}
          </button>
          
          {errors.imageUrl && <p className="mt-1 text-sm text-red-600">{errors.imageUrl}</p>}
        </div>

        {/* Preview Image */}
        {(imageUrl || previewUrl) && (
          <div className="mb-4 flex justify-center">
            <div className="relative h-20 w-20 border rounded-lg overflow-hidden">
              <Image
                src={previewUrl || imageUrl}  
                alt="Preview"
                className="object-cover"
                fill
                sizes="80px"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/100x100/CCCCCC/999?text=Error";
                }}
              />
            </div>
          </div>
        )}

        {/* Rent Price & Price */}
        <div className="mb-4 grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rent Price</label>
            <input
              type="number"
              value={rentPrice}
              onChange={(e) => setRentPrice(Number(e.target.value))}
              className="w-full p-2 border rounded-md border-gray-300"
              placeholder="0"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className={`w-full p-2 border rounded-md ${errors.price ? "border-red-500" : "border-gray-300"}`}
              placeholder="0"
              min="0"
            />
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
          </div>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full p-2 border rounded-md ${errors.category ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter category"
          />
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2 mt-6">
          <button 
            type="button" 
            onClick={onCancel} 
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" 
            disabled={loading || isUploading}
          >
            {loading ? "Processing..." : isUploading ? "Uploading..." : product?.id ? "Update Product" : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;