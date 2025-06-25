import nodemailer from "nodemailer"
import { logger } from "./index.mjs";
export const getEmptyMessage = () => { to, from, subject, html, text }
export class Mailer {
    constructor() {
        this.init()
    }
    async init() {
        this._mailer = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            tls: {
                servername: "smtp.gmail.com",
            },
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    async send({ from, to, subject, text, html, attachments }) {
        logger.log({ from, to, subject, text, html, attachments });
        const result = await this._mailer.sendMail({
            from,
            to,
            subject,
            text,
            html,
            attachments
        });
        logger.log(result)
        return result
    }
}