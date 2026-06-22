import httpClient from "@/lib/http-client";

const linesApi = {
    list: () => httpClient.get('/lines')
};

export default linesApi;