import httpClient from "@/lib/http-client";

const mapApi = {
    get: () => httpClient.get('/map')
};

export default mapApi;