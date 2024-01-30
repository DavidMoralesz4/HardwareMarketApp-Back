import { userRegister } from './register.controller.js';
import { userLogin } from './localLogin.controller.js';
import { googleLoginCallback } from './googleLogin.controller.js';
import { currentUser } from './currentUser.controller.js';
import { userLogout } from './logout.controller.js';
import { updateUser } from './updateUser.controller.js';

export {
  userRegister,
  userLogin,
  googleLoginCallback,
  currentUser,
  userLogout,
  updateUser
};
