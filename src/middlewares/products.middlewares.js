import { getProductsById } from '../services/database/product.services.js';
import getLogger from '../utils/log.utils.js';

const log = getLogger();

export const checkProductExists = async (req, res, next) => {
  const _id = req.params.pid;
  // console.log('_id', _id);
  try {
    const product = await getProductsById(_id);
    if (!product) {
      log.warn(`Producto con id ${_id} no encontrado`);
      return res.status(404).send('Not Found');
    }

    next();
  } catch (error) {
    log.fatal('Error en el middleware checkProductExists:', error.message);
    throw error;
  }
};

export const checkProductOwner = async (req, res, next) => {
  log.debug('checkProductOwner - request:', req.session);
  try {
    const productId = req.params.pid;

    const product = await getProductsById(productId);

    if (!product) {
      log.warn(`Producto con id ${productId} no encontrado`);
      return res.status(404).send('Not Found');
    }

    //! manejar el caso en que no haya userId
    // Si el usuario es dueño del producto, permitir continuar
    if (product.owner.toString() === req.session.user.userId.toString()) {
      next();
    } else {
      log.error(
        'Acceso denegado, solo el propietario del producto posee permisos para realizar esta acción'
      );
      return res
        .status(403)
        .send(
          'Acceso denegado, solo el propietario del producto posee permisos para realizar esta acción'
        );
    }
  } catch (error) {
    log.fatal('Error en el middleware checkProductOwner:' + error.message);
    res.status(500).send('Error del servidor');
  }
};
