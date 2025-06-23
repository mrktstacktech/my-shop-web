import type { CartEntity } from "@services/domain/entities";
import { useState, useCallback } from "react";
import { CartRepository } from "@services/repositories";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store"; // Adjust the import path based on your project structure
import type { ProductsInCartEntity } from "@services/domain/entities";

interface ProductInput {
    id: string;
    quantity: number;
}

export function useAddToCart(productList: ProductsInCartEntity[] = []) {
    const [loading, setLoading] = useState<boolean>(false);
    const [cart, setCart] = useState<CartEntity>();
    const cartId = useSelector((state: RootState) => state.root.cart.currentCartId);

    const listToProductInput = (products: ProductsInCartEntity[]): ProductInput[] => {
        return products.map(product => ({
            id: product.id,
            quantity: product.quantity
        }));
    }

    const addToCart = useCallback(() => {
        setLoading(true);
        new CartRepository().updateCart({
            id: cartId,
            merge: true,
            products: listToProductInput(productList)
        }).then(data => {
            console.log("Cart updated successfully:", data);
            setCart(data);
        }
        ).catch(error => {
            console.error("Error adding to cart:", error);
        }).finally(() => {
            setLoading(false);
        });
    }, [cartId, productList]);

    // useEffect(() => {
    //     addToCart();
    // }, [addToCart]);

    return {
        cart,
        loading,
        addToCart
    }
}
