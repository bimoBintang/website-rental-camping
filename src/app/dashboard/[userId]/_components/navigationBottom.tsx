"use client";

import { Dock, Home, Package, ShoppingBag } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, useEffect } from "react";

export default function NavigationBottom() {
  const { data: session } = useSession();
  const userId = session?.user?.id?.toString() || "";
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Construct the base path
  const basePath = userId ? `/dashboard/${userId}` : "/";

  const menuItems = useMemo(
    () => [
      { href: `${basePath}`, icon: Home, label: "Beranda" },
      { href: `${basePath}/product`, icon: Package, label: "Products" },
      { href: `${basePath}/contact`, icon: ShoppingBag, label: "Contact" },
      { href: `${basePath}/banner`, icon: Dock, label: "Banner" },
    ],
    [basePath]
  );

  // Improve active state detection logic
  const getIsActive = (href: string) => {
    if (href === basePath) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  // Prevent animation during page transitions
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3">
      {menuItems.map(({ href, icon: Icon, label }) => {
        const isActive = getIsActive(href);
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center relative w-16"
            onClick={() => setIsTransitioning(true)}
          >
            <Icon
              size={22}
              className={`transition-colors duration-200 ${
                isActive ? "text-blue-500" : "text-gray-400"
              }`}
            />
            <span
              className={`text-xs mt-1 transition-colors duration-200 ${
                isActive ? "text-blue-500 font-semibold" : "text-gray-400"
              }`}
            >
              {label}
            </span>
            {isActive && !isTransitioning && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-blue-500 rounded-full mt-1 animate-fadeIn" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}