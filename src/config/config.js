import dotenv from 'dotenv';
let config = {};

const environment = 'development'; // cambiar environment: 'production' / 'development' / 'testing'

dotenv.config({
  path:
    environment === 'development'
      ? '.env.development'
      : environment === 'testing'
      ? '.env.testing'
      : '.env.production',
});

config.environment = {
  env: process.env.NODE_ENV,
};

config.server = {
  port: process.env.PORT,
};

config.url = {
  baseUrl: process.env.BASE_URL,
};

export default config;
