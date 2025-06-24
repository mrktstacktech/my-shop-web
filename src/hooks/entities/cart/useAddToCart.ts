import type { CartEntity } from "@services/domain/entities";
import { useState, useCallback } from "react";
import { CartRepository } from "@services/repositories";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store"; // Adjust the import path based on your project structure
import type { ProductsInCartEntity } from "@services/domain/entities";
import { store } from "@/store/store";
interface ProductInput {
    id: string;
    quantity: number;
}

export function useAddToCart(productList: ProductsInCartEntity[] = []) {
    const [loading, setLoading] = useState<boolean>(false);
    const [cart, setCart] = useState<CartEntity>();
    const cartId = useSelector((state: RootState) => state.root.cart.currentCartId);

    const addToCart = useCallback(() => {
        setLoading(true);
        if (!cart) {
            console.warn("No carts found, cannot add products to cart.");
            setLoading(false);
            return;
        }
        new CartRepository().updateCart(true, cart).then(data => {
            setCart(data);
            store.dispatch({ type: 'cart/addCurrentCartItem', payload: data.products });
        }
        ).catch(error => {
            console.error("Error adding to cart:", error);
        }).finally(() => {
            setLoading(false);
        });
    }, [cart]);

    // useEffect(() => {
    //     addToCart();
    // }, [addToCart]);

    return {
        cart,
        loading,
        addToCart
    }
}
