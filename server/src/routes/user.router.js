import passport from 'passport';
import { Router } from 'express';
import * as controller from '../controllers/user.controller.js';
import {
  jwtStrategy,
  passportJwt,
} from '../middleware/passport-jwt.middleware.js';

const userRouter = Router({ mergeParams: true });
passport.use(jwtStrategy);

userRouter.post('/', controller.validate('addUser'), controller.addUser);
userRouter.get('/:id', controller.validate('getUser'), controller.getUser);
userRouter.get('/', controller.getAllUsers);
userRouter.get('/search/:username', controller.validate('searchUser'), controller.searchUser);

userRouter.delete(
  '/:id',
  passportJwt(),
  controller.validate('deleteUser'),
  controller.deleteUser,
);

userRouter.put(
  '/password',
  passportJwt(),
  controller.validate('changePassword'),
  controller.changePassword,
);

userRouter.put(
  '/',
  passportJwt(),
  controller.validate('updateUser'),
  controller.updateUser,
);

export default userRouter;
