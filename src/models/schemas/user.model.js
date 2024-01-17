import mongoose from 'mongoose';

const userCollection = 'User';

const documentsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  reference: {
    type: String,
  },
});

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  adress: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String, 
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'premium', 'admin'],
    default: 'user',
  },
  documents: [documentsSchema],
  last_connection: {
    type: Date,
    required: true,
    default: new Date(),
  },
  enabled: {
    type: Boolean,
    default: true,
  },
});

const users = mongoose.model(userCollection, userSchema);

export default users;

/* 
first_name,
last_name,
username,
email,
age,
adress,
location,
province,
country,
phone,
password,
role,
permissions,
cart,
orders,
documentation,
enbled
*/
