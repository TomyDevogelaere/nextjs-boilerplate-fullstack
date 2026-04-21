"use server";

import { auth } from "@/auth";
import db from "@/db/index";
import { passwordResetTokens } from "@/db/passwordResetTokensSchema";
import { users } from "@/db/schema";
// import { mailer } from "@/lib/email";
import { randomBytes } from "crypto";
import { eq } from "drizzle-orm";

export const passwordReset = async (emailAddress: string) => {
    const session = await auth();
    // als een user reeds ingelogd is mag hij niet op deze pagina zijn
    if (!!session?.user?.id) {
        return {
            error: true,
            message: "You are already logged in",
        };
    }
    // get the user ID from db
    const [user] = await db
        .select({
            id: users.id,
        })
        .from(users)
        .where(eq(users.email, emailAddress));
    // als er geen user is met dat emailadres, om bad actors tegen te gaan geven we geen foutmelding hier
    if (!user) {
        return;
    }
    // from crypto library
    const passwordResetToken = randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 3600000); // 1 uur

    await db
        .insert(passwordResetTokens)
        .values({
            Userid: user.id,
            token: passwordResetToken,
            tokenExpiry,
        })
        .onDuplicateKeyUpdate({   // als een user meerdere keren een password reset doet passen we de lijn aan - per user is er maar 1 entry in deze tabel
            set: {
                token: passwordResetToken,
                tokenExpiry,
            },
        });

/*    const resetLink = `${process.env.SITE_BASE_URL}/update-password?token=${passwordResetToken}`;

    await mailer.sendMail({
        from: "test@resend.dev",
        subject: "Your password reset request",
        to: emailAddress,
        html: `Hey, ${emailAddress}! You requested to reset your password.
Here's your password reset link. This link will expire in 1 hour:
<a href="${resetLink}">${resetLink}</a>`,
    });

    console.log({ passwordResetToken });*/
};