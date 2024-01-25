import getLogger from '../utils/log.utils.js';

const log = getLogger();

export const verifyRequiredFields = (req, res, next) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    // Verificar si todos los campos requeridos estan presentes
    if (!first_name || !last_name || !email || !age || !password) {
      log.error('verifyRequiredFields - All fields are required');
      return res.status(400).json({
        status: 'error',
        message: 'All fields are required',
      });
    }
    next();
  } catch (error) {
    log.fatal('verifyRequiredFields: ' + error.message);
    res.status(500).send('Error interno del servidor');
  }
};
