import cartModel from '../../models/schemas/cart.model.js';

// Solo se utiliza cuando el user hace login por primera vez
const createCart = async (userId, cartData) => {
  const newCart = {
    ...cartData,
    owner: userId,
  };
  return await cartModel.create(newCart);
};

// Trae todos los carritos (Admin)
const getAllCarts = async () =>
  await cartModel.find().populate('poducts.product').lean();

// Trae un carrito por id, se utiliza para traer el carrito a modificar en el controller (user) y/o solo para buscar un carrito por id (Admin)
const getCartById = async (cartId) =>
  await cartModel.findById(cartId).populate('products.product').exec();

// Obtener el carrito del usuario por su UserId (current user)
const getCartByUserId = async (userId) => {
  const response = await cartModel
    .findOne({ owner: userId })
    .populate('products.product')
    .exec();
  return response;
};

// Se utiliza para agregar productos o modificar las cantidades de los mismos (current user)
const updateCart = async (cartId, products) =>
  await cartModel
    .findByIdAndUpdate(cartId, { $set: { products } }, { new: true })
    .exec();

// Se utiliza solo cuando se elimina una cuenta de usuario (current user)
const deleteCart = async (cartId) => {
  const cart = await cartModel.findById(cartId);
  if (cart) {
    await cart.remove();
  }
};

export {
  createCart,
  getAllCarts,
  getCartById,
  getCartByUserId,
  updateCart,
  deleteCart,
};
