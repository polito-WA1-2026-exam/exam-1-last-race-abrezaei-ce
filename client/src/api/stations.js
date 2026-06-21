import httpClient from "@/lib/http-client";

const stationsApi = {
    list: () => httpClient.get('/stations')
};

export default stationsApi;