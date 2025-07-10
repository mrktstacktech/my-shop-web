import { Routes, Route } from "react-router-dom";
import { Signup, Login, HomePage, CartPage, WishListPage, ManageAccountPage, AboutPage, ContactPage, ProductDetailPage, ErrorPage, CheckOutPage } from '@/pages';
import { Layout } from '@pages/Layout';


import { useAuthContext } from "./context/auth-hook";
export default function Router() {
    const { isAuthenticated } = useAuthContext();
    
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<HomePage />} />
                <Route path="my-cart" element={isAuthenticated ? <CartPage /> : <Login />} />
                <Route path="my-wishlist" element={isAuthenticated ? <WishListPage /> : <Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="*" element={<ErrorPage/>} />
                <Route path="product/:id" element={<ProductDetailPage />} />
                <Route path="check-out" element={<CheckOutPage />} />
                <Route path="manage-account" element={isAuthenticated ? <ManageAccountPage /> : <Login />} />
            </Route>
        </Routes>
    );
}