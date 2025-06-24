import nodemailer from "nodemailer"
export const getEmptyMessage =()=>{to,from,subject,html,text}
export class Mailer {
    constructor() {
     this.init()
    }
    async init() {
        this._mailer = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            tls:{
                servername:"smtp.gmail.com",
            },
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    async send({ from, to, subject, text, html ,attachments}) {
        return await this._mailer.sendMail({
            from,
            to,
            subject,
            text,
            html,
            attachments
        });
    }
}