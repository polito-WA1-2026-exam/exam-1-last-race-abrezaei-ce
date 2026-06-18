import { getActiveGameByUserId, updateGame } from "../repositories/gameRepository.js";
import { listLines } from "../repositories/lineRepository.js";
import { listSegments } from "../repositories/segmentRepository.js";
import { listStations } from "../repositories/stationRepository.js"
import { responseSuccess, responseError } from "../utils/response.js";

const mapController = {
    map: async (req, res) => {
        if (req.user) {
            const activeGame = await getActiveGameByUserId(req.user.id);

            if (activeGame) {
                const elapsedTime = (Date.now() - activeGame.started_at) / 1000;

                if (elapsedTime > 90) {
                    const history = JSON.stringify([{ step: 1, description: "Abandoned game", effect: -20 }]);

                    await updateGame(activeGame.id, 0, history);
                } else {
                    return responseError(res, null, "You have a game already in progress", 403);
                }
            }
        }

        return responseSuccess(
            res,
            {
                lines: await listLines(),
                stations: await listStations(),
                segments: await listSegments(),
            }
        );
    }
}

export default mapController;