import { z } from "zod";

export const passwordSchema = z
    .string()
    .min(5, {
        message: "Password must be at least 5 characters long."
    });

/*
export const passwordSchema = z
    .string()
    .min(8, { message: "Wachtwoord moet minimaal 8 tekens bevatten" })
    .regex(/[A-Z]/, { message: "Minimaal één hoofdletter vereist" })
    .regex(/[0-9]/, { message: "Minimaal één cijfer vereist" });*/
