"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Loader2, EyeOff, Eye} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import {useState} from "react";
import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { passwordSchema } from "@/validation/passwordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { changePassword } from "./actions";
import { toast } from "sonner"

const formSchema = z
    .object({
        currentPassword: passwordSchema,
    })
    .and(passwordMatchSchema);

export default function ChangePasswordForm() {
    //const { toast } = useToast();
    const [showPassword, setShowPassword] = useState(false)
    // React Hook Form instance
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currentPassword: "",
            password: "",
            passwordConfirm: "",
        },
    });

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        const response = await changePassword({
            currentPassword: data.currentPassword,
            password: data.password,
            passwordConfirm: data.passwordConfirm,
        });

        if (response?.error) {
            form.setError("root", {
                message: response.message,
            });
        } else {
                toast.success("Password changed successfully",
                    {
                        description: "Password is now successfully updated",
                        position: "bottom-right",

            })

            form.reset();
        }
    };

    return (
            <AnimatePresence mode="wait">
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <Card className=" w-full sm:w-[450px] shadow-xl border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
                            <CardHeader className="space-y-2 pb-8 pt-8">
                                <div className="flex flex-col space-y-2 text-center">
                                    <CardTitle className="text-3xl font-extrabold tracking-tight sm:text-4xl antialiased font-mono">
                                        Change Password
                                    </CardTitle>
                                    <CardDescription className="text-base text-muted-foreground mx-auto max-w-[280px]">

                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                                        <fieldset disabled={form.formState.isSubmitting} className="space-y-6">
                                            <FormField
                                                control={form.control}
                                                name="currentPassword"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <InputGroup className="h-11">
                                                                    <InputGroupInput
                                                                        id="inline-end-input"
                                                                        type={showPassword ? "text" : "password"}
                                                                        placeholder="Enter old password"
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
                                                            <div className="relative">
                                                                <InputGroup className="h-11">
                                                                    <InputGroupInput
                                                                        id="inline-end-input"
                                                                        type={showPassword ? "text" : "password"}
                                                                        placeholder="Enter new password"
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
                                                        <FormControl>
                                                            <div className="relative">
                                                                <InputGroup className="h-11">
                                                                    <InputGroupInput
                                                                        id="inline-end-input"
                                                                        type={showPassword ? "text" : "password"}
                                                                        placeholder="New password confirm"
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
                                                    "Change password"
                                                )}
                                            </Button>
                                        </fieldset>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </motion.div>

            </AnimatePresence>
    );
}