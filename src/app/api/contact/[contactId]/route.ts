import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ contactId: string }> }
) {
  try {
    const { contactId } = await context.params;

    await prisma.contact.delete({
      where: { id: contactId },
    });

    return NextResponse.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json(
      { error: "Failed to delete contact" },
      { status: 401 }
    );
  }
}
