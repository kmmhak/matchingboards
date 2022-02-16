import { isAdmin } from '../lib/utils.js';
import Friend from '../models/friend.model.js';

export const getAll = async () => {
  try {
    const friends = await Friend.findAll();
    return friends;
  } catch (error) {
    throw Error('Error getting all users');
  }
};
