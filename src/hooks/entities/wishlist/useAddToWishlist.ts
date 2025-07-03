import { useState, useCallback } from 'react';
import type { RootState } from '@/store/store';
import type { CartEntity } from '@services/domain/entities';
import { WishlistRepository } from '@services/repositories';
import { useDispatch, useSelector } from 'react-redux';

export function useAddToWishlist() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const currentWishlistId = useSelector((state: RootState) => state.root.cart.currentWishlistId);

    const addToWishlist = useCallback(async (productId: string) => {
        setLoading(true);
        try {
            const wishlistRepo = new WishlistRepository();
            const updatedCart: CartEntity = await wishlistRepo.addToWishlist(currentWishlistId, productId);
            dispatch({ type: 'cart/setCurrentWishlistItems', payload: updatedCart.products });
            dispatch({ type: 'cart/setTotalWishListItems', payload: updatedCart.totalProducts });
        } catch (error) {
            console.error("Error adding to wishlist:", error);
        } finally {
            setLoading(false);
        }
    }, [currentWishlistId, dispatch]);

    return { loading, addToWishlist };
}