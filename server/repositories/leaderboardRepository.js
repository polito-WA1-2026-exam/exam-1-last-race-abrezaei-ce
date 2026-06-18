import { queryAll } from "../utils/query.js";

async function listLeaderboard() {
    return await queryAll(`
        SELECT user.username, MAX(game.score) as best_score
        FROM users user
        JOIN games game ON user.id = game.user_id
        WHERE game.history IS NOT NULL
        GROUP BY user.id
        ORDER BY best_score DESC
        LIMIT 10
        `);
}

export { listLeaderboard }
