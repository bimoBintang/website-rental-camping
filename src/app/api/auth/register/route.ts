import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 
import bcrypt from "bcrypt";
import { z } from "zod";


const registerSchema = z.object({
  username: z.string().min(3, { message: "Username minimal 3 karakter" }),
  email: z.string().email({ message: "Format email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { username, email, password } = parsed.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    return NextResponse.json({ message: "Pendaftaran berhasil", user: newUser }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error registering user:", error);
    return NextResponse.json({ error: "Terjadi kesalahan register" }, { status: 401 });
  }
}
