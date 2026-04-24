"use client"


import {AnimatePresence, motion} from "framer-motion";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import {Eye, EyeOff, Loader2, MailIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {z} from "zod";
import {passwordSchema} from "@/validation/passwordSchema";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {passwordReset} from "@/app/(logged-out)/password-reset/actions";
import {useSearchParams} from "next/navigation";

export default function PasswordReset() {
    const searchParams = useSearchParams();
    const formSchema = z
        .object({
            email: z.email(),
        })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: decodeURIComponent(searchParams.get("email") ?? ""),
        },
    });

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        await passwordReset(data.email);
    };


    return (
        <div className="relative flex justify-center items-center min-h-screen overflow-hidden p-4 font-sans">
            {/* Achtergrond laag */}
            <div className="absolute inset-0 -z-10 bg-slate-50 dark:bg-black font-sans">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 opacity-20 blur-[100px]"></div>
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key="form"
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -10}}
                    transition={{duration: 0.4, ease: "easeOut"}}
                    className="w-full flex justify-center"
                >
                    <div className=" w-full max-w-[400px]">
                        {form.formState.isSubmitSuccessful ? (
                            <Card
                                className="w-full shadow-xl border-border/60 bg-card/80 dark:bg-card/70 backdrop-blur-md">
                                <CardHeader className="space-y-2 pb-8 pt-8">
                                    <div className="flex flex-col space-y-2 text-center">
                                        <CardTitle
                                            className="text-3xl font-extrabold tracking-tight sm:text-4xl antialiased font-mono">
                                            Email Sent
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex flex-col space-y-2 text-center">
                                    If you have an account with us you will receive a password reset
                                    email at <span className="font-bold mt-2">{form.getValues("email")}</span>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card
                                className="w-full shadow-xl border-border/60 bg-card/80 dark:bg-card/70 backdrop-blur-md">
                                <CardHeader className="space-y-2 pb-8 pt-8">
                                    <div className="flex flex-col space-y-2 text-center">
                                        <CardTitle
                                            className="text-3xl font-extrabold tracking-tight sm:text-4xl antialiased font-mono">
                                            Password Reset
                                        </CardTitle>
                                        <CardDescription
                                            className="text-base text-muted-foreground mx-auto max-w-[280px]">
                                            Enter your email address to reset your password.
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
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <InputGroup className="h-11">
                                                                        <InputGroupInput
                                                                            placeholder="Email" {...field}/>
                                                                        <InputGroupAddon>
                                                                            <MailIcon/>
                                                                        </InputGroupAddon>
                                                                    </InputGroup>
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage/>
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
                                                            <Loader2 className="mr-2 h-5 w-5 animate-spin"/>
                                                            Bezig...
                                                        </>
                                                    ) : (
                                                        "Submit"
                                                    )}
                                                </Button>

                                            </fieldset>
                                        </form>
                                    </Form>
                                </CardContent>
                                <CardFooter className="flex-col gap-2 mt-2">
                                    <div className="text-muted-foreground text-sm">
                                        Remember your password?{" "}
                                        <Link
                                            href="/login"
                                            className="underline"
                                        >
                                            Login
                                        </Link>
                                    </div>
                                    <div className="text-muted-foreground text-sm">
                                        Don&apos;t have an account?{" "}
                                        <Link href="/register" className="underline">
                                            Register
                                        </Link>
                                    </div>
                                </CardFooter>
                            </Card>
                        )}
                    </div>
                </motion.div>

            </AnimatePresence>
        </div>
    )
}