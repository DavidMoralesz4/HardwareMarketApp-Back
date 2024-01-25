import { Router } from 'express';
import { createProducts, getProductById, getProducts } from '../controllers/products/indexProduct.controller.js';
import { isActiveSession } from '../middlewares/auth.middlewares.js';
import { uploader } from '../middlewares/saveFiles.middlewares.js';

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
productsRouter.patch('/:pid', (req, res) => {
  // TODO: CREAR CONTROLADOR
  /* Deberá prermitir: 
     - modificar cualquier dato del producto (salvo el id),
     - pausar un producto (ante una promesa de compra)
     - rehabilitar un producto (en el caso de que la compra no se concrete)
     A tener en cuenta:
     - solo modificable por un usuario con rol 'vendedor'.
     - el producto solo puede ser modificado por su dueño (debera verificarse la relacion entre el producto y el creador del mismo)
     */
});

// Eliminar un producto por id
productsRouter.delete('/:pid', (req, res) => {
  // TODO: CREAR CONTROLADOR
});

// Mockear productos
productsRouter.post('/:pid', (req, res) => {
  // TODO: CREAR CONTROLADOR
  // Este endpoint sera solo para desarrollo, será para poder testear.
});

export default productsRouter;
