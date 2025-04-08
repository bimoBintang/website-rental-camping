"use server";

import { getBaseUrl } from "@/lib/helperAbsolute";
import { z } from "zod";

// Define the ContactForm type using Zod schema
const productSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  description: z.string().min(2, "Description must be at least 2 characters").max(1000),
  imageUrl: z.string(),
  rentPrice: z.number(),
  price: z.number(),
  category: z.string()
});

export type ProductType = z.infer<typeof productSchema>;


export async function getProduct(): Promise<ProductType[]> {
    try {
        const response = await fetch(`${getBaseUrl()}/api/product` || '/api/product', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }); 

        if (!response.ok) {
            console.error(`Failed to fetch contacts: ${response.status} ${response.statusText}`);
            return [];
          };
        
        const result = await response.json();
        
        // Validasi array menggunakan zod
        const validated = z.array(productSchema).safeParse(result);
        
        if (!validated.success) {
            console.error("Validation error:", validated.error);
            return [];
        }
        
        return validated.data;
    } catch (error) {
        console.error("Error fetching contacts:", error);
        return [];
    }
}