import getLogger from '../../utils/log.utils.js';
import { createProduct } from '../../services/database/product.services.js';

const log = getLogger();

export const createProducts = async (req, res) => {
  const productsData = req.body;

  //   log.info('product from FRONT: ', productsData);

  const createdProducts = [];

  try {
    // Verificar que se proporcione formato válido de producto
    if (
      !(Array.isArray(productsData) && productsData.length > 0) &&
      !(
        typeof productsData === 'object' && Object.keys(productsData).length > 0
      )
    ) {
      log.error('No se proporcionaron productos válidos');
      return res.status(400).send('Invalid product');
    }

    //   Validar campos obligatorios para los productos antes de crearlos
    for (const productData of productsData) {
      const { title, description, price, stock, category, type, owner } =
        productData;
      if (!title || !description || !price || !stock || !category || !type) {
        log.error('createProducts - Error intentando crear el Producto');
        return res.status(400).send('Required fields are missing');
      }
    }

    const processProduct = async (productData) => {
      const { title, description, price, stock, category, thumbnails, type } =
        productData;

      const newProduct = {
        title,
        description,
        price,
        stock,
        category,
        thumbnails: thumbnails || [],
        type,
        owner: req.session.user.userId,
      };

      const createdProduct = await createProduct(newProduct);
      createdProducts.push(createdProduct);
    };

    if (Array.isArray(productsData)) {
      for (const productData of productsData) {
        await processProduct(productData);
      }
      res.status(201).json({
        status: 'success',
        message: 'Nuevos productos guardados correctamente',
        data: createdProducts,
      });
    } else {
      await processProduct(productsData);
      res.status(201).json({
        status: 'success',
        message: 'Nuevo producto guardado correctamente',
        data: createdProducts,
      });
    }
    // log.info('productos creados: ', createdProducts);
  } catch (error) {
    log.error('createProducts - ', error.message);
    return res.status(500).send('Error de servidor');
  }
};
