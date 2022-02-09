import * as crypto from 'crypto';
import User from '../models/user.model.js';

const config = {
  hashBytes: 32,
  saltBytes: 16,
  iterations: 872791,
};

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

export const genSaltBytes = () => {
  try {
    const saltBytes = crypto.randomBytes(config.saltBytes, (err, bytes) => {
      if (err) {
        return err;
      }
      return bytes;
    });
    return saltBytes;
  } catch (error) {
    throw Error(`Error trying to generate saltbytes:${error.message}`);
  }
};

export const genHashBytes = (password, salt) => {
  try {
    const hashBytes =
    crypto.pbkdf2(password, salt, config.iterations, config.hashBytes, (err, hash) => {
      if (err) {
        return err;
      }
      return hash;
    });
    return hashBytes;
  } catch (error) {
    throw Error(`Error trying to generate hashbytes:${error.message}`);
  }
};

export const verifyPassword = (password, combined, callback) => {
  const saltBytes = combined.readUInt32BE(0);
  const hashBytes = combined.length - saltBytes - 8;
  const iterations = combined.readUInt32BE(4);
  const salt = combined.slice(8, saltBytes + 8);
  const hash = combined.toString('binary', saltBytes + 8);

  crypto.pbkdf2(password, salt, iterations, hashBytes, (err, verify) => {
    if (err) {
      return callback(err, false);
    }
    return callback(null, verify.toString('binary') === hash);
  });
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
