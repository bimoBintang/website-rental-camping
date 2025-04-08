"use client"
import React, { useState, useRef } from 'react';
import { XIcon, Upload } from 'lucide-react';
import Image from 'next/image';

type Banner = {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
};

interface BannerFormProps {
  banner?: Banner;
  onSubmit: (bannerData: Omit<Banner, 'id'>) => void;
  onCancel: () => void;
}

const BannerForm: React.FC<BannerFormProps> = ({
  banner,
  onSubmit,
  onCancel
}) => {
  const [title, setTitle] = useState(banner?.title || '');
  const [description, setDescription] = useState(banner?.description || '');
  const [iconUrl, setIconUrl] = useState(banner?.iconUrl || '');
  const [previewUrl, setPreviewUrl] = useState(banner?.iconUrl || '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!iconUrl) newErrors.iconUrl = 'Icon is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit({
      title,
      description,
      iconUrl
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors({...errors, iconUrl: 'Please upload an image file'});
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors({...errors, iconUrl: 'Image must be less than 5MB'});
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
      setIconUrl(data.url); // Set the returned URL from your server
      setErrors({...errors, iconUrl: ''}); // Clear any errors
    } catch (err) {
      console.error('Upload error:', err);
      setErrors({...errors, iconUrl: 'Failed to upload image'});
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
        <h3 className="text-lg font-medium">
          {banner ? 'Edit Banner' : 'Add New Banner'}
        </h3>
        <button 
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <XIcon size={20} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter banner title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter banner description"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Banner Icon
          </label>
          
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          
          {/* File upload button */}
          <div 
            onClick={triggerFileInput}
            className={`w-full p-4 border-2 border-dashed rounded-md text-center cursor-pointer hover:bg-gray-50 ${
              errors.iconUrl ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-500">Click to upload icon image</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
          </div>
          
          {errors.iconUrl && (
            <p className="mt-1 text-sm text-red-600">{errors.iconUrl}</p>
          )}
        </div>

        {/* Preview area */}
        {previewUrl && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preview
            </label>
            <div className="flex justify-center">
              <div className="relative h-32 w-32 border rounded-lg overflow-hidden">
                <Image 
                  src={previewUrl} 
                  alt="Icon preview" 
                  width={150}
                  height={150}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/api/placeholder/100/100";
                  }}
                />
                {isUploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
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
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : banner ? 'Update' : 'Create'} Banner
          </button>
        </div>
      </form>
    </div>
  );
};

export default BannerForm;