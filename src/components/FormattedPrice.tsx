// components/FormattedPrice.tsx
"use client";

import { useEffect, useState } from "react";

// Format harga dengan titik sebagai pemisah ribuan (format Indonesia)
const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default function FormattedPrice({ 
  price, 
  prefix = "Rp ", 
  suffix = "" 
}: { 
  price: number;
  prefix?: string;
  suffix?: string;
}) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <span className="opacity-0">0</span>; // Placeholder untuk menghindari layout shift
  }
  
  return (
    <span>{prefix}{formatPrice(price)}{suffix}</span>
  );
}