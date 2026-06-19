import httpClient from "@/lib/http-client";

const segmentApi = {
    list: () => httpClient.get('/segments')
};

export default segmentApi;