import { param, body } from 'express-validator';
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

export const checkFriend = async (req, res) => {
  const { id } = req.user;
  const { friendId, userId } = req.body;
  await handleResponse(req, res, Friend.checkFriendStatus, [
    friendId,
    userId,
    id,
  ]);
};

export const verifyFriend = async (req, res) => {
  const { id } = req.user;
  const { senderId, status } = req.body;
  await handleResponse(req, res, Friend.verify, [senderId, id, status]);
};

export const validate = (method) => {
  const validId = () => param('id', 'id must be an integer').isInt();

  const validFriendId = () =>
    body('friendId', 'friendId must be an integer').isInt();

  const validUserId = () => body('userId', 'userId must be an integer').isInt();

  switch (method) {
    case 'friendsOfAUser':
      return [validId()];
    case 'checkFriend':
      return [validFriendId(), validUserId()];
    default:
      return [];
  }
};

export const removeFriend = async (req, res) => {
  const { id } = req.user;
  const { receiverId } = req.params;
  await handleResponse(req, res, Friend.remove, [id, receiverId]);
};
