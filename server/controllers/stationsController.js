import { listStations } from "../repositories/stationRepository.js";
import { responseSuccess } from "../utils/response.js";

const stationsController = {
    list: async (req, res) => {
        return responseSuccess(res, await listStations(), 'Stations retrieved');
    }
}

export default stationsController;