import { Outlet } from "react-router-dom";
import { AppHeader } from "@/components";
import { useEffect } from "react";

export const Layout = function Layout() {

    useEffect(() => {
        console.log("Layout mounted");
        return () => {
            console.log("Layout unmounted");
        }
    }, []);

    return (
        <div className="min-h-screen">
            <AppHeader />
            <Outlet />
        </div>
    );
};

