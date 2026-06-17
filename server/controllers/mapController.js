import { listLines } from "../repositories/lineRepository.js";
import { listSegments } from "../repositories/segmentRepository.js";
import { listStations } from "../repositories/stationRepository.js"
import { responseSuccess } from "../utils/response.js";

const mapController = {
    map: async (req, res) => {
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