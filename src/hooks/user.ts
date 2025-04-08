"use strict"

import prisma from "@/lib/prisma"
import { User } from "@/types/user"
import bcrypt from "bcrypt"
import { omit } from "lodash";

export async function CreateUser(data: User) {
    try {
        const createUser = await prisma.user.create({
            data: {
                ...data,
                password: await bcrypt.hash(data.password, 10)
            }
        });

        // Jangan pakai variabelnya, cukup dihilangkan saja dari hasil akhir
        const result = omit(createUser, "password");
        return result;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : "Failed to create user");
    }
}


export async function UpdateUser(id: string, data: User) {
    const user = await prisma.user.findUnique({where: {id: id}});
    if(user) {throw new Error("User tidak ditemukan")};

    try {
        const updateUser = await prisma.user.update({
            where: {id: id},
            data: {password: data.password}
        });
        return updateUser;
    } catch (error:unknown) {
        throw new Error(error instanceof Error ? error.message :"failed to updated user")
    }
}