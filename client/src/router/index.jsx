import LayoutAuth from "@/layouts/auth";
import LayoutDefault from "@/layouts/default";
import LayoutError from "@/layouts/error";
import auth from "@/middlewares/auth";
import PageIndex from "@/pages";
import Page404 from "@/pages/404";
import PageLeaderboard from "@/pages/leaderboard";
import PageLogin from "@/pages/login";
import useUserStore from "@/store/user";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        loader: async () => { await useUserStore.getState().getAuthenticatedUser(); },
        Component: LayoutDefault,
        children: [
            {
                index: true,
                Component: PageIndex
            },
            {
                path: '/leaderboard',
                middleware: [auth],
                Component: PageLeaderboard
            },
        ]
    },
    {
        path: '/auth',
        Component: LayoutAuth,
        children: [
            {
                path: 'login',
                Component: PageLogin
            }
        ]
    },
    {
        Component: LayoutError,
        children: [
            {
                path: '*',
                Component: Page404
            }
        ]
    }
]);

export default router;