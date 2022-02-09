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

export const getByEmail = async (user) => {
  const userToAdd = await User.findOne({
    where: { email: user.email },
  });
  return userToAdd;
};

export const add = async (user) => {
  try {
    const email = await getByEmail(user);
    if (email) return 'Email already exists.';
    const newUser = await User.create({ ...user });
    return newUser;
  } catch (error) {
    throw Error(`Error adding user: ${error.message}`);
  }
};

export const deleteById = async (user) => {
  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    return 'User deleted';
  } catch (error) {
    throw Error(`Error deleting user by id ${user.id}: ${error.message}`);
  }
};
