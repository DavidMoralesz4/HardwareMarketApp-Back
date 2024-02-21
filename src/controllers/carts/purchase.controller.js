import getLogger from '../../utils/log.utils.js';
import { getCartById } from '../../services/database/cart.services.js';
import { processProducts, separateProductsByStock } from '../../utils/cart.utils.js';

const log = getLogger();

export const purchase = async (req, res) => {
  const cartId = req.params.cid;
  const ownerId = req.params.oid;
  // console.log('--> cartId: ', cartId);
  // console.log('--> ownerId: ',  ownerId);

  try {
    const cart = await getCartById(cartId);
    if (!cart) {
      return res.status(404).send({ messaje: 'Cart not found' });
    }

    const { productsToProcess } = await separateProductsByStock(cart)
    console.log('productsToProcess: ', productsToProcess);

    const currentCart = cart.products.filter(
      (el) => el.product.owner.toString() === ownerId
    );

    let totalAmount = 0;

    for (const item of currentCart) {
      const product = item.product
      console.log('product: ', product)
    }

      currentCart.forEach((el) => {
        const totalProd = el.product.price * el.quantity;

        totalAmount += totalProd;
        log.info(`Subtotal para ${el.product.title}: $${totalProd}`);
      });
    // log.debug('totalAmount: ' + totalAmount);

    res.status(200).json({
      status: 'success',
      message: 'Compra Finalizada',
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};
