import { queryGet, queryRun } from "../utils/query.js";

async function createGame(userId, originId, destinationId, startedAt) {
    const sql = 'INSERT INTO games (user_id, origin, destination, score, started_at, history) VALUES (?, ?, ?, 20, ?, NULL)';

    const result = await queryRun(sql, [userId, originId, destinationId, startedAt]);

    return result.lastID;
}

async function getGameById(id) {
    return await queryGet('SELECT * FROM games WHERE id = ?', [id]);
}

async function updateGame(id, score, history) {
    return await queryRun('UPDATE games SET score = ?, history = ? WHERE id = ?', [score, history, id]);
}

async function finishActiveGamesByUserId(userId, score, history) {
    return await queryRun('UPDATE games SET score = ?, history = ? WHERE user_id = ? AND history IS NULL', [score, history, userId]);
}

export { createGame, finishActiveGamesByUserId, getGameById, updateGame }
