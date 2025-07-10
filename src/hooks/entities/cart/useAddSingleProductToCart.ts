import { useCallback } from "react";
import { CartRepository } from "@services/repositories";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { useAuthContext } from "@/context/auth-hook";
import { useNavigate, useLocation } from "react-router-dom";

export function useAddSingleProductToCart() {
    const cartId = useSelector((state: RootState) => state.root.cart.currentCartId);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthContext();
    const location = useLocation();

    const addSingleProductToCart = useCallback(async (productId: string, quantity: number) => {
        if (!isAuthenticated) {
            console.warn("User is not authenticated. Redirecting to login page.");
            navigate('/login', {
                state: { from: location },
                replace: true
            });
            return;
        }
        if (!cartId) {
            console.error("Cart ID is not available. Cannot add product to cart.");
            return;
        }
        try {
            const response = await new CartRepository().addSingleProductToCart(cartId, productId, quantity);
            dispatch({ type: 'cart/setCurrentCartItems', payload: response.products });
            dispatch({ type: 'cart/setTotalItems', payload: response.totalQuantity });
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    }, [cartId, dispatch, isAuthenticated, navigate, location]);

    return { addSingleProductToCart };
}