import { getSetupMap } from "../services/mapService.js";
import { responseSuccess } from "../utils/response.js";

const mapController = {
    map: async (req, res) => {
        return responseSuccess(res, await getSetupMap(req.user?.id), 'Map retrieved');
    }
}

export default mapController;
