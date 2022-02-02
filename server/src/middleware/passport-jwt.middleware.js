import {secret} from '../lib/utils.js';
import {Strategy as JwtStrategy} from 'passport-jwt';
import {ExtractJwt} from 'passport-jwt';
import User from '../models/user.model.js';
const extractJwt = ExtractJwt;

export const jwtStrategy = new JwtStrategy({
    jwtFromRequest:extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:secret},(jwtPayload,done) => {
    authJwt(jwtPayload,done);
});

export const authJwt = async(jwtPayload,done) => {
    const user = await User.findByPk(jwtPayload.sub);
    if (!user) {
        return done(null,false);
    }
    return done(null,user);
};
