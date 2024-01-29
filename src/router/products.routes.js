import { Router } from 'express';
import {
  createProducts,
  deleteProducts,
  getProductById,
  getProducts,
  updateProducts,
} from '../controllers/products/indexProduct.controller.js';
import { isActiveSession } from '../middlewares/auth.middlewares.js';
import { uploader } from '../middlewares/saveFiles.middlewares.js';
import { checkProductOwner } from '../middlewares/products.middlewares.js';

const productsRouter = Router();

// Obtener todos los productos paginados, filtrados y ordenados
productsRouter.get('/', getProducts);

// Crear un nuevo producto
productsRouter.post(
  '/create',
  isActiveSession,
  uploader.array('thumbnails', 5),
  createProducts
);

// Obtener un producto por id
productsRouter.get('/:pid', getProductById);

// Actualizar un producto por id
productsRouter.patch(
  '/:pid',
  isActiveSession,
  checkProductOwner,
  updateProducts
);

// Eliminar un producto por id
productsRouter.delete(
  '/:pid',
  isActiveSession,
  checkProductOwner,
  deleteProducts
);

// Mockear productos
productsRouter.post('/:pid', (req, res) => {
  // TODO: CREAR CONTROLADOR
  // Este endpoint sera solo para desarrollo, será para poder testear.
});

export default productsRouter;
