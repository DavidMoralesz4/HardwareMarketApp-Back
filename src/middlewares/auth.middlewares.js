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
    res.send({ message: 'Unauthorized' });
  }
};

export { isActiveSession };
