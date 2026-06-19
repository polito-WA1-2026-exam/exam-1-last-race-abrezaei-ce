import useUserStore from "@/store/user";
import { redirect } from "react-router";

async function auth() {
    const user = await useUserStore.getState().getAuthenticatedUser();

    if (!user) throw redirect("/auth/login");
}

export default auth;