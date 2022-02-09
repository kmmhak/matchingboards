import xml2js from 'xml2js';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { validationResult } from 'express-validator';

export const handleResponse = async (req, res, serviceFunction, params) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  try {
    const result = await serviceFunction(...params);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const dirName = (fileUrl) => dirname(fileURLToPath(fileUrl));

export const xmlToJson = async (xml) => {
  const parser = new xml2js.Parser();
  try {
    const json = await parser.parseStringPromise(xml);
    return json;
  } catch (error) {
    throw Error('Error parsing xml');
  }
};

export const jsonToGame = (result) => {
  const { id } = result.$;
  const name = result.name[0].$.value;
  const releaseYear = result.yearpublished[0].$.value;
  const description = result.description[0];
  const minPlayers = result.minplayers[0].$.value;
  const maxPlayers = result.maxplayers[0].$.value;
  const imageUrl = result.image[0];

  return {
    id,
    name,
    releaseYear,
    description,
    minPlayers,
    maxPlayers,
    imageUrl,
  };
};

export const jsonToGameLite = (result) => {
  const { id } = result.$;
  const name = result.name[0].$.value;
  const releaseYear = result.yearpublished?.[0].$.value;

  return { id, name, releaseYear };
};

export const getDistanceBetweenUsers = (user1, user2) => {
  const lat1 = user1.latitude;
  const lat2 = user2.latitude;
  const lon1 = user1.longitude;
  const lon2 = user2.longitude;

  const deg2Rad = (deg) => deg * (Math.PI / 180);

  const R = 6371;
  const dLat = deg2Rad(lat2 - lat1);
  const dLon = deg2Rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2Rad(lat1)) *
      Math.cos(deg2Rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

export const sortGames = (games, query) => {
  games.sort((a, b) =>
    a.name.toLowerCase().indexOf(query) > b.name.toLowerCase().indexOf(query)
      ? 1
      : -1,
  );
  const exactMatches = games.filter((e) => e.name.toLowerCase() === query);

  return exactMatches.concat(
    games.filter((game) => game.name.toLowerCase() !== query),
  );
};

export const filterOutExpansions = (gamesResult, expansionsResult) => {
  const games = gamesResult.map((game) => jsonToGameLite(game));
  const expansions = expansionsResult.map((expansion) =>
    jsonToGameLite(expansion),
  );

  return games.filter(
    (game) => !expansions.find((expansion) => expansion.id === game.id),
  );
};

export const secret = randomBytes(20).toString('hex');

export const genJwt = (user) => {
  const newJwt = jwt.sign(
    {
      user: user.username,
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    secret,
  );
  return newJwt;
};
