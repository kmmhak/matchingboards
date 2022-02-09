import { body, param } from 'express-validator';
import { handleResponse } from '../lib/utils.js';
import * as User from '../services/user.service.js';

export const getAllUsers = async (req, res) => {
  await handleResponse(req, res, User.getAll, []);
};

export const getUser = async (req, res) => {
  const id = Number(req.params.id);
  await handleResponse(req, res, User.getById, [id]);
};

export const addUser = async (req, res) => {
  const user = req.body;
  await handleResponse(req, res, User.add, [user]);
};

export const deleteUser = async (req, res) => {
  const id = Number(req.params.id);
  await handleResponse(req, res, User.deleteById, [id]);
};

export const register = async (req, res) => {
  const { userName, email, password, zipCode } = req.body;
  await handleResponse(req, res, User.register, [
    userName,
    email,
    password,
    zipCode,
  ]);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  await handleResponse(req, res, User.login, [email, password]);
};

export const validate = (method) => {
  const validId = () => param('id', 'id must be an integer').isInt();

  const validEmail = () =>
    body('email', 'email must be of valid form').isEmail();

  const validUsername = () => body('userName', 'username must be minimum 4 characters long')
    .isLength({ min: 4, max: 20 });

  const validDescription = () =>
    body('description', 'invalid description').isString();

  const validZipCode = () =>
    body('zipCode', 'zipcode must be 5 numbers long').isLength({
      min: 5,
      max: 5,
    });

  // Latitude and longitude in decimal degrees (DD)
  const validLatitude = () =>
    body('latitude', 'latitude must be of valid form').isFloat({
      min: -90,
      max: 90,
    });

  const validLongitude = () =>
    body('longitude', 'longitude must be of valid form').isFloat({
      min: -180,
      max: 180,
    });

  const validDistance = () =>
    body('distance', 'distance must be an integer')
      .isInt();

  switch (method) {
    case 'getUser':
      return [validId()];
    case 'deleteUser':
      return [validId()];
    case 'addUser':
      return [
        validEmail(),
        validUsername(),
        validDescription(),
        validZipCode(),
        validLatitude(),
        validLongitude(),
        validDistance(),
      ];
    default:
      return [];
  }
};
