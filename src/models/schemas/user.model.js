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
    required: false,
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
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  province: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  phone: {
    type: String, 
    required: false,
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

