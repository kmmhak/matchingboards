import { body, param } from 'express-validator';
import { handleResponse } from '../lib/utils.js';
import * as Friend from '../services/friend.service.js';

export const friendsOfAUser = async (req, res) => {
  const id = Number(req.params.id);
  const { user } = req;
  await handleResponse(req, res, Friend.allFriends, [id, user]);
};

export const addFriend = async (req, res) => {
  const { id } = req.user;
  const { receiverId } = req.body;
  await handleResponse(req, res, Friend.add, [id, receiverId]);
};

export const validate = (method) => {
  const validId = () => param('id', 'id must be an integer').isInt();

  switch (method) {
    case 'friendsOfAUser':
      return [validId()];
    default:
      return [];
  }
};
