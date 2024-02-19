import { updatePasswordByEmail } from "../../services/database/users.services"
import bcrypt from 'bcrypt';

export const changePw = async(req,res) => {
  try {
    const {userEmail, newPassword, confirm} = req.body;
    
    if(!userEmail || newPassword || confirm){
      return res.status(400).json({message:'All fields are required'})
    }

    if(newPassword !== confirm){
      return res.status(400).json({message:'Passwords must be equal'})
    }
   
    const hashedPassword = await bcrypt.hash(hashedPassword, 10);
    const updatedPassword = updatePasswordByEmail();
      
    if(!updatedPassword) {
       return res.status(404).json({message:'Error updating password, check all fields and try again'})
    }
      
    res.status(200).json({message: 'Password updated succesfully'})
  }
  catch(err) {
    res.status(500).json({message:'Internal server error'});
    console.error(`Error updating user password ${err}`)
  }
}
