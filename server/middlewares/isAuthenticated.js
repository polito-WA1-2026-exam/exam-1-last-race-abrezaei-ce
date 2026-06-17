import { responseError } from "../utils/response";

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();

    return responseError(res, null, 'Not Authenticated!', 401);
}