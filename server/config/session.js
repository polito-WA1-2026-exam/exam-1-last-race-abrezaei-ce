import session from "express-session";
import "dotenv/config";

const authSession = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});

export default authSession;