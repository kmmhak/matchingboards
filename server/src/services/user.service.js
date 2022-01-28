import User from '../models/user.model.js';

export const getUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    throw Error(`Error getting user by id: ${error.message}`)
  }
}

export const addUser = async (user) => {
  try {
    const newUser = await User.create({...user});
    return newUser;
  } catch (error) {
    throw Error(`Error adding user: ${error.message}`);
  }
};
