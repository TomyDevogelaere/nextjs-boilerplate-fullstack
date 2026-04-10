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
import { registerUser } from "@/app/register/actions";
import { Loader2, Mail, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {loginWithCredentials} from "@/app/login/actions";

const formSchema = z
    .object({
        email: z.email(),
        password: passwordSchema,
    })

export default function Login() {

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
            form.setError("email", {
                message: response?.message,
            });
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
                    >
                        <Card className="w-full max-w-[450px] shadow-xl border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
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
                                                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                                <Input placeholder="naam@voorbeeld.nl" className="pl-10 h-11" {...field} />
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
                                                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                                    <Input type="password" placeholder="••••••••" className="pl-10 h-11" {...field} />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            <Button
                                                type="submit"
                                                className="w-full h-12 text-lg font-semibold shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99]"
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

                        </Card>
                    </motion.div>

            </AnimatePresence>
        </main>
    );
}