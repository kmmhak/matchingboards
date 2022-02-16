import fetch from 'node-fetch';
import { API_EXPANSION, API_ID, API_SEARCH } from '../../constants.js';
import {
  filterOutExpansions,
  jsonToGame,
  result,
  sortGames,
  xmlToJson,
} from '../lib/utils.js';
import Game from '../models/game.model.js';
import UserGame from '../models/user.game.model.js';

export const getAll = async () => {
  try {
    const games = await Game.findAll();
    return result(games, 200);
  } catch (error) {
    throw Error(`Error getting all games: ${error.message}`);
  }
};

export const addGame = async (game) => {
  try {
    const addedGame = await Game.create(game);
    return result(addedGame, 200);
  } catch (error) {
    throw Error(`Error adding game: ${error.message}`);
  }
};

export const getById = async (id) => {
  try {
    const game = await Game.findByPk(id);

    if (game) return result(game, 200);

    const bggResult = await fetch(`${API_ID}${id}`);
    const jsonResult = await xmlToJson(await bggResult.text());
    const finalResult = jsonResult.items.item?.[0];

    if (!finalResult) return result('No game found', 404);

    const jsonGame = jsonToGame(finalResult);

    await addGame(jsonGame);

    return result(jsonGame, 200);
  } catch (error) {
    throw Error(`Error getting game by id: ${error.message}`);
  }
};

export const search = async (query, limit = 15) => {
  try {
    const fetchedGames = await fetch(`${API_SEARCH}${query}`);
    const jsonGames = await xmlToJson(await fetchedGames.text());
    const games = jsonGames.items.item;

    if (!games) return result('No games found', 404);

    const fetchedExpansions = await fetch(`${API_EXPANSION}${query}`);
    const jsonExpansions = await xmlToJson(await fetchedExpansions.text());
    const expansions = jsonExpansions.items.item;

    const filtered = filterOutExpansions(games, expansions);
    const sortedGames = sortGames(filtered, query).slice(0, limit);

    return result(sortedGames, 200);
  } catch (error) {
    throw Error(`Error searching game: ${error.message}`);
  }
};

export const addGameToUser = async (userGame) => {
  try {
    const addedGame = await UserGame.create(userGame);
    return result(addedGame, 200);
  } catch (error) {
    throw Error(`Error adding game to user: ${error.message}`);
  }
};

export const deleteGameFromUser = async (userId, gameId) => {
  try {
    const deletedGame = await UserGame.destroy({
      where: { user_id: userId, game_id: gameId },
    });
    return result(deletedGame, 200);
  } catch (error) {
    throw Error(`Error deleting a game from user: ${error.message}`);
  }
};
