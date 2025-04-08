// app/components/ProductTable.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { PencilIcon, TrashIcon, EyeIcon } from 'lucide-react';

// Define the Product type based on your model
type Banner = {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
};

interface BannerTableProps {
  banners: Banner[];
  onView?: (banner: Banner) => void;
  onEdit?: (banner: Banner) => void;
  onDelete?: (banner: Banner) => void;
}

const BannerTable: React.FC<BannerTableProps> = ({
  banners,
  onView,
  onEdit,
  onDelete,
}) => {
  const [sortField, setSortField] = useState<keyof Banner>('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Banner) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedBanners = [...banners].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

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
                onClick={() => handleSort('title')}
              >
                title {sortField === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="p-4">description</th>
              <th 
                className="p-4 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('description')}
              >
                Url {sortField === 'description' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedBanners.map((banner) => (
              <tr key={banner.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <div className="relative h-12 w-12">
                    <Image
                      src={banner.iconUrl}
                      alt={banner.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                </td>
                <td className="p-4 font-medium">{banner.title}</td>
                <td className="p-4 max-w-xs truncate">{banner.description}</td>
                <td className="p-4">{banner.iconUrl}</td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onView && onView(banner)}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                    >
                      <EyeIcon size={16} />
                    </button>
                    <button
                      onClick={() => onEdit && onEdit(banner)}
                      className="p-1 text-yellow-600 hover:bg-yellow-100 rounded"
                    >
                      <PencilIcon size={16} />
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(banner)}
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
        {sortedBanners.map((banner) => (
          <div key={banner.id} className="border-b p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative h-16 w-16 flex-shrink-0">
                <Image
                  src={banner.iconUrl}
                  alt={banner.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-lg">{banner.title}</h3>
                <p className="text-sm text-gray-500">{banner.iconUrl}</p>
              </div>
            </div>
            
            <p className="text-sm mb-3 line-clamp-2">{banner.description}</p>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => onView && onView(banner)}
                className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded"
              >
                <EyeIcon size={18} />
              </button>
              <button
                onClick={() => onEdit && onEdit(banner)}
                className="p-2 text-yellow-600 bg-yellow-50 hover:bg-yellow-100 rounded"
              >
                <PencilIcon size={18} />
              </button>
              <button
                onClick={() => onDelete && onDelete(banner)}
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

export default BannerTable;