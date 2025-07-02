import { useState, useCallback, useEffect } from 'react';
import { CartRepository } from '@services/repositories';
import { useSelector } from 'react-redux';
import { useAuthContext } from '@/context/auth-hook';
import { store } from '@/store/store'; // Adjust the import path based on your project structure
import { cartSlice } from '@/slices';
import type { RootState } from '@/store/store';

export function useGetCurrentWishlist() {
    const [totalWishlistQuantity, setTotalWishlistQuantity] = useState<number>(0);
    const { user } = useAuthContext();
    const currentWishlistId = useSelector((state: RootState) => state.root.cart.currentWishlistId); 
    const totalWishlistItems = useSelector((state: RootState) => state.root.cart.totalWishlistItems);

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
            setTotalWishlistQuantity(cart.totalProducts);
            store.dispatch(cartSlice.actions.setCurrentWishListId(cart.id || ''));
            store.dispatch(cartSlice.actions.setTotalWishListItems(cart.totalProducts));
            store.dispatch(cartSlice.actions.setCurrentWishlistItems(cart.products || []));
        }).catch(error => {
            console.error("Error fetching current cart information:", error);
        });
    }, [user]);

    useEffect(() => {
        if (!currentWishlistId) {
            fetchCurrentCart();
        }
    }, [fetchCurrentCart, currentWishlistId]);

    useEffect(() => {
        setTotalWishlistQuantity(totalWishlistItems);
    }, [totalWishlistItems]);

    return {
        totalWishlistQuantity
    };
}