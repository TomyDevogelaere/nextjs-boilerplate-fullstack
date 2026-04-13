"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { passwordSchema } from "@/validation/passwordSchema";
import { Loader2, Mail, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {loginWithCredentials} from "@/app/login/actions";
import { useRouter } from "next/navigation";

const formSchema = z
    .object({
        email: z.email(),
        password: passwordSchema,
    })

export default function Login() {

const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        const response = await loginWithCredentials({
            email: data.email,
            password: data.password,
        });

        if (response?.error) {
            form.setError("root", {
                message: response?.message,
            });
        }else{
            router.push("/my-account");
        }
    };

    return (
        <main className="relative flex justify-center items-center min-h-screen overflow-hidden p-4 font-sans">
            {/* Achtergrond laag */}
            <div className="absolute inset-0 -z-10 bg-slate-50 dark:bg-black font-sans">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 opacity-20 blur-[100px]"></div>
            </div>

            <AnimatePresence mode="wait">
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full flex justify-center"
                    >
                        <div className=" w-full max-w-[400px]">
                        <Card className="w-full shadow-xl border-border/60 bg-card/80 dark:bg-card/70 backdrop-blur-md">
                            <CardHeader className="space-y-2 pb-8 pt-8">
                                <div className="flex flex-col space-y-2 text-center">
                                    <CardTitle className="text-3xl font-extrabold tracking-tight sm:text-4xl antialiased">
                                        Login
                                    </CardTitle>
                                    <CardDescription className="text-base text-muted-foreground mx-auto max-w-[280px]">
                                        Login op u account
                                    </CardDescription>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                                        <fieldset disabled={form.formState.isSubmitting} className="space-y-4">

                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Mail className="input-icon" />
                                                                <Input placeholder="naam@voorbeeld.nl" className="input-with-icon" {...field} />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Wachtwoord</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Lock className="input-icon" />
                                                                <Input type="password" placeholder="••••••••" className="input-with-icon" {...field} />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            {form.formState.errors.root?.message && (
                                                <FormMessage>
                                                    {form.formState.errors.root.message}
                                                </FormMessage>
                                            )}
                                            <Button
                                                type="submit"
                                                className="auth-button"
                                                disabled={form.formState.isSubmitting}
                                            >
                                                {form.formState.isSubmitting ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                        Bezig...
                                                    </>
                                                ) : (
                                                    "Login"
                                                )}
                                            </Button>

                                        </fieldset>
                                    </form>
                                </Form>
                            </CardContent>
                            <CardFooter className="flex-col gap-2">
                                <div className="text-muted-foreground text-sm">
                                    Don&apos;t have an account?{" "}
                                    <Link href="/register" className="underline">
                                        Register
                                    </Link>
                                </div>
                                <div className="text-muted-foreground text-sm">
                                    Forgot password?{" "}
                                    <Link
                                        href="/password-reset"
                                        className="underline"
                                    >
                                        Reset my password
                                    </Link>
                                </div>
                            </CardFooter>
                        </Card>
                        </div>
                    </motion.div>

            </AnimatePresence>
        </main>
    );
}