import { useCallback } from "react";
import { CartRepository } from "@services/repositories";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store"; // Adjust the import path based on your project structure
import type { ProductEntity, ProductsInCartEntity } from "@services/domain/entities";
import { store } from "@/store/store";

// TODO: Rename with clear function 
export function useAddToCart() {
    const cartId = useSelector((state: RootState) => state.root.cart.currentCartId);

    const addToCart = useCallback((products: ProductsInCartEntity[] | ProductEntity[]) => {
        new CartRepository().updateCart(true, cartId, products).then(data => {
            store.dispatch({ type: 'cart/setCurrentCartItems', payload: data.products });
        }
        ).catch(error => {
            console.error("Error adding to cart:", error);
        }).finally(() => {
        });
    }, [cartId]);

    return {
        addToCart
    }
}
