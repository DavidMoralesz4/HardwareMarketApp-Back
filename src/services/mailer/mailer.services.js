import { transporter } from "../../config/mailer.js";
import config from "../../config/config.js";

const sendEmail = async (fromEmail, fromUser, message) => {
    await transporter.sendMail({
        from: `"${fromUser}" <${fromEmail}>`,
        to: config.mailer.email,
        subject: `New email from ${fromUser} in HardwareMarketApp`,
        text: `${message}\nReply to ${fromEmail} (${fromUser}).`
    })
}

export{
    sendEmail
}