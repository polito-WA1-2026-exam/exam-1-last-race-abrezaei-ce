import db from "./connection.js";
import crypto from "crypto";

const users = [
    { id: 1, username: 'AbRezaei', hashed_password: 'password' },
    { id: 2, username: 'Player 01', hashed_password: 'simple_password' },
    { id: 3, username: 'Player 02', hashed_password: 'strong_password' },
]

users.forEach((user) => {
    user.salt = crypto.randomBytes(16).toString('hex');
    user.hashed_password = crypto.scryptSync(user.hashed_password, user.salt, 32).toString('hex');
});

const lines = [
    { id: 1, name: 'Red Line' },
    { id: 2, name: 'Green Line' },
    { id: 3, name: 'Blue Line' },
    { id: 4, name: 'Black Line' },
];

const stations = [
    { id: 1, name: 'Paradiso' },
    { id: 2, name: 'Marche' },
    { id: 3, name: 'Massaua' },
    { id: 4, name: 'Pozzo Strada' },
    { id: 5, name: 'Monte Grappa' },
    { id: 6, name: 'Rivoli' },
    { id: 7, name: 'Racconigi' },
    { id: 8, name: 'Bernini' },
    { id: 9, name: 'XVIII Dicembre' },
    { id: 10, name: 'Porta Susa' },
    { id: 11, name: 'Vinzaglio' },
    { id: 12, name: 'Re Umberto' },
    { id: 13, name: 'Porta Nuova' },
    { id: 14, name: 'Marconi' },
    { id: 15, name: 'Nizza' },
    { id: 16, name: 'Dante' },
];

const segments = [
    { id: 1, origin: 1, destination: 2, line_id: 1 },
    { id: 2, origin: 2, destination: 3, line_id: 1 },
    { id: 3, origin: 3, destination: 8, line_id: 1 },
    { id: 4, origin: 8, destination: 10, line_id: 1 },
    { id: 5, origin: 10, destination: 13, line_id: 1 },
    { id: 6, origin: 13, destination: 16, line_id: 1 },
    { id: 7, origin: 4, destination: 5, line_id: 2 },
    { id: 8, origin: 5, destination: 8, line_id: 2 },
    { id: 9, origin: 8, destination: 9, line_id: 2 },
    { id: 10, origin: 6, destination: 7, line_id: 3 },
    { id: 11, origin: 7, destination: 10, line_id: 3 },
    { id: 12, origin: 10, destination: 11, line_id: 3 },
    { id: 13, origin: 12, destination: 13, line_id: 4 },
    { id: 14, origin: 13, destination: 14, line_id: 4 },
    { id: 15, origin: 14, destination: 15, line_id: 4 }
];

const events = [
    { id: 1, description: 'Caught without a valid ticket by the inspector', effect: -4 },
    { id: 2, description: 'Boarded the wrong train direction', effect: -3 },
    { id: 3, description: 'Train delayed due to technical issues', effect: -2 },
    { id: 4, description: 'Dropped a coin on the tracks', effect: -1 },
    { id: 5, description: 'Found a loose coin on the platform', effect: +1 },
    { id: 6, description: 'Arrived exactly as the doors opened', effect: +2 },
    { id: 7, description: 'Helped a tourist and received a reward', effect: +3 },
    { id: 8, description: 'Won the daily metro passenger lottery', effect: +4 },
];

const games = [
    { id: 1, user_id: 1, origin: 1, destination: 16, score: 25 },
    { id: 2, user_id: 2, origin: 6, destination: 15, score: 18 }
];

db.serialize(() => {
    users.forEach((user) => {
        db.run(
            "INSERT INTO users (id, username, hashed_password, salt) VALUES (?, ?, ?, ?)",
            [user.id, user.username, user.hashed_password, user.salt]
        );
    });

    lines.forEach((line) => {
        db.run("INSERT INTO lines (id, name) VALUES (?, ?)", [line.id, line.name]);
    });

    stations.forEach((station) => {
        db.run("INSERT INTO stations (id, name) VALUES (?, ?)", [station.id, station.name]);
    });

    segments.forEach((segment) => {
        db.run(
            "INSERT INTO segments (id, origin, destination, line_id) VALUES (?, ?, ?, ?)",
            [segment.id, segment.origin, segment.destination, segment.line_id]
        );
    });

    events.forEach((event) => {
        db.run(
            "INSERT INTO events (id, description, effect) VALUES (?, ?, ?)",
            [event.id, event.description, event.effect]
        );
    });

    games.forEach((game) => {
        db.run(
            "INSERT INTO games (id, user_id, origin, destination, score) VALUES (?, ?, ?, ?, ?)",
            [game.id, game.user_id, game.origin, game.destination, game.score]
        );
    });
});

db.close();