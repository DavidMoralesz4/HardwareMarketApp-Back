import { Router } from 'express';
import passport from 'passport';
import {
  userRegister,
  userLogin,
  googleLoginCallback,
  currentUser,
  userLogout,
} from '../controllers/users/index.controller.js';
import { verifyRequiredFields } from '../middlewares/session.middlewares.js';

const sessionRouter = Router();

// ================================================================
// * ESTA RUTA ES SOLO PARA PRUEBAS DEL BACK *
sessionRouter.get('/', (req, res) => {
  res.send(
    '<div><h1>Please navigate to /login to local login</h1><h1>Please navigate to /auth/google to login</h1></div > '
  );
});

// ================================================================
// Registrar un usuario
sessionRouter.post('/register', verifyRequiredFields, userRegister);
// ================================================================
// Login de usuario mediante app
sessionRouter.post(
  '/login',
  userLogin
);

// ================================================================
// Login de usuario mediante Google
sessionRouter.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
sessionRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  googleLoginCallback
);

// ================================================================
// Login de usuario mediante Faceboock
sessionRouter.get('/facebook', (req, res) => {
  // TODO
});

// ================================================================
// Usuario logueado actualmente
sessionRouter.get('/current', currentUser);

// ================================================================
// Cerrar sesión de usuario
sessionRouter.get('/logout', userLogout);

export default sessionRouter;
