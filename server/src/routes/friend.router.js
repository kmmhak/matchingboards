import passport from 'passport';
import { Router } from 'express';
import * as controller from '../controllers/friend.controller.js';
import {
  jwtStrategy,
  passportJwt,
} from '../middleware/passport-jwt.middleware.js';

const friendRouter = Router({ mergeParams: true });
passport.use(jwtStrategy);

friendRouter.get('/', controller.getAllFriends);
friendRouter.post('/add', controller.addFriend);

export default friendRouter;
