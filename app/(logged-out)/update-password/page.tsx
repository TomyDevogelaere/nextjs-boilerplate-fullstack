import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import db from "@/db/index";
import {passwordResetTokens} from "@/db/passwordResetTokensSchema";
import {eq} from "drizzle-orm";
import Link from "next/link";
import UpdatePasswordForm from "@/app/(logged-out)/update-password/update-password-form";


export default async function UpdatePassword({searchParams,}: {
    searchParams: Promise<{
        token?: string;
    }>;
}) {
    const searchParamsValues = await searchParams;
    let tokenIsValid = false;
    const {token} = searchParamsValues;

    if (token) {
        const [passwordResetToken] = await db
            .select()
            .from(passwordResetTokens)
            .where(eq(passwordResetTokens.token, token));

        const now = new Date().getTime();

        if (
            !!passwordResetToken?.tokenExpiry &&
            now < passwordResetToken.tokenExpiry.getTime()
        ) {
            tokenIsValid = true;
        }
    }

    return (
            <div className=" w-full max-w-[400px]">
                <Card
                    className="w-full shadow-xl border-border/60 bg-card/80 dark:bg-card/70 backdrop-blur-md">
                    <CardHeader className="space-y-2 pb-8 pt-8">
                        <div className="flex flex-col space-y-2 text-center">
                            <CardTitle
                                className="text-2xl font-bold tracking-tight sm:text-3xl antialiased font-mono">
                                {tokenIsValid ? "Update Password" : "Your password reset link is invalid or has expired"}
                            </CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent>
                        {tokenIsValid ? (
                            <UpdatePasswordForm token={token ?? ""}/>
                            // <UpdatePasswordForm token={token ?? ""}/>
                        ) : (
                            <Link className="underline" href="/password-reset">
                                Request another password reset link
                            </Link>
                        )}
                    </CardContent>
                </Card>
            </div>

    );
}