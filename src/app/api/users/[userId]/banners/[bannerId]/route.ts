// app/api/users/[userId]/banners/[bannerId]/route.ts
import { NextResponse } from "next/server";
import  prisma from "@/lib/prisma"; // Pastikan menggunakan singleton Prisma

export async function PATCH(req: Request, context: {params: Promise<{bannerId: string, userId: string;}>}) {
  try {
    const { bannerId, userId } = await context.params

    const data = await req.json();

    if(!data.title || !data.description || !data.iconUrl) {
      return NextResponse.json({error: "Invalid banner data"}, {status: 401});
    };

    const updatedBanner = await prisma.banner.update({
      where: {
        id: bannerId,
        userId: userId
      },
      data: {
        title: data.title,
        description: data.description,
        iconUrl: data.iconUrl
      }
    });

    return NextResponse.json(updatedBanner);
  } catch (error: unknown) {
    console.error("Error patching banner:", error);
    return NextResponse.json({error: "Failed to update banner"}, {status: 401});
  }
};


export async function DELETE(_req: Request, context: {params: Promise<{bannerId: string, userId: string;}>}) {
  try {
    const {userId, bannerId} = await context.params;

    const exsitingbanner = await prisma.banner.findUnique({
      where: {
        id: bannerId,
        userId: userId
      }
    });

    if(!exsitingbanner) {
      return NextResponse.json({error: "Banner not found Authorized"}, {status: 404});
    };

    await prisma.banner.delete({
      where: {
        id: bannerId,
      }
    });

    return NextResponse.json({success: true});
  } catch (error: unknown) {
    console.error("Error deleting banner:", error);
    return NextResponse.json({error: "Failed to delete banner"}, {status: 401});
  }
}