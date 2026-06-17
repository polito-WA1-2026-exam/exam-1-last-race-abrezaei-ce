import session from "express-session";
import "dotenv/config";

const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});

export default sessionConfig;