"use server";

import { getBaseUrl } from "@/lib/helperAbsolute";
import { z } from "zod";

const bannerSchema = z.object({
    id: z.string(),
    title: z.string().min(2, "Name must be at least 2 characters").max(100),
    description: z.string(),
    iconUrl: z.string(),
});

export type BannerType = z.infer<typeof bannerSchema>;

export async function getBanner() {
    try {
        const response = await fetch(`${getBaseUrl()}/api/banner` || '/api/banner', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error(`Failed to fetch banners: ${response.status} ${response.statusText}`);
            return [];
          };

        const result = await response.json();

        const validated = z.array(bannerSchema).safeParse(result);
        if(!validated.success) {
            console.error("Validation error:", validated.error);
            return [];
        };

        return validated.data;
    } catch (error) {
        console.error("Error fetching banner:", error);
        return [];
    }
}