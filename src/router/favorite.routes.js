
import { Router } from 'express';
import { addProductFavorite } from '../controllers/favorites/createFavorites.controller.js';
import { getAllFavorite } from '../controllers/favorites/getFavoritesAll.controller.js';
import { deleteFavorite } from '../controllers/favorites/deleteFavorite.controller.js';


const favoriteRouter = Router();

favoriteRouter.post('/add/:fid',addProductFavorite) 
favoriteRouter.get('/:fid',getAllFavorite );
favoriteRouter.delete('/:fid/:favid/:pid',deleteFavorite)

export default favoriteRouter;