import { handleResponse } from '../lib/utils.js';
import * as User from '../services/user.service.js';

export const getAllUsers = async (req, res) => {
  await handleResponse(res, User.getAll, []);
};

export const getUser = async (req, res) => {
  const id = Number(req.params.id);
  await handleResponse(res, User.getById, [id]);
};

export const addUser = async (req, res) => {
  const user = req.body;
  await handleResponse(res, User.add, [user]);
};

export const deleteUser = async (req, res) => {
  const id = Number(req.params.id);
  await handleResponse(res, User.deleteById, [id]);
};
