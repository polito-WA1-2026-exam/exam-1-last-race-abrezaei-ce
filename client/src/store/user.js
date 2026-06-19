import api from "@/api";
import { create } from "zustand";

const useUserStore = create((set, get) => ({
    user: null,
    setUser: (payload) => { set({ user: payload }); },
    getUser: () => get().user,
    getAuthenticatedUser: async () => {
        let user = get().user;

        if (user) return user;

        const response = await api.auth.check();

        if (response.success) set({ user: response.data });
        else set({ user: null });

        return get().user;
    }
}));

export default useUserStore;