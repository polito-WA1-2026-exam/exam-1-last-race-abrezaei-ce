import { Outlet } from "react-router";
import Navbar from "@/components/partial/navbar";

function LayoutDefault({ className, ...props }) {
    return (
        <>

            <Navbar />
            <main className='max-w-screen-xl mx-auto pt-20 pb-4 px-4'>
                <Outlet />
            </main>

        </>
    );
}

export default LayoutDefault;