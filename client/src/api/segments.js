import httpClient from "@/lib/http-client";

const segmentsApi = {
    list: () => httpClient.get('/segments')
};

export default segmentsApi;