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
import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { registerUser } from "@/app/(logged-out)/register/actions";
import { Loader2, Mail, Lock, User, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z
    .object({
        name: z.string().min(2, "Naam is te kort"),
        email: z.email(),
    })
    .and(passwordMatchSchema);

export default function Register() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
    });

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        const response = await registerUser(data);

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
                {/* form die getoond zal worden bij een succesvolle registratie*/}
                {form.formState.isSubmitSuccessful ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="w-[400px] max-w-full border-none shadow-2xl">
                            <CardHeader className="text-center">
                                <div className="flex justify-center mb-4">
                                    <CheckCircle2 className="h-12 w-12 text-green-500" />
                                </div>
                                <CardTitle className="text-2xl font-heading tracking-tight">
                                    Account aangemaakt!
                                </CardTitle>
                                <CardDescription>
                                    Je kunt nu inloggen met je nieuwe gegevens.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button asChild className="w-full h-11 text-base font-medium">
                                    <Link href="/login">Naar Login</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ) : (
                    // registratie form
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
                                        Registreer
                                    </CardTitle>
                                    <CardDescription className="text-base text-muted-foreground mx-auto max-w-[280px]">
                                        Maak een account aan om aan de slag te gaan.
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                                        <fieldset disabled={form.formState.isSubmitting} className="space-y-4">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Naam</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                                <Input placeholder="John Doe" className="pl-10 h-11" {...field} />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
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
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                                <FormField
                                                    control={form.control}
                                                    name="passwordConfirm"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Bevestig</FormLabel>
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
                                            </div>
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
                                                    "Account Aanmaken"
                                                )}
                                            </Button>
                                        </fieldset>
                                    </form>
                                </Form>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-4 border-t pt-6">
                                <div className="text-sm text-center text-muted-foreground">
                                    Al een account?{" "}
                                    <Link href="/login" className="font-semibold text-primary hover:underline underline-offset-4">
                                        Log in
                                    </Link>
                                </div>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}