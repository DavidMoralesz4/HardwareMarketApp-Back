import getLogger from '../../utils/log.utils.js';

const log = getLogger();

export const userLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      log.fatal('logout controller - Error al destruir la sesión', err);
      return res.status(500).send({ error: 'Internal Server Error' });
    }
    log.info('userLogout - Sesion finalizada');
    res.status(200).send('Sesion finalizada');
  });
};
