import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function POST(req: NextRequest) {
    try {

        const data = await req.json();

        const createContact = await prisma.contact.create({
            data: {
                name: data.name,
                email: data.email,
                message: data.message
            }
        });

        return NextResponse.json(createContact);
    } catch (error: unknown) {
        console.error("Error create Contact:", error);
        return NextResponse.json("Failed to create contact", { status: 401 });
    }
}

export async function GET() {
    try {
        const response = await prisma.contact.findMany();
        return NextResponse.json(response);
    } catch (error: unknown) {
        console.error("Error fetching Contact:", error);
        return NextResponse.json("Failed to get contact", { status: 401 });
    }
}