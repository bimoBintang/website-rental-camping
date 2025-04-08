import StatCard from "@/components/StatCard";
import { MapPin, ShoppingBag, Tent, TrendingUp } from "lucide-react";



export default function Sidebar() {
    return (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard 
            title="Pendapatan" 
            value="Rp 8,5jt" 
            icon={<TrendingUp size={18} className="text-blue-500" />}
            trend="12% vs minggu lalu"
            trendUp={true}
          />
          <StatCard 
            title="Pesanan" 
            value="128" 
            icon={<ShoppingBag size={18} className="text-blue-500" />}
            trend="5% vs minggu lalu"
            trendUp={true}
          />
          <StatCard 
            title="Peralatan" 
            value="56 item" 
            icon={<Tent size={18} className="text-blue-500" />}
          />
          <StatCard 
            title="Lokasi" 
            value="5 outlet" 
            icon={<MapPin size={18} className="text-blue-500" />}
          />
        </div>
    )
}