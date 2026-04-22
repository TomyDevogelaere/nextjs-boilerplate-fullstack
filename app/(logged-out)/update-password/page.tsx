import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import db from "@/db/index";
import {passwordResetTokens} from "@/db/passwordResetTokensSchema";
import {eq} from "drizzle-orm";
import Link from "next/link";
//import UpdatePasswordForm from "./update-password-form";

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
        <main className="relative flex justify-center items-center min-h-screen overflow-hidden p-4 font-sans">
            {/* Achtergrond laag */}
            <div className="absolute inset-0 -z-10 bg-slate-50 dark:bg-black font-sans">
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div
                    className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 opacity-20 blur-[100px]"></div>
            </div>


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
                            <div>update password</div>
                            // <UpdatePasswordForm token={token ?? ""}/>
                        ) : (
                            <Link className="underline" href="/password-reset">
                                Request another password reset link
                            </Link>
                        )}
                    </CardContent>
                </Card>
            </div>

        </main>
    );
}