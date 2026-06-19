import httpClient from "@/lib/http-client";

const leaderboardApi = {
    list: () => httpClient.get('/leaderboard')
};

export default leaderboardApi;