import { getCartById } from '../../services/database/cart.services.js';
import { getProductsById } from '../../services/database/product.services.js';
import getLogger from '../../utils/log.utils.js';
const log = getLogger();

export const deleteProdOfCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await getCartById(cid);
    if (!cart) {
      log.error(`Carrito con id ${cid} no encontrado`);
      return res.status(404).send('Error en la peticion');
    }
    const product = await getProductsById(pid);
    if (!product) {
      log.error(`Carrito con id ${pid} no encontrado`);
      return res.status(404).send('Error en la peticion');
    }

    const productIndex = cart.products.findIndex((prod) =>
      prod.product.equals(pid)
    );
    console.log('productIndex: ', productIndex);

    if (productIndex === -1) {
      log.error(
        `deleteProdOfCart - Producto con id ${pid} no encontrado en el carrito`
      );
      return res.status(404).send('Error en la peticion');
    }

    const productTitle = product.title;
    
      cart.products.splice(productIndex, 1);

      await cart.save()
      res
        .status(200)
        .json({
          message: `Producto: '${productTitle}' removido correctamente del carrito`,
        });
  } catch (error) {
    log.fatal('Error al eliminar el producto del carrito. ' + error);
    res
      .status(500)
      .json({ message: 'Error interno del servidor' });
  }
};
