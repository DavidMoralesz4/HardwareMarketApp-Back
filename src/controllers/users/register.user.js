import {
  createUser,
  getUserByEmail,
} from '../../services/database/users.services.js';
import { createHash } from '../../utils/validations.utils.js';

export const userRegister = async (req, res) => {
  try {
    const data = req.body;
    console.log('data: ', data);
    const user = await getUserByEmail(data.email);
    if (user) {
      console.error('User already registered');
      return res.status(200).send({ message: 'Usuario registrado. inicie sesión para continuar...' });
    } else {
      const userCreated = await createUser({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        age: data.age,
        password: createHash(data.password),
      });

      res.status(201).json({
        status: 'success',
        message: 'Registro de usuario exitoso. Inicia sesión para continuar.',
        user: userCreated,
      });
    }
  } catch (error) {
    console.error('Register controller - Error creating user: ' + error);
    return res.status(500).send({ error: 'usuario ya creado' });
  }
};
