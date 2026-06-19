import LayoutAuth from "@/layouts/auth";
import LayoutDefault from "@/layouts/default";
import LayoutError from "@/layouts/error";
import auth from "@/middlewares/auth";
import PageIndex from "@/pages";
import Page404 from "@/pages/404";
import PageLogin from "@/pages/login";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        middleware: [auth],
        Component: LayoutDefault,
        children: [
            {
                index: true,
                Component: PageIndex
            }
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