import { queryGet, queryRun } from "../utils/query.js";

async function createGame(userId, originId, destinationId, startedAt) {
    const sql = 'INSERT INTO games (user_id, origin, destination, score, started_at, history) VALUES (?, ?, ?, 20, ?, NULL)';

    const result = await queryRun(sql, [userId, originId, destinationId, startedAt]);

    return result.lastID;
}

async function getGameById(id) {
    return await queryGet('SELECT * FROM games WHERE id = ?', [id]);
}

async function getActiveGameByUserId(userId) {
    return await queryGet('SELECT * FROM games WHERE user_id = ? AND history IS NULL', [userId]);
}

async function updateGame(id, score, history) {
    return await queryRun('UPDATE games SET score = ?, history = ? WHERE id = ?', [score, history, id]);
}

export { createGame, getActiveGameByUserId, getGameById, updateGame }