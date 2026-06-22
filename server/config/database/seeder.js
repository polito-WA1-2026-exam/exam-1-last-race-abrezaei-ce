import db from "./connection.js";
import crypto from "crypto";
import { executeRoute } from "../../services/gameService.js";

const users = [
    { id: 1, username: 'abrezaei', hashed_password: 'password' },
    { id: 2, username: 'player-1', hashed_password: 'simple_password' },
    { id: 3, username: 'player-2', hashed_password: 'strong_password' },
];

users.forEach((user) => {
    user.salt = crypto.randomBytes(16).toString('hex');
    user.hashed_password = crypto.scryptSync(user.hashed_password, user.salt, 64).toString('hex');
});

const lines = [
    { id: 1, name: 'Red Line' },
    { id: 2, name: 'Green Line' },
    { id: 3, name: 'Blue Line' },
    { id: 4, name: 'Black Line' },
];

const stations = [
    { id: 1, name: 'Paradiso', x: 100, y: 500 },
    { id: 2, name: 'Marche', x: 200, y: 400 },
    { id: 3, name: 'Massaua', x: 300, y: 500 },
    { id: 4, name: 'Pozzo Strada', x: 100, y: 400 },
    { id: 5, name: 'Monte Grappa', x: 200, y: 300 },
    { id: 6, name: 'Rivoli', x: 400, y: 50 },
    { id: 7, name: 'Racconigi', x: 200, y: 100 },
    { id: 8, name: 'Bernini', x: 400, y: 300 },
    { id: 9, name: 'XVIII Dicembre', x: 450, y: 450 },
    { id: 10, name: 'Porta Susa', x: 600, y: 300 },
    { id: 11, name: 'Vinzaglio', x: 700, y: 500 },
    { id: 12, name: 'Re Umberto', x: 400, y: 150 },
    { id: 13, name: 'Porta Nuova', x: 600, y: 200 },
    { id: 14, name: 'Marconi', x: 700, y: 300 },
    { id: 15, name: 'Nizza', x: 800, y: 300 },
    { id: 16, name: 'Dante', x: 700, y: 100 },
];

const events = [
    { id: 1, description: 'No valid ticket', effect: -4 },
    { id: 2, description: 'Wrong platform', effect: -3 },
    { id: 3, description: 'Train delayed', effect: -2 },
    { id: 4, description: 'Dropped a coin', effect: -1 },
    { id: 5, description: 'Found a coin', effect: 1 },
    { id: 6, description: 'Perfect timing', effect: 2 },
    { id: 7, description: 'Kind passenger', effect: 3 },
    { id: 8, description: 'Won metro lottery', effect: 4 },
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

const games = [
    {
        id: 1,
        user_id: 1,
        origin: 1,
        destination: 16,
        ...executeRoute(
            [
                { id: 1, user_origin: 1, user_destination: 2, event_id: 5 },
                { id: 2, user_origin: 2, user_destination: 3, event_id: 6 },
                { id: 3, user_origin: 3, user_destination: 8, event_id: 8 },
                { id: 4, user_origin: 8, user_destination: 10, event_id: 4 },
                { id: 5, user_origin: 10, user_destination: 13, event_id: 7 },
                { id: 6, user_origin: 13, user_destination: 16, event_id: 3 }
            ],
            events,
            true
        ),
        started_at: 1781733600,
    },
    {
        id: 2,
        user_id: 2,
        origin: 6,
        destination: 15,
        ...executeRoute(
            [
                { id: 10, user_origin: 6, user_destination: 7, event_id: 8 },
                { id: 11, user_origin: 7, user_destination: 10, event_id: 3 },
                { id: 5, user_origin: 10, user_destination: 13, event_id: 5 },
                { id: 14, user_origin: 13, user_destination: 14, event_id: 6 },
                { id: 15, user_origin: 14, user_destination: 15, event_id: 2 }
            ],
            events,
            true),
        started_at: 1781733600,
    }
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
        db.run(
            "INSERT INTO stations (id, name, x, y) VALUES (?, ?, ?, ?)",
            [station.id, station.name, station.x, station.y]
        );
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
            "INSERT INTO games (id, user_id, origin, destination, score, started_at, history) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [game.id, game.user_id, game.origin, game.destination, game.score, game.started_at, JSON.stringify(game.history)]
        );
    });
});

db.close();
