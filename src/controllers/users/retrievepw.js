import { getUserByEmail } from "../../services/database/users.services"
import { sendEmail } from "../../services/mailer/mailer.services";
import config from "../../config/config";

export const sendEmailPw = async(req,res) => {
  try {
  const {userEmail} = req.body;
  const userData = await getUserByEmail(userEmail);

  if(!userData) return res.status(404).json({message:'Email not found in database'});
  
  const subject = 'Retrieve you password';
  const message = 'Retrieve your HardwardMarket password in the following link';
  const send = await sendEmail(config.mailer.email,userEmail,subject,message);

  if(send) res.status(200).json({message: 'Email sent succesfully, don´t forget to check your spam folder'});
  
  }
  catch(err){
    res.status(500).json({message:'Internal server error'})
    console.error(`Error retrieving user password : ${err}`)
  }
};