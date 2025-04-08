// import { 
//   Search,
// } from 'lucide-react';
import ProductItem from './_components/ProductItem';


export default function Dashboard() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Main Content */}
      <main className="p-4">
        {/* Search */}
        {/* <div className="relative mb-6">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari inventaris, pesanan, atau pelanggan..." 
            className="bg-white w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}
        
        {/* Stats Grid */}
        
        
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Pesanan Terbaru</h3>
            <a href="#" className="text-blue-500 text-sm">Lihat Semua</a>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">#ORD-5782</p>
                <p className="text-gray-500 text-xs">Budi Santoso • 2 jam yang lalu</p>
              </div>
              <div>
                <p className="font-medium text-right">Rp 750K</p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Selesai</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">#ORD-5781</p>
                <p className="text-gray-500 text-xs">Andi Wijaya • 5 jam yang lalu</p>
              </div>
              <div>
                <p className="font-medium text-right">Rp 1,2jt</p>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Sedang Disewa</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">#ORD-5780</p>
                <p className="text-gray-500 text-xs">Siti Nurhaliza • 1 hari yang lalu</p>
              </div>
              <div>
                <p className="font-medium text-right">Rp 450K</p>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Menunggu</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Inventory Status */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Status Inventaris</h3>
            <a href="#" className="text-blue-500 text-sm">Lihat Semua</a>
          </div>
          <div>
            <ProductItem 
              name="Tenda Ultralight 2P" 
              category="Tenda"
              status="Disewa"
              image="/api/placeholder/50/50"
            />
            <ProductItem 
              name="Sleeping Bag -5°C" 
              category="Sleeping Gear"
              status="Tersedia"
              image="/api/placeholder/50/50"
            />
            <ProductItem 
              name="Kompor Portable" 
              category="Dapur"
              status="Dalam Pemeliharaan"
              image="/api/placeholder/50/50"
            />
            <ProductItem 
              name="Ransel 60L" 
              category="Tas"
              status="Tersedia"
              image="/api/placeholder/50/50"
            />
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      
    </div>
  );
}