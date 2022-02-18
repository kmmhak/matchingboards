import { Op } from 'sequelize';
import { result } from '../lib/utils.js';
import Friend from '../models/friend.model.js';
import User from '../models/user.model.js';

export const allFriends = async (id, user) => {
  try {
    if (id !== user.id) {
      return result('Unauthorized', 401);
    }
    const friends = await Friend.findAll({
      where: {
        [Op.or]: [
          { senderId: id },
          { receiverId: id },
        ],
      },
    });

    return result(friends, 200);
  } catch (error) {
    throw Error('Error getting your friends');
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

export const verify = async (senderId, receiverId, status) => {
  try {
    const friend = await Friend.findOne({ where: { senderId, receiverId } });
    friend.set({ status });
    friend.save();
    return result(friend, 200);
  } catch (error) {
    throw Error('Error trying to verify user');
  }
};

export const checkFriendStatus = async (friendId, userId, id) => {
  try {
    if (userId !== id) {
      return result('Unauthorized', 401);
    }

    if (userId === friendId) {
      return result('You cannot send a friend request to yourself', 401);
    }

    const foundUser = await User.findByPk(friendId);

    if (foundUser === null) {
      return result('Not found', 404);
    }

    const friendStatus = await Friend.findOne({
      where: {
        senderId: {
          [Op.or]: [friendId, userId],
        },
        receiverId: {
          [Op.or]: [friendId, userId],
        },
      },
    });
    return result(friendStatus.status, 200);
  } catch (error) {
    throw Error('Error trying to check friend request status');
  }
};
