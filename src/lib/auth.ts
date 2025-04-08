import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 5 * 60 * 60, // 5 jam
    },
    pages: {
        signIn: "/auth/sign-in",
        error: "/auth/error",
        signOut: "/auth/sign-in",
    },
    secret: process.env.NEXT_SECRET as string,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email dan password diperlukan");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    throw new Error("Tidak ada pengguna yang ditemukan dengan email yang diberikan");
                }

                const isMatch = await bcrypt.compare(credentials.password, user.password);
                if (!isMatch) {
                    throw new Error("Kata sandi tidak benar");
                }

                return {
                    id: user.id,
                    email: user.email,
                    username: user.username, // Menyertakan username
                };
            },
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            const userData = await prisma.user.findUnique({
                where: { email: user.email! },
            });

            return !!userData; // Mengembalikan `true` jika user ditemukan, `false` jika tidak
        },

        async session({ session, token }) {
            if (session?.user && token) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.username = token.username as string; // Tambahkan username ke session
            }
            return session;
        },

        async jwt({ user, token }) {
            if (user) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: user.email! },
                });

                if (dbUser) {
                    token.id = dbUser.id;
                    token.email = dbUser.email;
                    token.username = dbUser.username; // Simpan username ke token
                }
            }
            return token;
        },
    },
};
