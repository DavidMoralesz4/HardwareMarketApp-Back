import { Router } from 'express';
import {
  getCarts,
  getMyCart,
  updateCart,
  deleteProdOfCart,
  purchase,
} from '../controllers/carts/indexCart.controller.js';
import { checkRole } from '../middlewares/auth.middlewares.js';

const cartsRouter = Router();

// Obtener todos los carritos
cartsRouter.get('/', checkRole('admin'), getCarts);

// Obtener un carrito por id
cartsRouter.get('/:cid', checkRole('admin'), (req, res) => {
  // TODO: getCartById controller
});

// Actualizar el carrito con nuevos productos y/o cantidad de ejemplares de un producto en un carrito
cartsRouter.put('/:cid/user/:uid', updateCart); //* quito el middleware para hacerun prueba con el front

// Eliminar un carrito
cartsRouter.delete('/:cid', checkRole('admin'), (req, res) => {
  // TODO: deleteCart controller
});

// Obtener el carrito del usuario actual
cartsRouter.get('/user/:uid', checkRole('user'), getMyCart);

// Eliminar un producto del carrito
cartsRouter.delete(
  '/:cid/products/:pid',
  checkRole('user', 'admin'),
  deleteProdOfCart
);

// Finalizar el proceso de compra del carrito
cartsRouter.post('/:cid/purchase/:oid', purchase);

export default cartsRouter;
