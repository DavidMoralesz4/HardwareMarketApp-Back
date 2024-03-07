import { Router } from 'express';
import sessionRouter from './session.routes.js';
import productsRouter from './products.routes.js';
import bannerRouter from './banner.routes.js';
import userRouter from './user.routes.js';
import favoriteRouter from './favorite.routes.js';
import cartsRouter from './carts.routes.js';
import paymentRouter from './payment.routes.js';

const indexRouter = Router();

indexRouter.use('/v1/api/products', productsRouter);
indexRouter.use('/v1/api/banner', bannerRouter);
indexRouter.use('/v1/api/sessions', sessionRouter);
indexRouter.use('/v1/api/users', userRouter);
indexRouter.use('/v1/api/favorite', favoriteRouter);
indexRouter.use('/v1/api/carts', cartsRouter);
indexRouter.use('/v1/api/payments', cartsRouter);

export default indexRouter;
