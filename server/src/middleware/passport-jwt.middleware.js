import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { secret } from '../lib/utils.js';
import User from '../models/user.model.js';

const extractJwt = ExtractJwt;

export const authJwt = async (jwtPayload, done) => {
  const user = await User.findByPk(jwtPayload.sub);
  if (!user) {
    return done(null, false);
  }
  return done(null, user);
};

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
  },
  (jwtPayload, done) => {
    authJwt(jwtPayload, done);
  },
);

export const passportJwt = (res) => {
  passport.authenticate('jwt', { session: false, failureMessage: 'User not found.' }, () => {
    res.status(200);
  });
};
