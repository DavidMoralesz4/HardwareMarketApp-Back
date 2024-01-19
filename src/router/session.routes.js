import { Router } from 'express';
import passport from 'passport';
import { userRegister, userLogin } from '../controllers/users/index.user.js';
import { verifyRequiredFields } from '../middlewares/session.middlewares.js';

const sessionRouter = Router();

// Registrar un usuario
sessionRouter.post(
  '/register',
  verifyRequiredFields,
  passport.authenticate('local-register', {
    failatureRedirect: '/failregister',
  }),
  userRegister
);

// Login de usuario mediante app
sessionRouter.post(
  '/login',
  passport.authenticate('local-login', {
    failureRedirect: '/login',
  }),
  userLogin
);

export default sessionRouter;
