import { Router } from 'express';
import { currentUser, updateUser } from '../controllers/users/index.controller.js';

const userRouter = Router();

userRouter.get('/current', currentUser)

userRouter.patch('/update', updateUser)

export default userRouter;