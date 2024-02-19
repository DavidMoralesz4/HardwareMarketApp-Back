import getLogger from '../utils/log.utils.js';

const log = getLogger();

/**
 * @param { req.session.user } req
 * @param {send} res
 * @param {*} next
 */
const isActiveSession = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    log.warn('isActiveSession - El user no está logueado');
    return res.send({ message: 'Unauthorized' });
  }
};

// Middleware para verificar el rol del usuario y autorizar el acceso a ciertas rutas
const checkRole =
  (...requiredRole) =>
  (req, res, next) => {
    // Verificar si hay una sesión activa y si el usuario tiene un rol válido
    if (
      req.session &&
      req.session.user &&
      requiredRole.includes(req.session.user.role)
    ) {
      next();
    } else {
      // El usuario no tiene el rol adecuado, devolver un mensaje de error o redirigir a una página de acceso denegado
      log.error('Acceso denegado. El usuario no tiene el rol adecuado');
      res.status(203).send({ message: 'Acceso denegado' });
    }
  };

export { isActiveSession, checkRole };
