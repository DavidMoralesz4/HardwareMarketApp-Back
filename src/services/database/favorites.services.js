import Favorito from '../../models/schemas/favorites.model.js';

const createFavorite = async(favoriteData) => await Favorito.create(favoriteData);
const getAllFavorites = async()=> Favorito.find().populate('products');;
const deleteFavoriteById = async (favoriteId) => await Favorito.findByIdAndDelete(favoriteId);

export {
    createFavorite,
    getAllFavorites,
    deleteFavoriteById
}