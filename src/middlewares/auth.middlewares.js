/**
 * @param { req.session.user } req
 * @param {send} res
 * @param {*} next
 */
const isActiveSession = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    console.log('isActiveSession - El user no está logueado');
    res.send({ message: 'Unauthorized' });
  }
};

export { isActiveSession };
