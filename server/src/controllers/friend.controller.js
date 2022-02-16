import { body, param } from 'express-validator';
import { handleResponse } from '../lib/utils.js';
import * as Friend from '../services/friend.service.js';

export const getAllFriends = async (req, res) => {
  await handleResponse(req, res, Friend.getAll, []);
};
