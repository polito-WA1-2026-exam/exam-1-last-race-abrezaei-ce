import LayoutAuth from "@/layouts/auth";
import LayoutDefault from "@/layouts/default";
import LayoutError from "@/layouts/error";
import auth from "@/middlewares/auth";
import PageIndex from "@/pages";
import Page404 from "@/pages/404";
import PageGame from "@/pages/game";
import PageGames from "@/pages/games";
import PageLeaderboard from "@/pages/leaderboard";
import PageLogin from "@/pages/login";
import PageMap from "@/pages/map";
import useUserStore from "@/store/user";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        loader: async () => { await useUserStore.getState().getAuthenticatedUser(); },
        Component: LayoutDefault,
        HydrateFallback: () => (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <p className="text-muted-foreground font-medium animate-pulse">Loading app...</p>
            </div>
        ),
        children: [
            {
                index: true,
                Component: PageIndex
            },
            {
                path: '/map',
                middleware: [auth],
                Component: PageMap
            },
            {
                path: '/games',
                middleware: [auth],
                Component: PageGames
            },
            {
                path: '/games/:gameId',
                middleware: [auth],
                Component: PageGame
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