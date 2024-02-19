import getLogger from '../../utils/log.utils.js';
import { createProduct } from '../../services/database/product.services.js';
import { uploadFile } from '../../utils/uploadFile.utils.js';

const log = getLogger();

export const createProducts = async (req, res) => {
  const productsData = req.body;

  const createdProducts = [];

  try {
    // Verificar que se proporcione formato válido de producto
    if (
      !(
        typeof productsData === 'object' && Object.keys(productsData).length > 0
      )
    ) {
      log.error('No se proporcionaron productos válidos');
      return res.status(400).send('Invalid product');
    }

    //   Validar campos obligatorios para los productos antes de crearlos
    const { title, description, price, stock, category, condition, trademark } =
      productsData;
    if (
      !title ||
      !description ||
      !price ||
      !stock ||
      !category ||
      !condition ||
      !trademark
    ) {
      log.error('createProducts - Error intentando crear el Producto');
      return res.status(203).send('Required fields are missing');
    }

    const processProduct = async (productsData) => {
      const {
        title,
        description,
        price,
        stock,
        category,
        condition,
        trademark,
      } = productsData;

      const thumbnails = [];

      const images = req.files.thumbnails;
      if (images && images.length > 0) {
        for (const file of images) {
          const { downloadURL } = await uploadFile(file);
          thumbnails.push(downloadURL);
        }
      }

      const newProduct = {
        title,
        description,
        price,
        stock,
        category,
        trademark,
        thumbnails,
        condition,
        owner: req.session.user.userId,
      };

      const createdProduct = await createProduct(newProduct);
      createdProducts.push(createdProduct);
    };

    await processProduct(productsData);
    res.status(201).json({
      status: 'success',
      message: 'Nuevo producto guardado correctamente',
      data: createdProducts,
    });
  } catch (error) {
    log.error('createProducts - ' + error);
    return res.status(500).send('Error de servidor');
  }
};
