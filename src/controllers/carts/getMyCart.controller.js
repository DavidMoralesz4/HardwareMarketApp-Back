import { getCartByUserId } from '../../services/database/cart.services.js';
import {
  createCartDTOAvailable,
  createCartDTONotAvailable,
  separateProductsByOwner,
  separateProductsByStock,
} from '../../utils/cart.utils.js';
import getLogger from '../../utils/log.utils.js';

const log = getLogger();

export const getMyCart = async (req, res) => {
  const userId = req.params.uid;

  try {
    // Obtener el carrito a partir del user id
    const cart = await getCartByUserId(userId);
    if (!cart) {
      log.error(`Carrito del usuario ${userId} no encontrado`);
      return res.status(203).send('Carrito no encontrado'); // En realidad debería ser un 404 - Not Found
    }

    // Separar los productos por disponibilidad (stock) //* está llegando ok
    const { productsToProcess, productsNotProcessed } =
      await separateProductsByStock(cart.products);
    // console.log('getMyCart - productsToProcess: ', productsToProcess);
    
    // Separar los productos 'productsToProcess' por propietario
    // const productsByOwner = await separateProductsByOwner(
    //   productsToProcess
    //   // productsNotProcessed
    // );

    // ====================================================================
    // console.log('getMyCart - productsByOwner: ', productsByOwner);
    // console.log('Detalles de cada objeto:');
    // productsByOwner.forEach((obj) => {
    //   for (const key in obj) {
    //     console.log(`Owner: ${key}`);
    //     console.dir(obj[key]);
    //   }
    // });
    // ====================================================================

    // Crear los DTO de los productos a retornar en la consulta
    const availableProductsDTO = createCartDTOAvailable(productsToProcess);
    const notAvailableProductsDTO =
      createCartDTONotAvailable(productsNotProcessed);

    // ====================================================================
    // console.log('getMyCart - availableProductsDTO: ', availableProductsDTO);
    // console.log('Detalles de cada objeto:');
    // availableProductsDTO.forEach((obj) => {
    //   for (const key in obj) {
    //     console.log(`Owner: ${key}`);
    //     console.dir(obj[key]);
    //   }
    // });
    // ====================================================================

    // Calcular el monto total a abonar (por propietario de los productos)
    // availableProductsDTO.forEach((ownerObject) => {
    //   for (const ownerId in ownerObject) {
    //     // Si el ownerObject tiene como propiedad a ownerId
    //     if (Object.hasOwnProperty.call(ownerObject, ownerId)) {
    //       const products = ownerObject[ownerId];
    //       // console.log('getMyCart - products:', products);
    //       const totalAmount = products.reduce(
    //         (acc, curr) => acc + curr.totalProduct,
    //         0
    //       );
    //       ownerObject.totalAmount = totalAmount;
    //     }
    //   }
    // });

    /* // parte reemplazada    
    const productsByOwner = {};
    cart.products.forEach((cartItem) => {
      const owner = cartItem.product.owner.toString();

      if (!productsByOwner[owner]) {
        productsByOwner[owner] = [];
      }
      productsByOwner[owner].push(cartItem);
    });

    const availableProductsDTO = {};
    for (const ownerId in productsByOwner) {
      if (Object.hasOwnProperty.call(productsByOwner, ownerId)) {
        const owner = ownerId;
        const products = createCartDTO(productsByOwner[ownerId]);
        // Calcular en monto total de los productos por owner
        const totalAmount = products.reduce((acc, curr) => acc + curr.total, 0);
        availableProductsDTO[owner] = {
          products: products,
          totalAmount: toLocaleFloat(totalAmount),
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
 */

    res.status(200).json({
      status: 'success',
      message: 'Carrito del usuario encontrado satisfactoriamente',
      messageForFront:
        'La data son dos Arrays, internamente separados los products por ownerId, el array notAvailableProducts posee datos mínimos (en caso de necesitar mas datos para mostrar los agregamos).',
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
