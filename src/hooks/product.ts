"use strict"

import { Products } from "@/types/product"
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client";



export async function CreateProduct(data: Prisma.ProductCreateInput): Promise<Products> {
    try {
        const createProduct = await prisma.product.create({
            data: {...data,}
        })
        return createProduct;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message :"Failed to create product");
    }
}

export async function GetAllProduct(): Promise<Products[]> {
    try {
        const response = await prisma.product.findMany();

        const result = response.map((product) => ({
            id: product.id, // Pastikan ID dikembalikan
            name: product.name,
            description: product.description,
            imageUrl: product.imageUrl,
            rentPrice: Number(product.rentPrice), // Pastikan ini number
            price: Number(product.price), // Pastikan ini number
            category: product.category,
            userId: product.userId,
        }));

        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch Data Products");
    }
}
;

export async function UpdateProduct(productId: string, data: Omit<Products, "userId">) {
    const product = await prisma.product.findUnique({where: {id: productId}});
    if(!product) {throw new Error("Product tidak ditemukan")};

    try {
        const response = await prisma.product.update({
            where: {id: productId},
            data: {...data}
        });

        return response;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message :"Failed to updated product");
    }
};

export async function DeleteProduct(productId: string) {
    const product = await prisma.product.findUnique({where: {id: productId}});
    if(!product) {throw new Error("Product tidak ditemukan")};

    try {
        const deleteProduct = await prisma.product.delete({where: {id: productId}})
        return deleteProduct;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message :"Product Gagal terdelete, silahkan coba lagi!")
    };
}