import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(_req:Request, context: {params: Promise<{userId: string}>}) {
  try {
    const { userId } = await context.params;

    const banners = await prisma.banner.findMany({where: {userId: userId}});

    return NextResponse.json(banners);
  } catch (error: unknown) {
    console.error("Error fetching banners:", error);
      return NextResponse.json({error: "Failed to fetch banner"}, {status: 401});
  }
};


export async function POST(req: Request, context: {params: Promise<{userId: string}>}) {
  try {
    const { userId } = await context.params;

    const data = await req.json();

    if(!data.title || !data.description || !data.iconUrl) {
      return NextResponse.json({error: "Invalid banner data"}, {status: 401});
    };

    const newBanner = await prisma.banner.create({
      data: {
        title: data.title,
        description: data.description,
        iconUrl: data.iconUrl,
        userId: userId
      }
    });

    return NextResponse.json(newBanner);
  } catch (error: unknown) {
    console.error("Error creating banner:", error);
    return NextResponse.json({error: "Failed to create banner"}, {status: 401});
  }
}