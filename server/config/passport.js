import passport from "passport";
import LocalStrategy from "passport-local";
import crypto from "crypto";
import db from "./database/connection.js";
import { getUserByUsernameAndPassword } from "../repositories/userRepository.js";

passport.use(
  new LocalStrategy(function verify(username, password, callback) {
    const user = await getUserByUsernameAndPassword(username, passport);

    if (!user) return callback(null, false);

    return callback(null, user);
  })
);

passport.serializeUser((user, callback) => {
  callback(null, { id: user.id, username: user.username });
});

passport.deserializeUser((user, callback) => {
  return callback(null, user);
});

export default passport;