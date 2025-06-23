import type { CartEntity } from '@services/domain/entities';
import { useCallback, useEffect, useState } from 'react';
import { CartRepository } from '@services/repositories';
import { useSelector } from 'react-redux'; 
import type { RootState } from '@/store/store'; // Adjust the import path based on your project structure

export function useGetCurrentCartItems() {
    const [loading, setLoading] = useState<boolean>(false);
    const [cart, setCart] = useState<CartEntity>();
    const cartId = useSelector((state: RootState) => state.root.cart.currentCartId); 

    const fetchCurrentCart = useCallback(() => {
        setLoading(true);
        const response = new CartRepository().getCurrentCart(cartId);
        response.then(data => {
            setCart(data);
        }).catch(error => {
            console.error("Error fetching current cart:", error);
        }).finally(() => {
            setLoading(false);
        });
    }, [cartId]);

    useEffect(() => {
        fetchCurrentCart();
    }, [fetchCurrentCart]);

    return {
        cart,
        loading
    };
}