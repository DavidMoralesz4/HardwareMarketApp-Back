import { Router } from 'express';
import { currentUser, updateUser } from '../controllers/users/index.controller.js';
import { contactUs } from "../controllers/mailer/indexMailer.controller.js";
import { sendEmailPw } from '../controllers/users/sendEmailRetrievepw.js';
import { changePw } from '../controllers/users/changePw.controller.js';

const userRouter = Router();

userRouter.get('/current', currentUser)

userRouter.patch('/update', updateUser)

userRouter.post("/contact", contactUs)

userRouter.post('/send-email-pw',sendEmailPw);

userRouter.get('/view-change-pw');

userRouter.post('/change-user-pw', changePw);

export default userRouter;