import Favorite from '../../models/schemas/favorites.model.js';


const createFavorite = async(favoriteData) => await Favorite.create(favoriteData);
const getAllFavorites = async()=> Favorite.find().populate('products');;
const deleteFavoriteById = async (favoriteId) => await Favorite.findByIdAndDelete(favoriteId);

export {
    createFavorite,
    getAllFavorites,
    deleteFavoriteById
}