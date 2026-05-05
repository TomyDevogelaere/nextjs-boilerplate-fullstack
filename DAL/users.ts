import db from "@/db";
import {passwordResetTokens, users} from "@/db/schema";
import {eq, InferSelectModel} from "drizzle-orm";

type PasswordResetToken = InferSelectModel<typeof passwordResetTokens>;

export const getUserById = async (userId: number) => {
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, userId));

    return user ?? null;
};

export const getUserByEmail = async (emailAddress: string) => {
    const [user] = await db
        .select({
            id: users.id,
        })
        .from(users)
        .where(eq(users.email, emailAddress));
    return user ?? null;
}

export const updateUserPassword = async (userId: number, hashedPassword: string) => {
    await db
        .update(users)
        .set({ password: hashedPassword })
        .where(eq(users.id, userId));
};

export const resetUserPassword = async ( hashedPassword: string, passwordResetToken: PasswordResetToken) => {
    await db.update(users)
        .set({
            password: hashedPassword,
        })
        .where(eq(users.id, passwordResetToken.Userid!));
    // token mag maar 1 keer gebruikt worden!
    await db
        .delete(passwordResetTokens)
        .where(eq(passwordResetTokens.id, passwordResetToken.id));
}


export const createUser = async (name:string, email: string, hashedPassword:string) => {
    await db.insert(users).values({
        name,
        email,
        password: hashedPassword,
    })
}

export const createPasswordResetToken = async (userID: number, passwordResetToken:string, tokenExpiry:Date) => {
    await db
        .insert(passwordResetTokens)
        .values({
            Userid: userID,
            token: passwordResetToken,
            tokenExpiry,
        })
        .onDuplicateKeyUpdate({   // als een user meerdere keren een password reset doet passen we de lijn aan - per user is er maar 1 entry in deze tabel
            set: {
                token: passwordResetToken,
                tokenExpiry,
            },
        });
}

export const getPasswordResetToken = async (token: string) => {
    return  db
        .select()
        .from(passwordResetTokens)
        .where(eq(passwordResetTokens.token, token));
}

