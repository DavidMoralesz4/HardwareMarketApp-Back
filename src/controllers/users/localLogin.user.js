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
      return res
        .status(404)
        .send({ message: 'Usuario no existe. Por favor registrese...' });
    }
    // Comparar el password de la db con el que viene del front
    const passwordMatch = isValidPassword(findUser, data.password);
    console.log('passwordMatch: ', passwordMatch);
    if (!passwordMatch) {
      console.error('Passport local-login - Incorrect password');
      res.status(404).send({ message: 'Password incorrecta' });
    }

    req.session.user = {
      userId: findUser._id,
      first_name: findUser.first_name,
      last_name: findUser.last_name,
      username: findUser.alias,
      age: findUser.age,
      email: findUser.email,
      last_connection: new Date(),
    };

    // Guardar la sesion de usuario en la base de datos
    req.session.save((err) => {
      if (err) {
        console.error('userLogin - Error al guardar la sessión - ', err);
        res.status(500).json({
          message: 'Error al guardar la sesión',
          error: err.message,
        });
      }

      console.log(`user ${findUser._id} successfully logged in`);
      res.status(200).json({
        status: 'success',
        message: 'Inicio de sesión exitoso.',
        user: req.session.user,
      });
    });
  } catch (error) {
    console.error('userLogin: ', error.message);
    return res.status(500).json({
      message: 'Error al iniciar session',
      error: error.message,
    });
  }
};
