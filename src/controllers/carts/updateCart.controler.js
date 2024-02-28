import getLogger from '../../utils/log.utils.js';
import * as cartService from '../../services/database/cart.services.js';
import { getProductsById } from '../../services/database/product.services.js';

const log = getLogger();

// Actualizar el carrito
export const updateCart = async (req, res) => {
  try {
    const { uid } = req.params;
    const cid = req.params.cid;
    const products = req.body;

    // Buscar el carrito por su Id
    const cart = await cartService.getCartById(cid);
    if (!cart) {
      log.warn(`Carrito con id ${cid} no encontrado`);
      return res.status(404).send({ message: 'Cart not found' });
    }
    // Iterar sobre cada producto enviado en la solicitud
    for (const item of products) {
      const { productId, quantity } = item;

      // Buscar el producto por su id
      const prodFromDb = await getProductsById(productId);
      if (!prodFromDb) {
        log.warn(`Product ${productId} no encontrado`);
        return res.status(404).send({ message: 'Product not found' });
      }

      // Verificar si el producto pertenece al usuario
      if (prodFromDb.owner.toString() === uid) {
        log.warn(
          'El cliente está intentando agregar al carrito un producto de su propiedad'
        );
        return res.status(203).send({ message: 'Acción inválida' });
      }

      // Buscar si el producto ya está en el carrito
      const productIndex = cart.products.findIndex((prod) => {
        return prod.product._id.toString() === productId.toString();
      });

      if (productIndex !== -1) {
        // Si el producto ya está en el carrito, actualizar la cantidad
        cart.products[productIndex].quantity = quantity;
      } else {
        // Si el producto no está en el carrito, agregarlo
        cart.products.push({
          product: productId,
          quantity: quantity,
        });
      }
    }
    // Actualizar el carrito en la base de datos
    const updatedCart = await cartService.updateCart(cart._id, cart.products);

    res.status(200).json({
      status: 'success',
      message: 'El carrito se ha actualizado correctamente',
      data: updatedCart,
    });
  } catch (error) {
    log.fatal('Error al actualizar el carrito del usuario. ', error);
    res.status(500).send('Error interno del servidor');
  }
};

