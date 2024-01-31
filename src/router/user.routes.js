import { Router } from 'express';
import { currentUser, updateUser } from '../controllers/users/index.controller.js';
import { contactUs } from "../controllers/mailer/indexMailer.controller.js";

const userRouter = Router();

userRouter.get('/current', currentUser)

userRouter.patch('/update', updateUser)

userRouter.post("/contact", contactUs)

export default userRouter;