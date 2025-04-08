import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET() {
    try {
        const response = await prisma.product.findMany();

        return NextResponse.json(response);
    } catch (error: unknown) {
        console.error("Error fetching products:", error);
        return NextResponse.json("Failed to get products", { status: 401 });
    }
}