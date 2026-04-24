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
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { passwordSchema } from "@/validation/passwordSchema";
import {Loader2, Mail, Lock, User, MailIcon, EyeOffIcon, EyeOff, Eye} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {loginWithCredentials} from "@/app/(public)/login/actions";
import { useRouter } from "next/navigation";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import {useState} from "react";

const formSchema = z
    .object({
        email: z.email(),
        password: passwordSchema,
    })

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
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
    // nodig om de ingevulde email door te sturen naar reset email form
    const email = form.getValues("email");

    return (
        <div className="w-full flex justify-center items-center">

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
                                    <CardTitle className="text-3xl font-extrabold tracking-tight sm:text-4xl antialiased font-mono">
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
                                        <fieldset disabled={form.formState.isSubmitting} className="space-y-6">

                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <InputGroup className="h-11">
                                                                    <InputGroupInput  placeholder="Email" {...field}/>
                                                                    <InputGroupAddon >
                                                                        <MailIcon />
                                                                    </InputGroupAddon>
                                                                </InputGroup>
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
                                                        <FormControl>
                                                            <InputGroup className="h-11">
                                                                <InputGroupInput
                                                                    id="inline-end-input"
                                                                    type={showPassword ? "text" : "password"}
                                                                    placeholder="Enter password"
                                                                    {...field}
                                                                />
                                                                <InputGroupAddon align="inline-end"
                                                                                 onClick={() => setShowPassword((prev) => !prev)}
                                                                                 className="cursor-pointer"
                                                                >
                                                                    {showPassword ? (
                                                                        <EyeOff className="size-4" />
                                                                    ) : (
                                                                        <Eye className="size-4" />
                                                                    )}


                                                                </InputGroupAddon>
                                                            </InputGroup>
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
                            <CardFooter className="flex-col gap-2 mt-2">
                                <div className="text-muted-foreground text-sm">
                                    Don&apos;t have an account?{" "}
                                    <Link href="/register" className="underline">
                                        Register
                                    </Link>
                                </div>
                                <div className ="text-muted-foreground text-sm">
                                    Forgot password?{" "}
                                    <Link
                                        href={`/password-reset${
                                            email ? `?email=${encodeURIComponent(email)}` : ""
                                        }`}
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
        </div>
    );
}