import { getUserByEmail } from "../../services/database/users.services"
import { sendEmail } from "../../services/mailer/mailer.services";
import config from "../../config/config";

export const sendEmailPw = async(req,res) => {
  try {
    const { userEmail } = req.body;
    const userData = await getUserByEmail(userEmail);

    if(!userData) return res.status(404).json({message:'Email not found in database'});
    
    // Construye el enlace utilizando la URL base de tu servidor local y la ruta '/update-user-pw'
    const updatePwLink = `http://localhost/update-user-pw`;

    const subject = 'Retrieve your password';
    const message = `Retrieve your HardwareMarket in the following libk: ${updatePwLink}`;
    const send = await sendEmail(config.mailer.email, userEmail, subject, message);

    if(send) res.status(200).json({message: 'Email sent succesfully, don´t forget to check your spam folder'});
  } catch(err){
    res.status(500).json({message:'Internal server error'})
    console.error(`Error recuperando la contraseña del usuario: ${err}`)
  }
};
