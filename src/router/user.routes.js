import { Router } from 'express';
import { currentUser, updateUser } from '../controllers/users/index.controller.js';
import { contactUs } from "../controllers/mailer/indexMailer.controller.js";
import { sendEmailPw } from '../controllers/users/retrievepw.js';

const userRouter = Router();

userRouter.get('/current', currentUser)

userRouter.patch('/update', updateUser)

userRouter.post("/contact", contactUs)

userRouter.post('/send-retrieve-pw',sendEmailPw);

userRouter.get('/update-user-pw')

userRouter.post('/change-user-pw',changePw);

export default userRouter;