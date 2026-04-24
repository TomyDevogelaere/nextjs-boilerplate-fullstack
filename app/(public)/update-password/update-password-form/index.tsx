"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import {Loader2, EyeOff, Eye} from "lucide-react";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import {useState} from "react";
import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updatePassword} from "./actions";
import { toast } from "sonner"
import Link from "next/link";

const formSchema =  passwordMatchSchema;
type Props = {
    token: string;
}
export default function UpdatePasswordForm({token}:Props) {
    const [showPassword, setShowPassword] = useState(false)
    // React Hook Form instance
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            passwordConfirm: "",
        },
    });

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        const response = await updatePassword({
            token,
            password: data.password,
            passwordConfirm: data.passwordConfirm,
        });
        if(response?.tokenInvalid){
            window.location.reload();
        }
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
        form.formState.isSubmitSuccessful ? (
            <div>
                You password has been updated.{" "}
                <Link className="underline" href="/login">
                    Click here to login to your account
                </Link>
            </div>
        ) : (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                                    <fieldset disabled={form.formState.isSubmitting} className="space-y-6">
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
                                                "Update password"
                                            )}
                                        </Button>
                                    </fieldset>
                                </form>
                            </Form>

    ));
}