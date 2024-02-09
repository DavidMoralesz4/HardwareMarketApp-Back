import { transporter } from "../../config/mailer.js";

const sendEmail = async (fromEmail, toEmail, subject, message) => {
    await transporter.sendMail({
        from: fromEmail,
        to: toEmail,
        subject: subject,
        text: message,
    })
}

export{
    sendEmail
}