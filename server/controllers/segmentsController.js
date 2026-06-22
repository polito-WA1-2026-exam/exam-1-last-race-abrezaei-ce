import { listSegments } from "../repositories/segmentRepository.js";
import { responseSuccess } from "../utils/response.js";

const segmentsController = {
    list: async (req, res) => {
        return responseSuccess(res, await listSegments(), 'Segments retrieved');
    }
}

export default segmentsController;