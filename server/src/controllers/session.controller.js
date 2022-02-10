import { body, param } from 'express-validator';
import { handleResponse } from '../lib/utils.js';
import * as Session from '../services/session.service.js';

export const getAllSessions = async (req, res) => {
  await handleResponse(req, res, Session.getAll, []);
};

export const getSessionById = async (req, res) => {
  const id = Number(req.params.id);
  await handleResponse(req, res, Session.getById, [id]);
};

export const addSession = async (req, res) => {
  const session = req.body;
  await handleResponse(req, res, Session.add, [session]);
};

export const deleteSessionById = async (req, res) => {
  const id = Number(req.params.id);
  await handleResponse(req, res, Session.deleteByID, [id]);
};

export const validate = (method) => {
  const validId = () => param('id', 'id must be an integer').isInt();
  const validDate = () => body('date', 'invalid date').isDate();
  const validGameId = () => body('gameId', 'invalid game id').isInt();
  const validCreatorId = () => body('creatorId', 'invalid creator id').isInt();
  const validDescription = () =>
    body('description', 'invalid description').isString();

  switch (method) {
    case 'getSessionById':
      return [validId()];
    case 'addSession':
      return [validDate(), validGameId(), validCreatorId(), validDescription()];
    case 'deleteSessionById':
      return [validId()];
    default:
      return [];
  }
};
