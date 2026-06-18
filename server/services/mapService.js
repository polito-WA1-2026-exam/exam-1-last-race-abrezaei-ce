import { listLines } from "../repositories/lineRepository.js";
import { listSegments } from "../repositories/segmentRepository.js";
import { listStations } from "../repositories/stationRepository.js";
import { abandonActiveGames } from "./gameService.js";

async function getSetupMap(userId) {
    if (userId) await abandonActiveGames(userId);

    return {
        lines: await listLines(),
        stations: await listStations(),
        segments: await listSegments(),
    };
}

export { getSetupMap };
