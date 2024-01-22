import users from '../../models/schemas/user.model.js';

export const getAll = async () => await users.find();

export const getUserById = async (id) => await users.findOne({ _id: id }).exec();

export const getUserByEmail = async (email) => await users.findOne({ email: email });

export const createUser = async (info) => await users.create(info)

export const updateUserById = async (id, info) => await users.findByIdAndUpdate({ _id: id }, { $set: info }, { new: true });

export const updatePasswordByEmail = async (email, hashedPassword) =>
  await users.updateOne(
    { email: email },
    { $set: { password: hashedPassword } }
  );

export const deleteUser = async (id) => await users.deleteMany({ _id: id }).lean();