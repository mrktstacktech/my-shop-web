import { useState, useCallback, useEffect } from 'react';
import { CartRepository } from '@services/repositories';
import { useSelector } from 'react-redux';
import { useAuthContext } from '@/context/auth-hook';
import { store } from '@/store/store'; // Adjust the import path based on your project structure
import { cartSlice } from '@/slices';
import type { RootState } from '@/store/store';

export function useGetCurrentCart() {
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const { user } = useAuthContext();
    const currentCartId = useSelector((state: RootState) => state.root.cart.currentCartId);
    const currentCartItems = useSelector((state: RootState) => state.root.cart.totalItems);

    const fetchCurrentCart = useCallback(() => {
        if (!user) {
            console.warn("User is not authenticated, cannot fetch cart information.");
            return;
        }
        if (!user.id) {
            console.warn("User ID is undefined, cannot fetch cart information.");
            return;
        }
        const response = new CartRepository().getCurrentCartInfor(user.id);
        response.then(cart => {
            setTotalQuantity(cart.totalQuantity);
            store.dispatch(cartSlice.actions.setCurrentCartId(cart.id));
            store.dispatch(cartSlice.actions.setTotalItems(cart.totalQuantity));
            store.dispatch(cartSlice.actions.setCurrentCartItems(cart.products || []));
        }).catch(error => {
            console.error("Error fetching current cart information:", error);
        });
    }, [user]);

    useEffect(() => {
        if (!currentCartId) {
            fetchCurrentCart();
        }
    }, [fetchCurrentCart, currentCartId]);

    useEffect(() => {
        setTotalQuantity(currentCartItems);
    }, [currentCartItems]);

    return {
        totalQuantity
    };
}