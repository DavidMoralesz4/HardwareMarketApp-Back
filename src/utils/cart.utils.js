import { getProductsById } from '../services/database/product.services.js';
import getLogger from './log.utils.js';

const log = getLogger();

export const separateProductsByOwner = async (products) => {
  const productsByOwner = [];

  // Iterar sobre los productos y los organizarlos por propietario
  products.forEach((cartItem) => {
    // Obtener el propietario del producto
    const ownerId = cartItem.productFromDB.owner.toString();

    // Buscar si ya existe un objeto en el array para el propietario actual
    const ownerObjectIndex = productsByOwner.findIndex(
      (obj) => obj.ownerId === ownerId
    );

    // Si no existe, crearlo y agregarlo al array
    if (ownerObjectIndex === -1) {
      productsByOwner.push({ ownerId: ownerId, products: [cartItem] });
    } else {
      // Si ya existe, simplemente agregar el producto al array de productos del propietario
      productsByOwner[ownerObjectIndex].products.push(cartItem);
    }
  });

  // ====================================================================
  // console.log('cart utils - productsByOwner2 : ', productsByOwner);
  // console.log('Detalles de cada objeto:');
  // productsByOwner.forEach((obj) => {
  //   for (const key in obj) {
  //     console.log(`productsByOwner es:
  //     ${key}`);
  //     console.dir(obj[key]);
  //   }
  // });
  // ====================================================================
    // console.log('productsByOwner: ', productsByOwner);
  return productsByOwner;
};

// Usado en getMyCart
export const separateProductsByStock = async (products) => {
  const productsToProcess = [];
  const productsNotProcessed = [];

  // Iterar sobre cada producto
  for (const cartItem of products) {
    const productId = cartItem.product;
    const quantityInCart = cartItem.quantity;

    // Obtener el producto de id desde la base de datos
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
  // console.log('carts utils - productsToProcess: ', productsToProcess);
  // console.log('carts utils - productsNotProcessed: ', productsNotProcessed);
  return {
    productsToProcess: productsToProcess,
    productsNotProcessed: productsNotProcessed,
  };
};

export const createCartDTOAvailable = (products) => {
  // Estructura del objeto a utilizar
  const productObject = (cartItem) => ({
    // owner: cartItem.productFromDB.owner,
    id: cartItem.productFromDB._id,
    title: cartItem.productFromDB.title,
    description: cartItem.productFromDB.description,
    trademark: cartItem.productFromDB.trademark,
    condition: cartItem.productFromDB.condition,
    deliveryMethod: cartItem.productFromDB.deliveryMethod,
    thumbnails: cartItem.productFromDB.thumbnails,
    price: parseFloat(cartItem.productFromDB.price),
    quantity: cartItem.quantityInCart,
    totalProduct:
      cartItem.quantityInCart * parseFloat(cartItem.productFromDB.price),
  });

  const cartDTOAvailable = [];

  // Iterar sobre los productos
  products.forEach((cartItem) => {
    // Obtener el propietario del producto
    const ownerId = cartItem.productFromDB.owner.toString();

    // Buscar si ya existe un objeto en el array para el propietario actual
    const ownerIndex = cartDTOAvailable.findIndex((obj) =>
      obj.hasOwnProperty(ownerId)
    );

    // Si no existe, lo crea y lo agrega al ayyar
    if (ownerIndex === -1) {
      cartDTOAvailable.push({
        owner: ownerId,
        products: [productObject(cartItem)],
        totalAmount: productObject(cartItem).totalProduct,
      });
      // const ownerObject = {};
      // ownerObject[ownerId] = [productObject(cartItem)];
      // cartDTOAvailable.push(ownerObject);
    } else {
      // Si ya existe, simplemente se agrega el producto al array de productos del propietario
      cartDTOAvailable[ownerIndex].products.push(productObject(cartItem));
      cartDTOAvailable[ownerIndex].totalAmount +=
        productObject(cartItem).totalProduct;
      // cartDTOAvailable[ownerIndex][ownerId].push(productObject(cartItem));
    }
  });

  // ====================================================================
  console.log('createCartDTO - cartDTOAvailable: ', cartDTOAvailable);
  // console.log('Detalles de cada objeto:');
  // cartDTOAvailable.forEach((obj) => {
  //   for (const key in obj) {
  //     console.log(`Owner: ${key}`);
  //     console.dir(obj[key]);
  //   }
  // });
  // ====================================================================
  return cartDTOAvailable;
};

export const createCartDTONotAvailable = (products) => {
  // Estructura del objeto a utilizar
  const productObject = (cartItem) => ({
    id: cartItem.productFromDB._id,
    title: cartItem.productFromDB.title,
    quantity: cartItem.quantityInCart,
    stock: cartItem.productFromDB.stock,
  });

  const cartDTONotAvailable = [];

  // Iterar sobre los productos
  products.forEach((cartItem) => {
    // Obtener el propietario del producto
    const ownerId = cartItem.productFromDB.owner.toString();

    // Buscar si ya existe un objeto en el array para el propietario actual
    const ownerIndex = cartDTONotAvailable.findIndex((obj) =>
      obj.hasOwnProperty(ownerId)
    );

    // Si no existe, lo crea y lo agrega al ayyar
    if (ownerIndex === -1) {
      const ownerObject = {};
      ownerObject[ownerId] = [productObject(cartItem)];
      cartDTONotAvailable.push(ownerObject);
    } else {
      // Si ya existe, simplemente se agrega el producto al array de productos del propietario
      cartDTONotAvailable[ownerIndex][ownerId].push(productObject(cartItem));
    }
  });

  // ====================================================================
  // console.log('createCartDTO - cartDTOAvailable: ', cartDTONotAvailable);
  // console.log('Detalles de cada objeto:');
  // cartDTONotAvailable.forEach((obj) => {
  //   for (const key in obj) {
  //     console.log(`Owner: ${key}`);
  //     console.dir(obj[key]);
  //   }
  // });
  // ====================================================================
  return cartDTONotAvailable;
};

export const decimalToInteger = (value) => {
  let valor = value;

  if (typeof value === 'number') {
    valor = value.toString();
  }

  const integerString = valor.split('.');
  const newIntegerString = integerString.join('');
  const integerValue = parseInt(newIntegerString);

  return integerValue;
};

// Funciones reemplazadas
// ====================================================================
/* export const createCartDTO = (products) => {
  // Crear un objeto para almacenar los productos por propietario
  const productsByOwner = {};

  // Iterar sobre los productos y organizarlos por propietario
  products.forEach((cartItem) => {
    const owner = cartItem.owner.toString();

    // Si el propietario no está en el objeto, inicializarlo como un arreglo vacío
    if (!productsByOwner[owner]) {
      productsByOwner[owner] = [];
    }

    // Agregar el producto al arreglo correspondiente al propietario
    productsByOwner[owner].push({
      id: cartItem.product._id,
      title: cartItem.product.title,
      description: cartItem.product.description,
      trademark: cartItem.product.trademark,
      price: parseFloat(cartItem.product.price),
      condition: cartItem.product.condition,
      deliveryMethod: cartItem.product.deliveryMethod,
      quantity: cartItem.quantity,
      total: cartItem.quantity * parseFloat(cartItem.product.price),
      thumbnails: cartItem.product.thumbnails,
    });
  });

  // Crear un objeto final para el DTO
  const cartDTO = {};

  // Iterar sobre los productos organizados por propietario y agregarlos al DTO final
  for (const owner in productsByOwner) {
    if (Object.hasOwnProperty.call(productsByOwner, owner)) {
      cartDTO[owner] = productsByOwner[owner];
    }
  }

  return cartDTO;
}; */

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

/* export const separateProductsByStock = async (productsByOwner) => {
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
}; */

// ====================================================================

// Funciones no utilizadas
// ====================================================================
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

export const toLocaleFloat = (price) => {
  const formatedNumber = price.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return parseFloat(formatedNumber.replace(',', '.'));
};

export const formatTotalAmount = (totalAmount) => {
  let number = parseFloat(totalAmount.toString().replace(',', '.'));

  // Verificar si el número es un float válido
  if (isNaN(number)) {
    throw new Error('El valor proporcionado no es un número válido.');
  }

  // Redondear el número a dos decimales y convertirlo a string
  let formatedNumber = number.toFixed(2);

  // Separar las partes enteras y decimales del número
  let parts = formatedNumber.split('.');

  // Agregar separadores de miles
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Unir las partes con coma como separador decimal
  return parts.join(',');
};
