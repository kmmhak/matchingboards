import { getDistanceBetweenUsers, result } from '../lib/utils.js';
import Session from '../models/session.model.js';
import User from '../models/user.model.js';

export const getAll = async () => {
  try {
    const sessions = await Session.findAll();
    return result(sessions, 200);
  } catch (error) {
    throw Error(`Error getting all sessions: ${error.message}`);
  }
};

export const getById = async (id) => {
  try {
    const session = await Session.findByPk(id);
    return result(session, 200);
  } catch (error) {
    throw Error(`Error getting a session: ${error.message}`);
  }
};

export const add = async (session) => {
  try {
    const newSession = await Session.create({ ...session });
    return result(newSession, 200);
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
    return result('Session deleted', 200);
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

    return result(nearbySessions, 200);
  } catch (error) {
    throw Error(`Error getting sessions by distance: ${error.message}`);
  }
};
