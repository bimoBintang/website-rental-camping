// app/components/ProductTable.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { PencilIcon, TrashIcon, EyeIcon } from 'lucide-react';

// Define the Product type based on your model
type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rentPrice: number;
  price: number;
  category: string;
};

interface ProductTableProps {
  products: Product[];
  onView?: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onView,
  onEdit,
  onDelete,
}) => {
  const [sortField, setSortField] = useState<keyof Product>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Product) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow">
      {/* Standard Table (hidden on mobile) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-100">
            <tr>
              <th className="p-4">Image</th>
              <th 
                className="p-4 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('name')}
              >
                Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="p-4">Description</th>
              <th 
                className="p-4 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('category')}
              >
                Category {sortField === 'category' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="p-4 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('rentPrice')}
              >
                Rent Price {sortField === 'rentPrice' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="p-4 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('price')}
              >
                Price {sortField === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <div className="relative h-12 w-12">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                </td>
                <td className="p-4 font-medium">{product.name}</td>
                <td className="p-4 max-w-xs truncate">{product.description}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">{formatCurrency(product.rentPrice)}</td>
                <td className="p-4">{formatCurrency(product.price)}</td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onView && onView(product)}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                    >
                      <EyeIcon size={16} />
                    </button>
                    <button
                      onClick={() => onEdit && onEdit(product)}
                      className="p-1 text-yellow-600 hover:bg-yellow-100 rounded"
                    >
                      <PencilIcon size={16} />
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(product)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                    >
                      <TrashIcon size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        {sortedProducts.map((product) => (
          <div key={product.id} className="border-b p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative h-16 w-16 flex-shrink-0">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
            </div>
            
            <p className="text-sm mb-3 line-clamp-2">{product.description}</p>
            
            <div className="flex justify-between mb-3">
              <div>
                <div className="text-xs text-gray-500">Rent Price</div>
                <div className="font-semibold">{formatCurrency(product.rentPrice)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Sale Price</div>
                <div className="font-semibold">{formatCurrency(product.price)}</div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => onView && onView(product)}
                className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded"
              >
                <EyeIcon size={18} />
              </button>
              <button
                onClick={() => onEdit && onEdit(product)}
                className="p-2 text-yellow-600 bg-yellow-50 hover:bg-yellow-100 rounded"
              >
                <PencilIcon size={18} />
              </button>
              <button
                onClick={() => onDelete && onDelete(product)}
                className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded"
              >
                <TrashIcon size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTable;