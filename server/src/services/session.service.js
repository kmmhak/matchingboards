import { getDistanceBetweenUsers } from '../lib/utils.js';
import Session from '../models/session.model.js';
import User from '../models/user.model.js';

export const getAll = async () => {
  try {
    const sessions = await Session.findAll();
    return sessions;
  } catch (error) {
    throw Error(`Error getting all sessions: ${error.message}`);
  }
};

export const getById = async (id) => {
  try {
    const session = await Session.findByPk(id);
    return session;
  } catch (error) {
    throw Error(`Error getting a session: ${error.message}`);
  }
};

export const add = async (session) => {
  try {
    const newSession = await Session.create({ ...session });
    return newSession;
  } catch (error) {
    throw Error(`Error adding a session: ${error.message}`);
  }
};

export const deleteByID = async (id) => {
  try {
    await Session.destroy({
      where: {
        id,
      },
    });
    return 'Session deleted';
  } catch (error) {
    throw Error(`Error deleting a session: ${error.message}`);
  }
};

// TODO: add user specified distance which they are willing to travel for a session.
// Not yet implemented otherwise.
export const getNearbySessionsByGameId = async (gameId, user) => {
  try {
    const sessions = await Session.findAll({
      where: {
        gameId,
      },
    });

    const creatorPromises = sessions.map((session) =>
      User.findByPk(session.creatorId),
    );
    const creators = await Promise.all(creatorPromises);

    const nearbySessions = sessions.filter((session) => {
      const sessionCreator = creators.find(
        (creator) => creator.id === session.creatorId,
      );
      return getDistanceBetweenUsers(user, sessionCreator) < 50;
    });

    return nearbySessions;
  } catch (error) {
    throw Error(`Error getting sessions by distance: ${error.message}`);
  }
};
