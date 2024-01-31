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

config.db = {
  cs: process.env.MONGO_URI,
  dbName: process.env.DB_NAME,
};

config.session = {
  secret: process.env.SESSION_SECRET,
};

config.admin = {
  username: process.env.ADMIN_USER,
  password: process.env.ADMIN_PASS,
};

config.google = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
};

config.mailer = {
  email: process.env.GOOGLE_ACCOUNT,
  pass: process.env.GOOGLE_PASSWORD,
  appPass: process.env.GOOGLE_APP_PASSWORD,
};
// console.log(config);
export default config;
