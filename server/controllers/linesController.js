import { listLines } from "../repositories/lineRepository.js";
import { responseSuccess } from "../utils/response.js";

const linesController = {
    list: async (req, res) => {
        return responseSuccess(res, await listLines(), 'Lines retrieved');
    }
}

export default linesController;