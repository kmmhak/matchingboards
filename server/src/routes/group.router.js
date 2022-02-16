import passport from 'passport';
import { Router } from 'express';
import * as controller from '../controllers/group.controller.js';
import {
  jwtStrategy,
  passportJwt,
} from '../middleware/passport-jwt.middleware.js';

const groupRouter = Router({ mergeParams: true });
passport.use(jwtStrategy);

groupRouter.post('/', passportJwt(), controller.createGroup);

export default groupRouter;
