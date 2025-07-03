import { useCallback } from "react";
import { CartRepository } from "@services/repositories";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store"; // Adjust the import path based on your project structure

export function useAddSingleProductToCart() {
    const cartId = useSelector((state: RootState) => state.root.cart.currentCartId);
    const dispatch = useDispatch();

    const addSingleProductToCart = useCallback(async (productId: string, quantity: number) => {
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
    }, [cartId, dispatch]);

    return { addSingleProductToCart };
}