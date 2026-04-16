import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import db from "@/db";
import { users } from "@/db/schema";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";

type AuthUser = {
    id: string
    email: string
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // Hoe lang de sessie geldig is (bijv. 30 dagen)
        updateAge: 24 * 60 * 60,   // Hoe vaak de vervaldatum wordt ververst (bijv. elke 24 uur)
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const [user] = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, credentials?.email as string))

                if (!user) {
                    throw new Error("Invalid credentials")
                }

                const passwordCorrect = await compare(
                    credentials?.password as string,
                    user.password!
                )

                if (!passwordCorrect) {
                    throw new Error("Invalid credentials")
                }

                return {
                    id: user.id.toString(),
                    email: user.email,
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.email = user.email
            }
            return token
        },
        async session({ session, token }) {
            //if (!session.user) session.user = {} as any

            session.user.id = token.id as string
            session.user.email = token.email as string

            return session

        },
    },
})
