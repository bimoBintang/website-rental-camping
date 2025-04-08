"use client"

import Image from "next/image";

interface ProductItemProps {
    name: string;
    category: string;
    status: "Tersedia" | "Disewa" | "Dalam Pemeliharaan";
    image: string;
  }

  
const ProductItem: React.FC<ProductItemProps> = ({ name, category, status, image }) => {
    const getStatusColor = () => {
      switch(status) {
        case "Tersedia": return "bg-green-100 text-green-800";
        case "Disewa": return "bg-blue-100 text-blue-800";
        case "Dalam Pemeliharaan": return "bg-orange-100 text-orange-800";
        default: return "bg-gray-100 text-gray-800";
      }
    };
  
    return (
      <div className="flex items-center p-3 border-b border-gray-100">
        <div className="bg-gray-200 w-12 h-12 rounded-lg flex items-center justify-center">
          <Image src={image} alt={name} width={150} height={150} className="w-8 h-8" />
        </div>
        <div className="ml-3 flex-1">
          <h4 className="font-medium text-sm">{name}</h4>
          <p className="text-gray-500 text-xs">{category}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor()}`}>
          {status}
        </div>
      </div>
    );
  };

export default ProductItem;