import { Router } from 'express';
import passport from 'passport';
import { userRegister } from '../controllers/users/register.user.js';
import { verifyRequiredFields } from '../middlewares/session.middlewares.js';

const sessionRouter = Router();

// Registrar u usuario
sessionRouter.post(
  '/register',
  verifyRequiredFields,
  passport.authenticate('local-register', {
    failatureRedirect: '/failregister',
  }),
  userRegister
);


export default sessionRouter;