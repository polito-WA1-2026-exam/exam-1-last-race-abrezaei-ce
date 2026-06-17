import passport from "passport";
import LocalStrategy from "passport-local";
import crypto from "crypto";
import db from "./database/connection.js";;

passport.use(
  new LocalStrategy(function verify(username, password, callback) {
    
  })
);

passport.serializeUser((user, cb) => {
  cb(null, { id: user.id, username: user.username });
});

passport.deserializeUser((user, cb) => {
  return cb(null, user);
});

export default passport;