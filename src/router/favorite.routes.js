
import { Router } from 'express';
import { addProductFavorite } from '../controllers/favorites/createFavorites.controller.js';
import { getAllFavorite } from '../controllers/favorites/getFavoritesAll.controller.js';
import { deleteFavorite } from '../controllers/favorites/deleteFavorite.controller.js';
import { isActiveSession } from '../middlewares/auth.middlewares.js';


const favoriteRouter = Router();

favoriteRouter.post('/add',isActiveSession,addProductFavorite)
favoriteRouter.get('/:fid',getAllFavorite );
favoriteRouter.delete('/:favid/:pid',isActiveSession,deleteFavorite)

export default favoriteRouter;