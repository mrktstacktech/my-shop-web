import { Routes, Route, Navigate } from "react-router-dom";
import { Signup, Login, HomePage, CartPage, WishListPage } from './pages';
// import { useEffect } from "react";
import { useAuthContext } from "./context/auth-hook";
export default function Router() {
    // const navigate = useNavigate();
    const { isAuthenticated } = useAuthContext();

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         navigate("/");
    //     }
    // }, [isAuthenticated, navigate]);

    return (
        <Routes>
            <Route path="/my-cart" element={isAuthenticated ? <CartPage /> : <CartPage/>} />
            <Route path="/my-wishlist" element={<WishListPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<div>404 Not Found</div>} />
            <Route path="/" element={<HomePage />} />
        </Routes>
    );
}