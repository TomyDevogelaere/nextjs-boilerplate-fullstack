"use server";

import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { passwordSchema } from "@/validation/passwordSchema";
import { compare, hash } from "bcryptjs";
import { z } from "zod";
import {VerifyAuthenticatedUser} from "@/DAL/verify-user";
import {getUserById, updateUserPassword} from "@/DAL/users";

export const changePassword = async ({
                                         currentPassword,
                                         password,
                                         passwordConfirm,
                                     }: {
    currentPassword: string;
    password: string;
    passwordConfirm: string;
}) => {

    // AUTH check
    const session = await VerifyAuthenticatedUser();

    if (!session?.user?.id) {
        return {
            error: true,
            message: "You must be logged in to change your password.",
        };
    }

    const formSchema = z
        .object({
            currentPassword: passwordSchema,
        })
        .and(passwordMatchSchema);

    const passwordValidation = formSchema.safeParse({
        currentPassword,
        password,
        passwordConfirm,
    });

    if (!passwordValidation?.success) {
        return {
            error: true,
            message:
                passwordValidation?.error.issues?.[0]?.message ?? "An error occurred",
        };
    }

    const user = await getUserById(Number(session.user.id));

    if (!user) {
        return {
            error: true,
            message: "User not found",
        };
    }

    const passwordMatch = await compare(currentPassword, user.password!);

    if (!passwordMatch) {
        return {
            error: true,
            message: "Current password is incorrect",
        };
    }

    const hashedPassword = await hash(password, 10);

    await updateUserPassword(Number(session.user.id), hashedPassword);
};