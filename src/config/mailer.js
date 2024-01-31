import nodemailer from "nodemailer";
import config from "./config.js";

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
        user: config.mailer.email,
        pass: config.mailer.appPass,
    },
});

transporter.verify().then(()=>{
    console.log("Ready for send emails.");
})