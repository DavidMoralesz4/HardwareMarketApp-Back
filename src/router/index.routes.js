import { Router } from 'express';
import sessionRouter from './session.routes.js';

const indexRouter = Router();

indexRouter.use('/v1/api/sessions', sessionRouter);

export default indexRouter;
