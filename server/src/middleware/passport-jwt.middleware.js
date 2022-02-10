import { config } from 'dotenv';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.model.js';

config();

const extractJwt = ExtractJwt;

export const authJwt = async (req, jwtPayload, done) => {
  const user = await User.findByPk(jwtPayload.sub);
  if (!user) {
    return done(null, false);
  }
  req.user = user;
  return done(null, user);
};

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
    passReqToCallback: true,
  },
  (req, jwtPayload, done) => {
    authJwt(req, jwtPayload, done);
  },
);

export const passportJwt = () =>
  passport.authenticate('jwt', {
    session: false,
  });
