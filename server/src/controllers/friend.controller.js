// eslint-disable-next-line no-unused-vars
import { body, param } from 'express-validator';
import { handleResponse } from '../lib/utils.js';
import * as Friend from '../services/friend.service.js';

// eslint-disable-next-line import/prefer-default-export
export const getAllFriends = async (req, res) => {
  await handleResponse(req, res, Friend.getAll, []);
};
