import { getUserByEmail } from "../../services/database/users.services"
import { sendEmail } from "../../services/mailer/mailer.services";
import config from "../../config/config";

export const sendEmailPw = async(req,res) => {
  try {
    const { userEmail } = req.body;
    const userData = getUserByEmail(userEmail);

    if(!userData) return res.status(404).json({message:'Email not found in database'});
    
    const updatePwLink = `http://localhost/view-change-pw`;

    const subject = 'Retrieve your password';
    const message = `Retrieve your HardwareMarket in the following link: ${updatePwLink}`;
    const send = await sendEmail(config.mailer.email, userEmail, subject, message);

    if(send) {
     res.status(200).json({message: 'Email sent succesfully, don´t forget to check your spam folder'});
    }
  } catch(err){
    res.status(500).json({message:'Internal server error'})
    console.error(`Error recuperando la contraseña del usuario: ${err}`)
  }
};
