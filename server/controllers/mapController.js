import { getSetupMap } from "../services/mapService.js";
import { responseSuccess } from "../utils/response.js";

const mapController = {
    map: async (req, res) => {
        return responseSuccess(res, await getSetupMap(req.user?.id));
    }
}

export default mapController;
