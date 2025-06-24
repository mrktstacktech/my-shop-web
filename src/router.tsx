import { Routes, Route } from "react-router-dom";
import { Signup, Login, HomePage, CartPage, WishListPage } from './pages';
import { Layout } from '@pages/Layout';


import { useAuthContext } from "./context/auth-hook";
export default function Router() {
    const { isAuthenticated } = useAuthContext();

    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<HomePage />} />
                <Route path="my-cart" element={isAuthenticated ? <CartPage /> : <CartPage />} />
                <Route path="my-wishlist" element={<WishListPage />} />
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<div>404 Not Found</div>} />
            </Route>
        </Routes>
    );
}