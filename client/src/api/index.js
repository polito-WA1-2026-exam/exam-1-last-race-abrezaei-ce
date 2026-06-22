import authApi from "./auth";
import gamesApi from "./games";
import leaderboardApi from "./leaderboard";
import mapApi from "./map";
import segmentsApi from "./segments";
import stationsApi from "./stations";


const api = {
    auth: authApi,
    games: gamesApi,
    map: mapApi,
    segments: segmentsApi,
    stations: stationsApi,
    leaderboard: leaderboardApi,
}

export default api;