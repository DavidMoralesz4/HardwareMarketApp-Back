import { getProductsById } from '../services/database/product.services.js';
import getLogger from './log.utils.js';

const log = getLogger();

export const separateProductsByOwner = async (cart) => {};

/* export const separateProductsByStock = async (productsByOwner) => {
  const productsToProcess = [];
  const productsNotProcesed = [];

  // Iterar sobre cada propietario en productByOwner
  for (const ownerId of productsByOwner) {
    if (Object.hasOwnProperty.call(productsByOwner, ownerId)) {
      const productsForOwner = productsByOwner[ownerId];

      // Iterar sobre cada producto para el propietario actual
      for (const cartItem of productsForOwner) {
        const productId = cartItem.product;
        const quantityInCart = cartItem.quantity;

        // Obtener el producto por id desde la base de datos
        const productFromDB = await getProductsById(productId);
        if (!productFromDB) {
          productsNotProcesed.push(productId);
          log.warn(
            `Producto con id ${productId._id} no encontrado en la base de datos`
          );
        } else if (productFromDB.stock >= quantityInCart) {
          productsToProcess.push({ productFromDB, quantityInCart });
        } else {
          productsNotProcesed.push({ productFromDB, quantityInCart });
        }
      }
    }
  }

  return { productsToProcess, productsNotProcesed };
};
 */

export const separateProductsByStock = async (productsByOwner) => {
  const productsToProcess = [];
  const productsNotProcessed = [];

  // Obtener las claves del objeto (propietarios)
  const ownerIds = Object.keys(productsByOwner);

  // Iterar sobre cada propietario
  for (const ownerId of ownerIds) {
    const productsForOwner = productsByOwner[ownerId];

    // Iterar sobre cada producto para el propietario actual
    for (const cartItem of productsForOwner) {
      const productId = cartItem.product;
      const quantityInCart = cartItem.quantity;

      // Obtener el producto por id desde la base de datos
      const productFromDB = await getProductsById(productId);
      if (!productFromDB) {
        productsNotProcessed.push(productId);
        log.warn(
          `Producto con id ${productId._id} no encontrado en la base de datos`
        );
      } else if (productFromDB.stock >= quantityInCart) {
        productsToProcess.push({ productFromDB, quantityInCart });
      } else {
        productsNotProcessed.push({ productFromDB, quantityInCart });
      }
    }
  }

  return { productsToProcess, productsNotProcessed };
};

export const processProducts = (productsArray) => {
  const processedProducts = [];

  for (const { productFromDB, quantityInCart } of productsArray) {
    processedProducts.push({
      product: productFromDB,
      quantity: quantityInCart,
    });
  }

  return processedProducts;
};

export const createCartDTO = (products) => {
  const cartDTO = products.map((cartItem) => ({
    id: cartItem.product._id,
    title: cartItem.product.title,
    description: cartItem.product.description,
    price: cartItem.product.price,
    status: cartItem.product.status,
    quantity: cartItem.quantity,
    total: cartItem.product.price * cartItem.quantity,
  }));

  return cartDTO;
};
