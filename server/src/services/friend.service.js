// eslint-disable-next-line no-unused-vars
import { isAdmin } from '../lib/utils.js';
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
/*
const add = async (senderId, receiverId) => {
  const friend = {
    senderId,
    receiverId,
  };
  const newFriend = Friend.create({ ...friend });
  return newFriend;
};

export default add;
*/
