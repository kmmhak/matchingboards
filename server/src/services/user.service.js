import {
  genJwt,
  genSaltHash,
  result,
  validPassword,
  isAdmin,
} from '../lib/utils.js';
import User from '../models/user.model.js';

export const getAll = async () => {
  try {
    const users = await User.findAll();
    return result(users, 200);
  } catch (error) {
    throw Error(`Error getting all users: ${error.message}`);
  }
};

export const getById = async (id) => {
  try {
    const user = await User.findByPk(id);
    return result(user, 200);
  } catch (error) {
    throw Error(`Error getting user by id: ${error.message}`);
  }
};

export const getByEmail = async (user) => {
  const userToAdd = await User.findOne({
    where: { email: user.email },
  });
  return result(userToAdd, 200);
};

export const add = async (user) => {
  try {
    const newUser = await User.create({ ...user });
    return result(newUser, 200);
  } catch (error) {
    throw Error(`Error adding user: ${error.message}`);
  }
};

export const deleteById = async (id, user) => {
  try {
    if (id !== user.id) {
      const adminStatus = isAdmin(user.role);
      if (!adminStatus) {
        return result('You are unauthorized', 401);
      }
    }

    await User.destroy({
      where: {
        id,
      },
    });
    return result('User deleted', 200);
  } catch (error) {
    throw Error(`Error deleting user by id ${id}`);
  }
};

export const update = async (user, id) => {
  try {
    await User.update(
      {
        ...user,
      },
      {
        where: {
          id,
        },
      },
    );

    return result('User info updated successfully', 200);
  } catch (error) {
    throw Error(`Error updating information: ${error.message}`);
  }
};

export const register = async (userName, email, password, zipCode) => {
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) return result('Email already in use', 409);

    const { salt, hash } = genSaltHash(password);

    const newUser = {
      email,
      userName,
      zipCode,
      salt,
      hash,
    };

    await add(newUser);
    return result(newUser, 200);
  } catch (error) {
    throw Error(`Error registering user: ${error.message}`);
  }
};

export const login = async (email, password) => {
  const errorMessage = 'Wrong username or password';

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) return result(errorMessage, 404);

    const { hash, salt } = user;

    if (validPassword(password, hash, salt)) {
      const { token } = genJwt(user);
      return result({ user, token }, 200);
    }

    return result(errorMessage, 400);
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
    const user = await User.findByPk(userId);

    if (!user) return result('User not found', 404);

    if (
      validPassword(oldPassword, user.hash, user.salt) &&
      newPassword === confirmNewPassword
    ) {
      const { hash, salt } = genSaltHash(newPassword);
      user.set({ hash, salt });
      user.save();
      return result('Password successfully updated', 200);
    }

    return result('Invalid password', 400);
  } catch (error) {
    throw Error(`Error changing password: ${error.message}`);
  }
};
