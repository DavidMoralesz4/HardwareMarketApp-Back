import { getProductsById } from '../../services/database/product.services.js';

/**
 * getProductById - Obtiene un prooducto a partir de un pid
 * @param {pid} req
 * @returns {product}
 * @param {product} res
 */
export const getProductById = async (req, res) => {
  const _id = req.params.pid;

  try {
    const product = await getProductsById(_id);
    if (!product) {
      console.error(`getProductById - Producto con id ${_id} no encontrado`);
      return res.status(404).send({ message: 'Product not found' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Producto encontrado',
      data: product,
    });
  } catch (error) {
    console.error(
      'getProductById - Error al obtener el producto: ' + error.message
    );
    return res
      .status(500)
      .send({ status: 'error', message: 'Error de servidor' });
  }
};
