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
friendRouter.patch('/verify', controller.verifyFriend);
friendRouter.get('/id/:id', passportJwt(), controller.validate('friendsOfAUser'), controller.friendsOfAUser);
friendRouter.get('/checkFriendStatus', passportJwt(), controller.validate('checkFriend'), controller.checkFriend);

export default friendRouter;
