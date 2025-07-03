import { useState, useCallback } from 'react';
import type { RootState } from '@/store/store';
import type { CartEntity } from '@services/domain/entities';
import { WishlistRepository } from '@services/repositories';
import { useDispatch, useSelector } from 'react-redux';

export function useRemoveFromWishlist() {
    const [loading, setLoading] = useState(false);
    // This will allow the component to re-render when the state changes
    const currentWishlistId = useSelector((state: RootState) => state.root.cart.currentWishlistId);
    const dispatch = useDispatch();

    const removeFromWishlist = useCallback(async (productId: string) => {
        setLoading(true);
        try {
            const wishlistRepo = new WishlistRepository();
            const updatedCart: CartEntity = await wishlistRepo.removeFromWishlist(currentWishlistId, productId);
            const products = (updatedCart.products || []).filter(product => product.quantity > 0);
            dispatch({
                type: 'cart/setCurrentWishlistItems', payload: products
            });
            dispatch({ type: 'cart/setTotalWishListItems', payload: products.length });
        } catch (error) {
            console.error("Error removing from wishlist:", error);
        } finally {
            setLoading(false);
        }
    }, [currentWishlistId, dispatch]);

    return { loading, removeFromWishlist };
}