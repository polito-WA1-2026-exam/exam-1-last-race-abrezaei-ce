import httpClient from "@/lib/http-client";

const gameApi = {
    get: (id) => httpClient.get(`/games/${id}`),
    start: () => httpClient.post('/games/start'),
    submit: (id, payload) => httpClient.post(`/games/${id}/submit`, payload)
};

export default gameApi;