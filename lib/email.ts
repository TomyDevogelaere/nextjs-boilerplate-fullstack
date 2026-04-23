import nodemailer from 'nodemailer'
import {users} from "@/db/schema";

export const mailer = nodemailer.createTransport({
    host: 'smtp.resend.com',
    port: 587,
    auth:{
        user: "resend",
        pass: process.env.RESEND_API_KEY,
    }
})