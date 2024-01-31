import { sendEmail } from "../../services/mailer/mailer.services.js";
import getLogger from "../../utils/log.utils.js";

const log = getLogger();

export const contactUs = async (req, res) => {
    try{
        const data = req.body;
        const {fromEmail, fromUser, message} = data;
        if(!fromEmail || !fromUser){
            res.status(400).send("Required fields are missing")
            return
        }
        if(!message){
            res.status(400).send("Required message are missing")
        }
        await sendEmail(fromEmail, fromUser, message);
        res.status(200).send({message: "Email enviado con exito"})
    }catch(e){
        log.error('contactUs - Error al enviar el email de contacto.');
        return res.status(500).send({status: "error", message: "No se pudo enviar el email"})
    }
}