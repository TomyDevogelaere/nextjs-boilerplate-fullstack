"use server"

import {passwordMatchSchema} from "@/validation/passwordMatchSchema";
import {hash} from "bcryptjs";
import {VerifyAuthenticatedUser} from "@/DAL/verify-user";
import {getPasswordResetToken, resetUserPassword} from "@/DAL/users";

export const updatePassword = async ({token, password, passwordConfirm}:{
    token: string,
    password: string,
    passwordConfirm: string
})=> {

    const passwordValidation = passwordMatchSchema.safeParse({
        password,
        passwordConfirm
    });

    if (!passwordValidation.success) {
        return {
            error: true,
            message: passwordValidation.error.issues[0]?.message ?? "An error occurred",
        }
    }
    const session = await VerifyAuthenticatedUser();

    if (session?.user?.id) {
        return {
            error: true,
            message: "Already logged in. Please log out to reset your password."
        }
    }
    let tokenIsValid = false;

    if (token) {
        const [passwordResetToken] = await getPasswordResetToken(token);

        const now = new Date().getTime();

        if (
            !!passwordResetToken?.tokenExpiry &&
            now < passwordResetToken.tokenExpiry.getTime()
        ) {
            tokenIsValid = true;
        }

        if (!tokenIsValid) {
            return {
                error: true,
                message: "Your token is invalid or has expired",
                tokenInvalid: true,
            };
        }

        const hashedPassword = await hash(password, 10);

        await resetUserPassword(hashedPassword, passwordResetToken);
    }
}