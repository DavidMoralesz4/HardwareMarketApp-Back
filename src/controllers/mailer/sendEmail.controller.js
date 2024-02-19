import { sendEmail } from "../../services/mailer/mailer.services.js";
import getLogger from "../../utils/log.utils.js";
import config from "../../config/config.js";

const log = getLogger();

export const contactUs = async (req, res) => {
    try{
        const data = req.body;
        const {fromEmail, fromUser, message, subject} = data;
        
        if(!fromEmail || !fromUser){
            res.status(400).send("Required fields are missing")
            return
        }
        if(!message){
            res.status(400).send("Required message are missing")
        }

        let toEmail = config.mailer.email
        
        await sendEmail(fromEmail, toEmail, subject, message);
        res.status(200).send({message: "Email sent succesfully"})
    
    }catch(e){
        log.error('contactUs - Error al enviar el email de contacto.');
        return res.status(500).send({status: "error", message: "No se pudo enviar el email"})
    }
}