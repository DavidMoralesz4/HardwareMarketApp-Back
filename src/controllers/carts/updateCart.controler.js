import mongoose from 'mongoose';
import getLogger from '../../utils/log.utils.js';
import * as cartService from '../../services/database/cart.services.js';
import { getProductsById } from '../../services/database/product.services.js';

const log = getLogger();

// Actualizar el carrito
export const updateCart = async (req, res) => {
  try {
    const  {uid}  = req.params;
    const cid = req.params.cid;
    const { productId, quantity } = req.body;

    // Buscar el carrito por su Id
    const cart = await cartService.getCartById(cid);
    // console.log('Initial cart: ', cart);
    if (!cart) {
      log.warn(`Carrito con id ${cid} no encontrado`);
      return res.status(404).send({ message: 'Cart not found' });
    }

    // Buscar el producto por su id
    const prodFromDb = await getProductsById(productId);
    if (!prodFromDb) {
      log.warn(`Product ${productId} no encontrado`);
      return res.status(404).send({ message: 'Product not found' });
    }

    // console.log('userId:  ', user.userId);
    if (prodFromDb.owner.toString() === uid) {
      log.warn(
        'El cliente está intentando agregar al carrito un producto de su propiedad'
      );
      return res.status(203).send({ message: 'Acción inválida' });
    }

    const productInCart = cart.products.find((prod) =>
      prod.product.equals(prodFromDb._id)
    );
    if (productInCart) {
      productInCart.quantity = quantity;
    } else {
      cart.products.push({
        product: new mongoose.Types.ObjectId(productId),
        quantity: quantity,
      });
    }

    const newCart = await cartService.updateCart(cart._id, cart.products);

    console.log('Carrito actualizado correctamente');
    res.status(200).json({
      status: 'success',
      message: `Se han cargado al carrito ${quantity} un. del producto ${prodFromDb.title} correctamente`,
      data: newCart,
    });
  } catch (error) {
    log.fatal('Error al actualizar el carrito del usuario. ', error);
    res.status(500).send('Error interno del servidor');
  }
};
