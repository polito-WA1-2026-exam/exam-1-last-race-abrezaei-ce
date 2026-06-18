import { getGameForUser, startGame, submitRoute } from "../services/gameService.js";
import { responseSuccess, responseError } from "../utils/response.js";

const gamesController = {
    get: async (req, res) => {
        const game = await getGameForUser(req.params.id, req.user.id);

        if (!game) return responseError(res, null, "Not found", 404);

        return responseSuccess(res, game, "Game retrieved");
    },

    start: async (req, res) => {
        return responseSuccess(res, await startGame(req.user.id), "Game started");
    },

    submit: async (req, res) => {
        const result = await submitRoute(req.params.id, req.user.id, req.body.route);

        if (!result) return responseError(res, null, "Invalid request", 400);

        return responseSuccess(res, result.game, result.message);
    },
}

export default gamesController;
