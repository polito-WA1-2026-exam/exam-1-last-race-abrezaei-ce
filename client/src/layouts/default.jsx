import { Outlet } from "react-router";

function LayoutDefault({ className, ...props }) {
    return (
        <div>

            <h1>This is default layout</h1>
            <Outlet />

        </div>
    );
}

export default LayoutDefault;