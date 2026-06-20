import httpClient from "@/lib/http-client";

const authApi = {
    login: (payload) => httpClient.post('/auth/login', payload),
    logout: () => httpClient.post('/auth/logout'),
    user: () => httpClient.get('/auth/user')
};

export default authApi;