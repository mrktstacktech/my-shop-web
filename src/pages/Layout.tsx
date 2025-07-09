import { Outlet } from "react-router-dom";
import { AppHeader, AppFooter } from "@/components";
import { useEffect } from "react";

export const Layout = function Layout() {

    useEffect(() => {
        console.log("Layout mounted");
        return () => {
            console.log("Layout unmounted");
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <AppHeader />
            <main className="flex-1">
                <Outlet />
            </main>
            <AppFooter />
        </div>
    );
};

