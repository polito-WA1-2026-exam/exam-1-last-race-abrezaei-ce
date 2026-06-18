import db from "./connection.js";

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    salt TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS stations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    x INTEGER NOT NULL,
    y INTEGER NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS segments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    origin INTEGER NOT NULL,
    destination INTEGER NOT NULL,
    line_id INTEGER NOT NULL,
    FOREIGN KEY (origin) REFERENCES stations(id),
    FOREIGN KEY (destination) REFERENCES stations(id),
    FOREIGN KEY (line_id) REFERENCES lines(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    effect INTEGER NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    origin INTEGER NOT NULL,
    destination INTEGER NOT NULL,
    score INTEGER NOT NULL,
    started_at INTEGER NOT NULL,
    history TEXT DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (origin) REFERENCES stations(id),
    FOREIGN KEY (destination) REFERENCES stations(id)
  )`);
});

db.close();