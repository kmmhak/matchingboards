import passport from 'passport';
import { Router } from 'express';
import * as controller from '../controllers/friend.controller.js';
import {
  jwtStrategy,
  passportJwt,
} from '../middleware/passport-jwt.middleware.js';

const friendRouter = Router({ mergeParams: true });
passport.use(jwtStrategy);

friendRouter.post('/add', controller.addFriend);
friendRouter.get('/:id', passportJwt(), controller.validate('friendsOfAUser'), controller.friendsOfAUser);
friendRouter.patch('/verify', controller.verifyFriend);

export default friendRouter;
