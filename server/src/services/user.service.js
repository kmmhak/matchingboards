import { genJwt, genSaltHash, validPassword } from '../lib/utils.js';
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

export const register = async (userName, email, password, zipCode) => {
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) throw Error('User already exists');

    const { salt, hash } = genSaltHash(password);

    const newUser = {
      email,
      userName,
      zipCode,
      salt,
      hash,
    };

    await add(newUser);
    return newUser;
  } catch (error) {
    throw Error(`Error registering user: ${error.message}`);
  }
};

export const login = async (email, password) => {
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) throw Error('No user found with given email');

    const { hash, salt } = user;

    if (validPassword(password, hash, salt)) {
      const { token } = genJwt(user);
      return { user, token };
    }

    throw Error('Wrong password');
  } catch (error) {
    throw Error(`Error logging in: ${error.message}`);
  }
};

export const changePassword = async (
  userId,
  oldPassword,
  newPassword,
  confirmNewPassword,
) => {
  try {
    const user = await getById(userId);

    if (!user) throw Error('No user found');

    if (
      validPassword(oldPassword, user.hash, user.salt) &&
      newPassword === confirmNewPassword
    ) {
      const { hash, salt } = genSaltHash(newPassword);
      user.set({ hash, salt });
      user.save();
      return 'Password successfully updated';
    }

    throw Error('Invalid password');
  } catch (error) {
    throw Error(`Error changing password: ${error.message}`);
  }
};
