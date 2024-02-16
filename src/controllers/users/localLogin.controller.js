import { getUserByEmail } from '../../services/database/users.services.js';
import { isValidPassword } from '../../utils/validations.utils.js';
import getLogger from '../../utils/log.utils.js';
import { createCart } from '../../services/database/cart.services.js';

const log = getLogger();

// Login de usuario
export const userLogin = async (req, res) => {
  try {
    const data = req.body;
    log.info('data: ', data);

    const user = await getUserByEmail(data.email);
    log.info('user: ', user);

    if (!user) {
      log.warn('controller login - email no existente');
      return res
        .status(203)
        .send({ message: 'Usuario no existe. Por favor registrese...' });
    }
    // Comparar el password de la db con el que viene del front
    const passwordMatch = isValidPassword(user, data.password);

    log.info('passwordMatch: ' + passwordMatch);
    if (!passwordMatch) {
      log.warn('Passport local-login - Incorrect password');
      return res.status(203).send({ message: 'Password incorrecta' });
    }
    // Generar el objeto 'user' en req.session
    req.session.user = {
      userId: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.alias,
      age: user.age,
      email: user.email,
      role: user.role,
      last_connection: new Date(),
    };
    log.debug('session: ', req.session.user);
    // Verificar que el usuario no sea el administrator
    if (user.role !== 'admin') {
      // Verificar si el usuario ya tiene un carrito asignado, de lo contrario asignarle uno
      if (!user.cart) {
        const newCart = await createCart(user._id, { products: [] });

        // Asignar el id del nuevo carrito al campo 'cart' del usuario
        user.cart = newCart._id;

        // Guardar los cambios en el usuario en la base de datos
        await user.save();
      }
    }

    // Guardar la sesion de usuario en la base de datos
    req.session.save((err) => {
      if (err) {
        log.fatal('userLogin - Error al guardar la sessión - ' + err);
        res.status(500).json({
          message: 'Error interno del servidor',
        });
      }

      log.info(`user ${user._id} successfully logged in`);
      res.status(200).json({
        status: 'success',
        message: 'Inicio de sesión exitoso.',
        user: req.session.user,
        cart: user.cart,
      });
    });
  } catch (error) {
    log.fatal('userLogin: ' + error);
    return res.status(500).send({
      message: 'Error interno del servidor',
    });
  }
};
