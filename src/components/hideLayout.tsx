"use client"

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Navbar from "./Navbar";



export function HideLayout({ children }: {children: React.ReactNode}) {
    const pathname = usePathname();
    const hideLayout = pathname === "/auth"
    return (
        <>
            {hideLayout && <Navbar />}
                {children}
            {hideLayout && <Footer />}
        </>
    )
}