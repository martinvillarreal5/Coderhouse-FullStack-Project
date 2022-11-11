import UserRepository from "../data-access/repositories/user-repository.js";
import bcrypt from "bcrypt";
import logger from "../lib/logger.js";
import CartRepository from "../data-access/repositories/cart-repository.js";
import { sendNewRegisterNotification } from "../lib/mailer.js";

const getUserById = async (id) => {
  return UserRepository.getById(id);
};

const getByEmail = async (email) => {
  return UserRepository.getOne({ email: email });
};

const getUsers = async () => {
  const users = await UserRepository.getAll();
  return users;
};

const registerUser = async (userData) => {
  const { password, email, firstName, lastName, phone, avatarUrl } = userData;
  const newUser = {
    passwordHash: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    email: email,
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    avatarUrl: avatarUrl,
    isAdmin: false,
  };
  const createdUser = await UserRepository.create(newUser);
  if (createdUser) {
    await CartRepository.create({
      email: email,
      products: [],
    });
  }
  logger.info(
    `New Admin created: ${createdUser.firstName + createdUser.lastName}, id: ${
      createdUser._id
    }`
  );

  sendNewRegisterNotification(createdUser);
  return createdUser;
};

const updateUser = async (id, data) => {
  return await UserRepository.updateById(id, data);
  // ! Check if this return sensible info
  // ? Could use a dto here?
};

const deleteUser = async (id) => {
  await UserRepository.deleteById(id);
};

export {
  getUsers,
  getUserById,
  getByEmail,
  updateUser,
  deleteUser,
  registerUser,
};
