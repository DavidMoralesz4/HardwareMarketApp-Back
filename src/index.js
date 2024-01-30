import 'dotenv/config';
import config from './config/config.js';
import express, { json, urlencoded } from 'express';
import __dirname from './utils.js';
import cors from 'cors';
import getLogger from './utils/log.utils.js';

import passport from 'passport';
import initializePassport from './config/passport.config.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';

import indexRouter from './router/index.routes.js';
import db from './config/dbConnection.js';

/* Dev */
import morgan from 'morgan';

/* CONFIGURATIONS */
const app = express();
const PORT = config.server.port;
const MONGO_DB = config.db.cs;

const log = getLogger();

/* Express */
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5500'],
  })
);
  
  // Session with MongoStore
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: MONGO_DB,
        ttl: 60 * 30, // (60seg * 30) = 30 minutos ==> tiempo de vida de la sesión
      }),
      secret: config.session.secret,
      resave: false,
      saveUninitialized: false,
    })
    );
    
    // Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

/* Morgan */
app.use(morgan('dev'));

/* Server HTTP */
const server = app.listen(PORT, (err) => {
  db;
  if (err) {
    log.error('Connection error: ', err.message);
    return;
  }
  log.connection(
    `Runing server on port ${PORT}, in ${config.environment.env} environment`
    );
  });
  
  /* Routes */
app.use(indexRouter);

export default app;
