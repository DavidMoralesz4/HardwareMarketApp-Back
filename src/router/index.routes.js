import { Router } from 'express';
import sessionRouter from './session.routes.js';
import productsRouter from './products.routes.js';

const indexRouter = Router();

indexRouter.use('/v1/api/sessions', sessionRouter);
indexRouter.use('/v1/api/products', productsRouter);

export default indexRouter;
