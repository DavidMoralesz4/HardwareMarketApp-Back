import UserModel from '../models/schemas/user.model.js';
import { createHash } from './validations.utils.js';
import getLogger from '../utils/log.utils.js';

const log = getLogger();

export const createUser = async ({
  first_name,
  last_name,
  email,
  age,
  address,
  location,
  province,
  country,
  password,
}) => {
  try {
    const newUser = {
      first_name,
      last_name,
      email,
      age,
      address,
      location,
      province,
      country,
      password: createHash(password),
    };

    const result = await UserModel.create(newUser);
    return result;
  } catch (error) {
    log.error('createUser-Error creating user:' + error);
    throw error;
  }
};

// DTO para el usuario que contiene solo la información necesaria
export const userDTO = (user) => ({
  first_name: user.first_name,
  last_name: user.last_name,
  email: user.email,
  age: user.age,
  thumbnail: user.thumbnail,
  role: user.role,
  adress: user.adress,
  location: user.location,
  province: user.province,
  country: user.country,
  phone: user.phone,
  documents: user.documents,
});
