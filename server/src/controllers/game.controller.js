import { handleResponse } from '../lib/utils.js';
import * as Game from '../services/game.service.js';

export const getAllGames = async (req, res) => {
  await handleResponse(res, Game.getAll, []);
};

export const getGameById = async (req, res) => {
  const id = Number(req.params.id);
  await handleResponse(res, Game.getById, [id]);
};

export const searchGames = async (req, res) => {
  const { query, limit } = req.query;
  await handleResponse(res, Game.search, [query, limit]);
};
