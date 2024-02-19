import bcrypt from 'bcrypt'
import { updatePasswordByEmail } from '../../services/database/users.services';

export const changePw = async(req,res) => {
  try {
  const {newPassword, confirm, userEmail} = req.body

  if(newPassword !== confirm) {
    return res.status(400).json({message:'Passwords don´t match, try again'})
  }

  const hashedPassword = await bcrypt.hash(newPassword,10);
  
  if (hashedPassword) {
  const update = await updatePasswordByEmail(userEmail,hashedPassword);
    
  if(update){
      res.status(200).json({message:'Password updated successfully'})
    }
 }
}
 catch(err) {
  res.status(500).json({message:'Internal server error'})
  console.error(`Error updating user password ${err}`)
 }

}