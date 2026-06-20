import api from "@/api";
import { create } from "zustand";

const useUserStore = create((set, get) => ({
    user: null,
    setUser: (payload) => { set({ user: payload }); },
    getUser: () => get().user,
    getAuthenticatedUser: async () => {
        let user = get().user;

        if (user) return user;

        const response = await api.auth.user();

        if (response.success) set({ user: response.data });
        else set({ user: null });

        return get().user;
    },
    logout: async () => {
        const response = await api.auth.logout();

        if (response.success) {
            set({ user: null });

            return true;
        }

        return false;
    }
}));

export default useUserStore;