import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const banners = await prisma.banner.findMany();

    return NextResponse.json(banners);
  } catch (error: unknown) {
    console.error("Error fetching banners:", error);
    return NextResponse.json({error: "Failed to fetch banner"}, {status: 401});
  }
};


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
  
    if(!data.userId) {
      return NextResponse.json({error: "User id not found"}, {status: 401});
    };

    const banner = await prisma.banner.create({
      data: {
        title: data.title,
        description: data.description,
        iconUrl: data.iconUrl,
        userId: data.userId
      }
    });

    return NextResponse.json(banner);
  } catch (error: unknown) {
    console.error("Error creating banner:", error);
    return NextResponse.json({error: "Failed to create banner"}, {status: 401});
  }
}