import carts from '../../models/schemas/cart.model.js';

// Solo se utiliza cuando el user hace login por primera vez
const createCart = async (userId, cartData) => {
  const newCart = {
    ...cartData,
    user: userId,
  };
  return await carts.create(newCart);
};

// Trae todos los carritos (Admin)
const getAllCarts = async () =>
  await carts.find().populate(products.product).lean();

// Trae un carrito por id, se utiliza para traer el carrito a modificar en el controller (user) y/o solo para buscar un carrito por id (Admin)
const getCartById = async (cartId) =>
  awaitcarts.findById(cartId).populate(products.product).exec();

// Obtener el carrito del usuario por su UserId (current user)
const getCartByUserId = async (userId) =>
  await carts.findOne({ user: userId }).populate(products.product).exec();

// Se utiliza para agregar productos o modificar las cantidades de los mismos (current user)
const updateCart = async (cartId, products) =>
  await carts
    .findByIdAndUpdate(cartId, { $set: { products } }, { new: true })
    .exec();

// Se utiliza solo cuando se elimina una cuenta de usuario (current user)
const deleteCart = async (cartId) => await carts.findByIdAndRemove(cartId);

export {
  createCart,
  getAllCarts,
  getCartById,
  getCartByUserId,
  updateCart,
  deleteCart,
};
