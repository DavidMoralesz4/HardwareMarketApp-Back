import { Router } from 'express';
import sessionRouter from './session.routes.js';
import productsRouter from './products.routes.js';
import bannerRouter from './banner.routes.js';
import userRouter from './user.routes.js';
import favoriteRouter from './favorite.routes.js';


const indexRouter = Router();

indexRouter.use('/v1/api/products', productsRouter);
indexRouter.use('/v1/api/banner',bannerRouter)
indexRouter.use('/v1/api/sessions', sessionRouter);
indexRouter.use('/v1/api/users', userRouter);
indexRouter.use('/v1/api/favorite', favoriteRouter)

export default indexRouter;
