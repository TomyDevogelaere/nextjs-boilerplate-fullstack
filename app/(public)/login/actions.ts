'use server'

import { signIn } from "@/auth";
import {z} from "zod";
import {passwordSchema} from "@/validation/passwordSchema";

export const loginWithCredentials = async ({email, password}: { email: string, password: string }) => {

    const loginSchema = z.object({
        email: z.email(),
        password: passwordSchema,
    })

    const loginValidation = loginSchema.safeParse({
        email,
        password,
    });

    if (!loginValidation.success) {
        return {
            error: true,
            message: loginValidation.error.issues[0]?.message ?? "An error occurred",
        };
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
    } catch (e) {
        return {
            error: true,
            message: "Incorrect email or password",
        };
    }
};


