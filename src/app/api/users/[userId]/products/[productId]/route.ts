// app/api/users/[userId]/products/[productId]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  context: { params: Promise<{productId: string, userId: string}>}
) {
  try {
    // Await params untuk mengatasi error "params should be awaited"
    const { productId, userId} = await context.params;

    // Log untuk debugging
    console.log("PATCH API - userId:", userId, "productId:", productId);

    const data = await req.json();

    // Validasi data yang diterima
    if (!data) {
      return NextResponse.json(
        { error: "No data provided" },
        { status: 400 }
      );
    }

    // Cek apakah produk ada dan milik user yang benar
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId,
        userId: userId
      }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product not found or not authorized" },
        { status: 404 }
      );
    }

    // Update produk
    const updatedProduct = await prisma.product.update({
      where: {
        id: productId
      },
      data: {
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        rentPrice: data.rentPrice,
        price: data.price,
        category: data.category
      }
    });

    return NextResponse.json(updatedProduct);
    
  } catch (error: unknown) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 401 }
    );
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{productId: string, userId: string}>}
) {
  try {
    // Await params untuk mengatasi error "params should be awaited"
    const { productId, userId} = await context.params;

    // Log untuk debugging
    console.log("DELETE API - userId:", userId, "productId:", productId);

    // Cek apakah produk ada dan milik user yang benar
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId,
        userId: userId
      }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product not found or not authorized" },
        { status: 404 }
      );
    }

    // Hapus produk
    await prisma.product.delete({
      where: {
        id: productId
      }
    });

    return NextResponse.json({ success: true });
    
  } catch (error: unknown) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 401 }
    );
  }
}