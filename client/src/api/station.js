import httpClient from "@/lib/http-client";

const stationApi = {
    list: () => httpClient.get('/stations')
};

export default stationApi;