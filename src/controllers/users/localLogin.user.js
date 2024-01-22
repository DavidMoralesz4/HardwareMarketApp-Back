import { getUserByEmail } from '../../services/database/users.services.js';
import { isValidPassword } from '../../utils/validations.utils.js';
// Login de usuario
export const userLogin = async (req, res) => {
  try {
    const data = req.body;
    console.log('data: ', data);

    const findUser = await getUserByEmail(data.email);
    console.log('findUser: ', findUser);

    if (!findUser) {
      console.log('controller login - email no existente');
      res.status(404).send({ message: 'User Not Found' });
    }
    // Comparar el password de la db con el que viene del front
    const passwordMatch = isValidPassword(findUser, data.password);
    console.log('passwordMatch: ', passwordMatch);
            if (!passwordMatch) {
              console.error('Passport local-login - Incorrect password');
            }
    // Generar el objeto 'user' en req.session
    req.session.user = {
      userId: findUser._id,
      first_name: findUser.first_name,
      last_name: findUser.last_name,
      username: findUser.alias,
      age: findUser.age,
      email: findUser.email,
      last_connection: new Date(),
    };
    res.status(200).json({
      status: 'success',
      message: 'Inicio de sesión exitoso.',
      user: req.session.user,
    });
  } catch (error) {
    console.error('userLogin: ', error.message);
    return res.status(500).json({
      message: 'Error al iniciar session',
      err: error.message,
    });
  }
};
