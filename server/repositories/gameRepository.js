import { queryAll, queryGet, queryRun } from "../utils/query.js";


async function getGamesByUserId(userId) {
    return await queryAll(`
        SELECT game.id, game.user_id, originStation.name as origin, destinationStation.name as destination, game.score, game.started_at FROM games game
        JOIN stations originStation ON game.origin = originStation.id
        JOIN stations destinationStation ON game.destination = destinationStation.id
        WHERE game.user_id = ?
        `, [userId]);
}

async function getGameByIdAndUserId(id, userId) {
    return await queryGet('SELECT * FROM games WHERE id = ? AND user_id = ?', [id, userId]);
}

async function createGame(userId, originId, destinationId, startedAt) {
    const sql = 'INSERT INTO games (user_id, origin, destination, score, started_at, history) VALUES (?, ?, ?, 20, ?, NULL)';

    const result = await queryRun(sql, [userId, originId, destinationId, startedAt]);

    return result.lastID;
}

async function updateGame(id, score, history) {
    return await queryRun('UPDATE games SET score = ?, history = ? WHERE id = ?', [score, history, id]);
}

async function finishActiveGamesByUserId(userId, score, history) {
    return await queryRun('UPDATE games SET score = ?, history = ? WHERE user_id = ? AND history IS NULL', [score, history, userId]);
}

export { getGamesByUserId, getGameByIdAndUserId, createGame, finishActiveGamesByUserId, updateGame }
