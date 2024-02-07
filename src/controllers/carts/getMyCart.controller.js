import { getCartByUserId } from '../../services/database/cart.services.js';
import {
  createCartDTO,
  processProducts,
  separateProductsByStock,
} from '../../utils/cart.utils.js';
import getLogger from '../../utils/log.utils.js';

const log = getLogger();

export const getMyCart = async (req, res) => {
  const userId = req.params.uid;
  // console.log(userId);
  try {
    const cart = await getCartByUserId(userId);
    if (!cart) {
      log.error(`Carrito del usuario ${userId} no encontrado`);
      return res.status(203).send('Carrito no encontrado');
    }

    // Separar los productos por propietario
    const productsByOwner = {};
    cart.products.forEach((cartItem) => {
      const owner = cartItem.product.owner.toString();
      console.log('owner: ', owner);
      if (!productsByOwner[owner]) {
        productsByOwner[owner] = [];
      }
      productsByOwner[owner].push(cartItem);
    });

    // Separar los productos por disponibilidad (stock)
    const { productsToProcess, productsNotProcessed } =
      await separateProductsByStock(productsByOwner);
    const availableProducts = processProducts(productsToProcess);
    const notAvailableProducts = processProducts(productsNotProcessed);

    const availableProductsDTO = {};
    for (const ownerId in productsByOwner) {
      if (Object.hasOwnProperty.call(productsByOwner, ownerId)) {
        const owner = ownerId;
        const products = createCartDTO(productsByOwner[ownerId]);
        // Calcular en monto total de los productos por owner
        const totalAmount = products.reduce((acc, curr) => acc + curr.total, 0);
        availableProductsDTO[owner] = {
          products: products,
          totalAmount: totalAmount,
        };
      }
    }

    const notAvailableProductsDTO = {};
    for (const ownerId in productsNotProcessed) {
      if (Object.hasOwnProperty.call(productsNotProcessed, ownerId)) {
        const owner = ownerId;
        notAvailableProductsDTO[owner] = {
          products: createCartDTO(productsNotProcessed[ownerId]),
        };
      }
    }

    console.log('cart2: ', productsByOwner);
    res.status(200).json({
      status: 'success',
      message: 'Carrito del usuario encontrado satisfactoriamente',
      data: {
        availableProducts: availableProductsDTO,
        notAvailableProducts: notAvailableProductsDTO,
      },
    });
  } catch (error) {
    log.fatal('Error al obtener el carrito del usuario. ', error);
    res.status(500).send('Error interno');
  }
};
