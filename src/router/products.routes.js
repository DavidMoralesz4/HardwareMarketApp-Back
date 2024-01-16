import { Router } from 'express';


const productsRouter = Router();

// Obtener todos los productos paginados, filtrados y ordenados
productsRouter.get('/', getProduc);

// Crear un nuevo producto
productsRouter.post('/', (req, res) => {
  // TODO: CREAR CONTROLADOR
  /* 
      Un producto sólo podrá ser creado por un usuario con rol 'vendedor'.
      Será necesario utilizar Multer (es el que conozco) para poder guardar las imágenes de los productos creados.
  */
});

// Obtener un producto por id
productsRouter.get('/:pid', (req, res) => {
  // TODO: CREAR CONTROLADOR
});

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
