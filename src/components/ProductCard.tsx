// components/ProductCard.tsx
"use client";

import { getBaseUrl } from "@/lib/helperAbsolute";
import { motion } from "framer-motion";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rentPrice: number;
  imageUrl: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

// Ganti nomor di bawah dengan nomor WhatsApp kamu
const WHATSAPP_NUMBER = "6281210347782"; // Format internasional, tanpa tanda +

const ProductCard = ({ product }: ProductCardProps) => {
  const imageFullUrl = `${getBaseUrl()}${product.imageUrl}`;
  const handleWhatsAppOrder = (type: "beli" | "sewa") => {
    const message =
      type === "beli"
        ? `Halo, saya tertarik untuk BELI produk:\nNama: ${product.name}\nHarga: Rp ${product.price.toLocaleString()}\nGambar: ${imageFullUrl}`
        : `Halo, saya tertarik untuk SEWA produk:\nNama: ${product.name}\nHarga: Rp ${product.rentPrice.toLocaleString()} / hari\nGambar: ${imageFullUrl}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="relative h-64 w-full">
        <Image
          src={product.imageUrl || "/images/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4 bg-emerald-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
          {product.category}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-500 text-sm">Beli</p>
            <p className="text-lg font-bold text-gray-800">Rp {product.price.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm">Sewa / hari</p>
            <p className="text-lg font-bold text-emerald-600">Rp {product.rentPrice.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleWhatsAppOrder("sewa")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-medium transition-colors w-full"
          >
            Sewa
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleWhatsAppOrder("beli")}
            className="border border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-2 px-4 rounded-lg font-medium transition-colors w-full"
          >
            Beli
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
