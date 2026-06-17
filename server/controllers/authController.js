import { responseSuccess, responseError } from "../utils/response.js";

function login(req, res) {
    return responseSuccess(res, req.user, "Login successful");
}

function logout(req, res) {
    req.logout(function (error) {
        if (error) return responseError(res, null, "Logout failed");

        return responseSuccess(res, null, "Logout successful");
    });
}

function check(req, res) {
    if (req.isAuthenticated())
        return responseSuccess(res, req.user, "Authenticated");
    else
        return responseError(res, null, "Not authenticated", 401);
}

export { login, logout, check }