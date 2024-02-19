import {
  createUser,
  getUserByEmail,
} from '../../services/database/users.services.js';
import { createHash } from '../../utils/validations.utils.js';
import getLogger from '../../utils/log.utils.js';
import { sendEmail } from '../../services/mailer/mailer.services.js';
import config from '../../config/config.js';

const log = getLogger();

export const userRegister = async (req, res) => {
  try {
    const data = req.body;
    // log.info('data: ', data);
    const user = await getUserByEmail(data.email);
    if (user) {
      log.info('User already registered');
      return res.status(200).send({
        message: 'Usuario registrado. inicie sesión para continuar...',
      });
    } else {
      const userCreated = await createUser({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        age: data.age,
        password: createHash(data.password),
      });
      log.info('Nuevo usuario registrado');

      // Send welcome email to the user
      if (userCreated) {
        let subject = 'Welcome to Hardware Market';
        let message = `Welcome ${userCreated.first_name} ${userCreated.last_name}, you are succesfully join to our site`;

        await sendEmail(
          config.mailer.email,
          userCreated.email,
          subject,
          message
        );
      }

      res.status(201).json({
        status: 'success',
        message: 'Registro de usuario exitoso. Inicia sesión para continuar.',
        user: userCreated,
      });
    }
  } catch (err) {
    log.fatal('Register controller - Error creating user: ' + err.message);
    return res.status(500).send({ error: 'usuario ya creado' });
  }
};
