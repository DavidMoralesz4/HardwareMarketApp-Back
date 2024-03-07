import config from '../../config/config.js';
import getLogger from '../../utils/log.utils.js';
import { getCartByUserId } from '../../services/database/cart.services.js';
import {
  decimalToInteger,
  separateProductsByOwner,
  separateProductsByStock,
} from '../../utils/cart.utils.js';
import { createSession } from '../../services/database/payment.services.js';

const log = getLogger();
const BASE_URL = config.url.baseUrl;
export const purchase = async (req, res) => {
  const userId = req.params.uid;

  try {
    const cart = await getCartByUserId(userId);
    if (!cart) {
      log.error(`Carrito del usuario ${userId} no encontrado`);
      return res.status(203).send('Carrito no encontrado'); // En realidad debería ser un 404 - Not Found
    }
    const cartId = cart._id;
    const { productsToProcess } = await separateProductsByStock(cart.products);

    // separar los productos disponibles por propietario
    const productsByOwner = await separateProductsByOwner(productsToProcess);

    // por cada propietario obtener los datos necesarios para procesar el pago
    const line_itemsByOwner = [];

    // const productsProcessedByOwner = [];
    for (const ownerObject of productsByOwner) {
      const ownerId = ownerObject.ownerId;

      // const productsByOwner = processProducts(ownerObject.products)
      for (const product of ownerObject.products) {
        const lineItem = {
          price_data: {
            product_data: {
              name: product.productFromDB.title,
              description: product.productFromDB.description,
            },
            currency: 'usd',
            unit_amount: decimalToInteger(product.productFromDB.price) * 100,
          },
          quantity: product.quantityInCart,
        };

        // Verificar si ya existe un array de line_items para este ownerId, si no existe, inicializarlo
        if (!line_itemsByOwner[ownerId]) {
          line_itemsByOwner[ownerId] = [];
        }

        // agregar el lineItem al array correspondiente al ownerId
        line_itemsByOwner[ownerId].push(lineItem);
      }
    }

    // Formatear el line_itemsByOwner como un array antes de enviarlo
    const line_items = Object.entries(line_itemsByOwner).map(
      ([ownerId, items]) => {
        return {
          ownerId: ownerId,
          line_items: items,
        };
      }
    );

    // Intento de pago con Stripe
    let result;

    for (const lineItemsObj of line_items) {
      const lineItems = lineItemsObj.line_items;
      // console.log('--> lineitems: ', lineItems[0]);
      const paymentInfo = {
        line_items: lineItems,
        mode: 'payment',
        success_url: `${BASE_URL}/v1/api/payments/success/${cartId}`,
        cancel_url: `${BASE_URL}/v1/api/payments/cancel/${cartId}`,
      };
      result = await createSession(paymentInfo);
      console.log('createSession: ', result);
    }
    res.status(308).redirect(result.url);
    // res.status(200).json({
    //   status: 'success',
    //   message: 'Iniciar proceso de pago',
    //   Front_message:
    //     'Redireccionar hacia la siguiente url para iniciar el proceso de pago mediante Stripe',
    //   payment_url: result.url,
    // });
  } catch (error) {
    log.fatal('purchase - Error al realizar la compra. ' + error);
    res.status(500).send({ message: 'Internal server error' });
  }
};
