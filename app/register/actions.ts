'use server'

import {z} from "zod";
import {passwordMatchSchema} from "@/validation/passwordMatchSchema";
import db from "@/db";
import {hash} from "bcryptjs";
import {users} from "@/db/schema";

export const registerUser = async ({name, email, password, passwordConfirm}: {
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
}) => {
try {


    // server-side validation
    const newUserSchema = z.object({
        name: z.string(),
        email: z.email(),
    }).and(passwordMatchSchema)

    const newUserValidation = newUserSchema.safeParse({
        name,
        email,
        password,
        passwordConfirm,
    });

    if (!newUserValidation.success) {
        return {
            error: true,
            message:
                newUserValidation.error.issues[0]?.message ?? "An error occurred",
        };
    }

    // user validation success
    const hashedPassword = await hash(password, 10);
    await db.insert(users).values({
        name,
        email,
        password: hashedPassword,
    })
}catch (error: any) {
    // We checken zowel de error zelf als de 'cause' (oorzaak)
    const dbError = error.cause || error;

    if (dbError.code === 'ER_DUP_ENTRY' || dbError.errno === 1062) {
        return {
            error: true,
            message: "Dit e-mailadres is al in gebruik."
        };
    }

    // Voor de zekerheid: loggen als het iets anders is
    console.error("Onbekende fout:", error);

    return {
        error: true,
        message: "Er is iets misgegaan bij de registratie."
    };

}
};