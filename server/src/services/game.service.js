import fetch from 'node-fetch';
import { API_EXPANSION, API_ID, API_SEARCH } from '../../constants.js';
import {
  filterOutExpansions,
  jsonToGame,
  sortGamesSearch,
  xmlToJson,
} from '../lib/utils.js';
import Game from '../models/game.model.js';
import UserGame from '../models/user.game.model.js';

export const getAll = async () => {
  try {
    const result = await Game.findAll();
    return result;
  } catch (error) {
    throw Error(`Error getting all games: ${error.message}`);
  }
};

export const addGame = async (game) => {
  try {
    const result = await Game.create(game);
    return result;
  } catch (error) {
    throw Error(`Error adding game: ${error.message}`);
  }
};

export const getById = async (id) => {
  try {
    const game = await Game.findByPk(id);

    if (game) return game;

    const bggResult = await fetch(`${API_ID}${id}`);
    const jsonResult = await xmlToJson(await bggResult.text());
    const result = jsonResult.items.item[0];

    if (!result) return null;

    await addGame(jsonToGame(result));

    return result;
  } catch (error) {
    throw Error(`Error getting game by id: ${error.message}`);
  }
};

export const search = async (query, limit = 15) => {
  try {
    const fetchedGames = await fetch(`${API_SEARCH}${query}`);
    const jsonGames = await xmlToJson(await fetchedGames.text());
    const games = jsonGames.items.item;

    if (!games) return null;

    const fetchedExpansions = await fetch(`${API_EXPANSION}${query}`);
    const jsonExpansions = await xmlToJson(await fetchedExpansions.text());
    const expansions = jsonExpansions.items.item;

    const filtered = filterOutExpansions(games, expansions);

    return sortGamesSearch(filtered, query).slice(0, limit);
  } catch (error) {
    throw Error(`Error searching game: ${error.message}`);
  }
};

export const addGameToUser = async (userGame) => {
  try {
    const result = await UserGame.create(userGame);
    return result;
  } catch (error) {
    throw Error(`Error adding game to user: ${error.message}`);
  }
};

export const deleteGameFromUser = async (userId, gameId) => {
  try {
    const result = await UserGame.destroy({
      where: { user_id: userId, game_id: gameId },
    });
    return result;
  } catch (error) {
    throw Error(`Error deleting a game from user: ${error.message}`);
  }
};
