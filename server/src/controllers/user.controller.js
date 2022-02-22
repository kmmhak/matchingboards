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

export const searchUser = async (req, res) => {
  const { username } = req.params;
  await handleResponse(req, res, User.search, [username]);
};

export const deleteUser = async (req, res) => {
  const id = Number(req.params.id);
  const { user } = req;
  await handleResponse(req, res, User.deleteById, [id, user]);
};

export const updateUser = async (req, res) => {
  const user = req.body;
  const { id } = req.user;
  await handleResponse(req, res, User.update, [user, id]);
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

export const authenticate = async (req, res) => {
  await handleResponse(req, res, User.authenticate, [req.user]);
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  const { id } = req.user;

  await handleResponse(req, res, User.changePassword, [
    id,
    oldPassword,
    newPassword,
    confirmNewPassword,
  ]);
};

export const validate = (method) => {
  const validId = () => param('id', 'id must be an integer').isInt();

  const validEmail = () =>
    body('email', 'email must be of valid form').isEmail();

  const validUsername = () =>
    body(
      'userName',
      'username must be minimum 4 and maximum 20 characters long',
    ).isLength({
      min: 4,
      max: 20,
    });

  const validDescription = () =>
    body('description', 'invalid description').isString();

  const validZipCode = () =>
    body('zipCode', 'zipcode must be 5 numbers long').isLength({
      min: 5,
      max: 5,
    });

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
    body('distance', 'distance must be an integer').isInt();

  const validPassword = (passwordName) =>
    body(passwordName, 'Password must be a string').isString();

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
    case 'updateUser':
      return [
        validDescription(),
        validZipCode(),
        validLatitude(),
        validLongitude(),
        validDistance(),
      ];

    case 'changePassword':
      return [
        validPassword('oldPassword'),
        validPassword('newPassword'),
        validPassword('confirmNewPassword'),
      ];
    default:
      return [];
  }
};
