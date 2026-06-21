import authApi from "./auth";
import gameApi from "./game";
import leaderboardApi from "./leaderboard";
import mapApi from "./map";
import segmentsApi from "./segments";
import stationsApi from "./stations";


const api = {
    auth: authApi,
    game: gameApi,
    map: mapApi,
    segments: segmentsApi,
    stations: stationsApi,
    leaderboard: leaderboardApi,
}

export default api;