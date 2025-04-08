// app/products/page.tsx
"use client";

import { useState, useEffect } from "react";
import ProductTable from "@/components/ProductTable";
import { PlusIcon, XIcon } from "lucide-react";
import Image from "next/image";
import ProductForm from "@/components/ProductForm";
import { useParams } from "next/navigation";

// Tipe data untuk produk
type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rentPrice: number;
  price: number;
  category: string;
  userId?: string;
};

export default function ProductsPage() {
  const params = useParams();
  const userId = params.userId as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Fetch data dari API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/users/${userId}/products`);
        if (!response.ok && response.status !== 404) {
          throw new Error(`Error: ${response.status}`);
        }
        if (response.status === 404) {
          setProducts([]);
          return;
        }

        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error: unknown) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [userId]);

  const handleView = (product: Product) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (product: Product) => {
    if (confirm(`Are you sure you want to delete ${product.name}?`)) {
      try {
        const response = await fetch(`/api/users/${userId}/products/${product.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete product");
        }

        setProducts(products.filter(p => p.id !== product.id));
      } catch (error: unknown) {
        console.error("Error deleting product:", error);
        setError("Failed to delete product");
      }
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
    setError(null);
  };

  const handleFormSubmit = async (productData: Omit<Product, "id">) => {
    try {
      setError(null);

      if (editingProduct) {
        // Fix: Menggunakan ID produk langsung dari objek editingProduct
        const response = await fetch(`/api/users/${userId}/products/${editingProduct.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData)
        });

        if (!response.ok) {
          throw new Error("Failed to update product");
        }

        const updatedProduct = await response.json();

        setProducts(
          products.map(p =>
            p.id === editingProduct.id
              ? updatedProduct
              : p
          )
        );
      } else {
        const response = await fetch(`/api/users/${userId}/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...productData,
            userId
          })
        });

        if (!response.ok) {
          throw new Error("Failed to create product");
        }

        const newProduct = await response.json();
        setProducts([...products, newProduct]);
      }

      setIsFormOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error(err);
    }
  };

  if (isLoading && !error) {
    return (
      <div className="max-w-6xl mx-auto p-4 flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={handleAddProduct}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center shadow-md"
        >
          <PlusIcon size={18} className="mr-2" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-6 border border-blue-100">
        <h2 className="font-medium text-blue-800 mb-2">Product Management</h2>
        <p className="text-sm text-blue-700">
          Create and manage products that appear on your website. 
          Add eye-catching visuals and compelling copy to drive user engagement.
        </p>
      </div>
      
      {/* Show error message if there is one, but don't block the UI */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full md:w-1/3 p-3 border rounded-lg"
        />
      </div>

      {products.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No products found. Click Add Product to create one.</p>
        </div>
      ) : (
        <ProductTable 
          products={products} 
          onView={handleView} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}
      
      {/* Modal View Product */}
      {isViewModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">Product Preview</h3>
              <button onClick={() => setIsViewModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <XIcon size={20} />
              </button>
            </div>
            <div className="p-4">
              <div className="flex justify-center mb-4">
                <div className="relative h-24 w-24 rounded-xl overflow-hidden shadow-md">
                  <Image 
                    src={selectedProduct.imageUrl} 
                    alt={selectedProduct.name} 
                    fill 
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <div className="p-2 bg-gray-50 rounded border text-center font-medium">{selectedProduct.name}</div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <div className="p-3 bg-gray-50 rounded border">{selectedProduct.description}</div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rent Price</label>
                <div className="p-3 bg-gray-50 rounded border">{selectedProduct.rentPrice}</div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <div className="p-3 bg-gray-50 rounded border">{selectedProduct.price}</div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <div className="p-3 bg-gray-50 rounded border">{selectedProduct.category}</div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => {
                    handleEdit(selectedProduct);
                    setIsViewModalOpen(false);
                  }}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button onClick={() => setIsViewModalOpen(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <ProductForm 
            product={editingProduct || undefined} 
            onSubmit={handleFormSubmit} 
            onCancel={() => setIsFormOpen(false)} 
          />
        </div>
      )}
    </div>
  );
}