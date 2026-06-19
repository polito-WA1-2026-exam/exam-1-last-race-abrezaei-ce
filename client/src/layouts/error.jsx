import { Outlet } from "react-router";

function LayoutError({ className, ...props }) {
    return (
        <div>

            <h1>This is error layout</h1>
            <Outlet />

        </div>
    );
}

export default LayoutError;