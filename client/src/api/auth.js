import httpClient from "@/lib/http-client";

const authApi = {
    login: (payload) => httpClient.post('/auth/login', payload),
    logout: () => httpClient.post('/auth/logout'),
    check: () => httpClient.get('/auth/check')
};

export default authApi;