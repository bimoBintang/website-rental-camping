// app/api/users/[userId]/products/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _req: Request,
  context: {params: Promise<{userId: string}>}
) {
  try {
    // Await params untuk mengatasi error "params should be awaited"
    const { userId } = await context.params;

    // Log untuk debugging
    console.log("GET Products API - userId:", userId);

    const products = await prisma.product.findMany({
      where: {
        userId: userId
      }
    });

    return NextResponse.json(products);
    
  } catch (error: unknown) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  context: {params: Promise<{userId: string}>}
) {
  try {
    // Await params untuk mengatasi error "params should be awaited"
    const { userId } = await context.params;
    // Log untuk debugging
    console.log("POST Products API - userId:", userId);

    const data = await req.json();

    // Validasi data yang diterima
    if (!data || !data.name) {
      return NextResponse.json(
        { error: "Invalid product data" },
        { status: 400 }
      );
    }

    // Buat produk baru
    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description || "",
        imageUrl: data.imageUrl || "",
        rentPrice: parseFloat(data.rentPrice) || 0,
        price: parseFloat(data.price) || 0,
        category: data.category || "",
        userId: userId
      }
    });

    return NextResponse.json(newProduct);
    
  } catch (error: unknown) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}