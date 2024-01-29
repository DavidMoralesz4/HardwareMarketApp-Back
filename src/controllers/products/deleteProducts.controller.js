import {
  deleteProduct,
  getProductsById,
} from '../../services/database/product.services.js';
import { getUserById } from '../../services/database/users.services.js';
import getLogger from '../../utils/log.utils.js';

const log = getLogger();

/**
 * @param { pid } req.params
 * @
 */
export const deleteProducts = async (req, res) => {
  const _id = req.params.pid;
  log.info('req.params:', req.params);

  try {
    const product = await getProductsById(_id);
    const ownerId = product.owner;
    const { email } = await getUserById(ownerId);

    await deleteProduct(_id);

    //   TODO: Crear una función para enviar un email al propietario indicando que el producto fue eliminado de la base de datos
    log.info(`Producto eliminado exitosamente, mail enviado a ${email}.`);

    return res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully',
    });
  } catch (error) {
    log.fatal('Error al eliminar el producto. ' + error);
    res.status(500).send('Error interno del servidor');
  }
};
