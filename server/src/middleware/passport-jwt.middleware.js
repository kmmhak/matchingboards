import { config } from 'dotenv';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.model.js';

config();

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
    secretOrKey: process.env.SECRET,
  },
  (jwtPayload, done) => {
    authJwt(jwtPayload, done);
  },
);

export const passportJwt = () =>
  passport.authenticate('jwt', {
    session: false,
  });
