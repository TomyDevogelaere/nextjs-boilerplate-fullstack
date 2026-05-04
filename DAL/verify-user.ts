import { auth } from "@/auth";

export async function VerifyAuthenticatedUser() {
    const session = await auth();

    if (!session?.user) {
        return null;
    }

    return session;
}