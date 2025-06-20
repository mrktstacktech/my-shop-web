import type { CartEntity } from '@services/domain/entities';
import { useCallback, useEffect, useState } from 'react';
import { CartRepository } from '@services/repositories';

const CURRENT_CART_ID = '12345'; // Example cart ID, replace with actual logic to get current cart ID

export function useGetCurrentCart() {
    const [loading, setLoading] = useState<boolean>(false);
    const [cart, setCart] = useState<CartEntity>();

    const fetchCurrentCart = useCallback(() => {
        setLoading(true);
        const response = new CartRepository().getCurrentCart(CURRENT_CART_ID);
        response.then(data => {
            setCart(data);
        }).catch(error => {
            console.error("Error fetching current cart:", error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        fetchCurrentCart();
    }, [fetchCurrentCart]);

    return {
        cart,
        loading
    };
}