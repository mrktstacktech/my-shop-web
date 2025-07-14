import { useCallback, useState } from "react";
import { CartRepository } from "@services/repositories";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store"; // Adjust the import path based on your project structure
import type { ProductEntity, ProductsInCartEntity } from "@services/domain/entities";
import { store } from "@/store/store";
import { useAuthContext } from "@/context/auth-hook";
import { useNavigate } from "react-router-dom";

export function useUpdateCart() {
    const [loading, setLoading] = useState(false);
    const cartId = useSelector((state: RootState) => state.root.cart.currentCartId);
    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();

    const updateCart = useCallback((products: ProductsInCartEntity[] | ProductEntity[]) => {
        setLoading(true);
        if (!isAuthenticated) {
            navigate('/login', { state: { from: '/cart' } });
        }
        new CartRepository().updateCart(true, cartId, products).then(data => {
            const productsInCart = (data.products || []).filter(product => product.quantity > 0);
            store.dispatch({ type: 'cart/setCurrentCartItems', payload: productsInCart });
        }
        ).catch(error => {
            console.error("Error adding to cart:", error);
        }).finally(() => {
            setLoading(false);
        });
    }, [cartId, isAuthenticated, navigate]);

    return {
        loading,
        updateCart
    }
}
