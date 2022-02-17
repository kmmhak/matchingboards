// eslint-disable-next-line no-unused-vars
import { isAdmin, result } from '../lib/utils.js';
import Friend from '../models/friend.model.js';

// eslint-disable-next-line import/prefer-default-export
export const getAll = async () => {
  try {
    const friends = await Friend.findAll();
    return friends;
  } catch (error) {
    throw Error('Error getting all users');
  }
};

export const add = async (id, receiverId) => {
  try {
    const friend = {
      id,
      receiverId,
    };
    const newFriend = await Friend.create({ ...friend });
    return result(newFriend, 200);
  } catch (error) {
    throw Error(`Error trying to add user ${error.message}`);
  }
};
