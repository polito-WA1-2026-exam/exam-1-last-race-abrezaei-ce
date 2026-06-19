import authApi from "./auth";
import gameApi from "./game";
import leaderboardApi from "./leaderboard";
import mapApi from "./map";
import segmentApi from "./segment";
import stationApi from "./station";


const api = {
    auth: authApi,
    game: gameApi,
    map: mapApi,
    station: stationApi,
    segment: segmentApi,
    leaderboard: leaderboardApi,
}

export default api;