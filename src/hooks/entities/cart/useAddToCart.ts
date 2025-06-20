import type { CartEntity } from "@services/domain/entities";
import { useState, useCallback, useEffect } from "react";
import { CartRepository } from "@services/repositories";

interface ProductInput {
    id: string;
    quantity: number;
}

const CURRENT_CART_ID = "12345"; // Example cart ID, replace with actual logic to get current cart ID

export function useAddToCart(productList: ProductInput[] = []) {
    const [loading, setLoading] = useState<boolean>(false);
    const [cart, setCart] = useState<CartEntity>();
    const id = CURRENT_CART_ID; 
    
    const addToCart = useCallback(() => {
        setLoading(true);
        const response = new CartRepository().updateCart({
            id: id,
            merge: true,
            products: productList
        })
        response.then(data => {
            setCart(data);
        }
        ).catch(error => {
            console.error("Error adding to cart:", error);
        }).finally(() => {
            setLoading(false);
        });
    }, [id, productList]);

    useEffect(() => {
        addToCart();
    }, [addToCart]);

    return {
        cart,
        loading
    }

}
