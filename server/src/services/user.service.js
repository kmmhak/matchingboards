import User from '../models/user.model.js';

export const getAll = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw Error(`Error getting all users: ${error.message}`);
  }
};

export const getById = async (id) => {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    throw Error(`Error getting user by id: ${error.message}`);
  }
};

export const add = async (user) => {
  try {
    const newUser = await User.create({ ...user });
    return newUser;
  } catch (error) {
    throw Error(`Error adding user: ${error.message}`);
  }
};
