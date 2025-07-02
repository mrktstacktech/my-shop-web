import { useState, useCallback } from 'react';
import { store } from '@/store/store';
import type { CartEntity } from '@services/domain/entities';
import { WishlistRepository } from '@services/repositories';

export function useRemoveFromWishlist() {
    const [loading, setLoading] = useState(false);
    const currentWishlistId = store.getState().root.cart.currentWishlistId;

    const removeFromWishlist = useCallback(async (productId: string) => {
        setLoading(true);
        try {
            const wishlistRepo = new WishlistRepository();
            const updatedCart: CartEntity = await wishlistRepo.removeFromWishlist(currentWishlistId, productId);
            store.dispatch({ type: 'cart/setCurrentWishlistItems', payload: updatedCart.products });
        } catch (error) {
            console.error("Error removing from wishlist:", error);
        } finally {
            setLoading(false);
        }
    }, [currentWishlistId]);

    return { loading, removeFromWishlist };
}