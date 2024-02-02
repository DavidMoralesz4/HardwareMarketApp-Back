import { getAllCarts } from '../../services/database/cart.services.js';
import getLogger from '../../utils/log.utils.js';

const log = getLogger();

export const getCarts = async (req, res) => {
  try {
    const limit = parseInt(req.params.limit);
    const carts = await getAllCarts();

    if (limit && !isNaN(limit) && limit > 0) {
      return carts.slice(0, limit);
    }

    return res.status(200).json({
      status: 'success',
      message: 'Carritos encontrados',
      data: carts,
    });
  } catch (error) {
    log.fatal('Error al obtener los carritos. ' + error);
    res.status(500).send('Error interno');
  }
};
