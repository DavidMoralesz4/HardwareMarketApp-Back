import UserModel from '../models/schemas/user.model.js';
import { createHash } from './validations.utils.js';

export const createUser = async ({
  first_name,
  last_name,
  alias,
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
      alias,
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
    console.error('createUser-Error creating user:', error);
    throw error;
  }
};
