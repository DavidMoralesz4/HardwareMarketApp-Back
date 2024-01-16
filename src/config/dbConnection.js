import mongoose from 'mongoose';
import config from './config.js';

const connection = mongoose
  .connect(config.db.cs, {
    dbName: config.db.dbName,
  })
  .catch((err) => console.log(err.message));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error to connect MongoDB:'));
db.once('open', () => {
  console.log('Connection successfully to mongoDB');
});

export default db;
