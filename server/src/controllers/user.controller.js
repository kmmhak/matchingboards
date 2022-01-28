import * as UserService from '../services/user.service.js';

export const getUser = async (req, res) => {
  const id = Number(req.params.id);
  const result = await UserService.getUser(id);
  return res.status(200).json(result);
};

export const addUser = async (req, res) => {
  const user = req.body;
  await UserService.addUser(user);
  return res.status(200).json(user);
};
