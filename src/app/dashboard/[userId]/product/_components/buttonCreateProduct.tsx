"use client"

import { PlusIcon } from "lucide-react"
import { useRouter } from "next/navigation"

interface Props {
  onClick?: () => void;
}

export default function ButtonCreateProduct({onClick}: Props) {
    const router = useRouter();

    return (
        <button onClick={onClick ? onClick : () => router.push("/product/create")} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
          <PlusIcon size={18} className="mr-2" />
          <span>Add Product</span>
        </button>
    )
}