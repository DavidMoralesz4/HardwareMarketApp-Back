import 'dotenv/config';
import config from './config/config.js';
import express, { json, urlencoded } from 'express';
import __dirname from './utils.js';
import cors from 'cors';

import cookieParser from 'cookie-parser';

import indexRouter from './router/index.routes.js';
/* Dev */
import morgan from 'morgan';

/* CONFIGURATIONS */
const app = express();
const PORT = config.server.port;

/* Express */
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use(cors());

/* Morgan */
app.use(morgan('dev'));

/* Server HTTP */
const server = app.listen(PORT, (err) => {
  // db será un archivo de configuración de base de datos importado desde la carpeta config.
    /*
  db;
  if (err) {
    console.error('Connection error: ', err.message);
    return;
  }
 */
  console.log(
    `Runing server on port ${PORT}, in ${config.environment.env} environment`
  );
});

/* Routes */
app.use(indexRouter);

export default app;
