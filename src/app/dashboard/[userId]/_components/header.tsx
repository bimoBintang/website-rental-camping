"use client"

import { Menu, Bell, Calendar, Home, Package, ShoppingBag, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";



export default function HeaderAdmin() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {data: session, status} = useSession();
    const userId = session?.user?.id?.toString() || "";

    const SessionLoading = status !== "loading";

    return (
        <>
            <header className="bg-white p-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center">
                <button 
                    className="p-1 mr-3" 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <Menu size={20} />
                </button>
                <h1 className="font-bold text-lg">CampRental Admin</h1>
                </div>
                <div className="flex items-center space-x-3">
                <button className="p-1 relative">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    AD
                </div>
                </div>
            </header>

            {isMenuOpen && SessionLoading && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)}>
                <div className="bg-white w-64 h-full p-4" onClick={e => e.stopPropagation()}>
                    <div className="mb-6 pb-4 border-b border-gray-100">
                    <h2 className="font-bold text-xl mb-4">CampRental</h2>
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white mr-3">
                        AD
                        </div>
                        <div>
                        <p className="font-medium">{session?.user.username}</p>
                        <p className="text-xs text-gray-500">{session?.user.email}</p>
                        </div>
                    </div>
                    </div>
                    
                    <nav className="grid col-span-2">
                    <ul className="space-y-5">
                        <li>
                        <Link href={userId ? `/dashboard/${userId}` : "/"} className="flex items-center p-3 rounded-lg bg-blue-50 text-blue-600">
                            <Home size={18} className="mr-3" />
                            Dashboard
                        </Link>
                        </li>
                        <li>
                        <Link href={userId ? `/dashboard/${userId}/product` : "/product"} className="flex items-center p-3 rounded-lg hover:bg-gray-50">
                            <Package size={18} className="mr-3" />
                            Products
                        </Link>
                        </li>
                        <li>
                        <Link href={userId ? `/dashboard/${userId}/contact` : "/contact"} className="flex items-center p-3 rounded-lg hover:bg-gray-50">
                            <ShoppingBag size={18} className="mr-3" />
                            Contacts
                        </Link>
                        </li>
                        <li>
                        <Link href={userId ? `/dashboard/${userId}/banner` : "/banner"} className="flex items-center p-3 rounded-lg hover:bg-gray-50">
                            <Calendar size={18} className="mr-3" />
                            Banner
                        </Link>
                        </li>
                    </ul>
                        <button
                            className="flex items-center justify-center gap-2 p-3 mt-5 w-full bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                            onClick={() => signOut()}
                        >
                            <LogOut size={18} />
                            Logout
                            </button><button className="flex items-center p-3 rounded-lg hover:cursor-pointer hover:bg-gray-50" onClick={() => signOut()}>
                        </button>
                        </nav>
                    </div>
                </div>
            )}
        </>
  
    )
}