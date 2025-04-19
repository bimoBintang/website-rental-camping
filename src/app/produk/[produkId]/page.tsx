// app/produk/[produkId]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import FormattedPrice from "@/components/FormattedPrice";
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
  stock?: number;
  specs?: {
    [key: string]: string;
  };
  reviews?: Array<{
    id: string;
    user: string;
    rating: number;
    comment: string;
    date: string;
  }>;
  relatedProducts?: string[];
};

export default function DetailProdukPage() {
  const params = useParams();
  const produkId = params.produkId as string;
  
  const [produk, setProduk] = useState<Produk | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("deskripsi");
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState("beli");
  const [rentalDays, setRentalDays] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Produk[]>([]);
  
  // Fetch data produk
  useEffect(() => {
    const fetchProduk = async () => {
      setIsLoading(true);
      try {
        // Di sini seharusnya mengambil data dari API
        // Untuk contoh, kita gunakan data dummy
        const dummyProduk: Produk = {
          id: produkId,
          name: "Tenda Ultralight 2 Orang",
          description: "Tenda ringan dengan bahan waterproof berkualitas tinggi, cocok untuk pendakian dan camping. Mudah dipasang dan sangat ringan untuk dibawa dalam perjalanan outdoor Anda. Tenda ini mampu menahan angin kencang dan hujan deras.",
          price: 2500000,
          rentPrice: 150000,
          imageUrl: "/api/placeholder/600/400",
          category: "tenda",
          stock: 15,
          specs: {
            "Kapasitas": "2 Orang",
            "Berat": "1.8 kg",
            "Dimensi": "220 x 130 x 100 cm",
            "Bahan": "Polyester 75D, Waterproof 3000mm",
            "Tiang": "Aluminium Alloy",
            "Warna": "Hijau/Abu-abu",
            "Garansi": "1 Tahun"
          },
          reviews: [
            {
              id: "rev1",
              user: "Adventure Seeker",
              rating: 5,
              comment: "Tenda ini sangat ringan dan mudah dipasang. Saya menggunakannya saat mendaki Gunung Rinjani dan sangat puas!",
              date: "12 Maret 2025"
            },
            {
              id: "rev2",
              user: "Mountain Explorer",
              rating: 4,
              comment: "Kualitas bahan bagus dan tahan air dengan baik. Sedikit kesulitan saat memasang di angin kencang.",
              date: "28 Februari 2025"
            }
          ],
          relatedProducts: ["prod2", "prod3", "prod4"]
        };

        const dummyRelated = [
          {
            id: "prod2",
            name: "Sleeping Bag Ultralight",
            description: "Sleeping bag ringan untuk kegiatan camping",
            price: 850000,
            rentPrice: 85000,
            imageUrl: "/api/placeholder/400/300",
            category: "tidur"
          },
          {
            id: "prod3",
            name: "Matras Camping",
            description: "Matras nyaman anti air untuk camping",
            price: 450000,
            rentPrice: 45000, 
            imageUrl: "/api/placeholder/400/300",
            category: "tidur"
          },
          {
            id: "prod4",
            name: "Kompor Portable",
            description: "Kompor gas portable untuk memasak outdoor",
            price: 550000,
            rentPrice: 50000,
            imageUrl: "/api/placeholder/400/300",
            category: "memasak"
          }
        ];
        
        setProduk(dummyProduk);
        setRelatedProducts(dummyRelated);
      } catch (error) {
        console.error("Error fetching produk:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (produkId) {
      fetchProduk();
    }
  }, [produkId]);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (produk?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleRentalDaysChange = (change: number) => {
    const newDays = rentalDays + change;
    if (newDays >= 1 && newDays <= 30) {
      setRentalDays(newDays);
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-600"></div>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="h-8 w-8 bg-gray-50 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // Render error state if produk not found
  if (!produk) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Produk Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-6">Maaf, produk yang Anda cari tidak tersedia atau telah dihapus.</p>
          <Link href="/produk">
            <button className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition-colors">
              Kembali ke Katalog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Render Star Rating
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 15.585l-5.793 3.044 1.107-6.461-4.686-4.568 6.478-.944L10 1.21l2.894 5.446 6.478.944-4.686 4.568 1.107 6.461L10 15.585z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>
    );
  };

  // Calculate average rating
  const averageRating = produk.reviews
    ? produk.reviews.reduce((acc, review) => acc + review.rating, 0) / produk.reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex text-sm">
            <Link href="/" className="text-gray-500 hover:text-emerald-600">
              Beranda
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/produk" className="text-gray-500 hover:text-emerald-600">
              Produk
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-emerald-600 font-medium">{produk.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2 bg-gray-100">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="p-6 flex items-center justify-center h-full"
              >
                <Image
                  src={produk.imageUrl} 
                  alt={produk.name}
                  width={100} 
                  height={100}
                  className="w-full h-auto max-h-96 object-contain" 
                />
              </motion.div>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-6 md:p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-2">
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded uppercase font-medium">
                    {produk.category}
                  </span>
                  {averageRating > 0 && (
                    <div className="flex items-center ml-4">
                      <StarRating rating={Math.round(averageRating)} />
                      <span className="ml-2 text-sm text-gray-600">
                        ({produk.reviews?.length || 0} ulasan)
                      </span>
                    </div>
                  )}
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {produk.name}
                </h1>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                  <div className="bg-gray-50 px-4 py-2 rounded">
                    <span className="text-gray-500 text-sm">Harga Beli</span>
                    <div className="text-xl font-bold text-emerald-700">
                      <FormattedPrice price={produk.price} />
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-2 rounded">
                    <span className="text-gray-500 text-sm">Harga Sewa</span>
                    <div className="text-xl font-bold text-emerald-700">
                      <FormattedPrice price={produk.rentPrice} suffix=" / hari" />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-600">{produk.description}</p>
                </div>

                {/* Purchase Type Toggle */}
                <div className="mb-6">
                  <div className="flex border border-gray-300 rounded-md overflow-hidden">
                    <button
                      onClick={() => setPurchaseType("beli")}
                      className={`flex-1 px-4 py-2 font-medium ${
                        purchaseType === "beli" 
                          ? "bg-emerald-600 text-white" 
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Beli
                    </button>
                    <button
                      onClick={() => setPurchaseType("sewa")}
                      className={`flex-1 px-4 py-2 font-medium ${
                        purchaseType === "sewa" 
                          ? "bg-emerald-600 text-white" 
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Sewa
                    </button>
                  </div>
                </div>

                {/* Quantity Selection */}
                {purchaseType === "beli" ? (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah</label>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        className="bg-gray-200 text-gray-600 hover:bg-gray-300 h-10 w-10 rounded-l flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <div className="h-10 w-16 border-t border-b border-gray-300 flex items-center justify-center text-gray-700">
                        {quantity}
                      </div>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        className="bg-gray-200 text-gray-600 hover:bg-gray-300 h-10 w-10 rounded-r flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                      
                      <div className="ml-4 text-sm text-gray-500">
                        {produk.stock} tersedia
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Durasi Sewa (Hari)</label>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleRentalDaysChange(-1)}
                        className="bg-gray-200 text-gray-600 hover:bg-gray-300 h-10 w-10 rounded-l flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <div className="h-10 w-16 border-t border-b border-gray-300 flex items-center justify-center text-gray-700">
                        {rentalDays}
                      </div>
                      <button
                        onClick={() => handleRentalDaysChange(1)}
                        className="bg-gray-200 text-gray-600 hover:bg-gray-300 h-10 w-10 rounded-r flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                      
                      <div className="ml-4 text-sm text-gray-500">
                        Maksimal 30 hari
                      </div>
                    </div>
                  </div>
                )}

                {/* Total Price */}
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Total:</span>
                    <span className="text-xl font-bold text-emerald-700">
                      {purchaseType === "beli" ? (
                        <FormattedPrice price={produk.price * quantity} />
                      ) : (
                        <FormattedPrice price={produk.rentPrice * rentalDays} />
                      )}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-md font-medium transition-colors">
                    {purchaseType === "beli" ? "Tambahkan ke Keranjang" : "Sewa Sekarang"}
                  </button>
                  <button className="flex-1 bg-white border border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-3 px-6 rounded-md font-medium transition-colors">
                    {purchaseType === "beli" ? "Beli Sekarang" : "Cek Ketersediaan"}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t">
            <div className="flex border-b overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveTab("deskripsi")}
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === "deskripsi"
                    ? "border-b-2 border-emerald-600 text-emerald-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Deskripsi
              </button>
              <button
                onClick={() => setActiveTab("spesifikasi")}
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === "spesifikasi"
                    ? "border-b-2 border-emerald-600 text-emerald-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Spesifikasi
              </button>
              <button
                onClick={() => setActiveTab("ulasan")}
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === "ulasan"
                    ? "border-b-2 border-emerald-600 text-emerald-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Ulasan ({produk.reviews?.length || 0})
              </button>
            </div>

            <div className="p-6">
              {activeTab === "deskripsi" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="prose max-w-none"
                >
                  <p className="mb-4">{produk.description}</p>
                  <p>
                    Tenda ini dirancang khusus untuk petualangan outdoor dengan mempertimbangkan faktor berat dan kenyamanan. 
                    Dengan material berkualitas tinggi dan teknologi waterproof, tenda ini akan melindungi Anda dari berbagai kondisi cuaca.
                  </p>
                  <h3 className="text-lg font-semibold mt-6 mb-2">Fitur Utama:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Ringan dan mudah dibawa</li>
                    <li>Pemasangan cepat dalam 5 menit</li>
                    <li>Tahan air dengan lapisan waterproof 3000mm</li>
                    <li>Ventilasi yang baik untuk sirkulasi udara</li>
                    <li>Tiang aluminium yang kuat dan tahan lama</li>
                    <li>Kantong jaring di dalam tenda untuk penyimpanan kecil</li>
                  </ul>
                </motion.div>
              )}

              {activeTab === "spesifikasi" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    {produk.specs && Object.entries(produk.specs).map(([key, value]) => (
                      <div key={key} className="border-b border-gray-200 pb-3">
                        <span className="text-gray-500 text-sm">{key}</span>
                        <div className="font-medium text-gray-800 mt-1">{value}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "ulasan" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {produk.reviews && produk.reviews.length > 0 ? (
                    <div className="space-y-6">
                      {produk.reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-6">
                          <div className="flex items-center mb-2">
                            <div className="bg-emerald-100 text-emerald-700 rounded-full h-10 w-10 flex items-center justify-center font-medium">
                              {review.user.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <div className="font-medium text-gray-800">{review.user}</div>
                              <div className="text-gray-500 text-xs">{review.date}</div>
                            </div>
                          </div>
                          <div className="mt-2">
                            <StarRating rating={review.rating} />
                          </div>
                          <p className="mt-3 text-gray-600">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-700 mb-1">Belum Ada Ulasan</h3>
                      <p className="text-gray-500">Jadilah yang pertama memberikan ulasan untuk produk ini.</p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Produk Terkait</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-48 bg-gray-200">
                    <Image
                      src={relatedProduct.imageUrl}
                      alt={relatedProduct.name}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">{relatedProduct.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{relatedProduct.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-emerald-700 font-bold">
                        <FormattedPrice price={relatedProduct.price} />
                      </div>
                      <Link href={`/produk/${relatedProduct.id}`}>
                        <span className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                          Detail &rarr;
                        </span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}