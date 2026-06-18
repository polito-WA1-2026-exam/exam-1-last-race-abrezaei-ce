import { listLeaderboard } from "../repositories/leaderboardRepository.js";
import { responseSuccess } from "../utils/response.js";

const leaderboardController = {
    list: async (req, res) => {
        return responseSuccess(res, await listLeaderboard());
    }
}

export default leaderboardController;